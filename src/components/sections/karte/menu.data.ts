export const KARTE_SECTIONS = ["vorspeisen", "hauptspeisen", "desserts", "getraenke"] as const;
export type KarteSection = (typeof KARTE_SECTIONS)[number];
export type Locale = "de" | "es" | "en";

export const SECTION_LABELS: Record<Locale, Record<KarteSection, string>> = {
  de: {
    vorspeisen: "VORSPEISEN",
    hauptspeisen: "HAUPTSPEISEN",
    desserts: "DESSERTS",
    getraenke: "GETRÄNKE",
  },
  es: {
    vorspeisen: "ENTRADAS",
    hauptspeisen: "PLATOS PRINCIPALES",
    desserts: "POSTRES",
    getraenke: "BEBIDAS",
  },
  en: {
    vorspeisen: "STARTERS",
    hauptspeisen: "MAIN COURSES",
    desserts: "DESSERTS",
    getraenke: "DRINKS",
  },
};

// // MVP: texto dummy (luego lo reemplazas por el menú real)
// export const MENU_ITEMS: Record<KarteSection, { name: string; desc?: string; price?: string }[]> = {
//   vorspeisen: [
//     { name: "Ceviche Clásico", desc: "Fisch, Limette, Zwiebel, Mais", price: "€ 9,90" },
//     { name: "Papa Rellena", desc: "Gefüllt mit Rindfleisch", price: "€ 7,50" },
//   ],
//   hauptspeisen: [
//     { name: "Lomo Saltado", desc: "Rind, Sojasauce, Kartoffeln", price: "€ 15,90" },
//     { name: "Ají de Gallina", desc: "Cremig, mild, mit Reis", price: "€ 14,50" },
//   ],
//   desserts: [
//     { name: "Suspiro Limeño", desc: "Karamellcreme, Baiser", price: "€ 6,90" },
//     { name: "Picarones", desc: "Süße Kürbis-Donuts", price: "€ 6,50" },
//   ],
//   getraenke: [
//     { name: "Chicha Morada", desc: "Maisgetränk, kalt", price: "€ 4,50" },
//     { name: "Pisco Sour", desc: "Peruanischer Klassiker", price: "€ 8,50" },
//   ],
// };