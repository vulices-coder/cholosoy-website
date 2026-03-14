"use server";

import { prisma } from "@/lib/db";
import { eventSchema } from "@/lib/validations/event";
import { uploadEventImage } from "@/lib/supabase-storage";

export type CreateEventState = {
  success: boolean;
  error?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createEventAction(
  _prevState: CreateEventState,
  formData: FormData
): Promise<CreateEventState> {
  try {
    const title = String(formData.get("title") || "");
    const slugInput = String(formData.get("slug") || "");
    const description = String(formData.get("description") || "");
    const date = String(formData.get("date") || "");
    const location = String(formData.get("location") || "");
    const status = String(formData.get("status") || "DRAFT") as
      | "DRAFT"
      | "PUBLISHED"
      | "CANCELED";

    const fileEntry = formData.get("image");
    let imageUrl = "";

    if (fileEntry instanceof File && fileEntry.size > 0) {
      const uploaded = await uploadEventImage(fileEntry);
      imageUrl = uploaded.publicUrl;
    }

    const raw = {
      title,
      slug: slugInput ? slugify(slugInput) : slugify(title),
      description,
      date,
      location,
      imageUrl,
      status,
    };

    const parsed = eventSchema.safeParse(raw);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Invalid form data",
      };
    }

    const created = await prisma.event.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        description: parsed.data.description || null,
        date: new Date(parsed.data.date),
        location: parsed.data.location || null,
        imageUrl: parsed.data.imageUrl || null,
        status: parsed.data.status,
      },
    });

    console.log("STEP prisma create ok:", created.id);

    return { success: true };
  } catch (error) {
    console.error("createEventAction REAL ERROR:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not create event",
    };
  }
}