import ReservationCard from "@/components/sections/kontakt/ReservationCard";
import KontaktForm from "@/components/sections/kontakt/KontaktForm";
import styles from "./KontaktPage.module.scss";

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: "de" | "es" | "en" }>;
}) {
  const { locale } = await params;

  const reservation = {
    guests: 2,
    date: "2026-05-28",
    dateLabel: "Mittwoch 28 Mai",
    time: "17:00",
    timeLabel: "17:00 bis 18:00",
    kitchenClose: "Küchenschluss um 22:00 Uhr",
  };

  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        <ReservationCard reservation={reservation} />
        <KontaktForm locale={locale} />
      </div>
    </main>
  );
}