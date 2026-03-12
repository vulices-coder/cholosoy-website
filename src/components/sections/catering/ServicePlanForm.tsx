"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./ServicePlanForm.module.scss";

type Locale = "de" | "es" | "en";

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

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "de";
  const m = document.cookie.match(/(?:^|;\s*)cholosoy_locale=([^;]+)/);
  const raw = m ? decodeURIComponent(m[1]).toLowerCase() : "de";
  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

const SERVICE_DICT: Record<
  Locale,
  {
    title: string;
    eventType: string;
    wedding: string;
    birthday: string;
    company: string;
    other: string;
    eventDate: string;
    eventTime: string;
    guests: string;
    location: string;
    cateringPref: string;
    serviceType: string;
    buffet: string;
    menuService: string;
    cocktail: string;
    kitchenStyle: string;
    traditional: string;
    modern: string;
    drinks: string;
    softdrinks: string;
    openBar: string;
    wineBeer: string;
    allergies: string;
    next: string;
  }
> = {
  de: {
    title: "Veranstaltungsdetails (Service Plan)",
    eventType: "Art der Veranstaltung",
    wedding: "Hochzeit",
    birthday: "Geburtstag",
    company: "Firmen Event",
    other: "Sonstiges",
    eventDate: "Daten der Veranstaltung*",
    eventTime: "Uhrzeit*",
    guests: "Anzahl der Gäste*",
    location: "Adresse der Veranstaltung*",
    cateringPref: "Catering Präferenz",
    serviceType: "Service Art",
    buffet: "Buffet",
    menuService: "Menü Service",
    cocktail: "Cocktail Empfang",
    kitchenStyle: "Küchenstil",
    traditional: "Menü Peruanischer Traditionell",
    modern: "Menü Peruanischer Modern",
    drinks: "Getränke",
    softdrinks: "Softdrinks",
    openBar: "Open Bar",
    wineBeer: "Wein/Bier",
    allergies: "Allergie oder Einschränkungen",
    next: "Weiter →",
  },
  es: {
    title: "Detalles del evento (plan de servicio)",
    eventType: "Tipo de evento",
    wedding: "Boda",
    birthday: "Cumpleaños",
    company: "Evento empresarial",
    other: "Otro",
    eventDate: "Fecha del evento*",
    eventTime: "Hora*",
    guests: "Número de invitados*",
    location: "Dirección del evento*",
    cateringPref: "Preferencias de catering",
    serviceType: "Tipo de servicio",
    buffet: "Buffet",
    menuService: "Servicio de menú",
    cocktail: "Recepción con cóctel",
    kitchenStyle: "Estilo de cocina",
    traditional: "Menú peruano tradicional",
    modern: "Menú peruano moderno",
    drinks: "Bebidas",
    softdrinks: "Refrescos",
    openBar: "Barra libre",
    wineBeer: "Vino/Cerveza",
    allergies: "Alergias o restricciones",
    next: "Continuar →",
  },
  en: {
    title: "Event details (service plan)",
    eventType: "Type of event",
    wedding: "Wedding",
    birthday: "Birthday",
    company: "Corporate event",
    other: "Other",
    eventDate: "Event date*",
    eventTime: "Time*",
    guests: "Number of guests*",
    location: "Event address*",
    cateringPref: "Catering preferences",
    serviceType: "Service type",
    buffet: "Buffet",
    menuService: "Menu service",
    cocktail: "Cocktail reception",
    kitchenStyle: "Cuisine style",
    traditional: "Traditional Peruvian menu",
    modern: "Modern Peruvian menu",
    drinks: "Drinks",
    softdrinks: "Soft drinks",
    openBar: "Open bar",
    wineBeer: "Wine/Beer",
    allergies: "Allergies or restrictions",
    next: "Next →",
  },
};

