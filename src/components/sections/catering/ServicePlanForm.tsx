"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./ServicePlanForm.module.scss";

type CateringEventData = {
  eventType: string;
  eventTypeOther: string;
  eventDate: string;
  eventTime: string;
  people: string;
  location: string;
  serviceType: string[];
  kitchenStyle: string;
  kitchenStyleOther: string;
  drinks: string[];
  allergies: string;
};

const STORAGE_KEY = "cholosoy_catering_event";

export default function ServicePlanForm() {
  const router = useRouter();
  const [form, setForm] = useState<CateringEventData>({
    eventType: "Hochzeit",
    eventTypeOther: "",
    eventDate: "",
    eventTime: "",
    people: "",
    location: "",
    serviceType: [],
    kitchenStyle: "Menü Peruanischer Traditionell",
    kitchenStyleOther: "",
    drinks: [],
    allergies: "",
  });

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch {}
    }
  }, []);

  function onTextChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onCheckboxArrayChange(
    e: React.ChangeEvent<HTMLInputElement>,
    key: "serviceType" | "drinks"
  ) {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [key]: checked
        ? [...prev[key], value]
        : prev[key].filter((item) => item !== value),
    }));
  }

  function onNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    router.push("/catering/logistik");
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={onNext}>
        <h1 className={styles.title}>Veranstaltungsdetails (Service Plan)</h1>

        <div className={styles.row}>
          <span className={styles.label}>Art der Veranstaltung</span>
          <label>
            <input
              type="radio"
              name="eventType"
              value="Hochzeit"
              checked={form.eventType === "Hochzeit"}
              onChange={onRadioChange}
            />
            Hochzeit
          </label>
          <label>
            <input
              type="radio"
              name="eventType"
              value="Geburtstag"
              checked={form.eventType === "Geburtstag"}
              onChange={onRadioChange}
            />
            Geburtstag
          </label>
          <label>
            <input
              type="radio"
              name="eventType"
              value="Firmen Event"
              checked={form.eventType === "Firmen Event"}
              onChange={onRadioChange}
            />
            Firmen Event
          </label>
          <label className={styles.inlineOther}>
            <input
              type="radio"
              name="eventType"
              value="Sonstiges"
              checked={form.eventType === "Sonstiges"}
              onChange={onRadioChange}
            />
            Sonstiges
            <input
              type="text"
              name="eventTypeOther"
              value={form.eventTypeOther}
              onChange={onTextChange}
              className={styles.lineInput}
            />
          </label>
        </div>

        <div className={styles.row2}>
          <label>
            Daten der Veranstaltung*
            <input
              name="eventDate"
              type="date"
              required
              value={form.eventDate}
              onChange={onTextChange}
            />
          </label>
          <label>
            Uhrzeit*
            <input
              name="eventTime"
              type="time"
              required
              value={form.eventTime}
              onChange={onTextChange}
            />
          </label>
          <label>
            Anzahl der Gäste*
            <input
              name="people"
              type="number"
              min={1}
              required
              value={form.people}
              onChange={onTextChange}
            />
          </label>
        </div>

        <label className={styles.full}>
          Adresse der Veranstaltung*
          <input
            name="location"
            type="text"
            required
            className={styles.lineInputFull}
            value={form.location}
            onChange={onTextChange}
          />
        </label>

        <h2 className={styles.subtitle}>Catering Präferenz</h2>

        <div className={styles.row}>
          <span className={styles.label}>Service Art</span>
          <label>
            <input
              type="checkbox"
              value="Buffet"
              checked={form.serviceType.includes("Buffet")}
              onChange={(e) => onCheckboxArrayChange(e, "serviceType")}
            />
            Buffet
          </label>
          <label>
            <input
              type="checkbox"
              value="Menü Service"
              checked={form.serviceType.includes("Menü Service")}
              onChange={(e) => onCheckboxArrayChange(e, "serviceType")}
            />
            Menü Service
          </label>
          <label>
            <input
              type="checkbox"
              value="Cocktail Empfang"
              checked={form.serviceType.includes("Cocktail Empfang")}
              onChange={(e) => onCheckboxArrayChange(e, "serviceType")}
            />
            Cocktail Empfang
          </label>
          <label>
            <input
              type="checkbox"
              value="Sonstiges"
              checked={form.serviceType.includes("Sonstiges")}
              onChange={(e) => onCheckboxArrayChange(e, "serviceType")}
            />
            Sonstiges
          </label>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Küchenstil</span>
          <label>
            <input
              type="radio"
              name="kitchenStyle"
              value="Menü Peruanischer Traditionell"
              checked={form.kitchenStyle === "Menü Peruanischer Traditionell"}
              onChange={onRadioChange}
            />
            Menü Peruanischer Traditionell
          </label>
          <label>
            <input
              type="radio"
              name="kitchenStyle"
              value="Menü Peruanischer Modern"
              checked={form.kitchenStyle === "Menü Peruanischer Modern"}
              onChange={onRadioChange}
            />
            Menü Peruanischer Modern
          </label>
          <label className={styles.inlineOther}>
            <input
              type="radio"
              name="kitchenStyle"
              value="Sonstiges"
              checked={form.kitchenStyle === "Sonstiges"}
              onChange={onRadioChange}
            />
            Sonstiges
            <input
              type="text"
              name="kitchenStyleOther"
              className={styles.lineInput}
              value={form.kitchenStyleOther}
              onChange={onTextChange}
            />
          </label>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Getränke</span>
          <label>
            <input
              type="checkbox"
              value="Softdrinks"
              checked={form.drinks.includes("Softdrinks")}
              onChange={(e) => onCheckboxArrayChange(e, "drinks")}
            />
            Softdrinks
          </label>
          <label>
            <input
              type="checkbox"
              value="Open Bar"
              checked={form.drinks.includes("Open Bar")}
              onChange={(e) => onCheckboxArrayChange(e, "drinks")}
            />
            Open Bar
          </label>
          <label>
            <input
              type="checkbox"
              value="Wein/Bier"
              checked={form.drinks.includes("Wein/Bier")}
              onChange={(e) => onCheckboxArrayChange(e, "drinks")}
            />
            Wein/Bier
          </label>
        </div>

        <label className={styles.full}>
          Allergie oder Einschränkungen
          <input
            name="allergies"
            type="text"
            className={styles.lineInputFull}
            value={form.allergies}
            onChange={onTextChange}
          />
        </label>

        <button className={styles.next} type="submit">
          Weiter →
        </button>
      </form>
    </main>
  );
}