import styles from "./InfoPage.module.scss";
import InfoForm from "@/components/sections/info/InfoForm";

export const metadata = {
  title: "Fragen oder Anliegen? | CholoSoy",
  description: "Kontaktieren Sie das CholoSoy Restaurant in Berlin.",
};

export default function InfoPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Fragen oder Anliegen?</h1>

        <p className={styles.subtitle}>
          Schreiben Sie uns gerne. Wir melden uns so schnell wie möglich bei Ihnen.
        </p>

        <InfoForm />
      </div>
    </main>
  );
}