export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validación simple (por ahora no redirigimos, solo “sanitizamos”)
  const locale = ["de", "es", "en"].includes(params.locale) ? params.locale : "de";

  // No renderizamos <html> ni <body> aquí (eso es del RootLayout)
  // Luego usaremos el locale para links, textos e i18n.
  return <div data-locale={locale}>{children}</div>;
}