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
        Wir verwenden Cookies, um die Nutzung unserer Website zu verbessern. 
        Einige Cookies sind notwendig für den Betrieb der Seite.
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondary}
          onClick={closeBanner}
        >
          Nur notwendige Cookies
        </button>

        <button
          type="button"
          className={styles.primary}
          onClick={closeBanner}
        >
          Alle Cookies akzeptieren
        </button>
      </div>
    </div>
  );
}