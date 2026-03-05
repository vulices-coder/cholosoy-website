import { prisma } from "@/lib/db";

export async function getCateringRequests() {
  return prisma.cateringRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getCateringRequestById(id: string) {
  return prisma.cateringRequest.findUnique({ where: { id } });
}