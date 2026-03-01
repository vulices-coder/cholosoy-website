import { NextResponse } from "next/server";

const LOCALES = new Set(["de", "es", "en"]);

export function GET(req: Request) {
  const url = new URL(req.url);
  const locale = (url.searchParams.get("l") || "de").toLowerCase();
  const redirectTo = url.searchParams.get("to") || "/home";

  const safeLocale = LOCALES.has(locale) ? locale : "de";

  const res = NextResponse.redirect(new URL(redirectTo, url.origin));
  res.cookies.set("cholosoy_locale", safeLocale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 año
  });

  return res;
}