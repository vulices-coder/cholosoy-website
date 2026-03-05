// src/app/(start)/page.tsx
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import styles from "./Start.module.scss";

import CookieConsentEngine from "@/app/components/consent/CookieConsentEngine";
import CookieCard from "@/app/components/consent/CookieCard";

import de from "@/messages/de.json";
import es from "@/messages/es.json";
import en from "@/messages/en.json";

type Locale = "de" | "es" | "en";

type StartDict = {
  home: string;
  kontakt: string;
  welcomeTitle: string;
  cookies: {
    title: string;
    text: string;
    rejectAll: string;
    settings: string;
    acceptAll: string;
  };
};

const MESSAGES = { de, es, en } as const;

async function getLocaleFromCookie(): Promise<Locale> {
  const store = await cookies(); // Next 16: async
  const raw = store.get("cholosoy_locale")?.value?.toLowerCase();
  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

function getStartDict(locale: Locale): StartDict {
  const msg: any = MESSAGES[locale];
  const start = (msg?.start ?? msg) as any;

  return {
    home: start?.home ?? "Home",
    kontakt: start?.kontakt ?? "Kontakt",
    welcomeTitle: start?.welcomeTitle ?? "Willkommen im magischen Peru!",
    cookies: {
      title: start?.cookies?.title ?? "Verwendung von Cookies, Personalisierung und Weitergabe",
      text: start?.cookies?.text ?? "",
      rejectAll: start?.cookies?.rejectAll ?? "ALLE ABLEHNEN",
      settings: start?.cookies?.settings ?? "EINSTELLUNGEN",
      acceptAll: start?.cookies?.acceptAll ?? "ZUSTIMMEN",
    },
  };
}

async function hasAcceptedConsent(): Promise<boolean> {
  const store = await cookies(); // Next 16: async
  return store.get("cholosoy_consent")?.value === "accepted";
}

export default async function StartPage() {
  const locale = await getLocaleFromCookie();
  const t = getStartDict(locale);
  const accepted = await hasAcceptedConsent();

  return (
    <main className={styles.page}>
      {/* Engine (client) */}
      <CookieConsentEngine locale={locale} />

      {/* HERO */}
      <section className={styles.hero}>
        <Image
          src="/images/start/hero.jpg"
          alt="CholoSoy Start"
          fill
          priority
          sizes="(max-width: 700px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className={styles.heroImg}
        />

        <div className={styles.heroTop}>
          {/* Bloqueo visual hasta aceptar */}
          {accepted ? (
            <Link className={styles.heroLink} href={`/${locale}/home`}>
              {t.home}
            </Link>
          ) : (
            <span className={styles.heroLinkDisabled}>{t.home}</span>
          )}

          <div className={styles.heroLogo}>
            <Image
              src="/images/brand/logo.svg"
              alt="CholoSoy Logo"
              width={250}
              height={250}
              priority
            />
          </div>

          {accepted ? (
            <Link className={styles.heroLink} href={`/${locale}/kontakt`}>
              {t.kontakt}
            </Link>
          ) : (
            <span className={styles.heroLinkDisabled}>{t.kontakt}</span>
          )}
        </div>

        <div className={styles.flags} aria-label="Language switcher">
          <a href="/set-locale?l=de&to=/" aria-label="Deutsch" title="Deutsch">
            🇩🇪
          </a>
          <a href="/set-locale?l=es&to=/" aria-label="Español" title="Español">
            🇪🇸
          </a>
          <a href="/set-locale?l=en&to=/" aria-label="English" title="English">
            🇬🇧
          </a>
        </div>
      </section>

      {/* FRANJA */}
      <section className={styles.titleBar}>
        <h1 className={styles.title}>{t.welcomeTitle}</h1>
      </section>

      {/* SECTION 2 */}
      <section className={styles.section}>
        <Image
          src="/images/start/section.jpg"
          alt="Peru"
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className={styles.sectionImg}
        />

        {/* Cookie card embebida */}
        <div className={styles.cookieSlot}>
          <CookieCard
            // locale={locale}
            title={t.cookies.title}
            text={t.cookies.text}
            rejectAll={t.cookies.rejectAll}
            settings={t.cookies.settings}
            acceptAll={t.cookies.acceptAll}
            // initiallyAccepted={accepted}
          />
        </div>
      </section>
    </main>
  );
}