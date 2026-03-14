import Link from "next/link";
import { getAdminEvents } from "@/lib/queries/events";
import EventRowActions from "../../../components/admin/events/EventRowActions";
import styles from "./AdminEventsPage.module.scss";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default async function AdminEventsPage() {
  const events = await getAdminEvents();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.header}>
            <p className={styles.kicker}>Admin</p>
            <h1 className={styles.title}>Events Dashboard</h1>
            <p className={styles.text}>Übersicht aller Events aus Neon.</p>
          </div>

          <Link href="/admin/events/new" className={styles.createButton}>
            Neues Event
          </Link>
        </div>

        <div className={styles.card}>
          <div className={styles.tableHead}>
            <div>Titel</div>
            <div>Datum</div>
            <div>Ort</div>
            <div>Status</div>
            <div>Aktionen</div>
          </div>

          {events.length === 0 ? (
            <div className={styles.empty}>Noch keine Events vorhanden.</div>
          ) : (
            <div className={styles.rows}>
              {events.map((event) => (
                <div key={event.id} className={styles.row}>
                  <div className={styles.eventMeta}>
                    <span className={styles.eventTitle}>{event.title}</span>
                    <span className={styles.slug}>{event.slug}</span>
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className={styles.editLink}
                    >
                      Bearbeiten
                    </Link>
                  </div>

                  <div className={styles.cell}>{formatDate(event.date)}</div>

                  <div className={styles.cell}>{event.location ?? "—"}</div>

                  <div>
                    <span
                      className={`${styles.badge} ${
                        event.status === "PUBLISHED"
                          ? styles.published
                          : event.status === "CANCELED"
                          ? styles.canceled
                          : styles.draft
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  <EventRowActions
                    eventId={event.id}
                    status={event.status}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}