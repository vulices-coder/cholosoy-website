"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./KartePage.module.scss";
import { SECTION_LABEL, type KarteSection } from "./menu.data";
import KarteToolbar from "./KarteToolbar";

type Locale = "de" | "es" | "en";

type KarteItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  imageUrl: string | null;
  slug: string;
};

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "de";
  const m = document.cookie.match(/(?:^|;\s*)cholosoy_locale=([^;]+)/);
  const raw = m ? decodeURIComponent(m[1]).toLowerCase() : "de";
  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

function formatPrice(price: number) {
  return `${price.toFixed(2).replace(".", ",")} €`;
}

export default function KartePage({
  section,
  items,
}: {
  section: KarteSection;
  items: KarteItem[];
}) {
  const [zoom, setZoom] = useState(1);
  const [locale, setLocale] = useState<Locale>("de");

  useEffect(() => {
    setLocale(readLocaleCookie());
  }, []);

  return (
    <div className={styles.sheetWrap}>
      <div className={styles.sheet} style={{ ["--zoom" as any]: zoom }}>
        <div className={styles.header}>
          <Link href={`/${locale}/home`} aria-label="Zur Home">
            <Image
              src="/images/brand/logo.svg"
              alt="CholoSoy"
              width={92}
              height={92}
              className={styles.logo}
              priority
            />
          </Link>
        </div>

        <h1 className={styles.title}>{SECTION_LABEL[section]}</h1>

        {items.length === 0 ? (
          <div className={styles.empty}>Für diese Kategorie gibt es aktuell noch keine Einträge.</div>
        ) : (
          <ul className={styles.list}>
            {items.map((it) => (
              <li key={it.id} className={styles.item}>
                <div className={styles.left}>
                  <div className={styles.name}>{it.name}</div>
                  {it.description ? <div className={styles.desc}>{it.description}</div> : null}
                </div>
                <div className={styles.price}>{formatPrice(it.price)}</div>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.toolbarDock}>
          <KarteToolbar section={section} zoom={zoom} setZoom={setZoom} />
        </div>
      </div>
    </div>
  );
}