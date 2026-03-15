import OpenAI from "openai";

type Locale = "de" | "es" | "en";

type TranslationMap = Record<
  Locale,
  {
    title: string;
    description: string;
  }
>;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function safeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeTranslations(data: unknown): TranslationMap {
  const fallback = {
    de: { title: "", description: "" },
    es: { title: "", description: "" },
    en: { title: "", description: "" },
  } satisfies TranslationMap;

  if (!data || typeof data !== "object") return fallback;

  const source = data as Record<string, unknown>;

  return {
    de: {
      title: safeString((source.de as Record<string, unknown> | undefined)?.title),
      description: safeString(
        (source.de as Record<string, unknown> | undefined)?.description
      ),
    },
    es: {
      title: safeString((source.es as Record<string, unknown> | undefined)?.title),
      description: safeString(
        (source.es as Record<string, unknown> | undefined)?.description
      ),
    },
    en: {
      title: safeString((source.en as Record<string, unknown> | undefined)?.title),
      description: safeString(
        (source.en as Record<string, unknown> | undefined)?.description
      ),
    },
  };
}

export async function autoTranslateEvent(params: {
  baseTitle: string;
  baseDescription: string;
}) {
  const { baseTitle, baseDescription } = params;

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const prompt = `
You are translating restaurant event content.

Translate the following event into German, Spanish, and English.

Rules:
- Keep the tone natural and promotional.
- Keep event names short and clean.
- Preserve meaning, not literal word-by-word translation.
- Return ONLY valid JSON.
- No markdown.
- No explanations.

Required JSON shape:
{
  "de": { "title": "...", "description": "..." },
  "es": { "title": "...", "description": "..." },
  "en": { "title": "...", "description": "..." }
}

Base title:
${baseTitle}

Base description:
${baseDescription}
`.trim();

  const response = await client.responses.create({
    model: "gpt-5.4",
    input: prompt,
  });

  const text = response.output_text?.trim();

  if (!text) {
    throw new Error("OpenAI returned empty translation output");
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("OpenAI translation output was not valid JSON");
  }

  return normalizeTranslations(parsed);
}