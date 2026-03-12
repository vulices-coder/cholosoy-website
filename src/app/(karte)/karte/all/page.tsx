import KartePage from "@/components/sections/karte/KartePage";
import { KARTE_SECTIONS } from "@/components/sections/karte/menu.data";
import { getMenuItems } from "@/lib/queries/menu";
import styles from "./Page.module.scss";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function KarteAllPage() {
  const allItems = await getMenuItems();

  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        {KARTE_SECTIONS.map((section) => {
          const items = allItems.filter((item) => item.category === section);

          return (
            <div key={section} className={styles.card}>
              <KartePage section={section} items={items} />
            </div>
          );
        })}
      </div>
    </main>
  );
}