"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./KartePage.module.scss";
import { MENU_ITEMS, SECTION_LABEL, type KarteSection } from "./menu.data";
import KarteToolbar from "./KarteToolbar";

export default function KartePage({ section }: { section: KarteSection }) {
  const [zoom, setZoom] = useState(1);

  const items = useMemo(() => MENU_ITEMS[section], [section]);

  return (
    <div className={styles.sheetWrap}>
      <div className={styles.sheet} style={{ ["--zoom" as any]: zoom }}>
        <div className={styles.header}>
          <Link href="/home" aria-label="Zur Home">
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

        <ul className={styles.list}>
          {items.map((it) => (
            <li key={it.name} className={styles.item}>
              <div className={styles.left}>
                <div className={styles.name}>{it.name}</div>
                {it.desc ? <div className={styles.desc}>{it.desc}</div> : null}
              </div>
              {it.price ? <div className={styles.price}>{it.price}</div> : null}
            </li>
          ))}
        </ul>

        <div className={styles.toolbarDock}>
          <KarteToolbar section={section} zoom={zoom} setZoom={setZoom} />
        </div>
      </div>
    </div>
  );
}