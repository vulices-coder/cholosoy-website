import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

type EventStatusFilter = "ALL" | "DRAFT" | "PUBLISHED" | "CANCELED";
type EventSort = "date-asc" | "date-desc" | "created-desc";
type Locale = "de" | "es" | "en";

export async function getEvents() {
  return prisma.event.findMany({
    orderBy: {
      date: "asc",
    },
    include: {
      translations: true,
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
    include: {
      translations: true,
    },
  });
}

export async function getUpcomingPublishedEvents(locale?: Locale) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const events = await prisma.event.findMany({
    where: {
      status: "PUBLISHED",
      date: {
        gte: today,
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      translations: true,
    },
  });

  if (!locale) return events;

  return events.map((event) => {
    const translation = event.translations.find((t) => t.locale === locale);

    return {
      ...event,
      title: translation?.title ?? event.title,
      description: translation?.description ?? event.description,
    };
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
    include: {
      translations: true,
    },
  });
}

export async function duplicateEventById(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      translations: true,
    },
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
      translations: {
        create: event.translations.map((translation) => ({
          locale: translation.locale,
          title: `${translation.title} (Copy)`,
          description: translation.description,
        })),
      },
    },
  });
}

export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: {
      slug,
    },
    include: {
      translations: true,
    },
  });
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      translations: true,
    },
  });
}