"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./WelcomeCard.module.scss";

type Locale = "de" | "es" | "en";

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "de";
  const m = document.cookie.match(/(?:^|;\s*)cholosoy_locale=([^;]+)/);
  const raw = m ? decodeURIComponent(m[1]).toLowerCase() : "de";
  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

const WELCOME_DICT: Record<Locale, { text: string; cta: string }> = {
  de: {
    text: "Danke! Unser kulinarisches Abenteuer kann bald losgehen.",
    cta: "Zum Formular →",
  },
  es: {
    text: "¡Gracias! Nuestra aventura culinaria está a punto de comenzar.",
    cta: "Ir al formulario →",
  },
  en: {
    text: "Thank you! Our culinary adventure can begin very soon.",
    cta: "Go to form →",
  },
};

export default function WelcomeCard() {
  const [locale, setLocale] = useState<Locale>("de");

  useEffect(() => {
    setLocale(readLocaleCookie());
  }, []);

  const t = WELCOME_DICT[locale];

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.text}>{t.text}</p>

        <Link className={styles.cta} href="/catering/form">
          {t.cta}
        </Link>
      </section>
    </main>
  );
}