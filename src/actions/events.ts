"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { eventSchema } from "@/lib/validations/event";
import { uploadEventImage } from "@/lib/supabase-storage";
import { duplicateEventById } from "@/lib/queries/events";

export type CreateEventState = {
  success: boolean;
  error?: string;
};

export type UpdateEventState = {
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

    await prisma.event.create({
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

    revalidatePath("/admin/events");
    revalidatePath("/de/veranstaltung");
    revalidatePath("/es/veranstaltung");
    revalidatePath("/en/veranstaltung");

    return { success: true };
  } catch (error) {
    console.error("createEventAction error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not create event",
    };
  }
}

export async function updateEventAction(
  eventId: string,
  _prevState: UpdateEventState,
  formData: FormData
): Promise<UpdateEventState> {
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

    const currentEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!currentEvent) {
      return {
        success: false,
        error: "Event not found",
      };
    }

    const fileEntry = formData.get("image");
    let imageUrl = currentEvent.imageUrl || "";

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

    await prisma.event.update({
      where: { id: eventId },
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

    revalidatePath("/admin/events");
    revalidatePath("/de/veranstaltung");
    revalidatePath("/es/veranstaltung");
    revalidatePath("/en/veranstaltung");

    return { success: true };
  } catch (error) {
    console.error("updateEventAction error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not update event",
    };
  }
}

export async function cancelEventAction(eventId: string) {
  try {
    await prisma.event.update({
      where: { id: eventId },
      data: {
        status: "CANCELED",
      },
    });

    revalidatePath("/admin/events");
    revalidatePath("/de/veranstaltung");
    revalidatePath("/es/veranstaltung");
    revalidatePath("/en/veranstaltung");

    return { success: true };
  } catch (error) {
    console.error("cancelEventAction error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not cancel event",
    };
  }
}

export async function publishEventAction(eventId: string) {
  try {
    await prisma.event.update({
      where: { id: eventId },
      data: {
        status: "PUBLISHED",
      },
    });

    revalidatePath("/admin/events");
    revalidatePath("/de/veranstaltung");
    revalidatePath("/es/veranstaltung");
    revalidatePath("/en/veranstaltung");

    return { success: true };
  } catch (error) {
    console.error("publishEventAction error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not publish event",
    };
  }
}

export async function deleteEventAction(eventId: string) {
  try {
    await prisma.event.delete({
      where: { id: eventId },
    });

    revalidatePath("/admin/events");
    revalidatePath("/de/veranstaltung");
    revalidatePath("/es/veranstaltung");
    revalidatePath("/en/veranstaltung");

    return { success: true };
  } catch (error) {
    console.error("deleteEventAction error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not delete event",
    };
  }
}

export async function duplicateEventAction(eventId: string) {
  try {
    await duplicateEventById(eventId);

    revalidatePath("/admin/events");
    revalidatePath("/de/veranstaltung");
    revalidatePath("/es/veranstaltung");
    revalidatePath("/en/veranstaltung");

    return { success: true };
  } catch (error) {
    console.error("duplicateEventAction error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Could not duplicate event",
    };
  }
}