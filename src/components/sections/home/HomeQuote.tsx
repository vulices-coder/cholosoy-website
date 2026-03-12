"use client";

import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import styles from "./HomeQuote.module.scss";

const LOCALES = new Set(["de", "es", "en"]);

type Locale = "de" | "es" | "en";

function getLocaleFromPath(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return LOCALES.has(first) ? (first as Locale) : "de";
}

const HOME_QUOTE_DICT: Record<Locale, string> = {
  de: "„Entdecke Peru mit all seinen Geschmäckern und erlebe eine neue Art, die Welt zu bereisen.“",
  es: "«Descubre el Perú a través de sus sabores y vive una nueva manera de recorrer el mundo..»",
  en: "“Discover Peru through its flavors and experience a new way of exploring the world.”",
};

export default function HomeQuote() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const quote = HOME_QUOTE_DICT[locale];

  return (
    <section className={styles.section}>
      <Container size="lg">
        <div className={styles.inner}>
          <h1 className={`${styles.quote} handwritten`}>{quote}</h1>
        </div>
      </Container>
    </section>
  );
}