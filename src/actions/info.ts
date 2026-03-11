"use server";

import { prisma } from "@/lib/db";

export type CreateInfoRequestInput = {
  name: string;
  email: string;
  reason: string;
  message: string;
  locale?: "de" | "es" | "en";
};

export async function createInfoRequest(input: CreateInfoRequestInput) {
  if (!input.name?.trim()) throw new Error("Name is required");
  if (!input.email?.trim()) throw new Error("Email is required");
  if (!/\S+@\S+\.\S+/.test(input.email)) throw new Error("Email is invalid");
  if (!input.reason?.trim()) throw new Error("Reason is required");
  if (!input.message?.trim()) throw new Error("Message is required");

  const infoRequest = await prisma.infoRequest.create({
    data: {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      reason: input.reason.trim(),
      message: input.message.trim(),
      locale: input.locale ?? "de",
    },
  });

  return infoRequest;
}