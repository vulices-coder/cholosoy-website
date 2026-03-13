import type { Locale } from "./menu.data";

type MenuTranslation = {
  name?: string;
  description?: string;
};

type MenuTranslationMap = Record<string, Partial<Record<Locale, MenuTranslation>>>;

export const MENU_TRANSLATIONS: MenuTranslationMap = {
  "ceviche-clasico": {
    es: {
      name: "Ceviche Clásico",
      description:
        "Pescado fresco marinado en una salsa de jugo de limón, rocoto, ajo, jengibre, cilantro y cebolla roja, bañado con leche de tigre. Acompañado de cancha crocante, servido con camote cocido, choclo y ensalada.",
    },
    en: {
      name: "Classic Ceviche",
      description:
        "Fresh fish marinated in a sauce of lime juice, rocoto, garlic, ginger, coriander, and red onion, topped with leche de tigre. Served with crunchy cancha, sweet potato, corn, and salad.",
    },
  },

  "ceviche-trilogie": {
    es: {
      name: "Trilogía de Ceviches",
      description:
        "Clásico: filete de pescado marinado en jugo de limón con cebolla roja, cilantro y rocoto. Nikkei: elegante fusión con salsa de soya, jengibre y aromas asiáticos inspirados en la cocina peruano-japonesa. Ceviche de maracuyá: con un toque fresco y afrutado de limón y maracuyá.",
    },
    en: {
      name: "Ceviche Trilogy",
      description:
        "Classic: fish fillet marinated in lime juice with red onion, coriander, and rocoto chili. Nikkei: an elegant fusion with soy sauce, ginger, and Asian flavors inspired by Japanese-Peruvian cuisine. Passion fruit ceviche: refined with a fresh fruity lime and passion fruit note.",
    },
  },

  "causa-limena": {
    es: {
      name: "Causa Limeña",
      description:
        "Torre de papa sazonada con limón y ají amarillo, rellena de pollo y mayonesa. Fresca, cremosa y llena de sabor peruano.",
    },
    en: {
      name: "Causa Limeña",
      description:
        "Layered potato dish seasoned with lime and ají amarillo, filled with chicken and mayonnaise. Fresh, creamy, and full of Peruvian flavor.",
    },
  },

  "empanada-clasica": {
    es: {
      name: "Empanada Clásica",
      description:
        "Masa casera rellena de carne molida sazonada, cebolla, huevo y pasas; dorada por fuera y sabrosa por dentro. Un toque del Perú que conquista.",
    },
    en: {
      name: "Classic Empanada",
      description:
        "Homemade pastry filled with seasoned minced beef, onion, egg, and raisins, golden on the outside and savory on the inside. A touch of Peru that delights.",
    },
  },

  "papa-rellena": {
    es: {
      name: "Papa Rellena",
      description:
        "Croqueta de papa rellena y frita: crujiente por fuera, intensa por dentro con carne molida, aceitunas, pasas y huevo. Servida con ensalada fresca de cebolla, ají amarillo y salsa. Street food peruano.",
    },
    en: {
      name: "Stuffed Potato",
      description:
        "Stuffed and fried potato croquette, crispy outside and rich inside with minced meat, olives, raisins, and egg. Served with fresh onion ají amarillo salad and sauce. Peruvian street food.",
    },
  },

  anticuchos: {
    es: {
      name: "Anticuchos",
      description:
        "Brochetas de corazón de res a la parrilla, marinadas en salsa de ají y servidas con papas al horno, salsa de rocoto con queso y cebolla china, y crema de ají amarillo.",
    },
    en: {
      name: "Anticuchos",
      description:
        "Grilled beef heart skewers marinated in chili sauce and served with baked potatoes, rocoto cheese spring onion sauce, and ají amarillo cream.",
    },
  },

  "lomo-saltado": {
    es: {
      name: "Lomo Saltado",
      description:
        "Lomo de res salteado con cebolla roja y tomate en salsa de soya, oyster sauce y fondo de carne, terminado con cilantro. Servido con papas fritas crujientes y arroz basmati.",
    },
    en: {
      name: "Lomo Saltado",
      description:
        "Beef loin stir-fried with red onions and tomatoes in soy sauce, oyster sauce, and beef stock, finished with coriander. Served with crispy fries and basmati rice.",
    },
  },

  "aji-de-gallina": {
    es: {
      name: "Ají de Gallina",
      description:
        "Clásico plato peruano con pechuga de pollo tierna en una salsa cremosa de ají amarillo, pan, nueces y queso. Servido con arroz blanco y papas.",
    },
    en: {
      name: "Ají de Gallina",
      description:
        "Classic Peruvian dish with tender chicken breast in a creamy yellow chili sauce made with bread, nuts, and cheese. Served with white rice and potatoes.",
    },
  },

  "arroz-con-pato-a-la-chiclayana": {
    es: {
      name: "Arroz con Pato a la Chiclayana",
      description:
        "Plato tradicional del norte del Perú: pato cocido lentamente en cerveza y salsa de cilantro, servido sobre arroz verde aromático.",
    },
    en: {
      name: "Chiclayo-Style Duck with Rice",
      description:
        "Traditional dish from northern Peru: duck slowly cooked in beer and coriander sauce, served over aromatic green rice.",
    },
  },

  "linguini-a-la-huancaina-con-lomo-saltado": {
    es: {
      name: "Linguini a la Huancaína con Lomo Saltado",
      description:
        "Pasta al dente en salsa cremosa de huancaína con ají amarillo y queso fresco, servida con jugoso lomo salteado con cebolla, tomate y un toque de soya. Una fusión armoniosa de la cocina peruana e italiana.",
    },
    en: {
      name: "Linguini Huancaína with Lomo Saltado",
      description:
        "Al dente pasta in a creamy huancaína sauce with yellow chili and fresh cheese, served with juicy wok-fried beef, onions, tomatoes, and a touch of soy sauce. A harmonious fusion of Peruvian and Italian cuisine.",
    },
  },

  "seco-de-cabrito-con-frijoles": {
    es: {
      name: "Seco de Cabrito con Frijoles",
      description:
        "Plato tradicional del norte del Perú: cabrito tierno cocido lentamente en una salsa especiada de cilantro y chicha, servido con frijoles cremosos y arroz blanco. Aromático, intenso y lleno de historia.",
    },
    en: {
      name: "Goat Stew with Beans",
      description:
        "Traditional dish from northern Peru: tender young goat slowly braised in a spiced coriander and chicha sauce, served with creamy beans and white rice. Aromatic, rich, and full of history.",
    },
  },

  "dorada-frita-a-lo-macho": {
    es: {
      name: "Dorada Frita a lo Macho",
      description:
        "Dorada frita y crujiente, servida con mariscos en una salsa intensa de cilantro y chicha. Acompañada de arroz blanco. Aromática, potente y llena de sabor.",
    },
    en: {
      name: "Fried Sea Bream a lo Macho",
      description:
        "Crispy fried sea bream served with seafood in a bold coriander and chicha sauce. Accompanied by white rice. Aromatic, powerful, and full of flavor.",
    },
  },

  "arroz-con-leche-y-mazamorra": {
    es: {
      name: "Arroz con Leche y Mazamorra",
      description:
        "Arroz con leche acompañado de mazamorra morada: un postre clásico limeño.",
    },
    en: {
      name: "Rice Pudding and Purple Corn Pudding",
      description:
        "Rice pudding served with purple corn pudding, a classic dessert from Lima.",
    },
  },

  picarones: {
    es: {
      name: "Picarones",
      description:
        "Aros fritos de zapallo y camote, servidos con miel aromática de chancaca.",
    },
    en: {
      name: "Picarones",
      description:
        "Fried rings made from pumpkin and sweet potato, served with fragrant sugar cane syrup.",
    },
  },

  "leche-asada": {
    es: {
      name: "Leche Asada",
      description:
        "Postre tradicional hecho con leche, huevos y azúcar, con una fina costra dorada.",
    },
    en: {
      name: "Baked Milk Custard",
      description:
        "Traditional dessert made from milk, eggs, and sugar with a delicate golden crust.",
    },
  },

  flan: {
    es: {
      name: "Flan",
      description:
        "Suave pudín de huevo con caramelo, un clásico de la repostería casera.",
    },
    en: {
      name: "Flan",
      description:
        "Soft egg custard with caramel, a classic homemade dessert.",
    },
  },

  "pie-de-limon": {
    es: {
      name: "Pie de Limón",
      description:
        "Base crocante de galleta con relleno cremoso de limón y merengue aireado: un clásico refrescante del Perú.",
    },
    en: {
      name: "Lemon Pie",
      description:
        "Crunchy biscuit base with creamy lemon filling and airy meringue, a refreshing Peruvian classic.",
    },
  },

  "torta-de-chocolate": {
    es: {
      name: "Torta de Chocolate",
      description:
        "Torta peruana de chocolate: húmeda, intensa y cubierta con cremosa capa de chocolate. Un clásico favorito en cualquier celebración.",
    },
    en: {
      name: "Chocolate Cake",
      description:
        "Peruvian chocolate cake: moist, rich, and topped with a creamy chocolate glaze. A favorite classic for any celebration.",
    },
  },

  "chicha-morada-glas-04": {
    es: {
      name: "Chicha Morada Vaso 0,4 l",
      description:
        "Bebida tradicional refrescante de maíz morado, frutas y especias, servida fría.",
    },
    en: {
      name: "Chicha Morada Glass 0.4 l",
      description:
        "Traditional refreshing drink made from purple corn, fruits, and spices, served cold.",
    },
  },

  "chicha-morada-kanne-12": {
    es: {
      name: "Chicha Morada Jarra 1,2 l",
      description:
        "Bebida tradicional refrescante de maíz morado, frutas y especias, ideal para compartir, servida fría.",
    },
    en: {
      name: "Chicha Morada Jug 1.2 l",
      description:
        "Traditional refreshing drink made from purple corn, fruits, and spices, ideal for sharing, served cold.",
    },
  },

  "pisco-sour": {
    es: {
      name: "Pisco Sour",
      description:
        "El famoso cóctel emblemático del Perú con pisco, jugo de limón, jarabe de azúcar, clara de huevo y un toque de amargo de angostura. Fresco, espumoso e inconfundible.",
    },
    en: {
      name: "Pisco Sour",
      description:
        "Peru’s iconic cocktail made with pisco, lime juice, sugar syrup, egg white, and a touch of Angostura bitters. Fresh, frothy, and unmistakable.",
    },
  },

  "chilcano-de-pisco": {
    es: {
      name: "Chilcano de Pisco",
      description:
        "Cóctel refrescante de pisco, ginger ale, jugo de limón y un toque de amargo de angostura: ligero, burbujeante y típicamente peruano.",
    },
    en: {
      name: "Chilcano de Pisco",
      description:
        "Refreshing cocktail with pisco, ginger ale, lime juice, and a touch of Angostura bitters: light, sparkling, and typically Peruvian.",
    },
  },

  "bier-vom-fass": {
    es: {
      name: "Cerveza de Barril",
      description: "Schultheiss Pilsner de barril.",
    },
    en: {
      name: "Draft Beer",
      description: "Schultheiss Pilsner on tap.",
    },
  },
};

export function getTranslatedMenuField(
  slug: string,
  locale: Locale,
  field: "name" | "description",
  fallback: string | null
) {
  if (locale === "de") return fallback;

  return MENU_TRANSLATIONS[slug]?.[locale]?.[field] ?? fallback;
}