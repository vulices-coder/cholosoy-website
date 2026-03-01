"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const pathname = usePathname();
  const logoHref = pathname === "/home" ? "/" : "/home";

  return (
    <header className={styles.nav}>
      <Link className={styles.logo} href={logoHref} aria-label="CholoSoy Logo">
        <Image
          src="/images/brand/logo.svg"
          alt="CholoSoy Logo"
          fill
          sizes="96px"
          className={styles.logoImage}
          priority
        />
      </Link>

      <nav className={styles.links}>
        <Link href="/karte/vorspeisen">Karte</Link>
        <Link href="/about">Über Uns</Link>
        <Link href="/gallery">Galerie</Link>
        <Link href="/veranstaltung">Veranstaltung</Link>
        <Link href="/catering">Catering</Link>
      </nav>

      <Link className={styles.avatar} href="/kontakt" aria-label="Kontakt / Reservierung" />
    </header>
  );
}