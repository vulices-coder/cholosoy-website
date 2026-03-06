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

export default function LogisticsForm() {
  const router = useRouter();
  const [agb, setAgb] = useState(false);
  const [loading, setLoading] = useState(false);
  const canSend = useMemo(() => agb && !loading, [agb, loading]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSend) return;

    const personalRaw = sessionStorage.getItem(PERSONAL_KEY);
    const eventRaw = sessionStorage.getItem(EVENT_KEY);

    if (!personalRaw || !eventRaw) {
      alert("Es fehlen Formulardaten. Bitte beginnen Sie erneut.");
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
      `Adresse privat: ${personal.address || "-"}`,
      `Eventtyp: ${eventData.eventType}${eventData.eventType === "Sonstiges" ? ` (${eventData.eventTypeOther || "-"})` : ""}`,
      `Uhrzeit: ${eventData.eventTime || "-"}`,
      `Service Art: ${eventData.serviceType?.join(", ") || "-"}`,
      `Küchenstil: ${eventData.kitchenStyle}${eventData.kitchenStyle === "Sonstiges" ? ` (${eventData.kitchenStyleOther || "-"})` : ""}`,
      `Getränke: ${eventData.drinks?.join(", ") || "-"}`,
      `Allergien: ${eventData.allergies || "-"}`,
      `Möbel benötigt: ${furniture.join(", ") || "-"}`,
      `Zusätzliches Personal: ${staff.join(", ") || "-"}`,
      `Vorhandene Küche: ${kitchen.join(", ") || "-"}`,
      `Zugang für Lieferung: ${delivery.join(", ") || "-"}`,
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
        locale: readLocaleCookie(),
      });

      sessionStorage.removeItem(PERSONAL_KEY);
      sessionStorage.removeItem(EVENT_KEY);

      router.push("/catering/danke");
    } catch (error) {
      console.error(error);
      alert("Die Catering-Anfrage konnte nicht gespeichert werden.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className={styles.title}>Logistische Anforderungen</h1>

        <section className={styles.block}>
          <h2>Möbel benötigt</h2>
          <label><input type="checkbox" name="furniture" value="Tische" /> Tische</label>
          <label><input type="checkbox" name="furniture" value="Stühle" /> Stühle</label>
          <label><input type="checkbox" name="furniture" value="Tischdecken" /> Tischdecken</label>
          <label><input type="checkbox" name="furniture" value="Sonstiges" /> Sonstiges</label>
        </section>

        <section className={styles.block}>
          <h2>Zusätzliches Personal</h2>
          <label><input type="checkbox" name="staff" value="Kellner" /> Kellner</label>
          <label><input type="checkbox" name="staff" value="Bartender" /> Bartender</label>
          <label><input type="checkbox" name="staff" value="Köche vor Ort" /> Köche vor Ort</label>
          <label><input type="checkbox" name="staff" value="Reinigungskraft" /> Reinigungskraft</label>
        </section>

        <section className={styles.block}>
          <h2>Vorhandene Küche</h2>
          <label><input type="checkbox" name="kitchen" value="Ja" /> Ja</label>
          <label><input type="checkbox" name="kitchen" value="Nein" /> Nein</label>
          <label><input type="checkbox" name="kitchen" value="Sonstiges" /> Sonstiges</label>
        </section>

        <section className={styles.block}>
          <h2>Zugang für Lieferung</h2>
          <label><input type="checkbox" name="delivery" value="Parkmöglichkeiten" /> Parkmöglichkeiten</label>
          <label><input type="checkbox" name="delivery" value="Treppen" /> Treppen</label>
          <label><input type="checkbox" name="delivery" value="Lift" /> Lift</label>
          <label><input type="checkbox" name="delivery" value="Sonstiges" /> Sonstiges</label>
        </section>

        <label className={styles.agb}>
          <input type="checkbox" checked={agb} onChange={(e) => setAgb(e.target.checked)} />
          AGB&apos;s akzeptieren
        </label>

        <button className={styles.send} type="submit" disabled={!canSend}>
          {loading ? "Wird gesendet..." : "Senden"}
        </button>
      </form>
    </main>
  );
}