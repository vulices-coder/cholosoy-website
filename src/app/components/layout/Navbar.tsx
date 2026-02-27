import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <header className={styles.nav}>
      <Link className={styles.logo} href="/">
        CholoSoy
      </Link>

      <nav className={styles.links}>
        <Link href="/karte/vorspeisen">Karte</Link>
        <Link href="/about">Über Uns</Link>
        <Link href="/galerie">Galerie</Link>
        <Link href="/veranstaltung">Veranstaltung</Link>
        <Link href="/catering">Catering</Link>
      </nav>

      <Link className={styles.avatar} href="/kontakt" aria-label="Kontakt / Reservierung">
        🙂
      </Link>
    </header>
  );
}