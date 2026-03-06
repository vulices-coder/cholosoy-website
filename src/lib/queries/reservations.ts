import { prisma } from "@/lib/db";

export async function getReservations() {
  return prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getReservationById(id: string) {
  return prisma.reservation.findUnique({
    where: { id },
  });
}