"use client";

import Image from "next/image";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { updateEventAction, type UpdateEventState } from "@/actions/events";
import styles from "./EditEventForm.module.scss";

type Translation = {
  locale: string;
  title: string;
  description: string | null;
};

type EventData = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  date: Date;
  location: string | null;
  imageUrl: string | null;
  status: "DRAFT" | "PUBLISHED" | "CANCELED";
  translations: Translation[];
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

function getTranslation(
  translations: Translation[],
  locale: "de" | "es" | "en"
) {
  return translations.find((t) => t.locale === locale);
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

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description ?? "");

  const de = getTranslation(event.translations, "de");
  const es = getTranslation(event.translations, "es");
  const en = getTranslation(event.translations, "en");

  const [titleDe, setTitleDe] = useState(de?.title ?? "");
  const [descriptionDe, setDescriptionDe] = useState(de?.description ?? "");
  const [titleEs, setTitleEs] = useState(es?.title ?? "");
  const [descriptionEs, setDescriptionEs] = useState(es?.description ?? "");
  const [titleEn, setTitleEn] = useState(en?.title ?? "");
  const [descriptionEn, setDescriptionEn] = useState(en?.description ?? "");

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

  function copyBaseToAll() {
    setTitleDe(title);
    setDescriptionDe(description);
    setTitleEs(title);
    setDescriptionEs(description);
    setTitleEn(title);
    setDescriptionEn(description);
  }

  function copyBaseToDe() {
    setTitleDe(title);
    setDescriptionDe(description);
  }

  function copyBaseToEs() {
    setTitleEs(title);
    setDescriptionEs(description);
  }

  function copyBaseToEn() {
    setTitleEn(title);
    setDescriptionEn(description);
  }

  const currentImage = previewUrl || event.imageUrl || null;

  return (
    <form action={formAction} autoComplete="off" className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          Título base
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          Descripción base
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />
      </div>

      <div
        className={styles.field}
        style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
      >
        <button
          type="button"
          onClick={copyBaseToAll}
          className={styles.button}
          style={{ width: "auto", padding: "10px 14px" }}
        >
          Copiar base → todos
        </button>

        <button
          type="button"
          onClick={copyBaseToDe}
          className={styles.button}
          style={{ width: "auto", padding: "10px 14px" }}
        >
          Copiar → DE
        </button>

        <button
          type="button"
          onClick={copyBaseToEs}
          className={styles.button}
          style={{ width: "auto", padding: "10px 14px" }}
        >
          Copiar → ES
        </button>

        <button
          type="button"
          onClick={copyBaseToEn}
          className={styles.button}
          style={{ width: "auto", padding: "10px 14px" }}
        >
          Copiar → EN
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Título alemán</label>
        <input
          name="title_de"
          type="text"
          value={titleDe}
          onChange={(e) => setTitleDe(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Descripción alemana</label>
        <textarea
          name="description_de"
          rows={4}
          value={descriptionDe}
          onChange={(e) => setDescriptionDe(e.target.value)}
          className={styles.textarea}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Título español</label>
        <input
          name="title_es"
          type="text"
          value={titleEs}
          onChange={(e) => setTitleEs(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Descripción española</label>
        <textarea
          name="description_es"
          rows={4}
          value={descriptionEs}
          onChange={(e) => setDescriptionEs(e.target.value)}
          className={styles.textarea}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>English title</label>
        <input
          name="title_en"
          type="text"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>English description</label>
        <textarea
          name="description_en"
          rows={4}
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
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