export const KARTE_SECTIONS = ["vorspeisen", "hauptspeisen", "desserts", "getraenke"] as const;
export type KarteSection = (typeof KARTE_SECTIONS)[number];

export const SECTION_LABEL: Record<KarteSection, string> = {
  vorspeisen: "VORSPEISEN",
  hauptspeisen: "HAUPTSPEISEN",
  desserts: "DESSERTS",
  getraenke: "GETRÄNKE",
};

