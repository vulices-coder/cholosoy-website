"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const pathname = usePathname();

  // Regla:
  // - En /home: logo -> /
  // - En el resto de marketing: logo -> /home
  const logoHref = pathname === "/home" ? "/" : "/home";

  return (
    <header className={styles.nav}>
      <Link className={styles.logo} href={logoHref} aria-label="CholoSoy Logo">
        CholoSoy
      </Link>

      <nav className={styles.links}>
        <Link href="/karte/vorspeisen">Karte</Link>
        <Link href="/about">Über Uns</Link>
        <Link href="/gallery">Galerie</Link>
        <Link href="/veranstaltung">Veranstaltung</Link>
        <Link href="/catering">Catering</Link>
      </nav>

      <Link
        className={styles.avatar}
        href="/kontakt"
        aria-label="Kontakt / Reservierung"
      >
        🙂
      </Link>
    </header>
  );
}