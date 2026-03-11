import styles from "@/components/legal/LegalPage.module.scss";

export default function DatenschutzPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Datenschutzerklärung</h1>

        <h2 className={styles.subtitle}>1. Verantwortlicher</h2>

        <p className={styles.text}>
          CholoSoy Restaurant
          <br />
          Victor Ulices Flores Silva
          <br />
          Berlin, Deutschland
          <br />
          E-Mail: info@cholosoy.de
        </p>

        <h2 className={styles.subtitle}>2. Allgemeine Hinweise zur Datenverarbeitung</h2>

        <p className={styles.text}>
          Der Schutz Ihrer persönlichen Daten ist uns wichtig. Personenbezogene Daten werden
          vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
          Datenschutzerklärung behandelt.
        </p>

        <h2 className={styles.subtitle}>3. Zugriffsdaten</h2>

        <p className={styles.text}>
          Beim Besuch dieser Website werden automatisch technische Informationen erfasst, die Ihr
          Browser an unseren Server übermittelt. Dazu gehören insbesondere IP-Adresse, Datum und
          Uhrzeit des Zugriffs, Browsertyp, Betriebssystem und Referrer-URL.
        </p>

        <h2 className={styles.subtitle}>4. Reservierungen</h2>

        <p className={styles.text}>
          Wenn Sie eine Reservierung über unsere Website tätigen, verarbeiten wir die von Ihnen
          angegebenen Daten, insbesondere Name, E-Mail-Adresse, Telefonnummer, Datum, Uhrzeit,
          Anzahl der Gäste und optionale Hinweise.
        </p>

        <p className={styles.text}>
          Die Verarbeitung erfolgt ausschließlich zum Zweck der Bearbeitung und Verwaltung Ihrer
          Reservierungsanfrage.
        </p>

        <h2 className={styles.subtitle}>5. Catering-Anfragen</h2>

        <p className={styles.text}>
          Wenn Sie eine Catering-Anfrage senden, verarbeiten wir die von Ihnen angegebenen Daten,
          insbesondere Kontaktinformationen, Veranstaltungsdaten, Ort, Personenzahl und weitere
          logistische Angaben.
        </p>

        <h2 className={styles.subtitle}>6. Rechtsgrundlagen</h2>

        <ul className={styles.list}>
          <li>Art. 6 Abs. 1 lit. b DSGVO für Reservierungen und Anfragen</li>
          <li>Art. 6 Abs. 1 lit. c DSGVO für gesetzliche Pflichten</li>
          <li>Art. 6 Abs. 1 lit. f DSGVO für technische Sicherheit und Stabilität der Website</li>
        </ul>

        <h2 className={styles.subtitle}>7. Speicherdauer</h2>

        <p className={styles.text}>
          Personenbezogene Daten werden nur so lange gespeichert, wie dies zur Bearbeitung Ihrer
          Anfrage oder zur Erfüllung gesetzlicher Pflichten erforderlich ist.
        </p>

        <h2 className={styles.subtitle}>8. Ihre Rechte</h2>

        <ul className={styles.list}>
          <li>Recht auf Auskunft</li>
          <li>Recht auf Berichtigung</li>
          <li>Recht auf Löschung</li>
          <li>Recht auf Einschränkung der Verarbeitung</li>
          <li>Recht auf Widerspruch</li>
          <li>Recht auf Datenübertragbarkeit</li>
        </ul>

        <h2 className={styles.subtitle}>9. Cookies</h2>

        <p className={styles.text}>
          Unsere Website verwendet technisch notwendige Cookies sowie – nach Ihrer Einwilligung –
          optionale Cookies, etwa für Komfortfunktionen. Details hierzu finden Sie im Cookie-Banner.
        </p>

        <h2 className={styles.subtitle}>10. Kontakt zum Datenschutz</h2>

        <p className={styles.text}>
          Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten können Sie uns unter
          info@cholosoy.de kontaktieren.
        </p>
      </div>
    </main>
  );
}