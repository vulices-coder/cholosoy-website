import Image from "next/image";
import Container from "@/components/ui/Container";
import styles from "./GalleryRail.module.scss";

const images = Array.from({ length: 25 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return { src: `/images/gallery/${num}.jpg`, alt: `CholoSoy Galerie ${num}` };
});

export default function GalleryRail() {
  return (
    <section className={styles.section}>
      <Container size="lg">
        <header className={styles.header}>
          <h1 className={styles.title}>Galerie</h1>
        </header>

        <div className={styles.rail} aria-label="Galerie Bilder (horizontal scroll)">
          {images.map((img) => (
            <figure key={img.src} className={styles.card}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="360px"
                className={styles.image}
              />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}