import Link from "next/link";
import styles from "./InfoPage.module.scss";
import InfoForm from "@/components/sections/info/InfoForm";

type Locale = "de" | "es" | "en";

const INFO_PAGE_DICT: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    metaTitle: string;
    metaDescription: string;
    back: string;
  }
> = {
  de: {
    title: "Fragen oder Anliegen?",
    subtitle: "Schreiben Sie uns gerne. Wir melden uns so schnell wie möglich bei Ihnen.",
    metaTitle: "Fragen oder Anliegen? | CholoSoy",
    metaDescription: "Kontaktieren Sie das CholoSoy Restaurant in Berlin.",
    back: "← Zur Startseite",
  },
  es: {
    title: "¿Preguntas o consultas?",
    subtitle: "Escríbanos con gusto. Nos pondremos en contacto con usted lo antes posible.",
    metaTitle: "¿Preguntas o consultas? | CholoSoy",
    metaDescription: "Póngase en contacto con el restaurante CholoSoy en Berlín.",
    back: "← Volver a inicio",
  },
  en: {
    title: "Questions or requests?",
    subtitle: "Feel free to write to us. We will get back to you as soon as possible.",
    metaTitle: "Questions or requests? | CholoSoy",
    metaDescription: "Contact the CholoSoy restaurant in Berlin.",
    back: "← Back to start page",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = INFO_PAGE_DICT[locale] ?? INFO_PAGE_DICT.de;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = INFO_PAGE_DICT[locale] ?? INFO_PAGE_DICT.de;

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <Link href={`/${locale}/home`} className={styles.backLink}>
          {t.back}
        </Link>

        <h1 className={styles.title}>{t.title}</h1>

        <p className={styles.subtitle}>{t.subtitle}</p>

        <InfoForm locale={locale} />

      </div>
    </main>
  );
}