import { z } from "zod";

const translationSchema = z.object({
  locale: z.enum(["de", "es", "en"]),
  title: z.string().min(1, "Translated title is required"),
  description: z.string().optional(),
});

export const eventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "CANCELED"]).default("DRAFT"),
  translations: z.array(translationSchema).default([]),
});

export type EventInput = z.infer<typeof eventSchema>;