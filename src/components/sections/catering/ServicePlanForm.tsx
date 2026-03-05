"use client";

import { useRouter } from "next/navigation";
import styles from "./ServicePlanForm.module.scss";

export default function ServicePlanForm() {
  const router = useRouter();

  function onNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/catering/logistik");
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={onNext}>
        <h1 className={styles.title}>Veranstaltungsdetails (Service Plan)</h1>

        <div className={styles.row}>
          <span className={styles.label}>Art der Veranstaltung</span>
          <label><input type="radio" name="eventType" defaultChecked /> Hochzeit</label>
          <label><input type="radio" name="eventType" /> Geburtstag</label>
          <label><input type="radio" name="eventType" /> Firmen Event</label>
          <label className={styles.inlineOther}>
            <input type="radio" name="eventType" /> Sonstiges
            <input type="text" name="eventTypeOther" className={styles.lineInput} />
          </label>
        </div>

        <div className={styles.row2}>
          <label>
            Daten der Veranstaltung*
            <input type="date" required />
          </label>
          <label>
            Uhrzeit*
            <input type="time" required />
          </label>
          <label>
            Anzahl der Gäste*
            <input type="number" min={1} required />
          </label>
        </div>

        <label className={styles.full}>
          Adresse der Veranstaltung*
          <input type="text" required className={styles.lineInputFull} />
        </label>

        <h2 className={styles.subtitle}>Catering Präferenz</h2>

        <div className={styles.row}>
          <span className={styles.label}>Service Art</span>
          <label><input type="checkbox" /> Buffet</label>
          <label><input type="checkbox" /> Menü Service</label>
          <label><input type="checkbox" /> Cocktail Empfang</label>
          <label><input type="checkbox" /> Sonstiges</label>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Küchenstil</span>
          <label><input type="radio" name="kueche" defaultChecked /> Menü Peruanischer Traditionell</label>
          <label><input type="radio" name="kueche" /> Menü Peruanischer Modern</label>
          <label className={styles.inlineOther}>
            <input type="radio" name="kueche" /> Sonstiges
            <input type="text" className={styles.lineInput} />
          </label>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Getränke</span>
          <label><input type="checkbox" /> Softdrinks</label>
          <label><input type="checkbox" /> Open Bar</label>
          <label><input type="checkbox" /> Wein/Bier</label>
        </div>

        <label className={styles.full}>
          Allergie oder Einschränkungen
          <input type="text" className={styles.lineInputFull} />
        </label>

        <button className={styles.next} type="submit">
          Weiter →
        </button>
      </form>
    </main>
  );
}