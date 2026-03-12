import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import styles from "./Start.module.scss";

import de from "@/messages/de.json";
import es from "@/messages/es.json";
import en from "@/messages/en.json";

type Locale = "de" | "es" | "en";

type StartDict = {
  home: string;
  kontakt: string;
  welcomeTitle: string;
};

const MESSAGES = { de, es, en } as const;

async function getLocaleFromCookie(): Promise<Locale> {
  const store = await cookies();
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
  };
}

export default async function StartPage() {
  const locale = await getLocaleFromCookie();
  const t = getStartDict(locale);

  return (
    <main className={styles.page}>
      <section className={styles.startBlock}>
        <div className={styles.startShell}>
          <div className={styles.heroFrame}>
            <Image
              src="/images/start/hero.jpg"
              alt="CholoSoy Start"
              fill
              priority
              sizes="100vw"
              className={styles.heroImg}
            />

            <div className={styles.heroOverlay}>
              <div className={styles.heroTop}>
                <Link className={styles.heroLink} href={`/${locale}/home`}>
                  {t.home}
                </Link>

                <div className={styles.heroLogo}>
                  <Image
                    src="/images/brand/logo.svg"
                    alt="CholoSoy Logo"
                    width={250}
                    height={250}
                    priority
                    className={styles.heroLogoImage}
                  />
                </div>

                <Link className={styles.heroLink} href={`/${locale}/kontakt`}>
                  {t.kontakt}
                </Link>
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
            </div>
          </div>
        </div>
      </section>

      <section className={styles.titleSection}>
        <div className={styles.startShell}>
          <div className={styles.titleBar}>
            <h1 className={styles.title}>{t.welcomeTitle}</h1>
          </div>
        </div>
      </section>

      <section className={styles.startBlock}>
        <div className={styles.startShell}>
          <div className={styles.sectionFrame}>
            <Image
              src="/images/start/section.jpg"
              alt="Peru"
              fill
              sizes="100vw"
              className={styles.sectionImg}
            />
            <div className={styles.sectionOverlay} />
          </div>
        </div>
      </section>
    </main>
  );
}