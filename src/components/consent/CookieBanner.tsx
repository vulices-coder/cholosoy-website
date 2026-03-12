"use client";

import { useEffect, useState } from "react";
import styles from "./CookieBanner.module.scss";

const STORAGE_KEY = "cholosoy_cookie_banner_closed";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  function closeBanner() {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie-Banner">
      <p className={styles.text}>
        Wir verwenden Cookies, um die Nutzung unserer Website zu verbessern. Weitere Informationen
        finden Sie in unserer Datenschutzerklärung.
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.secondary} onClick={closeBanner}>
          Schließen
        </button>
        <button type="button" className={styles.primary} onClick={closeBanner}>
          Akzeptieren
        </button>
      </div>
    </div>
  );
}