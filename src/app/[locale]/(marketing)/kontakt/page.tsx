import ReservationCard from "@/components/sections/kontakt/ReservationCard";
import KontaktForm from "@/components/sections/kontakt/KontaktForm";
import styles from "./KontaktPage.module.scss";

export default function KontaktPage() {
  // ✅ Reservierung (UI-state)
  // (Luego lo conectamos con datos reales / query params / DB)
  const reservation = {
    guests: 2,
    dateLabel: "Mittwoch 28 Mai",
    timeLabel: "17:00 bis 18:00",
    kitchenClose: "Küchenschluss um 22:00 Uhr",
  };

  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        <ReservationCard reservation={reservation} />
        <KontaktForm />
      </div>
    </main>
  );
}