import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/">CholoSoy</Link>

        <div>
          <Link href="/karte/vorspeisen">Karte</Link>
          <Link href="/uber-uns">Über Uns</Link>
          <Link href="/galerie">Galerie</Link>
          <Link href="/veranstaltung">Veranstaltung</Link>
          <Link href="/catering">Catering</Link>
        </div>

        <Link href="/kontakt" aria-label="Kontakt / Reservierung">
          Avatar
        </Link>
      </nav>
    </header>
  );
}
