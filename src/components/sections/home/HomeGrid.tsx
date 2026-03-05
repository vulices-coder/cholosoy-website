import Image from "next/image";
import Container from "@/app/components/ui/Container";
import styles from "./HomeGrid.module.scss";

const images = [
  { src: "/images/home/ceviche.jpg", alt: "Ceviche" },
  { src: "/images/home/dance.jpg", alt: "Peru Culture" },
  { src: "/images/home/machu-picchu.jpg", alt: "Machu Picchu" },
  { src: "/images/home/food.jpg", alt: "Peru Food" },
  { src: "/images/home/beach.jpg", alt: "Peru Beach" },
  { src: "/images/home/pisco.jpg", alt: "Pisco" },
  { src: "/images/home/person.jpg", alt: "Peru People" },
];

export default function HomeGrid() {
  return (
    <section className={styles.section}>
      <Container size="lg">
        <div className={styles.grid}>
          {images.map((img) => (
            <div key={img.src} className={styles.card}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 900px) 100vw, 25vw"
                className={styles.image}
                priority={false}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}