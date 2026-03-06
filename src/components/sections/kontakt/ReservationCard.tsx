"use client";

import { useEffect, useState } from "react";
import styles from "./ReservationCard.module.scss";

type Reservation = {
  guests: number;
  date: string;
  dateLabel: string;
  time: string;
  timeLabel: string;
  kitchenClose: string;
};

const STORAGE_KEY = "cholosoy_reservation_selection";

function toDateLabel(date: string) {
  if (!date) return "";
  try {
    const d = new Date(`${date}T00:00:00`);
    return d.toLocaleDateString("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
  } catch {
    return date;
  }
}

function toTimeLabel(time: string) {
  if (!time) return "";
  return `${time} bis 18:00`;
}

export default function ReservationCard({ reservation }: { reservation: Reservation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [guests, setGuests] = useState(reservation.guests);
  const [date, setDate] = useState(reservation.date);
  const [time, setTime] = useState(reservation.time);
  const [confirmed, setConfirmed] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          guests: reservation.guests,
          date: reservation.date,
          time: reservation.time,
        })
      );
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      setGuests(parsed.guests ?? reservation.guests);
      setDate(parsed.date ?? reservation.date);
      setTime(parsed.time ?? reservation.time);
    } catch {}
  }, [reservation]);

  function save() {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        guests,
        date,
        time,
      })
    );
    setIsEditing(false);
  }

  return (
    <aside className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <h3 className={styles.title}>Ihre Reservierung</h3>
          <p className={styles.sub}>{reservation.kitchenClose}</p>
        </div>

        <button
          type="button"
          className={styles.change}
          onClick={() => setIsEditing((v) => !v)}
        >
          ändern
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          ) : (
            <strong className={styles.value}>{toDateLabel(date) || reservation.dateLabel}</strong>
          )}
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>⏰</span>
          {isEditing ? (
            <input
              className={styles.inlineInput}
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          ) : (
            <strong className={styles.value}>{toTimeLabel(time) || reservation.timeLabel}</strong>
          )}
        </div>
      </div>

      <div className={styles.bottomRow}>
        <button
          type="button"
          className={styles.confirm}
          aria-label="Bestätigt"
          onClick={() => setConfirmed((v) => !v)}
        >
          <span className={confirmed ? styles.dotOn : styles.dotOff} />
        </button>

        {isEditing && (
          <button type="button" className={styles.save} onClick={save}>
            Speichern
          </button>
        )}
      </div>
    </aside>
  );
}