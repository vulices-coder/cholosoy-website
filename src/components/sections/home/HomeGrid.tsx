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
              <Image
                src="/images/home/perufood.png"
                alt="Peru Food"
                fill
                className={styles.image}
              />
            </div>

            <div className={styles.cardTop}>
              <Image
                src="/images/home/peruculture.png"
                alt="Peru Culture"
                fill
                className={styles.image}
              />
            </div>

            <div className={styles.cardTop}>
              <Image
                src="/images/home/machupicchu.png"
                alt="Machu Picchu"
                fill
                className={styles.image}
              />
            </div>

            <div className={styles.cardTop}>
              <Image
                src="/images/home/ceviche.png"
                alt="Ceviche"
                fill
                className={styles.image}
              />
            </div>
          </div>

          <div className={styles.rowBottom}>
            <div className={styles.cardBeach}>
              <Image
                src="/images/home/perubeach.png"
                alt="Peru Beach"
                fill
                className={styles.image}
              />
            </div>

            <div className={styles.cardPisco}>
              <Image
                src="/images/home/piscosour.png"
                alt="Pisco Sour"
                fill
                className={styles.image}
              />
            </div>

            <div className={styles.cardPeople}>
              <Image
                src="/images/home/perupeople.png"
                alt="Peru People"
                fill
                className={styles.image}
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}