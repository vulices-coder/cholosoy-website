"use client";

import Image from "next/image";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import {
  createEventAction,
  type CreateEventState,
} from "@/actions/events";
import styles from "./EventCreateForm.module.scss";

const initialState: CreateEventState = {
  success: false,
};

export default function EventCreateForm() {
  const [state, formAction, pending] = useActionState(
    createEventAction,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [titleDe, setTitleDe] = useState("");
  const [descriptionDe, setDescriptionDe] = useState("");
  const [titleEs, setTitleEs] = useState("");
  const [descriptionEs, setDescriptionEs] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setTitle("");
      setSlug("");
      setSlugTouched(false);
      setDescription("");
      setSelectedFile(null);

      setTitleDe("");
      setDescriptionDe("");
      setTitleEs("");
      setDescriptionEs("");
      setTitleEn("");
      setDescriptionEn("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [state.success]);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function makeSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(makeSlug(value));
    }
  }

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

  return (
    <form ref={formRef} action={formAction} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          Título base
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className={styles.input}
          placeholder="Salsa Night"
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
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(makeSlug(e.target.value));
          }}
          className={styles.input}
          placeholder="salsa-night"
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
          placeholder="Descripción principal del evento..."
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
          placeholder="Titel auf Deutsch"
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
          placeholder="Beschreibung auf Deutsch"
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
          placeholder="Título en español"
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
          placeholder="Descripción en español"
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
          placeholder="Title in English"
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
          placeholder="Description in English"
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
          defaultValue="CholoSoy — Berlin"
          className={styles.input}
          placeholder="CholoSoy — Berlin"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="image" className={styles.label}>
          Imagen del evento
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

      {previewUrl ? (
        <div className={styles.previewCard}>
          <p className={styles.previewLabel}>Vista previa</p>
          <div className={styles.previewMedia}>
            <Image
              src={previewUrl}
              alt="Vista previa de la imagen del evento"
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className={styles.previewImage}
              unoptimized
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
          defaultValue="DRAFT"
          className={styles.select}
        >
          <option value="DRAFT">Borrador</option>
          <option value="PUBLISHED">Publicado</option>
          <option value="CANCELED">Cancelado</option>
        </select>
      </div>

      {state.error ? <p className={styles.error}>{state.error}</p> : null}

      {state.success ? (
        <p className={styles.success}>Evento creado correctamente.</p>
      ) : null}

      <button type="submit" disabled={pending} className={styles.button}>
        {pending ? "Guardando..." : "Crear evento"}
      </button>
    </form>
  );
}