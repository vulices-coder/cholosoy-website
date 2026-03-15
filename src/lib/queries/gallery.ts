import { prisma } from "@/lib/db";

export async function getGalleryImages() {
  return prisma.galleryImage.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getGalleryImageById(id: string) {
  return prisma.galleryImage.findUnique({
    where: {
      id,
    },
  });
}

export async function getGalleryImagesByCategory(category: string) {
  return prisma.galleryImage.findMany({
    where: {
      category,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}