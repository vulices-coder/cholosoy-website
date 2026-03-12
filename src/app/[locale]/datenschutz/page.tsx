import Link from "next/link";
import styles from "@/components/legal/LegalPage.module.scss";

type Locale = "de" | "es" | "en";

const DATA_DICT: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    back: string;
    title: string;
    responsible: string;
    general: string;
    access: string;
    reservations: string;
    catering: string;
    legal: string;
    storage: string;
    rights: string;
    cookies: string;
    contact: string;
  }
> = {
  de: {
    metaTitle: "Datenschutz | CholoSoy",
    metaDescription: "Datenschutzerklärung des CholoSoy Restaurants.",
    back: "← Zur Startseite",
    title: "Datenschutzerklärung",
    responsible: "1. Verantwortlicher",
    general: "2. Allgemeine Hinweise zur Datenverarbeitung",
    access: "3. Zugriffsdaten",
    reservations: "4. Reservierungen",
    catering: "5. Catering-Anfragen",
    legal: "6. Rechtsgrundlagen",
    storage: "7. Speicherdauer",
    rights: "8. Ihre Rechte",
    cookies: "9. Cookies",
    contact: "10. Kontakt zum Datenschutz",
  },

  es: {
    metaTitle: "Protección de datos | CholoSoy",
    metaDescription: "Política de privacidad del restaurante CholoSoy.",
    back: "← Volver a la página inicial",
    title: "Política de privacidad",
    responsible: "1. Responsable",
    general: "2. Información general sobre el tratamiento de datos",
    access: "3. Datos de acceso",
    reservations: "4. Reservas",
    catering: "5. Solicitudes de catering",
    legal: "6. Bases legales",
    storage: "7. Periodo de almacenamiento",
    rights: "8. Sus derechos",
    cookies: "9. Cookies",
    contact: "10. Contacto sobre protección de datos",
  },

  en: {
    metaTitle: "Privacy Policy | CholoSoy",
    metaDescription: "Privacy policy of the CholoSoy restaurant.",
    back: "← Back to start page",
    title: "Privacy Policy",
    responsible: "1. Responsible party",
    general: "2. General information about data processing",
    access: "3. Access data",
    reservations: "4. Reservations",
    catering: "5. Catering requests",
    legal: "6. Legal basis",
    storage: "7. Data retention",
    rights: "8. Your rights",
    cookies: "9. Cookies",
    contact: "10. Data protection contact",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = DATA_DICT[locale] ?? DATA_DICT.de;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = DATA_DICT[locale] ?? DATA_DICT.de;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          {t.back}
        </Link>

        <h1 className={styles.title}>{t.title}</h1>

        <h2 className={styles.subtitle}>{t.responsible}</h2>

        <p className={styles.text}>
          CholoSoy Restaurant
          <br />
          Victor Ulices Flores Silva
          <br />
          Berlin, Deutschland
          <br />
          E-Mail: info@cholosoy.de
        </p>

        <h2 className={styles.subtitle}>{t.general}</h2>

        <p className={styles.text}>
          Der Schutz Ihrer persönlichen Daten ist uns wichtig. Personenbezogene Daten werden
          vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften behandelt.
        </p>

        <h2 className={styles.subtitle}>{t.access}</h2>

        <p className={styles.text}>
          Beim Besuch dieser Website werden automatisch technische Informationen erfasst,
          die Ihr Browser an unseren Server übermittelt.
        </p>

        <h2 className={styles.subtitle}>{t.reservations}</h2>

        <p className={styles.text}>
          Wenn Sie eine Reservierung über unsere Website tätigen, verarbeiten wir Ihre
          Kontaktdaten und Reservierungsinformationen.
        </p>

        <h2 className={styles.subtitle}>{t.catering}</h2>

        <p className={styles.text}>
          Wenn Sie eine Catering-Anfrage senden, verarbeiten wir die von Ihnen angegebenen Daten
          zur Bearbeitung Ihrer Anfrage.
        </p>

        <h2 className={styles.subtitle}>{t.legal}</h2>

        <ul className={styles.list}>
          <li>Art. 6 Abs. 1 lit. b DSGVO</li>
          <li>Art. 6 Abs. 1 lit. c DSGVO</li>
          <li>Art. 6 Abs. 1 lit. f DSGVO</li>
        </ul>

        <h2 className={styles.subtitle}>{t.storage}</h2>

        <p className={styles.text}>
          Daten werden nur so lange gespeichert, wie dies für die Bearbeitung Ihrer Anfrage
          oder gesetzliche Verpflichtungen erforderlich ist.
        </p>

        <h2 className={styles.subtitle}>{t.rights}</h2>

        <ul className={styles.list}>
          <li>Recht auf Auskunft</li>
          <li>Recht auf Berichtigung</li>
          <li>Recht auf Löschung</li>
          <li>Recht auf Einschränkung</li>
          <li>Recht auf Widerspruch</li>
          <li>Recht auf Datenübertragbarkeit</li>
        </ul>

        <h2 className={styles.subtitle}>{t.cookies}</h2>

        <p className={styles.text}>
          Unsere Website verwendet technisch notwendige Cookies sowie optionale Cookies
          nach Ihrer Einwilligung.
        </p>

        <h2 className={styles.subtitle}>{t.contact}</h2>

        <p className={styles.text}>
          Bei Fragen zum Datenschutz kontaktieren Sie uns unter info@cholosoy.de
        </p>
      </div>
    </main>
  );
}