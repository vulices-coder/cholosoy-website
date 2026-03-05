// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = new Set(["de", "es", "en"]);

// Páginas que NO deben abrirse sin consentimiento
const PROTECTED_SEGMENTS = new Set([
  "home",
  "kontakt",
  "about",
  "gallery",
  "veranstaltung",
  "karte",
  "catering",
]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignorar assets internos / api
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/set-locale")
  ) {
    return NextResponse.next();
  }

  // Permitimos Startseite siempre
  if (pathname === "/") return NextResponse.next();

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length < 2) return NextResponse.next();

  const maybeLocale = parts[0];
  const segment = parts[1];

  // Si no es ruta /[locale]/..., no tocamos (pero /home igual no existe)
  if (!LOCALES.has(maybeLocale)) return NextResponse.next();

  // Si no es una página protegida, ok
  if (!PROTECTED_SEGMENTS.has(segment)) return NextResponse.next();

  const consent = req.cookies.get("cholosoy_consent")?.value;
  if (consent === "accepted") return NextResponse.next();

  // No aceptó -> volver a Startseite
  const url = req.nextUrl.clone();
  url.pathname = "/";
  url.searchParams.set("blocked", "1");
  url.searchParams.set("to", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};