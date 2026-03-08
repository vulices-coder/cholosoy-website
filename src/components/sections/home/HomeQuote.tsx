import styles from "./HomeQuote.module.scss";
import Container from "@/components/ui/Container";

export default function HomeQuote() {
  return (
    <section className={styles.section}>
      <Container size="lg">
        <div className={styles.inner}>
          <h1 className={`${styles.quote} handwritten`}>
            „Bereise Peru mit dem Gaumen und entdecke eine neue
            Art, die Welt zu bereisen.“
          </h1>
        </div>
      </Container>
    </section>
  );
}