"use client";

import { useEffect, useState } from "react";
import styles from "./CookieBanner.module.scss";

const STORAGE_KEY = "cholosoy_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function rejectOptional() {
    localStorage.setItem(STORAGE_KEY, "necessary-only");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie Banner">
      <p className={styles.text}>
        Wir verwenden Cookies, um die technische Funktion der Website sicherzustellen und die
        Nutzererfahrung zu verbessern. Weitere Informationen finden Sie in unserer
        Datenschutzerklärung.
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.secondary} onClick={rejectOptional}>
          Nur notwendige Cookies
        </button>
        <button type="button" className={styles.primary} onClick={acceptAll}>
          Alle akzeptieren
        </button>
      </div>
    </div>
  );
}