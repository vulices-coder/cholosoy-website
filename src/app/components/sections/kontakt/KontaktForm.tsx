"use client";

import { useMemo, useState } from "react";
import styles from "./KontaktForm.module.scss";

type Anrede = "frau" | "herr" | "divers";

export default function KontaktForm() {
  const [anrede, setAnrede] = useState<Anrede>("frau");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  // ✅ Pflicht-Checks
  const [agbOk, setAgbOk] = useState(false);
  const [dsOk, setDsOk] = useState(false);
  const [kontaktOk, setKontaktOk] = useState(false);

  const isEmailValid = (value: string) => /\S+@\S+\.\S+/.test(value);

  const canSubmit = useMemo(() => {
    const fieldsOk =
      vorname.trim().length > 0 &&
      nachname.trim().length > 0 &&
      telefon.trim().length > 0 &&
      isEmailValid(email);

    const checksOk = agbOk && dsOk && kontaktOk;

    return fieldsOk && checksOk;
  }, [vorname, nachname, telefon, email, agbOk, dsOk, kontaktOk]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    // ✅ Por ahora: solo prueba (luego: Server Action / API)
    console.log("Reservierung anfragen:", {
      anrede,
      vorname,
      nachname,
      telefon,
      email,
      comment,
      agbOk,
      dsOk,
      kontaktOk,
    });

    alert("Danke! Wir haben Ihre Anfrage erhalten.");
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
          Reservieren
        </button>
      </div>
    </form>
  );
}