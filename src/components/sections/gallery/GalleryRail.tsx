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
    closeLabel: string;
    prevLabel: string;
    nextLabel: string;
  }
> = {
  de: {
    title: "Galerie",
    subtitle: "Aromen, Farben und Momente von CholoSoy",
    ariaLabel: "Galerie Bilder",
    closeLabel: "Schließen",
    prevLabel: "Vorheriges Bild",
    nextLabel: "Nächstes Bild",
  },
  es: {
    title: "Galería",
    subtitle: "Sabores, colores y momentos de CholoSoy",
    ariaLabel: "Imágenes de la galería",
    closeLabel: "Cerrar",
    prevLabel: "Imagen anterior",
    nextLabel: "Imagen siguiente",
  },
  en: {
    title: "Gallery",
    subtitle: "Flavors, colors and moments of CholoSoy",
    ariaLabel: "Gallery images",
    closeLabel: "Close",
    prevLabel: "Previous image",
    nextLabel: "Next image",
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
        return;
      }

      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => {
          if (prev === null) return prev;
          return prev === 0 ? images.length - 1 : prev - 1;
        });
      }

      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => {
          if (prev === null) return prev;
          return prev === images.length - 1 ? 0 : prev + 1;
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, images.length]);

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

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  const showNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  const handleCardClick = (index: number) => {
    if (dragStartedRef.current) return;

    if (activeIndex === index) {
      openLightbox(index);
      return;
    }

    setActiveIndex(index);

    requestAnimationFrame(() => {
      if (isCompactLayout) {
        centerCardCompact(index);
      } else {
        centerCardDesktop(index);
      }
    });
  };

  return (
    <>
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

      {lightboxIndex !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={images[lightboxIndex]?.alt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className={`${styles.lightboxButton} ${styles.closeButton}`}
            aria-label={t.closeLabel}
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            ×
          </button>

          <button
            type="button"
            className={`${styles.lightboxButton} ${styles.prevButton}`}
            aria-label={t.prevLabel}
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            ‹
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.lightboxMedia}>
              <Image
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].alt}
                fill
                className={styles.lightboxImage}
                sizes="100vw"
                priority
              />
            </div>
          </div>

          <button
            type="button"
            className={`${styles.lightboxButton} ${styles.nextButton}`}
            aria-label={t.nextLabel}
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}