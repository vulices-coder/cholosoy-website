"use client";

import { useMemo, useState } from "react";
import { createReservation } from "@/actions/reservations";
import styles from "./KontaktForm.module.scss";

type Anrede = "frau" | "herr" | "divers";
type Locale = "de" | "es" | "en";

const STORAGE_KEY = "cholosoy_reservation_selection";

export default function KontaktForm({ locale }: { locale: Locale }) {
  const [anrede, setAnrede] = useState<Anrede>("frau");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [agbOk, setAgbOk] = useState(false);
  const [dsOk, setDsOk] = useState(false);
  const [kontaktOk, setKontaktOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmailValid = (value: string) => /\S+@\S+\.\S+/.test(value);

  const canSubmit = useMemo(() => {
    const fieldsOk =
      vorname.trim().length > 0 &&
      nachname.trim().length > 0 &&
      telefon.trim().length > 0 &&
      isEmailValid(email);

    const checksOk = agbOk && dsOk && kontaktOk;

    return fieldsOk && checksOk && !loading;
  }, [vorname, nachname, telefon, email, agbOk, dsOk, kontaktOk, loading]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) {
      alert("Reservierungsdaten fehlen. Bitte wählen Sie zuerst Datum, Uhrzeit und Gäste.");
      return;
    }

    let selection: { guests: number; date: string; time: string };
    try {
      selection = JSON.parse(saved);
    } catch {
      alert("Reservierungsdaten sind ungültig.");
      return;
    }

    try {
      setLoading(true);

      await createReservation({
        name: `${vorname.trim()} ${nachname.trim()}`,
        email,
        phone: telefon,
        guests: Number(selection.guests),
        date: selection.date,
        time: selection.time,
        notes: [
          `Anrede: ${anrede}`,
          comment?.trim() ? `Kommentar: ${comment.trim()}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        locale,
      });

      alert("Danke! Wir haben Ihre Reservierung erhalten.");

      setVorname("");
      setNachname("");
      setTelefon("");
      setEmail("");
      setComment("");
      setAgbOk(false);
      setDsOk(false);
      setKontaktOk(false);
    } catch (error) {
      console.error(error);
      alert("Die Reservierung konnte nicht gespeichert werden.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.title}>Kontakt</h2>

      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>Anrede</legend>
        <label className={styles.radio}>
          <input
            type="radio"
            name="anrede"
            checked={anrede === "frau"}
            onChange={() => setAnrede("frau")}
          />
          Frau
        </label>
        <label className={styles.radio}>
          <input
            type="radio"
            name="anrede"
            checked={anrede === "herr"}
            onChange={() => setAnrede("herr")}
          />
          Herr
        </label>
        <label className={styles.radio}>
          <input
            type="radio"
            name="anrede"
            checked={anrede === "divers"}
            onChange={() => setAnrede("divers")}
          />
          Divers
        </label>
      </fieldset>

      <div className={styles.grid2}>
        <div className={styles.control}>
          <label className={styles.label}>Vorname</label>
          <input
            className={styles.input}
            value={vorname}
            onChange={(e) => setVorname(e.target.value)}
          />
        </div>

        <div className={styles.control}>
          <label className={styles.label}>Nachname</label>
          <input
            className={styles.input}
            value={nachname}
            onChange={(e) => setNachname(e.target.value)}
          />
        </div>

        <div className={styles.control}>
          <label className={styles.label}>Telefon</label>
          <input
            className={styles.input}
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
          />
        </div>

        <div className={styles.control}>
          <label className={styles.label}>E-Mail</label>
          <input
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.control}>
        <label className={styles.label}>
          Kommentare, Allergien oder Präferenzen (optional)
        </label>
        <textarea
          className={styles.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.checks}>
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={agbOk}
              onChange={(e) => setAgbOk(e.target.checked)}
            />
            Ich akzeptiere die Allgemeinen Geschäftsbedingungen
          </label>
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={dsOk}
              onChange={(e) => setDsOk(e.target.checked)}
            />
            Ich bestätige die Datenschutzbestimmungen
          </label>
          <label className={styles.check}>
            <input
              type="checkbox"
              checked={kontaktOk}
              onChange={(e) => setKontaktOk(e.target.checked)}
            />
            Ich stimme der Kontaktaufnahme zu
          </label>
        </div>

        <button className={styles.submit} type="submit" disabled={!canSubmit}>
          {loading ? "Wird gespeichert..." : "Reservieren"}
        </button>
      </div>
    </form>
  );
}