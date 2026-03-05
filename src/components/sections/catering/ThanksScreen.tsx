"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./ThanksScreen.module.scss";

type Locale = "de" | "es" | "en";

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "de";
  const m = document.cookie.match(/(?:^|;\s*)cholosoy_locale=([^;]+)/);
  const raw = m ? decodeURIComponent(m[1]).toLowerCase() : "de";
  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

export default function ThanksScreen() {
  const [locale, setLocale] = useState<Locale>("de");

  useEffect(() => {
    setLocale(readLocaleCookie());
  }, []);

  return (
    <main className={styles.page}>
      <p className={styles.quote}>
        „Bereise Peru mit dem Gaumen <br /> und entdecke eine neue Art, die Welt zu bereisen.“
      </p>

      <p className={styles.thanks}>Danke für Ihre Bestellung</p>

      <Link href={`/${locale}/home`} className={styles.logo} aria-label="Zur Home">
        <Image src="/images/brand/logo.svg" alt="CholoSoy" width={150} height={150} />
      </Link>

      <Link href="/catering" className={styles.back}>
        Zurück
      </Link>
    </main>
  );
}