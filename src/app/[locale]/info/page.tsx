import styles from "./InfoPage.module.scss";
import InfoForm from "@/components/sections/info/InfoForm";

export const metadata = {
  title: "Fragen oder Anliegen? | CholoSoy",
  description: "Kontaktieren Sie das CholoSoy Restaurant in Berlin.",
};

export default async function InfoPage({
  params,
}: {
  params: Promise<{ locale: "de" | "es" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Fragen oder Anliegen?</h1>

        <p className={styles.subtitle}>
          Schreiben Sie uns gerne. Wir melden uns so schnell wie möglich bei Ihnen.
        </p>

        <InfoForm locale={locale} />
      </div>
    </main>
  );
}