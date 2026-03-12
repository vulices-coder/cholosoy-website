"use client";

import { useMemo, useState } from "react";
import { createInfoRequest } from "@/actions/info";
import styles from "./InfoForm.module.scss";

type Locale = "de" | "es" | "en";

const INFO_FORM_DICT: Record<
  Locale,
  {
    name: string;
    email: string;
    reason: string;
    message: string;
    privacy: string;
    submit: string;
    loading: string;
    reasonPlaceholder: string;
    error: string;
    successTitle: string;
    successText: string;
  }
> = {
  de: {
    name: "Name",
    email: "E-Mail",
    reason: "Grund der Anfrage",
    message: "Nachricht",
    privacy: "Ich akzeptiere die Verarbeitung meiner Daten gemäß Datenschutzerklärung.",
    submit: "Senden",
    loading: "Wird gesendet...",
    reasonPlaceholder: "z. B. Öffnungszeiten, Zusammenarbeit, allgemeine Frage",
    error: "Die Nachricht konnte nicht gespeichert werden.",
    successTitle: "Danke für Ihre Nachricht",
    successText:
      "Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns so schnell wie möglich bei Ihnen.",
  },
  es: {
    name: "Nombre",
    email: "Correo electrónico",
    reason: "Motivo de la consulta",
    message: "Mensaje",
    privacy: "Acepto el tratamiento de mis datos de acuerdo con la política de privacidad.",
    submit: "Enviar",
    loading: "Enviando...",
    reasonPlaceholder: "p. ej. horarios, colaboración, consulta general",
    error: "No se pudo guardar el mensaje.",
    successTitle: "Gracias por su mensaje",
    successText:
      "Su consulta ha sido enviada correctamente. Nos pondremos en contacto con usted lo antes posible.",
  },
  en: {
    name: "Name",
    email: "Email",
    reason: "Reason for your inquiry",
    message: "Message",
    privacy: "I accept the processing of my data in accordance with the privacy policy.",
    submit: "Send",
    loading: "Sending...",
    reasonPlaceholder: "e.g. opening hours, collaboration, general inquiry",
    error: "The message could not be saved.",
    successTitle: "Thank you for your message",
    successText:
      "Your inquiry has been submitted successfully. We will get back to you as soon as possible.",
  },
};

export default function InfoForm({ locale = "de" as Locale }) {
  const t = INFO_FORM_DICT[locale];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [privacyOk, setPrivacyOk] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmailValid = (value: string) => /\S+@\S+\.\S+/.test(value);

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 1 &&
      isEmailValid(email) &&
      reason.trim().length > 1 &&
      message.trim().length > 5 &&
      privacyOk &&
      !loading
    );
  }, [name, email, reason, message, privacyOk, loading]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setLoading(true);

      await createInfoRequest({
        name,
        email,
        reason,
        message,
        locale,
      });

      setSubmitted(true);
      setName("");
      setEmail("");
      setReason("");
      setMessage("");
      setPrivacyOk(false);
    } catch (error) {
      console.error(error);
      alert(t.error);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className={styles.successBox}>
        <h2 className={styles.successTitle}>{t.successTitle}</h2>
        <p className={styles.successText}>{t.successText}</p>
      </section>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.grid}>
        <div className={styles.control}>
          <label className={styles.label} htmlFor="info-name">
            {t.name}
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
            {t.email}
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
          {t.reason}
        </label>
        <input
          id="info-reason"
          className={styles.input}
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={t.reasonPlaceholder}
        />
      </div>

      <div className={styles.control}>
        <label className={styles.label} htmlFor="info-message">
          {t.message}
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
        {t.privacy}
      </label>

      <button className={styles.submit} type="submit" disabled={!canSubmit}>
        {loading ? t.loading : t.submit}
      </button>
    </form>
  );
}