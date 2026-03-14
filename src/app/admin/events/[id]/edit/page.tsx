import { notFound } from "next/navigation";
import { getEventById } from "@/lib/queries/events";
import EditEventForm from "../../EditEventForm";
import styles from "./EditEventPage.module.scss";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditEventPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>

            <Link href="/admin/events" className={styles.back}>
                ← Zurück zu Events
            </Link>

            <p className={styles.kicker}>Admin</p>

            <h1 className={styles.title}>
                Evento bearbeiten
            </h1>

            <p className={styles.text}>
                Ändere Titel, Beschreibung, Datum, Ort, Status und Bild.
            </p>

        </div>

        <EditEventForm event={event} />
      </div>
    </main>
  );
}