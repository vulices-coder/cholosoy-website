"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ReservationCard.module.scss";

type Locale = "de" | "es" | "en";

type Reservation = {
  guests: number;
  date: string;
  dateLabel: string;
  time: string;
  timeLabel: string;
  kitchenClose: string;
};

const STORAGE_KEY = "cholosoy_reservation_selection";
const OPEN_TIME = "12:00";
const CLOSE_TIME = "22:00";

const RESERVATION_CARD_DICT: Record<
  Locale,
  {
    title: string;
    change: string;
    save: string;
    confirmed: string;
    kitchenClose: string;
    until: string;
    warningMax: string;
    warningMin: string;
  }
> = {
  de: {
    title: "Ihre Reservierung",
    change: "ändern",
    save: "Speichern",
    confirmed: "Bestätigt",
    kitchenClose: "Küchenschluss um 22:00 Uhr",
    until: "bis",
    warningMax: `Reservierungen sind nur bis ${CLOSE_TIME} Uhr möglich. Die Uhrzeit wurde angepasst.`,
    warningMin: `Reservierungen beginnen ab ${OPEN_TIME} Uhr. Die Uhrzeit wurde angepasst.`,
  },
  es: {
    title: "Su reserva",
    change: "cambiar",
    save: "Guardar",
    confirmed: "Confirmado",
    kitchenClose: "La cocina cierra a las 22:00 h",
    until: "hasta",
    warningMax: `Las reservas solo son posibles hasta las ${CLOSE_TIME}. La hora ha sido ajustada.`,
    warningMin: `Las reservas comienzan a partir de las ${OPEN_TIME}. La hora ha sido ajustada.`,
  },
  en: {
    title: "Your reservation",
    change: "change",
    save: "Save",
    confirmed: "Confirmed",
    kitchenClose: "Kitchen closes at 10:00 PM",
    until: "until",
    warningMax: `Reservations are only possible until ${CLOSE_TIME}. The time has been adjusted.`,
    warningMin: `Reservations start from ${OPEN_TIME}. The time has been adjusted.`,
  },
};

function getTomorrowDateString() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function toDateLabel(date: string, locale: Locale) {
  if (!date) return "";

  try {
    const d = new Date(`${date}T00:00:00`);

    const map: Record<Locale, string> = {
      de: "de-DE",
      es: "es-ES",
      en: "en-GB",
    };

    return d.toLocaleDateString(map[locale], {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
  } catch {
    return date;
  }
}

function toTimeLabel(time: string, locale: Locale) {
  if (!time) return "";
  return `${time} ${RESERVATION_CARD_DICT[locale].until} ${CLOSE_TIME}`;
}

function clampTimeToKitchenHours(time: string) {
  if (!time) return OPEN_TIME;
  if (time < OPEN_TIME) return OPEN_TIME;
  if (time > CLOSE_TIME) return CLOSE_TIME;
  return time;
}

export default function ReservationCard({
  reservation,
  locale,
}: {
  reservation: Reservation;
  locale: Locale;
}) {
  const t = RESERVATION_CARD_DICT[locale];
  const tomorrow = useMemo(() => getTomorrowDateString(), []);

  const [isEditing, setIsEditing] = useState(false);
  const [guests, setGuests] = useState(reservation.guests || 2);
  const [date, setDate] = useState(tomorrow);
  const [time, setTime] = useState(OPEN_TIME);
  const [confirmed, setConfirmed] = useState(true);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (!saved) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          guests: reservation.guests || 2,
          date: tomorrow,
          time: OPEN_TIME,
        })
      );
      setGuests(reservation.guests || 2);
      setDate(tomorrow);
      setTime(OPEN_TIME);
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      setGuests(parsed.guests ?? reservation.guests ?? 2);
      setDate(parsed.date ?? tomorrow);
      setTime(clampTimeToKitchenHours(parsed.time ?? OPEN_TIME));
    } catch {
      setGuests(reservation.guests || 2);
      setDate(tomorrow);
      setTime(OPEN_TIME);
    }
  }, [reservation, tomorrow]);

  function save() {
    const normalizedGuests = Math.max(1, Number(guests) || 1);
    const normalizedDate = date || tomorrow;
    const normalizedTime = clampTimeToKitchenHours(time || OPEN_TIME);

    if (time > CLOSE_TIME) {
      setWarning(t.warningMax);
    } else if (time < OPEN_TIME) {
      setWarning(t.warningMin);
    } else {
      setWarning("");
    }

    setGuests(normalizedGuests);
    setDate(normalizedDate);
    setTime(normalizedTime);

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        guests: normalizedGuests,
        date: normalizedDate,
        time: normalizedTime,
      })
    );

    setIsEditing(false);
  }

  return (
    <aside className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <h3 className={styles.title}>{t.title}</h3>
          <p className={styles.sub}>{t.kitchenClose}</p>
        </div>

        <button
          type="button"
          className={styles.change}
          onClick={() => setIsEditing((v) => !v)}
        >
          {t.change}
        </button>
      </div>

      <div className={styles.items}>
        <div className={styles.item}>
          <span className={styles.icon}>🍷</span>
          {isEditing ? (
            <input
              className={styles.inlineInput}
              type="number"
              min={1}
              max={20}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          ) : (
            <strong className={styles.value}>{guests}</strong>
          )}
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>📅</span>
          {isEditing ? (
            <input
              className={styles.inlineInput}
              type="date"
              min={tomorrow}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          ) : (
            <strong className={styles.value}>{toDateLabel(date, locale) || reservation.dateLabel}</strong>
          )}
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>⏰</span>
          {isEditing ? (
            <input
              className={styles.inlineInput}
              type="time"
              min={OPEN_TIME}
              max={CLOSE_TIME}
              step={1800}
              value={time}
              onChange={(e) => {
                setTime(e.target.value);

                if (e.target.value > CLOSE_TIME) {
                  setWarning(t.warningMax);
                } else if (e.target.value < OPEN_TIME) {
                  setWarning(t.warningMin);
                } else {
                  setWarning("");
                }
              }}
            />
          ) : (
            <strong className={styles.value}>{toTimeLabel(time, locale) || reservation.timeLabel}</strong>
          )}
        </div>
      </div>

      {warning ? <p className={styles.warning}>{warning}</p> : null}

      <div className={styles.bottomRow}>
        <button
          type="button"
          className={styles.confirm}
          aria-label={t.confirmed}
          onClick={() => setConfirmed((v) => !v)}
        >
          <span className={confirmed ? styles.dotOn : styles.dotOff} />
        </button>

        {isEditing && (
          <button type="button" className={styles.save} onClick={save}>
            {t.save}
          </button>
        )}
      </div>
    </aside>
  );
}