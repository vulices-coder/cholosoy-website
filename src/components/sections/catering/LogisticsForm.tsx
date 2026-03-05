"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Footer from "@/app/components/layout/Footer";
import styles from "./LogisticsForm.module.scss";

export default function LogisticsForm() {
  const router = useRouter();
  const [agb, setAgb] = useState(false);

  const canSend = useMemo(() => agb, [agb]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSend) return;
    router.push("/catering/danke");
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className={styles.title}>Logistische Anforderungen</h1>

        <section className={styles.block}>
          <h2>Möbel benötigt</h2>
          <label><input type="checkbox" /> Tische</label>
          <label><input type="checkbox" /> Stühle</label>
          <label><input type="checkbox" /> Tischdecken</label>
          <label><input type="checkbox" /> Sonstiges</label>
        </section>

        <section className={styles.block}>
          <h2>Zusätzliches Personal</h2>
          <label><input type="checkbox" /> Kellner</label>
          <label><input type="checkbox" /> Bartender</label>
          <label><input type="checkbox" /> Köche vor Ort</label>
          <label><input type="checkbox" /> Reinigungskraft</label>
        </section>

        <section className={styles.block}>
          <h2>Vorhandene Küche</h2>
          <label><input type="checkbox" /> Ja</label>
          <label><input type="checkbox" /> Nein</label>
          <label><input type="checkbox" /> Sonstiges</label>
        </section>

        <section className={styles.block}>
          <h2>Zugang für Lieferung</h2>
          <label><input type="checkbox" /> Parkmöglichkeiten</label>
          <label><input type="checkbox" /> Treppen</label>
          <label><input type="checkbox" /> Lift</label>
          <label><input type="checkbox" /> Sonstiges</label>
        </section>

        <label className={styles.agb}>
          <input type="checkbox" checked={agb} onChange={(e) => setAgb(e.target.checked)} />
          AGB&apos;s akzeptieren
        </label>

        <button className={styles.send} type="submit" disabled={!canSend}>
          Senden
        </button>
      </form>

      {/* Footer SOLO en esta hoja */}
      {/* <Footer /> */}
    </main>
  );
}