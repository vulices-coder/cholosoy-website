import Container from "@/app/components/ui/Container";
import styles from "./EventsList.module.scss";

const events = [
  {
    title: "Peruanischer Abend",
    date: "12. Oktober 2025",
    description: "Live-Musik, Spezialmenü und peruanische Kultur."
  },
  {
    title: "Ceviche Workshop",
    date: "26. Oktober 2025",
    description: "Lerne die Kunst des originalen Ceviche."
  },
];

export default function EventsList() {
  return (
    <section className={styles.section}>
      <Container size="lg">
        <div className={styles.grid}>
          {events.map((event, index) => (
            <div key={index} className={styles.card}>
              <h3>{event.title}</h3>
              <p className={styles.date}>{event.date}</p>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
