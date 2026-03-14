import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

type EventStatusFilter = "ALL" | "DRAFT" | "PUBLISHED" | "CANCELED";
type EventSort = "date-asc" | "date-desc" | "created-desc";

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

export async function getAdminEvents(options?: {
  status?: EventStatusFilter;
  sort?: EventSort;
}) {
  const status = options?.status ?? "ALL";
  const sort = options?.sort ?? "date-asc";

  const where: Prisma.EventWhereInput =
    status === "ALL"
      ? {}
      : {
          status,
        };

  const orderBy: Prisma.EventOrderByWithRelationInput =
    sort === "date-desc"
      ? { date: "desc" }
      : sort === "created-desc"
      ? { createdAt: "desc" }
      : { date: "asc" };

  return prisma.event.findMany({
    where,
    orderBy,
  });
}

export async function duplicateEventById(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  const duplicatedDate = new Date(event.date);
  duplicatedDate.setDate(duplicatedDate.getDate() + 7);

  return prisma.event.create({
    data: {
      title: `${event.title} (Copy)`,
      slug: `${event.slug}-copy-${Date.now()}`,
      description: event.description,
      date: duplicatedDate,
      location: event.location,
      imageUrl: event.imageUrl,
      status: "DRAFT",
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