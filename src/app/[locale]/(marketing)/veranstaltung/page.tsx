import EventsBoard from "@/components/sections/events/EventsBoard";
import styles from "./EventsPage.module.scss";

export default function VeranstaltungPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <EventsBoard />
      </div>
    </main>
  );
}