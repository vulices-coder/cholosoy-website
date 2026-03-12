import Link from "next/link";
import styles from "@/components/legal/LegalPage.module.scss";

type Locale = "de" | "es" | "en";

const IMPRESSUM_DICT: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    back: string;
    title: string;
    contact: string;
    vat: string;
    content: string;
    dispute: string;
  }
> = {
  de: {
    metaTitle: "Impressum | CholoSoy",
    metaDescription: "Impressum des CholoSoy Restaurants.",
    back: "← Zur Startseite",
    title: "Impressum",
    contact: "Kontakt",
    vat: "Umsatzsteuer-ID",
    content: "Verantwortlich für den Inhalt",
    dispute: "EU-Streitschlichtung",
  },

  es: {
    metaTitle: "Aviso legal | CholoSoy",
    metaDescription: "Aviso legal del restaurante CholoSoy.",
    back: "← Volver a la página inicial",
    title: "Aviso legal",
    contact: "Contacto",
    vat: "Número de IVA",
    content: "Responsable del contenido",
    dispute: "Resolución de litigios de la UE",
  },

  en: {
    metaTitle: "Legal notice | CholoSoy",
    metaDescription: "Legal notice of the CholoSoy restaurant.",
    back: "← Back to start page",
    title: "Legal Notice",
    contact: "Contact",
    vat: "VAT ID",
    content: "Responsible for content",
    dispute: "EU dispute resolution",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = IMPRESSUM_DICT[locale] ?? IMPRESSUM_DICT.de;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = IMPRESSUM_DICT[locale] ?? IMPRESSUM_DICT.de;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          {t.back}
        </Link>

        <h1 className={styles.title}>{t.title}</h1>

        <h2 className={styles.subtitle}>Angaben gemäß § 5 TMG</h2>

        <p className={styles.text}>
          <strong>CholoSoy Restaurant</strong>
          <br />
          Victor Ulices Flores Silva
          <br />
          Berlin, Deutschland
        </p>

        <h2 className={styles.subtitle}>{t.contact}</h2>

        <p className={styles.text}>
          E-Mail: info@cholosoy.de
          <br />
          Telefon: +49 (0) XXX XXXXXXX
        </p>

        <h2 className={styles.subtitle}>{t.vat}</h2>

        <p className={styles.text}>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          wird nachgetragen
        </p>

        <h2 className={styles.subtitle}>{t.content}</h2>

        <p className={styles.text}>
          Victor Ulices Flores Silva
          <br />
          Berlin, Deutschland
        </p>

        <h2 className={styles.subtitle}>{t.dispute}</h2>

        <p className={styles.text}>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
          <br />
          https://ec.europa.eu/consumers/odr/
        </p>
      </div>
    </main>
  );
}