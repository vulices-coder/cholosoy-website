"use client";

import Link from "next/link";
import styles from "./KarteToolbar.module.scss";
import { KARTE_SECTIONS, type KarteSection, type Locale } from "./menu.data";

function nextOf(section: KarteSection) {
  const idx = KARTE_SECTIONS.indexOf(section);
  return KARTE_SECTIONS[(idx + 1) % KARTE_SECTIONS.length];
}

function prevOf(section: KarteSection) {
  const idx = KARTE_SECTIONS.indexOf(section);
  return KARTE_SECTIONS[(idx - 1 + KARTE_SECTIONS.length) % KARTE_SECTIONS.length];
}

const TOOLBAR_TEXT: Record<
  Locale,
  {
    toolbar: string;
    zoomOut: string;
    zoomIn: string;
    allMenus: string;
    prev: string;
    next: string;
  }
> = {
  de: {
    toolbar: "Karte Toolbar",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    allMenus: "Alle Menüs",
    prev: "Zurück",
    next: "Weiter",
  },
  es: {
    toolbar: "Barra de menú",
    zoomOut: "Alejar",
    zoomIn: "Acercar",
    allMenus: "Todos los menús",
    prev: "Anterior",
    next: "Siguiente",
  },
  en: {
    toolbar: "Menu toolbar",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    allMenus: "All menus",
    prev: "Previous",
    next: "Next",
  },
};

export default function KarteToolbar({
  section,
  zoom,
  setZoom,
  locale,
}: {
  section: KarteSection;
  zoom: number;
  setZoom: (z: number) => void;
  locale: Locale;
}) {
  const prev = prevOf(section);
  const next = nextOf(section);
  const t = TOOLBAR_TEXT[locale];

  return (
    <div className={styles.bar} aria-label={t.toolbar}>
      <button
        type="button"
        className={styles.iconBtn}
        onClick={() => setZoom(Math.max(0.8, +(zoom - 0.1).toFixed(1)))}
        aria-label={t.zoomOut}
      >
        −
      </button>

      <div className={styles.zoomLabel}>{Math.round(zoom * 100)}%</div>

      <button
        type="button"
        className={styles.iconBtn}
        onClick={() => setZoom(Math.min(1.4, +(zoom + 0.1).toFixed(1)))}
        aria-label={t.zoomIn}
      >
        +
      </button>

      <span className={styles.sep} />

      <Link className={styles.iconBtn} href="/karte/all" aria-label={t.allMenus}>
        4
      </Link>

      <span className={styles.sep} />

      <Link className={styles.iconBtn} href={`/karte/${prev}`} aria-label={t.prev}>
        ‹
      </Link>
      <Link className={styles.iconBtn} href={`/karte/${next}`} aria-label={t.next}>
        ›
      </Link>
    </div>
  );
}