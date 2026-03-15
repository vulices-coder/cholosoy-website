import EventsBoard from "@/components/sections/events/EventsBoard";
import { getUpcomingPublishedEvents } from "@/lib/queries/events";
import styles from "./EventsPage.module.scss";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Locale = "de" | "es" | "en";

type Props = {
  params: Promise<{ locale: Locale }>;
};

function getIntlLocale(locale: Locale) {
  if (locale === "es") return "es-ES";
  if (locale === "en") return "en-US";
  return "de-DE";
}

function formatEventDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function getPageTitle(locale: Locale) {
  if (locale === "es") return "Eventos";
  if (locale === "en") return "Events";
  return "Veranstaltung";
}

function getEmptyText(locale: Locale) {
  if (locale === "es") return "No se encontraron eventos publicados.";
  if (locale === "en") return "No published events found.";
  return "Keine veröffentlichten Events gefunden.";
}

function getMonthTitle(date: Date | null, locale: Locale) {
  if (!date) return getPageTitle(locale);

  const formatted = new Intl.DateTimeFormat(getIntlLocale(locale), {
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export default async function VeranstaltungPage({ params }: Props) {
  const { locale } = await params;

  const dbEvents = await getUpcomingPublishedEvents(locale);

  const events = dbEvents.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description ?? "",
    dateLabel: formatEventDate(event.date, locale),
    imageSrc: event.imageUrl || "/images/events/opening.jpg",
  }));

  const heading = getMonthTitle(dbEvents[0]?.date ?? null, locale);

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        {events.length === 0 ? (
          <section className={styles.page}>
            <div className={styles.content}>
              <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
                {getPageTitle(locale)}
              </h1>
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                {getEmptyText(locale)}
              </p>
            </div>
          </section>
        ) : (
          <EventsBoard events={events} heading={heading} />
        )}
      </div>
    </main>
  );
}