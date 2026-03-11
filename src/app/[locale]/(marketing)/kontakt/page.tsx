import ReservationCard from "@/components/sections/kontakt/ReservationCard";
import KontaktForm from "@/components/sections/kontakt/KontaktForm";
import styles from "./KontaktPage.module.scss";

function getTomorrowDateString() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: "de" | "es" | "en" }>;
}) {
  const { locale } = await params;
  const tomorrow = getTomorrowDateString();

  const reservation = {
    guests: 2,
    date: tomorrow,
    dateLabel: "",
    time: "12:00",
    timeLabel: "12:00 bis 22:00",
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