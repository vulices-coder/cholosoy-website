import Link from "next/link";
import styles from "@/components/legal/LegalPage.module.scss";

type Locale = "de" | "es" | "en";

const AGB_DICT: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    back: string;
    title: string;
    s1: string;
    p1: string;
    s2: string;
    p2: string;
    s3: string;
    p3: string;
    s4: string;
    p4: string;
    s5: string;
    p5: string;
    s6: string;
    p6: string;
    s7: string;
    p7: string;
  }
> = {
  de: {
    metaTitle: "AGB | CholoSoy",
    metaDescription: "Allgemeine Geschäftsbedingungen des CholoSoy Restaurants in Berlin.",
    back: "← Zur Startseite",
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    s1: "1. Geltungsbereich",
    p1: "Diese Allgemeinen Geschäftsbedingungen gelten für Reservierungsanfragen, Catering-Anfragen und sonstige Anfragen, die über die Website von CholoSoy Restaurant gestellt werden.",
    s2: "2. Reservierungen",
    p2: "Reservierungen über die Website stellen zunächst eine Anfrage dar. Eine verbindliche Reservierung kann erst nach Bestätigung durch CholoSoy Restaurant zustande kommen.",
    s3: "3. Stornierungen",
    p3: "Bereits bestätigte Reservierungen sollten möglichst frühzeitig storniert werden. Für Gruppen- oder Sonderreservierungen können gesonderte Bedingungen gelten.",
    s4: "4. Catering",
    p4: "Catering-Anfragen sind unverbindlich, bis ein individuelles Angebot erstellt und von beiden Seiten bestätigt wurde.",
    s5: "5. Preise",
    p5: "Alle genannten Preise verstehen sich in Euro. Änderungen und Irrtümer bleiben vorbehalten.",
    s6: "6. Haftung",
    p6: "CholoSoy Restaurant haftet nur für Schäden, die auf vorsätzlicher oder grob fahrlässiger Pflichtverletzung beruhen, soweit gesetzlich zulässig.",
    s7: "7. Schlussbestimmungen",
    p7: "Es gilt das Recht der Bundesrepublik Deutschland.",
  },
  es: {
    metaTitle: "Términos y condiciones | CholoSoy",
    metaDescription: "Términos y condiciones generales del restaurante CholoSoy en Berlín.",
    back: "← Volver a la página inicial",
    title: "Términos y Condiciones Generales",
    s1: "1. Ámbito de aplicación",
    p1: "Estos términos y condiciones generales se aplican a las solicitudes de reserva, solicitudes de catering y otras consultas realizadas a través del sitio web del restaurante CholoSoy.",
    s2: "2. Reservas",
    p2: "Las reservas realizadas a través del sitio web constituyen inicialmente una solicitud. Una reserva vinculante solo se considera válida una vez confirmada por CholoSoy Restaurant.",
    s3: "3. Cancelaciones",
    p3: "Las reservas ya confirmadas deben cancelarse con la mayor antelación posible. Para grupos o reservas especiales pueden aplicarse condiciones adicionales.",
    s4: "4. Catering",
    p4: "Las solicitudes de catering no son vinculantes hasta que se haya elaborado una oferta individual y haya sido confirmada por ambas partes.",
    s5: "5. Precios",
    p5: "Todos los precios indicados se entienden en euros. Nos reservamos cambios y posibles errores.",
    s6: "6. Responsabilidad",
    p6: "CholoSoy Restaurant solo responde por daños causados por dolo o negligencia grave, en la medida en que la ley lo permita.",
    s7: "7. Disposiciones finales",
    p7: "Se aplica la legislación de la República Federal de Alemania.",
  },
  en: {
    metaTitle: "Terms and Conditions | CholoSoy",
    metaDescription: "General terms and conditions of the CholoSoy restaurant in Berlin.",
    back: "← Back to start page",
    title: "General Terms and Conditions",
    s1: "1. Scope",
    p1: "These general terms and conditions apply to reservation requests, catering requests and other inquiries submitted through the CholoSoy Restaurant website.",
    s2: "2. Reservations",
    p2: "Reservations made through the website initially constitute a request only. A binding reservation is only established after confirmation by CholoSoy Restaurant.",
    s3: "3. Cancellations",
    p3: "Confirmed reservations should be cancelled as early as possible. Separate conditions may apply for group or special reservations.",
    s4: "4. Catering",
    p4: "Catering requests are non-binding until an individual offer has been created and confirmed by both parties.",
    s5: "5. Prices",
    p5: "All stated prices are in euros. Changes and errors excepted.",
    s6: "6. Liability",
    p6: "CholoSoy Restaurant is only liable for damages caused by intent or gross negligence, insofar as permitted by law.",
    s7: "7. Final provisions",
    p7: "The law of the Federal Republic of Germany shall apply.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = AGB_DICT[locale] ?? AGB_DICT.de;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function AgbPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = AGB_DICT[locale] ?? AGB_DICT.de;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          {t.back}
        </Link>

        <h1 className={styles.title}>{t.title}</h1>

        <h2 className={styles.subtitle}>{t.s1}</h2>
        <p className={styles.text}>{t.p1}</p>

        <h2 className={styles.subtitle}>{t.s2}</h2>
        <p className={styles.text}>{t.p2}</p>

        <h2 className={styles.subtitle}>{t.s3}</h2>
        <p className={styles.text}>{t.p3}</p>

        <h2 className={styles.subtitle}>{t.s4}</h2>
        <p className={styles.text}>{t.p4}</p>

        <h2 className={styles.subtitle}>{t.s5}</h2>
        <p className={styles.text}>{t.p5}</p>

        <h2 className={styles.subtitle}>{t.s6}</h2>
        <p className={styles.text}>{t.p6}</p>

        <h2 className={styles.subtitle}>{t.s7}</h2>
        <p className={styles.text}>{t.p7}</p>
      </div>
    </main>
  );
}