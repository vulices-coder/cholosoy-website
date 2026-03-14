import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export type EventInput = z.infer<typeof eventSchema>;