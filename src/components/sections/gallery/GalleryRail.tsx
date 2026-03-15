"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import styles from "./GalleryRail.module.scss";

const LOCALES = new Set(["de", "es", "en"]);

type Locale = "de" | "es" | "en";

type GalleryImageItem = {
  id: string;
  url: string;
  category: string;
  alt: string;
  createdAt: Date;
  updatedAt: Date;
};

type GalleryRailProps = {
  images: GalleryImageItem[];
};

function getLocaleFromPath(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return LOCALES.has(first) ? (first as Locale) : "de";
}

const GALLERY_DICT: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    ariaLabel: string;
  }
> = {
  de: {
    title: "Galerie",
    subtitle: "Aromen, Farben und Momente von CholoSoy",
    ariaLabel: "Galerie Bilder",
  },
  es: {
    title: "Galería",
    subtitle: "Sabores, colores y momentos de CholoSoy",
    ariaLabel: "Imágenes de la galería",
  },
  en: {
    title: "Gallery",
    subtitle: "Flavors, colors and moments of CholoSoy",
    ariaLabel: "Gallery images",
  },
};

export default function GalleryRail({ images }: GalleryRailProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = GALLERY_DICT[locale];

  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  const pointerDownRef = useRef(false);
  const dragStartedRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isCompactLayout, setIsCompactLayout] = useState(false);

  const DRAG_THRESHOLD = 8;

  useEffect(() => {
    const checkViewport = () => {
      setIsCompactLayout(window.innerWidth <= 900);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    return () => {
      window.removeEventListener("resize", checkViewport);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || isCompactLayout) return;

    const handleWheel = (e: WheelEvent) => {
      const canScroll = rail.scrollWidth > rail.clientWidth;
      if (!canScroll) return;

      const dominantDelta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      e.preventDefault();
      rail.scrollLeft += dominantDelta;
    };

    rail.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      rail.removeEventListener("wheel", handleWheel);
    };
  }, [isCompactLayout]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isCompactLayout) return;

    const rail = railRef.current;
    if (!rail) return;

    pointerDownRef.current = true;
    dragStartedRef.current = false;
    startXRef.current = e.clientX;
    scrollLeftRef.current = rail.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isCompactLayout) return;

    const rail = railRef.current;
    if (!rail || !pointerDownRef.current) return;

    const dx = e.clientX - startXRef.current;

    if (!dragStartedRef.current && Math.abs(dx) > DRAG_THRESHOLD) {
      dragStartedRef.current = true;
      setIsDragging(true);
    }

    if (dragStartedRef.current) {
      rail.scrollLeft = scrollLeftRef.current - dx;
    }
  };

  const endDrag = () => {
    pointerDownRef.current = false;
    dragStartedRef.current = false;
    setIsDragging(false);
  };

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    section.style.setProperty("--mouse-x", `${x}px`);
    section.style.setProperty("--mouse-y", `${y}px`);
    section.style.setProperty("--glow-opacity", "1");
  };

  const handleSectionMouseLeave = () => {
    const section = sectionRef.current;
    if (!section) return;

    section.style.setProperty("--glow-opacity", "0");
  };

  const centerCardDesktop = (index: number) => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.children[index] as HTMLElement | undefined;
    if (!card) return;

    const railCenter = rail.clientWidth / 2;
    const cardCenter = card.offsetLeft + card.clientWidth / 2;
    const targetLeft = cardCenter - railCenter;

    rail.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  };

  const centerCardCompact = (index: number) => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.children[index] as HTMLElement | undefined;
    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  const handleCardClick = (index: number) => {
    if (dragStartedRef.current) return;

    setActiveIndex((prev) => {
      const next = prev === index ? null : index;

      if (next !== null) {
        requestAnimationFrame(() => {
          if (isCompactLayout) {
            centerCardCompact(next);
          } else {
            centerCardDesktop(next);
          }
        });
      }

      return next;
    });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
    >
      <Container size="lg">
        <div className={styles.stage}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.subtitle}>{t.subtitle}</p>
          </header>

          <div
            ref={railRef}
            className={`${styles.rail} ${isDragging ? styles.dragging : ""}`}
            aria-label={t.ariaLabel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
          >
            {images.map((img, index) => {
              const isActive = activeIndex === index;

              return (
                <figure
                  key={img.id}
                  className={styles.card}
                  data-active={isActive ? "true" : "false"}
                  onClick={() => handleCardClick(index)}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 24vw"
                    draggable={false}
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                </figure>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}