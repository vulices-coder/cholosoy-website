"use client";

import { useEffect, useMemo, useState } from "react";
import { createReservation } from "@/actions/reservations";
import styles from "./KontaktForm.module.scss";

type Anrede = "frau" | "herr" | "divers";
type Locale = "de" | "es" | "en";

const STORAGE_KEY = "cholosoy_reservation_selection";
const CUSTOMER_STORAGE_KEY = "cholosoy_customer_profile";

type SavedCustomerProfile = {
  anrede: Anrede;
  vorname: string;
  nachname: string;
  telefon: string;
  email: string;
};

const KONTAKT_FORM_DICT: Record<
  Locale,
  {
    title: string;
    salutation: string;
    frau: string;
    herr: string;
    divers: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    comment: string;
    agb: string;
    privacy: string;
    contactConsent: string;
    saveData: string;
    submit: string;
    loading: string;
    successTitle: string;
    successText: string;
    missingReservation: string;
    invalidReservation: string;
    genericError: string;
    notePrefix: string;
    commentPrefix: string;
  }
> = {
  de: {
    title: "Kontakt",
    salutation: "Anrede",
    frau: "Frau",
    herr: "Herr",
    divers: "Divers",
    firstName: "Vorname",
    lastName: "Nachname",
    phone: "Telefon",
    email: "E-Mail",
    comment: "Kommentare, Allergien oder Präferenzen (optional)",
    agb: "Ich akzeptiere die Allgemeinen Geschäftsbedingungen",
    privacy: "Ich bestätige die Datenschutzbestimmungen",
    contactConsent: "Ich stimme der Kontaktaufnahme zu",
    saveData: "Meine Daten für zukünftige Reservierungen auf diesem Gerät speichern",
    submit: "Reservieren",
    loading: "Wird gespeichert...",
    successTitle: "Danke für Ihre Reservierung",
    successText: "Wir haben Ihre Anfrage erhalten und melden uns so schnell wie möglich bei Ihnen.",
    missingReservation:
      "Reservierungsdaten fehlen. Bitte wählen Sie zuerst Datum, Uhrzeit und Gäste.",
    invalidReservation: "Reservierungsdaten sind ungültig.",
    genericError: "Die Reservierung konnte nicht gespeichert werden.",
    notePrefix: "Anrede",
    commentPrefix: "Kommentar",
  },
  es: {
    title: "Contacto",
    salutation: "Tratamiento",
    frau: "Sra.",
    herr: "Sr.",
    divers: "Diverso",
    firstName: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono",
    email: "Correo electrónico",
    comment: "Comentarios, alergias o preferencias (opcional)",
    agb: "Acepto los términos y condiciones generales",
    privacy: "Confirmo la política de privacidad",
    contactConsent: "Acepto ser contactado",
    saveData: "Guardar mis datos para futuras reservas en este dispositivo",
    submit: "Reservar",
    loading: "Guardando...",
    successTitle: "Gracias por su reserva",
    successText:
      "Hemos recibido su solicitud y nos pondremos en contacto con usted lo antes posible.",
    missingReservation:
      "Faltan los datos de la reserva. Primero elija fecha, hora y número de personas.",
    invalidReservation: "Los datos de la reserva no son válidos.",
    genericError: "No se pudo guardar la reserva.",
    notePrefix: "Tratamiento",
    commentPrefix: "Comentario",
  },
  en: {
    title: "Contact",
    salutation: "Salutation",
    frau: "Ms.",
    herr: "Mr.",
    divers: "Diverse",
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone",
    email: "Email",
    comment: "Comments, allergies or preferences (optional)",
    agb: "I accept the general terms and conditions",
    privacy: "I confirm the privacy policy",
    contactConsent: "I agree to be contacted",
    saveData: "Save my details for future reservations on this device",
    submit: "Reserve",
    loading: "Saving...",
    successTitle: "Thank you for your reservation",
    successText: "We have received your request and will get back to you as soon as possible.",
    missingReservation:
      "Reservation data is missing. Please choose date, time and number of guests first.",
    invalidReservation: "Reservation data is invalid.",
    genericError: "The reservation could not be saved.",
    notePrefix: "Salutation",
    commentPrefix: "Comment",
  },
};

