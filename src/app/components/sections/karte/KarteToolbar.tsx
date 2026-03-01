"use client";

import Link from "next/link";
import styles from "./KarteToolbar.module.scss";
import { KARTE_SECTIONS, type KarteSection } from "./menu.data";

function nextOf(section: KarteSection) {
  const idx = KARTE_SECTIONS.indexOf(section);
  return KARTE_SECTIONS[(idx + 1) % KARTE_SECTIONS.length];
}
function prevOf(section: KarteSection) {
  const idx = KARTE_SECTIONS.indexOf(section);
  return KARTE_SECTIONS[(idx - 1 + KARTE_SECTIONS.length) % KARTE_SECTIONS.length];
}

export default function KarteToolbar({
  section,
  zoom,
  setZoom,
}: {
  section: KarteSection;
  zoom: number;
  setZoom: (z: number) => void;
}) {
  const prev = prevOf(section);
  const next = nextOf(section);

  return (
    <div className={styles.bar} aria-label="Karte Toolbar">
      <button className={styles.iconBtn} onClick={() => setZoom(Math.max(0.8, +(zoom - 0.1).toFixed(1)))} aria-label="Zoom out">
        −
      </button>

      <div className={styles.zoomLabel}>{Math.round(zoom * 100)}%</div>

      <button className={styles.iconBtn} onClick={() => setZoom(Math.min(1.4, +(zoom + 0.1).toFixed(1)))} aria-label="Zoom in">
        +
      </button>

      <span className={styles.sep} />

      <Link className={styles.iconBtn} href="/karte/all" aria-label="Alle Menüs">
        4
      </Link>

      <span className={styles.sep} />

      <Link className={styles.iconBtn} href={`/karte/${prev}`} aria-label="Zurück">
        ‹
      </Link>
      <Link className={styles.iconBtn} href={`/karte/${next}`} aria-label="Weiter">
        ›
      </Link>
    </div>
  );
}