import Image from "next/image";
import Container from "@/app/components/ui/Container";
import styles from "./EventsBoard.module.scss";
import { events } from "./events.mock";

export default function EventsBoard() {
  return (
    <section className={styles.section}>
      <Container size="lg">
        <h1 className={styles.title}>Veranstaltung</h1>

        <div className={styles.list}>
          {events.map((ev) => (
            <article key={ev.id} className={styles.row}>
              <div className={styles.media}>
                <Image
                  src={ev.imageSrc}
                  alt={ev.title}
                  fill
                  sizes="260px"
                  className={styles.image}
                />
              </div>

              <div className={styles.body}>
                <p className={styles.text}>
                  <strong>{ev.title}</strong> {ev.description}
                </p>
              </div>

              <div className={styles.dateBox}>
                <span className={styles.date}>{ev.dateLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
