import Link from "next/link";
import EventCreateForm from "@/components/admin/events/EventCreateForm";
import styles from "./NewEventPage.module.scss";

export default function AdminEventNewPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.header}>
            <p className={styles.kicker}>Admin</p>
            <h1 className={styles.title}>Crear nuevo evento</h1>
            <p className={styles.text}>
              Sube la imagen a Supabase Storage y guarda el evento en Neon con Prisma.
            </p>
          </div>

          <Link href="/admin/events" className={styles.createButton}>
            Events bearbeiten
          </Link>
        </div>

        <EventCreateForm />
      </div>
    </main>
  );
}