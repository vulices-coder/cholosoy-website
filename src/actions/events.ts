"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { duplicateEventById } from "@/lib/queries/events";
import { eventSchema } from "@/lib/validations/event";
import { uploadEventImage } from "@/lib/supabase-storage";
import { autoTranslateEvent } from "@/lib/ai/translate-event";

export type CreateEventState = {
  success: boolean;
  error?: string;
};

export type UpdateEventState = {
  success: boolean;
  error?: string;
};

type Locale = "de" | "es" | "en";

type TranslationInput = {
  locale: Locale;
  title: string;
  description: string;
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

function getTranslationsFromFormData(formData: FormData): TranslationInput[] {
  return ["de", "es", "en"].map((locale) => ({
    locale: locale as Locale,
    title: String(formData.get(`title_${locale}`) || "").trim(),
    description: String(formData.get(`description_${locale}`) || "").trim(),
  }));
}

function cleanTranslations(translations: TranslationInput[]) {
  return translations.filter((t) => t.title.length > 0);
}

function mergeAutoTranslations(params: {
  manualTranslations: TranslationInput[];
  autoTranslations: Record<
    Locale,
    {
      title: string;
      description: string;
    }
  >;
}) {
  const { manualTranslations, autoTranslations } = params;

  const manualMap = new Map<Locale, TranslationInput>(
    manualTranslations.map((t) => [t.locale, t])
  );

  const locales: Locale[] = ["de", "es", "en"];

  return locales.map((locale) => {
    const manual = manualMap.get(locale);

    return {
      locale,
      title: manual?.title || autoTranslations[locale].title,
      description: manual?.description || autoTranslations[locale].description,
    };
  });
}

export async function createEventAction(
  _prevState: CreateEventState,
  formData: FormData
): Promise<CreateEventState> {
  try {
    const title = String(formData.get("title") || "").trim();
    const slugInput = String(formData.get("slug") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const status = String(formData.get("status") || "DRAFT") as
      | "DRAFT"
      | "PUBLISHED"
      | "CANCELED";

    const manualTranslations = cleanTranslations(
      getTranslationsFromFormData(formData)
    );

    const fileEntry = formData.get("image");
    let imageUrl = "";

    if (fileEntry instanceof File && fileEntry.size > 0) {
      const uploaded = await uploadEventImage(fileEntry);
      imageUrl = uploaded.publicUrl;
    }

    const autoTranslations = await autoTranslateEvent({
      baseTitle: title,
      baseDescription: description,
    });

    const translations = mergeAutoTranslations({
      manualTranslations,
      autoTranslations,
    });

    const raw = {
      title,
      slug: slugInput ? slugify(slugInput) : slugify(title),
      description,
      date,
      location,
      imageUrl,
      status,
      translations,
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
        translations: {
          create: parsed.data.translations.map((translation) => ({
            locale: translation.locale,
            title: translation.title,
            description: translation.description || null,
          })),
        },
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
    const title = String(formData.get("title") || "").trim();
    const slugInput = String(formData.get("slug") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const status = String(formData.get("status") || "DRAFT") as
      | "DRAFT"
      | "PUBLISHED"
      | "CANCELED";

    const manualTranslations = cleanTranslations(
      getTranslationsFromFormData(formData)
    );

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

    const autoTranslations = await autoTranslateEvent({
      baseTitle: title,
      baseDescription: description,
    });

    const translations = mergeAutoTranslations({
      manualTranslations,
      autoTranslations,
    });

    const raw = {
      title,
      slug: slugInput ? slugify(slugInput) : slugify(title),
      description,
      date,
      location,
      imageUrl,
      status,
      translations,
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
        translations: {
          deleteMany: {},
          create: parsed.data.translations.map((translation) => ({
            locale: translation.locale,
            title: translation.title,
            description: translation.description || null,
          })),
        },
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