export default function ServicePlanForm() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("de");
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
    setLocale(readLocaleCookie());

    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const t = SERVICE_DICT[locale];

  function onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
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
        <h1 className={styles.title}>{t.title}</h1>

        <div className={styles.row}>
          <span className={styles.label}>{t.eventType}</span>
          <label>
            <input
              type="radio"
              name="eventType"
              value={t.wedding}
              checked={form.eventType === t.wedding}
              onChange={onRadioChange}
            />
            {t.wedding}
          </label>
          <label>
            <input
              type="radio"
              name="eventType"
              value={t.birthday}
              checked={form.eventType === t.birthday}
              onChange={onRadioChange}
            />
            {t.birthday}
          </label>
          <label>
            <input
              type="radio"
              name="eventType"
              value={t.company}
              checked={form.eventType === t.company}
              onChange={onRadioChange}
            />
            {t.company}
          </label>
          <label className={styles.inlineOther}>
            <input
              type="radio"
              name="eventType"
              value={t.other}
              checked={form.eventType === t.other}
              onChange={onRadioChange}
            />
            {t.other}
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
            {t.eventDate}
            <input
              name="eventDate"
              type="date"
              required
              value={form.eventDate}
              onChange={onTextChange}
            />
          </label>
          <label>
            {t.eventTime}
            <input
              name="eventTime"
              type="time"
              required
              value={form.eventTime}
              onChange={onTextChange}
            />
          </label>
          <label>
            {t.guests}
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
          {t.location}
          <input
            name="location"
            type="text"
            required
            className={styles.lineInputFull}
            value={form.location}
            onChange={onTextChange}
          />
        </label>

        <h2 className={styles.subtitle}>{t.cateringPref}</h2>

        <div className={styles.row}>
          <span className={styles.label}>{t.serviceType}</span>
          <label>
            <input
              type="checkbox"
              value={t.buffet}
              checked={form.serviceType.includes(t.buffet)}
              onChange={(e) => onCheckboxArrayChange(e, "serviceType")}
            />
            {t.buffet}
          </label>
          <label>
            <input
              type="checkbox"
              value={t.menuService}
              checked={form.serviceType.includes(t.menuService)}
              onChange={(e) => onCheckboxArrayChange(e, "serviceType")}
            />
            {t.menuService}
          </label>
          <label>
            <input
              type="checkbox"
              value={t.cocktail}
              checked={form.serviceType.includes(t.cocktail)}
              onChange={(e) => onCheckboxArrayChange(e, "serviceType")}
            />
            {t.cocktail}
          </label>
          <label>
            <input
              type="checkbox"
              value={t.other}
              checked={form.serviceType.includes(t.other)}
              onChange={(e) => onCheckboxArrayChange(e, "serviceType")}
            />
            {t.other}
          </label>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>{t.kitchenStyle}</span>
          <label>
            <input
              type="radio"
              name="kitchenStyle"
              value={t.traditional}
              checked={form.kitchenStyle === t.traditional}
              onChange={onRadioChange}
            />
            {t.traditional}
          </label>
          <label>
            <input
              type="radio"
              name="kitchenStyle"
              value={t.modern}
              checked={form.kitchenStyle === t.modern}
              onChange={onRadioChange}
            />
            {t.modern}
          </label>
          <label className={styles.inlineOther}>
            <input
              type="radio"
              name="kitchenStyle"
              value={t.other}
              checked={form.kitchenStyle === t.other}
              onChange={onRadioChange}
            />
            {t.other}
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
          <span className={styles.label}>{t.drinks}</span>
          <label>
            <input
              type="checkbox"
              value={t.softdrinks}
              checked={form.drinks.includes(t.softdrinks)}
              onChange={(e) => onCheckboxArrayChange(e, "drinks")}
            />
            {t.softdrinks}
          </label>
          <label>
            <input
              type="checkbox"
              value={t.openBar}
              checked={form.drinks.includes(t.openBar)}
              onChange={(e) => onCheckboxArrayChange(e, "drinks")}
            />
            {t.openBar}
          </label>
          <label>
            <input
              type="checkbox"
              value={t.wineBeer}
              checked={form.drinks.includes(t.wineBeer)}
              onChange={(e) => onCheckboxArrayChange(e, "drinks")}
            />
            {t.wineBeer}
          </label>
        </div>

        <label className={styles.full}>
          {t.allergies}
          <input
            name="allergies"
            type="text"
            className={styles.lineInputFull}
            value={form.allergies}
            onChange={onTextChange}
          />
        </label>

        <button className={styles.next} type="submit">
          {t.next}
        </button>
      </form>
    </main>
  );
}