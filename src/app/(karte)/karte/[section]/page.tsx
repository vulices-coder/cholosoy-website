import KartePage from "@/components/sections/karte/KartePage";
import { KARTE_SECTIONS, type KarteSection, type Locale } from "@/components/sections/karte/menu.data";
import { getMenuByCategory } from "@/lib/queries/menu";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getLocaleFromCookie(): Promise<Locale> {
  const store = await cookies();
  const raw = store.get("cholosoy_locale")?.value?.toLowerCase();

  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

export default async function KarteSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!KARTE_SECTIONS.includes(section as KarteSection)) {
    notFound();
  }

  const [items, locale] = await Promise.all([
    getMenuByCategory(section),
    getLocaleFromCookie(),
  ]);

  return <KartePage section={section as KarteSection} items={items} locale={locale} />;
}