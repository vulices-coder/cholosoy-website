import { prisma } from "@/lib/db";

export async function getMenuItems() {
  try {
    return await prisma.menuItem.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
  } catch (error) {
    console.error("getMenuItems failed:", error);
    return [];
  }
}

export async function getMenuByCategory(category: string) {
  try {
    return await prisma.menuItem.findMany({
      where: { category },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("getMenuByCategory failed:", error);
    return [];
  }
}

export async function getMenuItemBySlug(slug: string) {
  try {
    return await prisma.menuItem.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error("getMenuItemBySlug failed:", error);
    return null;
  }
}

export async function getMenuItemById(id: string) {
  try {
    return await prisma.menuItem.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("getMenuItemById failed:", error);
    return null;
  }
}