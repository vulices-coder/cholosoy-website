import KartePage from "@/components/sections/karte/KartePage";
import { KARTE_SECTIONS } from "@/components/sections/karte/menu.data";
import { getMenuItems } from "@/lib/queries/menu";

export default async function KarteAllPage() {
  const allItems = await getMenuItems();

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {KARTE_SECTIONS.map((section) => {
        const items = allItems.filter((item) => item.category === section);

        return <KartePage key={section} section={section} items={items} />;
      })}
    </div>
  );
}