"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./PersonalForm.module.scss";

type Locale = "de" | "es" | "en";

type CateringPersonalData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const STORAGE_KEY = "cholosoy_catering_personal";

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return "de";
  const m = document.cookie.match(/(?:^|;\s*)cholosoy_locale=([^;]+)/);
  const raw = m ? decodeURIComponent(m[1]).toLowerCase() : "de";
  if (raw === "de" || raw === "es" || raw === "en") return raw;
  return "de";
}

const PERSONAL_DICT: Record<
  Locale,
  {
    home: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    submit: string;
    back: string;
  }
> = {
  de: {
    home: "Zur Home",
    name: "Vor und Nachname",
    email: "E-Mail Adresse",
    phone: "Handynummer",
    address: "Anschrift",
    submit: "Senden",
    back: "Zurück",
  },
  es: {
    home: "Ir al inicio",
    name: "Nombre y apellido",
    email: "Correo electrónico",
    phone: "Número de teléfono",
    address: "Dirección",
    submit: "Enviar",
    back: "Volver",
  },
  en: {
    home: "Go to home",
    name: "Full name",
    email: "Email address",
    phone: "Phone number",
    address: "Address",
    submit: "Send",
    back: "Back",
  },
};

export default function PersonalForm() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("de");
  const [form, setForm] = useState<CateringPersonalData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    setLocale(readLocaleCookie());

    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const t = PERSONAL_DICT[locale];

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    router.push("/catering/welcome");
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Link href={`/${locale}/home`} className={styles.logo} aria-label={t.home}>
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
            {t.name}
            <input name="name" type="text" required value={form.name} onChange={onChange} />
          </label>

          <label>
            {t.email}
            <input name="email" type="email" required value={form.email} onChange={onChange} />
          </label>

          <label>
            {t.phone}
            <input name="phone" type="tel" required value={form.phone} onChange={onChange} />
          </label>

          <label>
            {t.address}
            <input
              name="address"
              type="text"
              required
              value={form.address}
              onChange={onChange}
            />
          </label>

          <button type="submit" className={styles.send}>
            {t.submit}
          </button>
        </form>
      </section>

      <Link href="/" className={styles.back}>
        {t.back}
      </Link>
    </main>
  );
}