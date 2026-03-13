"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./KartePage.module.scss";
import { SECTION_LABELS, type KarteSection, type Locale } from "./menu.data";
import KarteToolbar from "./KarteToolbar";

type KarteItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  imageUrl: string | null;
  slug: string;
};

function formatPrice(price: number) {
  return `${price.toFixed(2).replace(".", ",")} €`;
}

function isAlcoholicDrink(item: KarteItem) {
  return ["pisco-sour", "chilcano-de-pisco", "bier-vom-fass"].includes(item.slug);
}

const UI_TEXT: Record<
  Locale,
  {
    empty: string;
    nonAlcoholic: string;
    alcoholic: string;
    homeAria: string;
  }
> = {
  de: {
    empty: "Für diese Kategorie gibt es aktuell noch keine Einträge.",
    nonAlcoholic: "Ohne Alkohol",
    alcoholic: "Mit Alkohol",
    homeAria: "Zur Home",
  },
  es: {
    empty: "Actualmente no hay entradas para esta categoría.",
    nonAlcoholic: "Sin alcohol",
    alcoholic: "Con alcohol",
    homeAria: "Ir a Home",
  },
  en: {
    empty: "There are currently no entries for this category.",
    nonAlcoholic: "Non-alcoholic",
    alcoholic: "Alcoholic",
    homeAria: "Go to Home",
  },
};

export default function KartePage({
  section,
  items,
  locale,
}: {
  section: KarteSection;
  items: KarteItem[];
  locale: Locale;
}) {
  const [zoom, setZoom] = useState(1);

  const t = UI_TEXT[locale];
  const title = SECTION_LABELS[locale][section];

  const groupedDrinks = useMemo(() => {
    if (section !== "getraenke") return null;

    const ohneAlkohol = items.filter((item) => !isAlcoholicDrink(item));
    const mitAlkohol = items.filter((item) => isAlcoholicDrink(item));

    return { ohneAlkohol, mitAlkohol };
  }, [items, section]);

  return (
    <div className={styles.sheetWrap}>
      <div className={styles.sheet} style={{ ["--zoom" as any]: zoom }}>
        <div className={styles.header}>
          <Link href={`/${locale}/home`} aria-label={t.homeAria}>
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

        <h1 className={styles.title}>{title}</h1>

        {items.length === 0 ? (
          <div className={styles.empty}>{t.empty}</div>
        ) : section === "getraenke" && groupedDrinks ? (
          <div className={styles.groupedMenu}>
            {groupedDrinks.ohneAlkohol.length > 0 && (
              <>
                <div className={styles.groupLabel}>{t.nonAlcoholic}</div>
                <ul className={styles.list}>
                  {groupedDrinks.ohneAlkohol.map((it) => (
                    <li key={it.id} className={styles.item}>
                      <div className={styles.left}>
                        <div className={styles.itemHead}>
                          <div className={styles.name}>{it.name}</div>
                          <div className={styles.price}>{formatPrice(it.price)}</div>
                        </div>
                        {it.description ? <div className={styles.desc}>{it.description}</div> : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {groupedDrinks.mitAlkohol.length > 0 && (
              <>
                <div className={styles.groupLabel}>{t.alcoholic}</div>
                <ul className={styles.list}>
                  {groupedDrinks.mitAlkohol.map((it) => (
                    <li key={it.id} className={styles.item}>
                      <div className={styles.left}>
                        <div className={styles.itemHead}>
                          <div className={styles.name}>{it.name}</div>
                          <div className={styles.price}>{formatPrice(it.price)}</div>
                        </div>
                        {it.description ? <div className={styles.desc}>{it.description}</div> : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : (
          <ul className={styles.list}>
            {items.map((it) => (
              <li key={it.id} className={styles.item}>
                <div className={styles.left}>
                  <div className={styles.itemHead}>
                    <div className={styles.name}>{it.name}</div>
                    <div className={styles.price}>{formatPrice(it.price)}</div>
                  </div>
                  {it.description ? <div className={styles.desc}>{it.description}</div> : null}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.toolbarDock}>
          <KarteToolbar section={section} zoom={zoom} setZoom={setZoom} locale={locale} />
        </div>
      </div>
    </div>
  );
}