"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import styles from "./HomeGrid.module.scss";

const homeImages = [
  {
    src: "/images/home/perufood.png",
    alt: "Peru Food",
    className: "cardTop",
  },
  {
    src: "/images/home/peruculture.png",
    alt: "Peru Culture",
    className: "cardTop",
  },
  {
    src: "/images/home/machupicchu.png",
    alt: "Machu Picchu",
    className: "cardTop",
  },
  {
    src: "/images/home/ceviche.png",
    alt: "Ceviche",
    className: "cardTop",
  },
  {
    src: "/images/home/perubeach.png",
    alt: "Peru Beach",
    className: "cardBeach",
  },
  {
    src: "/images/home/piscosour.png",
    alt: "Pisco Sour",
    className: "cardPisco",
  },
  {
    src: "/images/home/perupeople.png",
    alt: "Peru People",
    className: "cardPeople",
  },
] as const;

export default function HomeGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
          return prev === 0 ? homeImages.length - 1 : prev - 1;
        });
      }

      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => {
          if (prev === null) return prev;
          return prev === homeImages.length - 1 ? 0 : prev + 1;
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return prev === 0 ? homeImages.length - 1 : prev - 1;
    });
  };

  const showNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return prev === homeImages.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <>
      <section className={styles.section}>
        <Container size="lg">
          <div className={styles.wrapper}>
            <div className={styles.rowTop}>
              {homeImages.slice(0, 4).map((img, index) => (
                <button
                  key={img.src}
                  type="button"
                  className={`${styles.imageButton} ${styles[img.className]}`}
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Open ${img.alt} fullscreen`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className={styles.image}
                  />
                  <span className={styles.overlay} />
                </button>
              ))}
            </div>

            <div className={styles.rowBottom}>
              {homeImages.slice(4).map((img, localIndex) => {
                const index = localIndex + 4;

                return (
                  <button
                    key={img.src}
                    type="button"
                    className={`${styles.imageButton} ${styles[img.className]}`}
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`Open ${img.alt} fullscreen`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className={styles.image}
                    />
                    <span className={styles.overlay} />
                  </button>
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
          aria-label={homeImages[lightboxIndex].alt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className={`${styles.lightboxButton} ${styles.closeButton}`}
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close fullscreen image"
          >
            ×
          </button>

          <button
            type="button"
            className={`${styles.lightboxButton} ${styles.prevButton}`}
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.lightboxMedia}>
              <Image
                src={homeImages[lightboxIndex].src}
                alt={homeImages[lightboxIndex].alt}
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
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}