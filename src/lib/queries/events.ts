import { prisma } from "@/lib/db";

export async function getEvents() {
  return prisma.event.findMany({
    orderBy: {
      date: "asc",
    },
  });
}

export async function getUpcomingEvents() {
  return prisma.event.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
  });
}

export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: {
      slug,
    },
  });
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({
    where: {
      id,
    },
  });
}