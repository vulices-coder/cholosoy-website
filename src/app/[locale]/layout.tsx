// src/app/[locale]/layout.tsx
import type { ReactNode } from "react";

type Locale = "de" | "es" | "en";

function sanitizeLocale(raw: string): Locale {
  return (["de", "es", "en"] as const).includes(raw as Locale) ? (raw as Locale) : "de";
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = ["de", "es", "en"].includes(raw) ? raw : "de";

  // OJO: aquí NO pongas <html>/<body> si ya lo haces en RootLayout global
  return <>{children}</>;
}