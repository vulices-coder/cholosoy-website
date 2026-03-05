// src/app/not-found.tsx
import Link from "next/link";
import { cookies } from "next/headers";

type Locale = "de" | "es" | "en";

async function getLocaleFromCookie(): Promise<Locale> {
  const store = await cookies();
  const raw = store.get("cholosoy_locale")?.value?.toLowerCase();
  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

export default async function NotFound() {
  const locale = await getLocaleFromCookie();

  return (
    <main style={{ padding: 24 }}>
      <h1>404</h1>
      <p>Seite nicht gefunden.</p>
      <Link href={`/${locale}/home`}>Zurück zu Home</Link>
    </main>
  );
}