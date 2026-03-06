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
    {
      slug: "ceviche-clasico",
      name: "Ceviche Clásico",
      description: "Fisch, Limette, Zwiebel, Mais",
      price: 9.9,
      category: "vorspeisen",
      imageUrl: "/images/home/ceviche.jpg",
    },
    {
      slug: "papa-rellena",
      name: "Papa Rellena",
      description: "Gefüllt mit Rindfleisch",
      price: 7.5,
      category: "vorspeisen",
      imageUrl: "/images/home/food.jpg",
    },
    {
      slug: "lomo-saltado",
      name: "Lomo Saltado",
      description: "Rind, Sojasauce, Kartoffeln",
      price: 15.9,
      category: "hauptspeisen",
      imageUrl: "/images/home/food.jpg",
    },
    {
      slug: "aji-de-gallina",
      name: "Ají de Gallina",
      description: "Cremig, mild, mit Reis",
      price: 14.5,
      category: "hauptspeisen",
      imageUrl: "/images/home/food.jpg",
    },
    {
      slug: "suspiro-limeno",
      name: "Suspiro Limeño",
      description: "Karamellcreme, Baiser",
      price: 6.9,
      category: "desserts",
      imageUrl: "/images/home/food.jpg",
    },
    {
      slug: "picarones",
      name: "Picarones",
      description: "Süße Kürbis-Donuts",
      price: 6.5,
      category: "desserts",
      imageUrl: "/images/home/food.jpg",
    },
    {
      slug: "chicha-morada",
      name: "Chicha Morada",
      description: "Maisgetränk, kalt",
      price: 4.5,
      category: "getraenke",
      imageUrl: "/images/home/pisco.jpg",
    },
    {
      slug: "pisco-sour",
      name: "Pisco Sour",
      description: "Peruanischer Klassiker",
      price: 8.5,
      category: "getraenke",
      imageUrl: "/images/home/pisco.jpg",
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
        url: "/images/gallery/01.jpg",
        category: "food",
        alt: "Plato peruano",
      },
      {
        url: "/images/gallery/02.jpg",
        category: "restaurant",
        alt: "Interior del restaurante",
      },
      {
        url: "/images/gallery/03.jpg",
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