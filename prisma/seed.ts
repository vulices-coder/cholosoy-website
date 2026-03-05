// prisma/seed.ts
import { prisma } from "@/lib/db";

async function main() {
  // EVENTS
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

  // MENU
  await prisma.menuItem.upsert({
    where: { slug: "lomo-saltado" },
    update: {
      name: "Lomo Saltado",
      description: "Clásico peruano salteado.",
      price: 15.9,
      category: "MAINS",
      imageUrl: "/images/home/lomo.jpg",
    },
    create: {
      name: "Lomo Saltado",
      slug: "lomo-saltado",
      description: "Clásico peruano salteado.",
      price: 15.9,
      category: "MAINS",
      imageUrl: "/images/home/lomo.jpg",
    },
  });

  await prisma.menuItem.upsert({
    where: { slug: "chicha-morada" },
    update: {
      name: "Chicha Morada",
      description: "Bebida tradicional.",
      price: 4.5,
      category: "DRINKS",
      imageUrl: "/images/home/chicha.jpg",
    },
    create: {
      name: "Chicha Morada",
      slug: "chicha-morada",
      description: "Bebida tradicional.",
      price: 4.5,
      category: "DRINKS",
      imageUrl: "/images/home/chicha.jpg",
    },
  });

  // GALLERY
  await prisma.galleryImage.createMany({
    data: [
      {
        url: "/images/gallery/1.jpg",
        category: "food",
        alt: "Plato peruano",
      },
      {
        url: "/images/gallery/2.jpg",
        category: "restaurant",
        alt: "Interior",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });