"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./Footer.module.scss";

type Locale = "de" | "es" | "en";

const LOCALES = new Set(["de", "es", "en"]);

function getLocaleFromPath(pathname: string): Locale | null {
  const first = pathname.split("/")[1];
  return LOCALES.has(first) ? (first as Locale) : null;
}

function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return "de";
  const m = document.cookie.match(/(?:^|;\s*)cholosoy_locale=([^;]+)/);
  const raw = m ? decodeURIComponent(m[1]).toLowerCase() : "de";
  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

const FOOTER_DICT: Record<
  Locale,
  {
    brand: string;
    agb: string;
    datenschutz: string;
    info: string;
    impressum: string;
    facebook: string;
    instagram: string;
  }
> = {
  de: {
    brand: "CholoSoy 2026",
    agb: "AGB",
    datenschutz: "Datenschutz",
    info: "Info",
    impressum: "Impressum",
    facebook: "Facebook",
    instagram: "Instagram",
  },
  es: {
    brand: "CholoSoy 2026",
    agb: "Términos",
    datenschutz: "Privacidad",
    info: "Info",
    impressum: "Aviso legal",
    facebook: "Facebook",
    instagram: "Instagram",
  },
  en: {
    brand: "CholoSoy 2026",
    agb: "Terms",
    datenschutz: "Privacy",
    info: "Info",
    impressum: "Legal notice",
    facebook: "Facebook",
    instagram: "Instagram",
  },
};

export default function Footer() {
  const pathname = usePathname();
  const localeFromPath = getLocaleFromPath(pathname);
  const [cookieLocale, setCookieLocale] = useState<Locale>("de");

  useEffect(() => {
    setCookieLocale(getLocaleFromCookie());
  }, []);

  const locale = useMemo(
    () => localeFromPath ?? cookieLocale,
    [localeFromPath, cookieLocale]
  );

  const t = FOOTER_DICT[locale];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brand}>{t.brand}</div>

        <nav className={styles.legal}>
          <Link href={`/${locale}/agb`}>{t.agb}</Link>
          <Link href={`/${locale}/datenschutz`}>{t.datenschutz}</Link>
          <Link href={`/${locale}/info`}>{t.info}</Link>
          <Link href={`/${locale}/impressum`}>{t.impressum}</Link>
        </nav>

        <div className={styles.social}>
          <a href="#" aria-label={t.facebook}>
            {t.facebook}
          </a>
          <a href="#" aria-label={t.instagram}>
            {t.instagram}
          </a>
        </div>
      </div>
    </footer>
  );
}