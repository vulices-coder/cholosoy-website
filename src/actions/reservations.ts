"use server";

import { prisma } from "@/lib/db";

export type CreateReservationInput = {
  name: string;
  email: string;
  phone?: string | null;
  guests: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string | null;
  locale?: "de" | "es" | "en";
};

export async function createReservation(input: CreateReservationInput) {
  if (!input.name?.trim()) throw new Error("Name is required");
  if (!input.email?.trim()) throw new Error("Email is required");
  if (!Number.isFinite(input.guests) || input.guests < 1) {
    throw new Error("Guests must be >= 1");
  }
  if (!input.date?.trim()) throw new Error("Date is required");
  if (!input.time?.trim()) throw new Error("Time is required");

  const dateTime = new Date(`${input.date}T${input.time}:00`);

  const reservation = await prisma.reservation.create({
    data: {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim() || null,
      guests: input.guests,
      dateTime,
      notes: input.notes?.trim() || null,
      locale: input.locale ?? "de",
      status: "PENDING",
    },
  });

  return reservation;
}