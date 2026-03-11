"use client";

import { useMemo, useState } from "react";
import styles from "./InfoForm.module.scss";

export default function InfoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [privacyOk, setPrivacyOk] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = (value: string) => /\S+@\S+\.\S+/.test(value);

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 1 &&
      isEmailValid(email) &&
      reason.trim().length > 1 &&
      message.trim().length > 5 &&
      privacyOk
    );
  }, [name, email, reason, message, privacyOk]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitted(true);
    setName("");
    setEmail("");
    setReason("");
    setMessage("");
    setPrivacyOk(false);
  }

  if (submitted) {
    return (
      <section className={styles.successBox}>
        <h2 className={styles.successTitle}>Danke für Ihre Nachricht</h2>
        <p className={styles.successText}>
          Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns so schnell wie möglich bei Ihnen.
        </p>
      </section>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.grid}>
        <div className={styles.control}>
          <label className={styles.label} htmlFor="info-name">
            Name
          </label>
          <input
            id="info-name"
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.control}>
          <label className={styles.label} htmlFor="info-email">
            E-Mail
          </label>
          <input
            id="info-email"
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.control}>
        <label className={styles.label} htmlFor="info-reason">
          Grund der Anfrage
        </label>
        <input
          id="info-reason"
          className={styles.input}
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="z. B. Öffnungszeiten, Zusammenarbeit, allgemeine Frage"
        />
      </div>

      <div className={styles.control}>
        <label className={styles.label} htmlFor="info-message">
          Nachricht
        </label>
        <textarea
          id="info-message"
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <label className={styles.check}>
        <input
          type="checkbox"
          checked={privacyOk}
          onChange={(e) => setPrivacyOk(e.target.checked)}
        />
        Ich akzeptiere die Verarbeitung meiner Daten gemäß Datenschutzerklärung.
      </label>

      <button className={styles.submit} type="submit" disabled={!canSubmit}>
        Senden
      </button>
    </form>
  );
}