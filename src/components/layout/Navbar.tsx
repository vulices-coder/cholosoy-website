"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import styles from "./Navbar.module.scss";

const LOCALES = new Set(["de", "es", "en"]);

type Locale = "de" | "es" | "en";

function getLocaleFromPath(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return LOCALES.has(first) ? (first as Locale) : "de";
}

const NAV_DICT: Record<
  Locale,
  {
    karte: string;
    about: string;
    gallery: string;
    events: string;
    catering: string;
    kontakt: string;
    logo: string;
  }
> = {
  de: {
    karte: "Karte",
    about: "Über Uns",
    gallery: "Galerie",
    events: "Veranstaltung",
    catering: "Catering",
    kontakt: "Kontakt / Reservierung",
    logo: "CholoSoy Logo",
  },
  es: {
    karte: "Carta",
    about: "Sobre Nosotros",
    gallery: "Galería",
    events: "Eventos",
    catering: "Catering",
    kontakt: "Contacto / Reserva",
    logo: "Logo de CholoSoy",
  },
  en: {
    karte: "Menu",
    about: "About Us",
    gallery: "Gallery",
    events: "Events",
    catering: "Catering",
    kontakt: "Contact / Reservation",
    logo: "CholoSoy Logo",
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = NAV_DICT[locale];

  const withLocale = (path: string) => `/${locale}${path}`;

  const homeHref = withLocale("/home");
  const aboutHref = withLocale("/about");
  const galleryHref = withLocale("/gallery");
  const eventsHref = withLocale("/veranstaltung");
  const kontaktHref = withLocale("/kontakt");

  const karteHref = "/karte/vorspeisen";
  const cateringHref = "/catering";

  const isHome = pathname === homeHref;
  const logoHref = isHome ? "/" : homeHref;

  const isActive = (href: string) => pathname === href;

  return (
    <header className={styles.nav}>
      <Container size="lg">
        <div className={styles.navInner}>
          <Link className={styles.logo} href={logoHref} aria-label={t.logo}>
            <Image
              src="/images/brand/logo.svg"
              alt={t.logo}
              width={94}
              height={94}
              priority
              className={styles.logoImage}
            />
          </Link>

          <nav className={styles.links}>
            <Link
              href={karteHref}
              aria-current={pathname.startsWith("/karte") ? "page" : undefined}
            >
              {t.karte}
            </Link>

            <Link href={aboutHref} aria-current={isActive(aboutHref) ? "page" : undefined}>
              {t.about}
            </Link>

            <Link href={galleryHref} aria-current={isActive(galleryHref) ? "page" : undefined}>
              {t.gallery}
            </Link>

            <Link href={eventsHref} aria-current={isActive(eventsHref) ? "page" : undefined}>
              {t.events}
            </Link>

            <Link
              href={cateringHref}
              aria-current={pathname.startsWith("/catering") ? "page" : undefined}
            >
              {t.catering}
            </Link>
          </nav>

          <Link
            className={styles.avatar}
            href={kontaktHref}
            aria-label={t.kontakt}
            aria-current={isActive(kontaktHref) ? "page" : undefined}
          />
        </div>
      </Container>
    </header>
  );
}