import Link from "next/link";
import Container from "@/components/ui/Container";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container size="lg">
        <div className={styles.footerInner}>
          <nav className={styles.links}>
            <Link href="/agb">AGB</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/kontakt">Kontakt</Link>
            <Link href="/impressum">Impressum</Link>
          </nav>

          <div className={styles.meta}>© {new Date().getFullYear()} CholoSoy</div>
        </div>
      </Container>
    </footer>
  );
}