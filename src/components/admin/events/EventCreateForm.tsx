"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  createEventAction,
  type CreateEventState,
} from "@/actions/events";

const initialState: CreateEventState = {
  success: false,
};

export default function EventCreateForm() {
  const [state, formAction, pending] = useActionState(
    createEventAction,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setTitle("");
      setSlug("");
      setSlugTouched(false);
    }
  }, [state.success]);

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

  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid gap-5 rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
    >
      {/* TITLE */}

      <div className="grid gap-2">
        <label htmlFor="title" className="text-sm font-medium">
          Título
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className="rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-black"
          placeholder="Salsa Night"
        />
      </div>

      {/* SLUG */}

      <div className="grid gap-2">
        <label htmlFor="slug" className="text-sm font-medium">
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
          className="rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-black"
          placeholder="salsa-night"
        />
      </div>

      {/* DESCRIPTION */}

      <div className="grid gap-2">
        <label htmlFor="description" className="text-sm font-medium">
          Descripción
        </label>

        <textarea
          id="description"
          name="description"
          rows={5}
          className="rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-black"
          placeholder="Descripción del evento..."
        />
      </div>

      {/* DATE */}

      <div className="grid gap-2">
        <label htmlFor="date" className="text-sm font-medium">
          Fecha y hora
        </label>

        <input
          id="date"
          name="date"
          type="datetime-local"
          required
          className="rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      {/* LOCATION */}

      <div className="grid gap-2">
        <label htmlFor="location" className="text-sm font-medium">
          Ubicación
        </label>

        <input
          id="location"
          name="location"
          type="text"
          className="rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-black"
          placeholder="CholoSoy — Berlin"
        />
      </div>

      {/* IMAGE */}

      <div className="grid gap-2">
        <label htmlFor="image" className="text-sm font-medium">
          Imagen del evento
        </label>

        <input
          id="image"
          name="image"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg"
          className="rounded-2xl border border-black/15 px-4 py-3"
        />
      </div>

      {/* STATUS */}

      <div className="grid gap-2">
        <label htmlFor="status" className="text-sm font-medium">
          Estado
        </label>

        <select
          id="status"
          name="status"
          defaultValue="DRAFT"
          className="rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-black"
        >
          <option value="DRAFT">Borrador</option>
          <option value="PUBLISHED">Publicado</option>
          <option value="CANCELED">Cancelado</option>
        </select>
      </div>

      {/* ERRORS */}

      {state.error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
          Evento creado correctamente.
        </p>
      ) : null}

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={pending}
        className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Crear evento"}
      </button>
    </form>
  );
}