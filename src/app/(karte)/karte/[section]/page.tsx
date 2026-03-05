import KartePage from "@/components/sections/karte/KartePage";
import { KARTE_SECTIONS, type KarteSection } from "@/components/sections/karte/menu.data";
import { notFound } from "next/navigation";

export default async function KarteSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!KARTE_SECTIONS.includes(section as any)) notFound();

  return <KartePage section={section as KarteSection} />;
}