"use client";

import { useTransition } from "react";
import {
  cancelEventAction,
  deleteEventAction,
  duplicateEventAction,
  publishEventAction,
} from "@/actions/events";
import styles from "./EventRowActions.module.scss";

type Props = {
  eventId: string;
  status: "DRAFT" | "PUBLISHED" | "CANCELED";
};

export default function EventRowActions({ eventId, status }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className={styles.actions}>
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await duplicateEventAction(eventId);
          })
        }
        className={`${styles.button} ${styles.duplicate}`}
      >
        Duplicar
      </button>

      {status !== "PUBLISHED" ? (
        <button
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await publishEventAction(eventId);
            })
          }
          className={`${styles.button} ${styles.publish}`}
        >
          Publicar
        </button>
      ) : null}

      {status !== "CANCELED" ? (
        <button
          type="button"
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await cancelEventAction(eventId);
            })
          }
          className={`${styles.button} ${styles.cancel}`}
        >
          Cancelar
        </button>
      ) : null}

      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          const ok = window.confirm("¿Seguro que quieres borrar este evento?");
          if (!ok) return;

          startTransition(async () => {
            await deleteEventAction(eventId);
          });
        }}
        className={`${styles.button} ${styles.delete}`}
      >
        Borrar
      </button>
    </div>
  );
}