"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LogisticsForm.module.scss";
import { createCateringRequest } from "@/actions/catering";

type Locale = "de" | "es" | "en";

const PERSONAL_KEY = "cholosoy_catering_personal";
const EVENT_KEY = "cholosoy_catering_event";

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "de";
  const m = document.cookie.match(/(?:^|;\s*)cholosoy_locale=([^;]+)/);
  const raw = m ? decodeURIComponent(m[1]).toLowerCase() : "de";
  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

const LOGISTICS_DICT: Record<
  Locale,
  {
    title: string;
    furniture: string;
    tables: string;
    chairs: string;
    tablecloths: string;
    other: string;
    staff: string;
    waiters: string;
    bartender: string;
    chefs: string;
    cleaning: string;
    kitchen: string;
    yes: string;
    no: string;
    delivery: string;
    parking: string;
    stairs: string;
    lift: string;
    agb: string;
    send: string;
    sending: string;
    missingData: string;
    genericError: string;
    privateAddress: string;
    eventType: string;
    time: string;
    serviceType: string;
    kitchenStyle: string;
    drinks: string;
    allergies: string;
    furnitureNeeded: string;
    staffNeeded: string;
    kitchenAvailable: string;
    deliveryAccess: string;
  }
> = {
  de: {
    title: "Logistische Anforderungen",
    furniture: "Möbel benötigt",
    tables: "Tische",
    chairs: "Stühle",
    tablecloths: "Tischdecken",
    other: "Sonstiges",
    staff: "Zusätzliches Personal",
    waiters: "Kellner",
    bartender: "Bartender",
    chefs: "Köche vor Ort",
    cleaning: "Reinigungskraft",
    kitchen: "Vorhandene Küche",
    yes: "Ja",
    no: "Nein",
    delivery: "Zugang für Lieferung",
    parking: "Parkmöglichkeiten",
    stairs: "Treppen",
    lift: "Lift",
    agb: "AGB's akzeptieren",
    send: "Senden",
    sending: "Wird gesendet...",
    missingData: "Es fehlen Formulardaten. Bitte beginnen Sie erneut.",
    genericError: "Die Catering-Anfrage konnte nicht gespeichert werden.",
    privateAddress: "Adresse privat",
    eventType: "Eventtyp",
    time: "Uhrzeit",
    serviceType: "Service Art",
    kitchenStyle: "Küchenstil",
    drinks: "Getränke",
    allergies: "Allergien",
    furnitureNeeded: "Möbel benötigt",
    staffNeeded: "Zusätzliches Personal",
    kitchenAvailable: "Vorhandene Küche",
    deliveryAccess: "Zugang für Lieferung",
  },
  es: {
    title: "Requisitos logísticos",
    furniture: "Mobiliario necesario",
    tables: "Mesas",
    chairs: "Sillas",
    tablecloths: "Manteles",
    other: "Otro",
    staff: "Personal adicional",
    waiters: "Camareros",
    bartender: "Bartender",
    chefs: "Cocineros en el lugar",
    cleaning: "Personal de limpieza",
    kitchen: "Cocina disponible",
    yes: "Sí",
    no: "No",
    delivery: "Acceso para entrega",
    parking: "Aparcamiento",
    stairs: "Escaleras",
    lift: "Ascensor",
    agb: "Aceptar términos y condiciones",
    send: "Enviar",
    sending: "Enviando...",
    missingData: "Faltan datos del formulario. Por favor, comience de nuevo.",
    genericError: "No se pudo guardar la solicitud de catering.",
    privateAddress: "Dirección privada",
    eventType: "Tipo de evento",
    time: "Hora",
    serviceType: "Tipo de servicio",
    kitchenStyle: "Estilo de cocina",
    drinks: "Bebidas",
    allergies: "Alergias",
    furnitureNeeded: "Mobiliario necesario",
    staffNeeded: "Personal adicional",
    kitchenAvailable: "Cocina disponible",
    deliveryAccess: "Acceso para entrega",
  },
  en: {
    title: "Logistical requirements",
    furniture: "Furniture needed",
    tables: "Tables",
    chairs: "Chairs",
    tablecloths: "Tablecloths",
    other: "Other",
    staff: "Additional staff",
    waiters: "Waiters",
    bartender: "Bartender",
    chefs: "On-site chefs",
    cleaning: "Cleaning staff",
    kitchen: "Available kitchen",
    yes: "Yes",
    no: "No",
    delivery: "Delivery access",
    parking: "Parking",
    stairs: "Stairs",
    lift: "Lift",
    agb: "Accept terms and conditions",
    send: "Send",
    sending: "Sending...",
    missingData: "Form data is missing. Please start again.",
    genericError: "The catering request could not be saved.",
    privateAddress: "Private address",
    eventType: "Event type",
    time: "Time",
    serviceType: "Service type",
    kitchenStyle: "Cuisine style",
    drinks: "Drinks",
    allergies: "Allergies",
    furnitureNeeded: "Furniture needed",
    staffNeeded: "Additional staff",
    kitchenAvailable: "Available kitchen",
    deliveryAccess: "Delivery access",
  },
};

