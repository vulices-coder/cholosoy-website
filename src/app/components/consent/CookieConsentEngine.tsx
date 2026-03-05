"use client";

import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";

type Locale = "de" | "es" | "en";

declare global {
  interface Window {
    __cc?: any;
  }
}

export default function CookieConsentEngine({ locale }: { locale: Locale }) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cc = await import("vanilla-cookieconsent");
      if (cancelled) return;

      // Exponemos API al CookieCard
      window.__cc = cc;

      // Config como any para evitar guerra de typings por versión
      const config: any = {
        // IMPORTANTE: no popup automático (tu UI embebida manda)
        autoShow: false,

        categories: {
          necessary: { enabled: true, readOnly: true },
          analytics: { enabled: false, readOnly: false },
          marketing: { enabled: false, readOnly: false },
        },

        language: {
          default: locale,
          translations: {
            de: {
              consentModal: {
                title: "Cookies, Personalisierung und Weitergabe",
                description:
                  "Wir verwenden Cookies, die erforderlich sind, um Ihnen die Nutzung unserer Webseite zu ermöglichen. Zusätzlich bitten wir um Ihre Einwilligung für Statistik/Analyse und Marketing.",
                acceptAllBtn: "Zustimmen",
                acceptNecessaryBtn: "Alle ablehnen",
                showPreferencesBtn: "Einstellungen",
              },
              preferencesModal: {
                title: "Cookie-Einstellungen",
                acceptAllBtn: "Zustimmen",
                acceptNecessaryBtn: "Alle ablehnen",
                savePreferencesBtn: "Speichern",
                closeIconLabel: "Schließen",
                sections: [
                  {
                    title: "Notwendig",
                    description: "Erforderlich für den Betrieb der Website.",
                    linkedCategory: "necessary",
                  },
                  {
                    title: "Statistik/Analyse",
                    description: "Hilft uns, die Website zu verbessern.",
                    linkedCategory: "analytics",
                  },
                  {
                    title: "Marketing",
                    description: "Personalisierte Inhalte und Werbung.",
                    linkedCategory: "marketing",
                  },
                ],
              },
            },

            es: {
              consentModal: {
                title: "Cookies, personalización y compartición",
                description:
                  "Usamos cookies necesarias para el funcionamiento del sitio. Además, pedimos tu consentimiento para estadísticas/análisis y marketing.",
                acceptAllBtn: "Aceptar",
                acceptNecessaryBtn: "Rechazar todo",
                showPreferencesBtn: "Configuración",
              },
              preferencesModal: {
                title: "Configuración de cookies",
                acceptAllBtn: "Aceptar",
                acceptNecessaryBtn: "Rechazar todo",
                savePreferencesBtn: "Guardar",
                closeIconLabel: "Cerrar",
                sections: [
                  {
                    title: "Necesarias",
                    description: "Necesarias para que el sitio funcione.",
                    linkedCategory: "necessary",
                  },
                  {
                    title: "Estadísticas/Análisis",
                    description: "Nos ayuda a mejorar el sitio.",
                    linkedCategory: "analytics",
                  },
                  {
                    title: "Marketing",
                    description: "Contenido y publicidad personalizados.",
                    linkedCategory: "marketing",
                  },
                ],
              },
            },

            en: {
              consentModal: {
                title: "Cookies, personalization and sharing",
                description:
                  "We use cookies required to run our website. We also ask for your consent for analytics and marketing.",
                acceptAllBtn: "Accept",
                acceptNecessaryBtn: "Reject all",
                showPreferencesBtn: "Settings",
              },
              preferencesModal: {
                title: "Cookie settings",
                acceptAllBtn: "Accept",
                acceptNecessaryBtn: "Reject all",
                savePreferencesBtn: "Save",
                closeIconLabel: "Close",
                sections: [
                  {
                    title: "Necessary",
                    description: "Required to run the website.",
                    linkedCategory: "necessary",
                  },
                  {
                    title: "Analytics",
                    description: "Helps us improve the website.",
                    linkedCategory: "analytics",
                  },
                  {
                    title: "Marketing",
                    description: "Personalized content and ads.",
                    linkedCategory: "marketing",
                  },
                ],
              },
            },
          },
        },
      };

      cc.run(config);
    })();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return null;
}