export default function KontaktForm({ locale }: { locale: Locale }) {
  const t = KONTAKT_FORM_DICT[locale];

  const [anrede, setAnrede] = useState<Anrede>("frau");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [agbOk, setAgbOk] = useState(false);
  const [dsOk, setDsOk] = useState(false);
  const [kontaktOk, setKontaktOk] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    if (!savedProfile) return;

    try {
      const profile = JSON.parse(savedProfile) as Partial<SavedCustomerProfile>;

      setAnrede(profile.anrede === "herr" || profile.anrede === "divers" ? profile.anrede : "frau");
      setVorname(profile.vorname ?? "");
      setNachname(profile.nachname ?? "");
      setTelefon(profile.telefon ?? "");
      setEmail(profile.email ?? "");
      setSaveData(true);
    } catch {
      localStorage.removeItem(CUSTOMER_STORAGE_KEY);
    }
  }, []);

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
      alert(t.missingReservation);
      return;
    }

    let selection: { guests: number; date: string; time: string };
    try {
      selection = JSON.parse(saved);
    } catch {
      alert(t.invalidReservation);
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
          `${t.notePrefix}: ${anrede}`,
          comment?.trim() ? `${t.commentPrefix}: ${comment.trim()}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        locale,
      });

      if (saveData) {
        const profile: SavedCustomerProfile = {
          anrede,
          vorname: vorname.trim(),
          nachname: nachname.trim(),
          telefon: telefon.trim(),
          email: email.trim(),
        };

        localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(profile));
      } else {
        localStorage.removeItem(CUSTOMER_STORAGE_KEY);
      }

      sessionStorage.removeItem(STORAGE_KEY);

      setComment("");
      setAgbOk(false);
      setDsOk(false);
      setKontaktOk(false);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert(t.genericError);
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
      <h2 className={styles.title}>{t.title}</h2>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{t.salutation}</legend>

        <label className={styles.radio}>
          <input
            type="radio"
            name="anrede"
            checked={anrede === "frau"}
            onChange={() => setAnrede("frau")}
          />
          {t.frau}
        </label>

        <label className={styles.radio}>
          <input
            type="radio"
            name="anrede"
            checked={anrede === "herr"}
            onChange={() => setAnrede("herr")}
          />
          {t.herr}
        </label>

        <label className={styles.radio}>
          <input
            type="radio"
            name="anrede"
            checked={anrede === "divers"}
            onChange={() => setAnrede("divers")}
          />
          {t.divers}
        </label>
      </fieldset>

      <div className={styles.grid2}>
        <div className={styles.control}>
          <label className={styles.label}>{t.firstName}</label>
          <input
            className={styles.input}
            value={vorname}
            onChange={(e) => setVorname(e.target.value)}
          />
        </div>

        <div className={styles.control}>
          <label className={styles.label}>{t.lastName}</label>
          <input
            className={styles.input}
            value={nachname}
            onChange={(e) => setNachname(e.target.value)}
          />
        </div>

        <div className={styles.control}>
          <label className={styles.label}>{t.phone}</label>
          <input
            className={styles.input}
            type="tel"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
          />
        </div>

        <div className={styles.control}>
          <label className={styles.label}>{t.email}</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.control}>
        <label className={styles.label}>{t.comment}</label>
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
            {t.agb}
          </label>

          <label className={styles.check}>
            <input
              type="checkbox"
              checked={dsOk}
              onChange={(e) => setDsOk(e.target.checked)}
            />
            {t.privacy}
          </label>

          <label className={styles.check}>
            <input
              type="checkbox"
              checked={kontaktOk}
              onChange={(e) => setKontaktOk(e.target.checked)}
            />
            {t.contactConsent}
          </label>

          <label className={styles.check}>
            <input
              type="checkbox"
              checked={saveData}
              onChange={(e) => setSaveData(e.target.checked)}
            />
            {t.saveData}
          </label>
        </div>

        <button className={styles.submit} type="submit" disabled={!canSubmit}>
          {loading ? t.loading : t.submit}
        </button>
      </div>
    </form>
  );
}