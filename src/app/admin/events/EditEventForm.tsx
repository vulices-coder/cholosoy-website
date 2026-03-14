"use client";

import Image from "next/image";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { updateEventAction, type UpdateEventState } from "@/actions/events";
import styles from "./EditEventForm.module.scss";

type EventData = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  date: Date;
  location: string | null;
  imageUrl: string | null;
  status: "DRAFT" | "PUBLISHED" | "CANCELED";
};

const initialState: UpdateEventState = {
  success: false,
};

function toDateTimeLocal(date: Date | string) {
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function EditEventForm({ event }: { event: EventData }) {
  const boundAction = useMemo(
    () => updateEventAction.bind(null, event.id),
    [event.id]
  );

  const [state, formAction, pending] = useActionState(
    boundAction,
    initialState
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (state.success && fileInputRef.current) {
      fileInputRef.current.value = "";
      setSelectedFile(null);
    }
  }, [state.success]);

  const currentImage = previewUrl || event.imageUrl || null;

  return (
    <form action={formAction} autoComplete="off" className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={event.title}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="slug" className={styles.label}>
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          defaultValue={event.slug}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={event.description ?? ""}
          className={styles.textarea}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="date" className={styles.label}>
          Fecha y hora
        </label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          defaultValue={toDateTimeLocal(event.date)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="location" className={styles.label}>
          Ubicación
        </label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={event.location ?? ""}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="image" className={styles.label}>
          Reemplazar imagen
        </label>
        <input
          ref={fileInputRef}
          id="image"
          name="image"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg"
          className={styles.file}
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setSelectedFile(file);
          }}
        />
      </div>

      {currentImage ? (
        <div className={styles.previewCard}>
          <p className={styles.previewLabel}>
            {previewUrl ? "Nueva vista previa" : "Imagen actual"}
          </p>
          <div className={styles.previewMedia}>
            <Image
              src={currentImage}
              alt="Vista previa de la imagen del evento"
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className={styles.previewImage}
              unoptimized={Boolean(previewUrl)}
            />
          </div>
        </div>
      ) : null}

      <div className={styles.field}>
        <label htmlFor="status" className={styles.label}>
          Estado
        </label>
        <select
          id="status"
          name="status"
          defaultValue={event.status}
          className={styles.select}
        >
          <option value="DRAFT">Borrador</option>
          <option value="PUBLISHED">Publicado</option>
          <option value="CANCELED">Cancelado</option>
        </select>
      </div>

      {state.error ? <p className={styles.error}>{state.error}</p> : null}

      {state.success ? (
        <p className={styles.success}>Evento actualizado correctamente.</p>
      ) : null}

      <button type="submit" disabled={pending} className={styles.button}>
        {pending ? "Guardando..." : "Actualizar evento"}
      </button>
    </form>
  );
}