import EventsBoard from "@/components/sections/events/EventsBoard";
import { getPublishedEvents } from "@/lib/queries/events";
import styles from "./EventsPage.module.scss";

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function getMonthTitle(date: Date | null) {
  if (!date) return "Veranstaltung";

  const formatted = new Intl.DateTimeFormat("de-DE", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export default async function VeranstaltungPage() {
  const dbEvents = await getPublishedEvents();

  const events = dbEvents.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description ?? "",
    dateLabel: formatEventDate(event.date),
    imageSrc: event.imageUrl || "/images/events/opening.jpg",
  }));

  const heading = getMonthTitle(dbEvents[0]?.date ?? null);

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        {events.length === 0 ? (
          <section className={styles.page}>
            <div className={styles.content}>
              <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
                Veranstaltung
              </h1>
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                Keine veröffentlichten Events gefunden.
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