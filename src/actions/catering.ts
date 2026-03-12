"use server";

import { prisma } from "@/lib/db";

export type CreateCateringRequestInput = {
  name: string;
  email: string;
  phone?: string | null;
  eventDate: string;
  location?: string | null;
  people: number;
  budget?: number | null;
  message?: string | null;
  locale?: "de" | "es" | "en";
};

export async function createCateringRequest(input: CreateCateringRequestInput) {
  if (!input.name?.trim()) throw new Error("NAME_REQUIRED");
  if (!input.email?.trim()) throw new Error("EMAIL_REQUIRED");
  if (!input.eventDate?.trim()) throw new Error("EVENT_DATE_REQUIRED");
  if (!Number.isFinite(input.people) || input.people < 1) {
    throw new Error("PEOPLE_INVALID");
  }

  const request = await prisma.cateringRequest.create({
    data: {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim() || null,
      eventDate: new Date(`${input.eventDate}T00:00:00`),
      location: input.location?.trim() || null,
      people: input.people,
      budget: input.budget ?? null,
      message: input.message?.trim() || null,
      locale: input.locale ?? "de",
      status: "NEW",
    },
  });

  return request;
}