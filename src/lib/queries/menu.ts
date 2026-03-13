import { prisma } from "@/lib/db";

export async function getMenuItems() {
  const items = await prisma.menuItem.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  console.log("getMenuItems:", items.length);

  return items;
}

export async function getMenuByCategory(category: string) {
  const items = await prisma.menuItem.findMany({
    where: { category },
    orderBy: { name: "asc" },
  });

  console.log("getMenuByCategory:", category, items.length);

  return items;
}

export async function getMenuItemBySlug(slug: string) {
  return prisma.menuItem.findUnique({
    where: { slug },
  });
}

export async function getMenuItemById(id: string) {
  return prisma.menuItem.findUnique({
    where: { id },
  });
}