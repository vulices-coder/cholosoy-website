import styles from "@/components/legal/LegalPage.module.scss";

export default function AgbPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Allgemeine Geschäftsbedingungen (AGB)</h1>

        <h2 className={styles.subtitle}>1. Geltungsbereich</h2>

        <p className={styles.text}>
          Diese Allgemeinen Geschäftsbedingungen gelten für Reservierungsanfragen, Catering-Anfragen
          und sonstige Anfragen, die über die Website von CholoSoy Restaurant gestellt werden.
        </p>

        <h2 className={styles.subtitle}>2. Reservierungen</h2>

        <p className={styles.text}>
          Reservierungen über die Website stellen zunächst eine Anfrage dar. Eine verbindliche
          Reservierung kann erst nach Bestätigung durch CholoSoy Restaurant zustande kommen.
        </p>

        <h2 className={styles.subtitle}>3. Stornierungen</h2>

        <p className={styles.text}>
          Bereits bestätigte Reservierungen sollten möglichst frühzeitig storniert werden. Für
          Gruppen- oder Sonderreservierungen können gesonderte Bedingungen gelten.
        </p>

        <h2 className={styles.subtitle}>4. Catering</h2>

        <p className={styles.text}>
          Catering-Anfragen sind unverbindlich, bis ein individuelles Angebot erstellt und von beiden
          Seiten bestätigt wurde.
        </p>

        <h2 className={styles.subtitle}>5. Preise</h2>

        <p className={styles.text}>
          Alle genannten Preise verstehen sich in Euro. Änderungen und Irrtümer bleiben vorbehalten.
        </p>

        <h2 className={styles.subtitle}>6. Haftung</h2>

        <p className={styles.text}>
          CholoSoy Restaurant haftet nur für Schäden, die auf vorsätzlicher oder grob fahrlässiger
          Pflichtverletzung beruhen, soweit gesetzlich zulässig.
        </p>

        <h2 className={styles.subtitle}>7. Schlussbestimmungen</h2>

        <p className={styles.text}>
          Es gilt das Recht der Bundesrepublik Deutschland.
        </p>
      </div>
    </main>
  );
}