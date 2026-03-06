import { prisma } from "@/lib/db";

export async function getMenuItems() {
  return prisma.menuItem.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
}

export async function getMenuByCategory(category: string) {
  return prisma.menuItem.findMany({
    where: { category },
    orderBy: { name: "asc" },
  });
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