import Container from "@/app/components/ui/Container";
import styles from "./EventsIntro.module.scss";

export default function EventsIntro() {
  return (
    <section className={styles.section}>
      <Container size="lg">
        <h1 className={styles.title}>Veranstaltungen</h1>
        <p className={styles.subtitle}>
          Kulinarische Events, kulturelle Abende und besondere Erlebnisse bei CholoSoy.
        </p>
      </Container>
    </section>
  );
}
