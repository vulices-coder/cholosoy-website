"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import styles from "./GalleryRail.module.scss";

const images = Array.from({ length: 34 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    src: `/images/gallery/${num}.png`,
    alt: `CholoSoy Galerie ${num}`,
  };
});

export default function GalleryRail() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;

    isDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    scrollLeftRef.current = rail.scrollLeft;
    rail.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !isDownRef.current) return;

    const dx = e.clientX - startXRef.current;
    rail.scrollLeft = scrollLeftRef.current - dx;
  };

  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;

    isDownRef.current = false;
    setIsDragging(false);

    if (e) {
      try {
        rail.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;

    e.preventDefault();
    rail.scrollLeft += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
  };

  return (
    <section className={styles.section}>
      <Container size="lg">
        <div className={styles.stage}>
          <header className={styles.header}>
            <h1 className={styles.title}>Galerie</h1>
          </header>

          <div
            ref={railRef}
            className={`${styles.rail} ${isDragging ? styles.dragging : ""}`}
            aria-label="Galerie Bilder"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
            onWheel={onWheel}
          >
            {images.map((img) => (
              <figure key={img.src} className={styles.card}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 600px) 22vw, (max-width: 1100px) 23vw, 24vw"
                  draggable={false}
                />
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}