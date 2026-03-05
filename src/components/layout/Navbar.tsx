"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";

const LOCALES = new Set(["de", "es", "en"]);

function getLocaleFromPath(pathname: string) {
  const first = pathname.split("/")[1];
  return LOCALES.has(first) ? first : null;
}

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  // Prefija locale SOLO si existe
  const withLocale = (path: string) => (locale ? `/${locale}${path}` : path);

  // ⚠️ Estas rutas EXISTEN en [locale]/(marketing)
  const homeHref = withLocale("/home");
  const aboutHref = withLocale("/about");
  const galleryHref = withLocale("/gallery");
  const eventsHref = withLocale("/veranstaltung");
  const kontaktHref = withLocale("/kontakt");

  // ⚠️ Estas rutas AÚN NO están bajo [locale] en tu proyecto (por ahora)
  const karteHref = "/karte/vorspeisen";
  const cateringHref = "/catering";

  // Regla del logo:
  // - si estás en /{locale}/home => logo va a / (Startseite)
  // - en cualquier otra página marketing => vuelve a /{locale}/home
  const isHome = locale ? pathname === `/${locale}/home` : pathname === "/home";
  const logoHref = isHome ? "/" : homeHref;

  // (Opcional) estado activo simple
  const isActive = (href: string) => pathname === href;

  return (
    <header className={styles.nav}>
      <Link className={styles.logo} href={logoHref} aria-label="CholoSoy Logo">
        <Image
          src="/images/brand/logo.svg"
          alt="CholoSoy Logo"
          width={94}
          height={94}
          priority
          className={styles.logoImage}
        />
      </Link>

      <nav className={styles.links}>
        <Link href={karteHref} aria-current={pathname.startsWith("/karte") ? "page" : undefined}>
          Karte
        </Link>
        <Link href={aboutHref} aria-current={isActive(aboutHref) ? "page" : undefined}>
          Über Uns
        </Link>
        <Link href={galleryHref} aria-current={isActive(galleryHref) ? "page" : undefined}>
          Galerie
        </Link>
        <Link href={eventsHref} aria-current={isActive(eventsHref) ? "page" : undefined}>
          Veranstaltung
        </Link>
        <Link href={cateringHref} aria-current={pathname.startsWith("/catering") ? "page" : undefined}>
          Catering
        </Link>
      </nav>

      <Link
        className={styles.avatar}
        href={kontaktHref}
        aria-label="Kontakt / Reservierung"
        aria-current={isActive(kontaktHref) ? "page" : undefined}
      />
    </header>
  );
}