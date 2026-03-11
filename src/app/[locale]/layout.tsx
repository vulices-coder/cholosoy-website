// src/app/[locale]/layout.tsx
import type { ReactNode } from "react";
import CookieBanner from "@/components/legal/CookieBanner";

type Locale = "de" | "es" | "en";

function sanitizeLocale(raw: string): Locale {
  return (["de", "es", "en"] as const).includes(raw as Locale) ? (raw as Locale) : "de";
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = sanitizeLocale(raw);

  void locale;

  return (
    <>
      {children}
      <CookieBanner />
    </>
  );
}