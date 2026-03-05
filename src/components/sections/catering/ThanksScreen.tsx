"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ThanksScreen.module.scss";

export default function ThanksScreen() {
  return (
    <main className={styles.page}>
      <p className={styles.quote}>
        „Bereise Peru mit dem Gaumen <br /> und entdecke eine neue Art, die Welt zu bereisen.“
      </p>

      <p className={styles.thanks}>Danke für Ihre Bestellung</p>

      <Link href="/home" className={styles.logo} aria-label="Zur Home">
        <Image src="/images/brand/logo.svg" alt="CholoSoy" width={150} height={150} />
      </Link>

      <Link href="/catering" className={styles.back}>
        Zurück
      </Link>
    </main>
  );
}