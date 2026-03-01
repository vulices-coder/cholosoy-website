"use client";

import Link from "next/link";
import styles from "./WelcomeCard.module.scss";

export default function WelcomeCard() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.text}>
          Danke! Unser kulinarisches Abenteuer <br />
          kann bald losgehen.
        </p>

        <Link className={styles.cta} href="/catering/form">
          Zum Formular →
        </Link>
      </section>
    </main>
  );
}