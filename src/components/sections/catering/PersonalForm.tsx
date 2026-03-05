"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./PersonalForm.module.scss";

type Locale = "de" | "es" | "en";

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "de";
  const m = document.cookie.match(/(?:^|;\s*)cholosoy_locale=([^;]+)/);
  const raw = m ? decodeURIComponent(m[1]).toLowerCase() : "de";
  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

export default function PersonalForm() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("de");

  useEffect(() => {
    setLocale(readLocaleCookie());
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // (Luego guardamos data en localStorage/session si quieres)
    router.push("/catering/welcome");
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Link href={`/${locale}/home`} className={styles.logo} aria-label="Zur Home">
          <Image
            src="/images/brand/logo.svg"
            alt="CholoSoy"
            width={140}
            height={140}
            priority
          />
        </Link>

        <form className={styles.form} onSubmit={onSubmit}>
          <label>
            Vor und Nachname
            <input name="name" type="text" required />
          </label>

          <label>
            E-Mail Adresse
            <input name="email" type="email" required />
          </label>

          <label>
            Handynummer
            <input name="phone" type="tel" required />
          </label>

          <label>
            Anschrift
            <input name="address" type="text" required />
          </label>

          <button type="submit" className={styles.send}>
            Senden
          </button>
        </form>
      </section>

      <Link href="/" className={styles.back}>
        Zurück
      </Link>
    </main>
  );
}