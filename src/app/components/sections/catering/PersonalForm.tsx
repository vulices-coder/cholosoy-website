"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./PersonalForm.module.scss";

export default function PersonalForm() {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // (Luego guardamos data en localStorage/session si quieres)
    router.push("/catering/welcome");
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Link href="/home" className={styles.logo} aria-label="Zur Home">
          <Image
            src="/images/brand/logo.svg"
            alt="CholoSoy"
            width={140}
            height={140}
            priority
          />
        </Link>

        <form className={styles.form} onSubmit={onSubmit}>
          <label>
            Vor und Nachname
            <input name="name" type="text" required />
          </label>

          <label>
            E-Mail Adresse
            <input name="email" type="email" required />
          </label>

          <label>
            Handynummer
            <input name="phone" type="tel" required />
          </label>

          <label>
            Anschrift
            <input name="address" type="text" required />
          </label>

          <button type="submit" className={styles.send}>
            Senden
          </button>
        </form>
      </section>

      <Link href="/" className={styles.back}>
        Zurück
      </Link>
    </main>
  );
}