export default function LogisticsForm() {
  const router = useRouter();
  const locale = readLocaleCookie();
  const t = LOGISTICS_DICT[locale];

  const [agb, setAgb] = useState(false);
  const [loading, setLoading] = useState(false);
  const canSend = useMemo(() => agb && !loading, [agb, loading]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSend) return;

    const personalRaw = sessionStorage.getItem(PERSONAL_KEY);
    const eventRaw = sessionStorage.getItem(EVENT_KEY);

    if (!personalRaw || !eventRaw) {
      alert(t.missingData);
      router.push("/catering");
      return;
    }

    const personal = JSON.parse(personalRaw);
    const eventData = JSON.parse(eventRaw);

    const furniture = Array.from(
      e.currentTarget.querySelectorAll<HTMLInputElement>('input[name="furniture"]:checked')
    ).map((el) => el.value);

    const staff = Array.from(
      e.currentTarget.querySelectorAll<HTMLInputElement>('input[name="staff"]:checked')
    ).map((el) => el.value);

    const kitchen = Array.from(
      e.currentTarget.querySelectorAll<HTMLInputElement>('input[name="kitchen"]:checked')
    ).map((el) => el.value);

    const delivery = Array.from(
      e.currentTarget.querySelectorAll<HTMLInputElement>('input[name="delivery"]:checked')
    ).map((el) => el.value);

    const message = [
      `${t.privateAddress}: ${personal.address || "-"}`,
      `${t.eventType}: ${eventData.eventType}${eventData.eventType === t.other ? ` (${eventData.eventTypeOther || "-"})` : ""}`,
      `${t.time}: ${eventData.eventTime || "-"}`,
      `${t.serviceType}: ${eventData.serviceType?.join(", ") || "-"}`,
      `${t.kitchenStyle}: ${eventData.kitchenStyle}${eventData.kitchenStyle === t.other ? ` (${eventData.kitchenStyleOther || "-"})` : ""}`,
      `${t.drinks}: ${eventData.drinks?.join(", ") || "-"}`,
      `${t.allergies}: ${eventData.allergies || "-"}`,
      `${t.furnitureNeeded}: ${furniture.join(", ") || "-"}`,
      `${t.staffNeeded}: ${staff.join(", ") || "-"}`,
      `${t.kitchenAvailable}: ${kitchen.join(", ") || "-"}`,
      `${t.deliveryAccess}: ${delivery.join(", ") || "-"}`,
    ].join("\n");

    try {
      setLoading(true);

      await createCateringRequest({
        name: personal.name,
        email: personal.email,
        phone: personal.phone,
        eventDate: eventData.eventDate,
        location: eventData.location,
        people: Number(eventData.people),
        budget: null,
        message,
        locale,
      });

      sessionStorage.removeItem(PERSONAL_KEY);
      sessionStorage.removeItem(EVENT_KEY);

      router.push("/catering/danke");
    } catch (error) {
      console.error(error);
      alert(t.genericError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className={styles.title}>{t.title}</h1>

        <section className={styles.block}>
          <h2>{t.furniture}</h2>
          <label><input type="checkbox" name="furniture" value={t.tables} /> {t.tables}</label>
          <label><input type="checkbox" name="furniture" value={t.chairs} /> {t.chairs}</label>
          <label><input type="checkbox" name="furniture" value={t.tablecloths} /> {t.tablecloths}</label>
          <label><input type="checkbox" name="furniture" value={t.other} /> {t.other}</label>
        </section>

        <section className={styles.block}>
          <h2>{t.staff}</h2>
          <label><input type="checkbox" name="staff" value={t.waiters} /> {t.waiters}</label>
          <label><input type="checkbox" name="staff" value={t.bartender} /> {t.bartender}</label>
          <label><input type="checkbox" name="staff" value={t.chefs} /> {t.chefs}</label>
          <label><input type="checkbox" name="staff" value={t.cleaning} /> {t.cleaning}</label>
        </section>

        <section className={styles.block}>
          <h2>{t.kitchen}</h2>
          <label><input type="checkbox" name="kitchen" value={t.yes} /> {t.yes}</label>
          <label><input type="checkbox" name="kitchen" value={t.no} /> {t.no}</label>
          <label><input type="checkbox" name="kitchen" value={t.other} /> {t.other}</label>
        </section>

        <section className={styles.block}>
          <h2>{t.delivery}</h2>
          <label><input type="checkbox" name="delivery" value={t.parking} /> {t.parking}</label>
          <label><input type="checkbox" name="delivery" value={t.stairs} /> {t.stairs}</label>
          <label><input type="checkbox" name="delivery" value={t.lift} /> {t.lift}</label>
          <label><input type="checkbox" name="delivery" value={t.other} /> {t.other}</label>
        </section>

        <label className={styles.agb}>
          <input type="checkbox" checked={agb} onChange={(e) => setAgb(e.target.checked)} />
          {t.agb}
        </label>

        <button className={styles.send} type="submit" disabled={!canSend}>
          {loading ? t.sending : t.send}
        </button>
      </form>
    </main>
  );
}