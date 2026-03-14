import { prisma } from "@/lib/db";

export async function getEvents() {
  return prisma.event.findMany({
    orderBy: {
      date: "asc",
    },
  });
}

export async function getPublishedEvents() {
  return prisma.event.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      date: "asc",
    },
  });
}

export async function getUpcomingPublishedEvents() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return prisma.event.findMany({
    where: {
      status: "PUBLISHED",
      date: {
        gte: today,
      },
    },
    orderBy: {
      date: "asc",
    },
  });
}

export async function getAdminEvents() {
  return prisma.event.findMany({
    orderBy: {
      date: "desc",
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