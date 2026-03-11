"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.scss";

export default function Footer() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "de";

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        
        {/* LEFT */}
        <div className={styles.brand}>
          CholoSoy 2026
        </div>

        {/* CENTER */}
        <nav className={styles.legal}>
          <Link href={`/${locale}/agb`}>AGB</Link>
          <Link href={`/${locale}/datenschutz`}>Datenschutz</Link>
          <Link href={`/${locale}/info`}>Info</Link>
          <Link href={`/${locale}/impressum`}>Impressum</Link>
        </nav>

        {/* RIGHT */}
        <div className={styles.social}>
          <a href="#" aria-label="Facebook">
            Facebook
          </a>

          <a href="#" aria-label="Instagram">
            Instagram
          </a>
        </div>

      </div>
    </footer>
  );
}