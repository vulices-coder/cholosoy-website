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

const THANKS_DICT: Record<
  Locale,
  {
    quote: string;
    thanks: string;
    home: string;
    back: string;
  }
> = {
  de: {
    quote: "„Entdecke Peru mit all seinen Geschmäckern und erlebe eine neue Art, die Welt zu bereisen.“",
    thanks: "Danke für Ihre Bestellung",
    home: "Zur Home",
    back: "Zurück",
  },
  es: {
    quote: "«Descubre el Perú a través de sus sabores y vive una nueva manera de recorrer el mundo.»",
    thanks: "Gracias por su pedido",
    home: "Ir al inicio",
    back: "Volver",
  },
  en: {
    quote: "“Discover Peru through its flavors and experience a new way of exploring the world.”",
    thanks: "Thank you for your order",
    home: "Go to home",
    back: "Back",
  },
};

export default function ThanksScreen() {
  const [locale, setLocale] = useState<Locale>("de");

  useEffect(() => {
    setLocale(readLocaleCookie());
  }, []);

  const t = THANKS_DICT[locale];

  return (
    <main className={styles.page}>
      <p className={styles.quote}>{t.quote}</p>

      <p className={styles.thanks}>{t.thanks}</p>

      <Link href={`/${locale}/home`} className={styles.logo} aria-label={t.home}>
        <Image src="/images/brand/logo.svg" alt="CholoSoy" width={150} height={150} />
      </Link>

      <Link href="/catering" className={styles.back}>
        {t.back}
      </Link>
    </main>
  );
}