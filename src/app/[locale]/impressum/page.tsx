import styles from "@/components/legal/LegalPage.module.scss";

export default function ImpressumPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Impressum</h1>

        <h2 className={styles.subtitle}>Angaben gemäß § 5 TMG</h2>

        <p className={styles.text}>
          <strong>CholoSoy Restaurant</strong>
          <br />
          Victor Ulices Flores Silva
          <br />
          Berlin, Deutschland
        </p>

        <h2 className={styles.subtitle}>Kontakt</h2>

        <p className={styles.text}>
          E-Mail: info@cholosoy.de
          <br />
          Telefon: +49 (0) XXX XXXXXXX
        </p>

        <h2 className={styles.subtitle}>Umsatzsteuer-ID</h2>

        <p className={styles.text}>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          wird nachgetragen
        </p>

        <h2 className={styles.subtitle}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>

        <p className={styles.text}>
          Victor Ulices Flores Silva
          <br />
          Berlin, Deutschland
        </p>

        <h2 className={styles.subtitle}>EU-Streitschlichtung</h2>

        <p className={styles.text}>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.
          Verbraucher können diese Plattform für die Beilegung ihrer Streitigkeiten nutzen.
        </p>

        <p className={styles.text}>
          Die Plattform finden Sie unter:
          <br />
          https://ec.europa.eu/consumers/odr/
        </p>
      </div>
    </main>
  );
}