"use client";

import styles from "./CookieCard.module.scss";

type Props = {
  title: string;
  text: string;
  rejectAll: string;
  settings: string;
  acceptAll: string;
};

function setConsentCookieAccepted() {
  // 1 año, Lax
  document.cookie = `cholosoy_consent=accepted; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export default function CookieCard({ title, text, rejectAll, settings, acceptAll }: Props) {
  const onReject = () => {
    // Opcional: abrir preferencias o simplemente no hacer nada
    // (en DE, "Ablehnen" suele mantener el banner visible hasta aceptar)
    if (window.__cc?.showPreferences) window.__cc.showPreferences();
  };

  const onSettings = () => {
    if (window.__cc?.showPreferences) window.__cc.showPreferences();
  };

  const onAccept = () => {
    setConsentCookieAccepted();
    // Opcional: avisar al engine
    if (window.__cc?.acceptAll) window.__cc.acceptAll();
    // Recarga suave para que middleware deje pasar enlaces si ya estás en otra ruta
    // (en Startseite no hace falta, pero ayuda)
    window.location.reload();
  };

  return (
    <aside className={styles.cookieCard} aria-label="Cookies">
      <h3 className={styles.cookieTitle}>{title}</h3>
      <p className={styles.cookieText}>{text}</p>

      <div className={styles.cookieActions}>
        <button type="button" className={styles.cookieBtn} onClick={onReject}>
          {rejectAll}
        </button>

        <button type="button" className={styles.cookieBtn} onClick={onSettings}>
          {settings}
        </button>

        <button type="button" className={styles.cookieBtnPrimary} onClick={onAccept}>
          {acceptAll}
        </button>
      </div>
    </aside>
  );
}