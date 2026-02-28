"use client";

import { useState } from "react";
import styles from "./ReservationCard.module.scss";

type Reservation = {
  guests: number;
  dateLabel: string;
  timeLabel: string;
  kitchenClose: string;
};

export default function ReservationCard({ reservation }: { reservation: Reservation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [guests, setGuests] = useState(reservation.guests);
  const [dateLabel, setDateLabel] = useState(reservation.dateLabel);
  const [timeLabel, setTimeLabel] = useState(reservation.timeLabel);

  const [confirmed, setConfirmed] = useState(true);

  function save() {
    setIsEditing(false);
    // luego: levantar state al page.tsx
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
              value={dateLabel}
              onChange={(e) => setDateLabel(e.target.value)}
            />
          ) : (
            <strong className={styles.value}>{dateLabel}</strong>
          )}
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>⏰</span>
          {isEditing ? (
            <input
              className={styles.inlineInput}
              value={timeLabel}
              onChange={(e) => setTimeLabel(e.target.value)}
            />
          ) : (
            <strong className={styles.value}>{timeLabel}</strong>
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