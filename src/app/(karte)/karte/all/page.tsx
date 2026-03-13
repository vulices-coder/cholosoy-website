import KartePage from "@/components/sections/karte/KartePage";
import { KARTE_SECTIONS, type Locale } from "@/components/sections/karte/menu.data";
import { getMenuItems } from "@/lib/queries/menu";
import styles from "./Page.module.scss";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getLocaleFromCookie(): Promise<Locale> {
  const store = await cookies();
  const raw = store.get("cholosoy_locale")?.value?.toLowerCase();

  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

export default async function KarteAllPage() {
  const [allItems, locale] = await Promise.all([
    getMenuItems(),
    getLocaleFromCookie(),
  ]);

  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        {KARTE_SECTIONS.map((section) => {
          const items = allItems.filter((item) => item.category === section);

          return (
            <div key={section} className={styles.card}>
              <KartePage section={section} items={items} locale={locale} />
            </div>
          );
        })}
      </div>
    </main>
  );
}