import Image from "next/image";
import Container from "@/components/ui/Container";
import styles from "./HomeGrid.module.scss";

export default function HomeGrid() {
  return (
    <section className={styles.section}>
      <Container size="lg">
        <div className={styles.wrapper}>
          
          <div className={styles.rowTop}>
            <div className={styles.cardTop}>
              <Image src="/images/home/ceviche.jpg" alt="Ceviche" fill className={styles.image} />
            </div>

            <div className={styles.cardTop}>
              <Image src="/images/home/dance.jpg" alt="Peru Culture" fill className={styles.image} />
            </div>

            <div className={styles.cardTop}>
              <Image src="/images/home/machu-picchu.jpg" alt="Machu Picchu" fill className={styles.image} />
            </div>

            <div className={styles.cardTop}>
              <Image src="/images/home/food.jpg" alt="Peru Food" fill className={styles.image} />
            </div>
          </div>

          <div className={styles.rowBottom}>
            <div className={styles.cardBeach}>
              <Image src="/images/home/beach.jpg" alt="Peru Beach" fill className={styles.image} />
            </div>

            <div className={styles.cardPisco}>
              <Image src="/images/home/pisco.jpg" alt="Pisco" fill className={styles.image} />
            </div>

            <div className={styles.cardPeople}>
              <Image src="/images/home/person.jpg" alt="Peru People" fill className={styles.image} />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}