import KartePage from "@/components/sections/karte/KartePage";
import { KARTE_SECTIONS } from "@/components/sections/karte/menu.data";

export default function KarteAllPage() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      {KARTE_SECTIONS.map((s) => (
        <KartePage key={s} section={s} />
      ))}
    </div>
  );
}