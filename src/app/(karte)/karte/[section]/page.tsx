import KartePage from "@/components/sections/karte/KartePage";
import { KARTE_SECTIONS, type KarteSection } from "@/components/sections/karte/menu.data";
import { getMenuByCategory } from "@/lib/queries/menu";
import { notFound } from "next/navigation";

export default async function KarteSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!KARTE_SECTIONS.includes(section as KarteSection)) {
    notFound();
  }

  const items = await getMenuByCategory(section);

  return <KartePage section={section as KarteSection} items={items} />;
}