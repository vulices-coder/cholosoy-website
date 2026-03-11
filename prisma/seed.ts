import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.event.upsert({
    where: { slug: "opening-night" },
    update: {
      title: "Opening Night",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: "CholoSoy — Berlin",
      imageUrl: "/images/events/opening.jpg",
    },
    create: {
      title: "Opening Night",
      slug: "opening-night",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: "CholoSoy — Berlin",
      imageUrl: "/images/events/opening.jpg",
    },
  });

  const menuItems = [
    // VORSPEISEN
    {
      slug: "ceviche-clasico",
      name: "Ceviche Clásico",
      description:
        "Frischer Fisch mariniert in einer Sauce aus Limettensaft, Rocoto, Knoblauch, Ingwer, Koriander und roten Zwiebeln – übergossen mit Leche de Tigre. Dazu gerösteter Cancha-Creme, serviert auf gekochter Süßkartoffel, Maiskolben und Salat.",
      price: 9.5,
      category: "vorspeisen",
      imageUrl: "/images/home/ceviche.png",
    },
    {
      slug: "ceviche-trilogie",
      name: "Ceviche Trilogie",
      description:
        "Klassisch: Fischfilet mariniert in Limettensaft mit roter Zwiebel, Koriander und Rocoto (Chili). Nikkei: Eine elegante Fusion mit Sojasauce, Ingwer und asiatischen Aromen – inspiriert von der japanisch-peruanischen Küche. Maracuya-Ceviche: verfeinert mit einer fruchtig-frischen Limetten- und Maracuya-Note.",
      price: 9.5,
      category: "vorspeisen",
      imageUrl: "/images/home/ceviche.png",
    },
    {
      slug: "causa-limena",
      name: "Causa Limeña",
      description:
        "Schichttorte, gewürzt mit Limetten und Ají Amarillo, gefüllt mit Hühnchen und Mayonnaise. Frisch, cremig und voller peruanischem Geschmack.",
      price: 6.5,
      category: "vorspeisen",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "empanada-clasica",
      name: "Empanada Clásica",
      description:
        "Hausgemachte Teigtasche, gefüllt mit gewürztem Rinderhack, Zwiebeln, Ei und Rosinen – außen goldbraun gebacken, innen herzhaft. Ein Hauch Peru, der begeistert.",
      price: 7.5,
      category: "vorspeisen",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "papa-rellena",
      name: "Papa Rellena",
      description:
        "Gefüllter und gebratener Kartoffelkloß – außen knusprig, innen vollmundig mit herzhafter Hackfleisch-Füllung, Oliven, Rosinen und Ei. Serviert mit einem frischen Zwiebel-Ají-Amarillo-Salat und Salsa. Peruanisches Streetfood.",
      price: 6.5,
      category: "vorspeisen",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "anticuchos",
      name: "Anticuchos",
      description:
        "Gegrillte Spieße aus Rinderherz, mariniert auf der Chilisauce und serviert mit Ofenkartoffeln, Rocoto-Käse-Frühlingszwiebel-Sauce und Ají-Amarillo-Creme.",
      price: 9.5,
      category: "vorspeisen",
      imageUrl: "/images/home/perufood.png",
    },

    // HAUPTSPEISEN
    {
      slug: "lomo-saltado",
      name: "Lomo Saltado",
      description:
        "Rinderlende, streifen mit rote Zwiebeln & Tomaten gebratene mit Soja-, Oyster Sauce und rote Rinderbrühe mit feine Koriander serviert auf knusprige Pommes frites und Basmatireis.",
      price: 19.5,
      category: "hauptspeisen",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "aji-de-gallina",
      name: "Ají de Gallina",
      description:
        "Klassische peruanisches Gericht mit zarte Hühnerbrust in einer cremigen Sauce aus gelber Chili (Ají Amarillo), Brot, Nüssen und Käse. Serviert mit weißen Reis und Kartoffeln.",
      price: 12.5,
      category: "hauptspeisen",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "arroz-con-pato-a-la-chiclayana",
      name: "Arroz con Pato a la Chiclayana",
      description:
        "Traditionelles Gericht aus Nordperu: Ente langsam in Bier und Koriandersauce gegart, serviert auf aromatischem grünem Reis.",
      price: 15.5,
      category: "hauptspeisen",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "linguini-a-la-huancaina-con-lomo-saltado",
      name: "Linguini a la Huancaína con Lomo Saltado",
      description:
        "Al dente gekochte Pasta in einer cremigen Huacaina-Sauce aus gelber Chili und Frischkäse, serviert mit saftigem Rindfleisch, im Wok gebraten mit Zwiebeln, Tomaten und einem Hauch Sojasauce. Eine harmonische Fusion aus peruanischer und italienischer Küche.",
      price: 17.5,
      category: "hauptspeisen",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "seco-de-cabrito-con-frijoles",
      name: "Seco de Cabrito con Frijoles",
      description:
        "Ein traditionelles Gericht aus Nordperu: zartes Zicklein langsam geschmort in einer würzigen Koriander-Chicha-Sauce, serviert mit cremigen Bohnen und weißem Reis. Aromatisch, kräftig und voller Geschichte.",
      price: 17.5,
      category: "hauptspeisen",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "dorada-frita-a-lo-macho",
      name: "Dorada Frita a lo Macho",
      description:
        "Knusprig gebratene Dorade, serviert mit Meeresfrüchten in einer würzigen Koriander-Chicha-Sauce. Dazu weißer Reis. Aromatisch, kräftig und voller Geschmack.",
      price: 19.5,
      category: "hauptspeisen",
      imageUrl: "/images/home/perufood.png",
    },

    // DESSERTS
    {
      slug: "arroz-con-leche-y-mazamorra",
      name: "Arroz con Leche y Mazamorra",
      description:
        "Milchreis mit lila Maispudding – ein klassisches Dessert aus Lima.",
      price: 6.5,
      category: "desserts",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "picarones",
      name: "Picarones",
      description:
        "Frittierte Teigringe aus Kürbis und Süßkartoffel, serviert mit duftendem Rohrzuckersirup.",
      price: 8.5,
      category: "desserts",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "leche-asada",
      name: "Leche Asada",
      description:
        "Traditionelles Dessert aus Milch, Eiern und Zucker mit einer zarten goldbraunen Kruste.",
      price: 6.5,
      category: "desserts",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "flan",
      name: "Flan",
      description:
        "Zarter Eierpudding mit Karamell, ein Klassiker der heimischen Dessertküche.",
      price: 6.5,
      category: "desserts",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "pie-de-limon",
      name: "Pie de Limón",
      description:
        "Knuspriger Keksboden mit cremiger Zitronenfüllung und luftigem Baiser – ein erfrischender Klassiker aus Peru.",
      price: 8.5,
      category: "desserts",
      imageUrl: "/images/home/perufood.png",
    },
    {
      slug: "torta-de-chocolate",
      name: "Torta de Chocolate",
      description:
        "Peruanischer Schokoladenkuchen – saftig, intensiv schokoladig und mit cremigem Schokoguss – ein beliebter Klassiker bei jeder Feier.",
      price: 8.5,
      category: "desserts",
      imageUrl: "/images/home/perufood.png",
    },

    // GETRÄNKE
    {
      slug: "chicha-morada-glas-04",
      name: "Chicha Morada Glas 0,4 l",
      description:
        "Traditionelles Erfrischungsgetränk aus violettem Mais, Früchten und Gewürzen – kalt serviert.",
      price: 3.5,
      category: "getraenke",
      imageUrl: "/images/home/piscosour.png",
    },
    {
      slug: "chicha-morada-kanne-12",
      name: "Chicha Morada Kanne 1,2 l",
      description:
        "Traditionelles Erfrischungsgetränk aus violettem Mais, Früchten und Gewürzen – ideal zum Teilen, kalt serviert.",
      price: 9.5,
      category: "getraenke",
      imageUrl: "/images/home/piscosour.png",
    },
    {
      slug: "pisco-sour",
      name: "Pisco Sour",
      description:
        "Perus berühmter Kult-Cocktail mit Pisco, Limettensaft, Zuckersirup, Eiweiß und einem Hauch Angostura-Bitter. Frisch, schaumig und unverwechselbar.",
      price: 8.5,
      category: "getraenke",
      imageUrl: "/images/home/piscosour.png",
    },
    {
      slug: "chilcano-de-pisco",
      name: "Chilcano de Pisco",
      description:
        "Erfrischender Cocktail aus Pisco, Ginger Ale, Limettensaft und einem Hauch Angostura-Bitter – leicht, spritzig und typisch peruanisch.",
      price: 6.5,
      category: "getraenke",
      imageUrl: "/images/home/piscosour.png",
    },
    {
      slug: "bier-vom-fass",
      name: "Bier vom Fass",
      description: "Schultheiss Pilsner vom Fass.",
      price: 5.5,
      category: "getraenke",
      imageUrl: "/images/home/piscosour.png",
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }

  await prisma.galleryImage.createMany({
    data: [
      {
        url: "/images/gallery/01.png",
        category: "food",
        alt: "Plato peruano",
      },
      {
        url: "/images/gallery/02.png",
        category: "restaurant",
        alt: "Interior del restaurante",
      },
      {
        url: "/images/gallery/03.png",
        category: "food",
        alt: "Especialidad peruana",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed finished");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });