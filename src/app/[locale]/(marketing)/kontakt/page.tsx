import ReservationCard from "@/components/sections/kontakt/ReservationCard";
import KontaktForm from "@/components/sections/kontakt/KontaktForm";
import styles from "./KontaktPage.module.scss";

type Locale = "de" | "es" | "en";

function getTomorrowDateString() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const PAGE_META: Record<
  Locale,
  {
    title: string;
    description: string;
    kitchenClose: string;
    timeLabel: string;
  }
> = {
  de: {
    title: "Kontakt | CholoSoy",
    description: "Reservieren Sie Ihren Tisch bei CholoSoy in Berlin.",
    kitchenClose: "Küchenschluss um 22:00 Uhr",
    timeLabel: "12:00 bis 22:00",
  },
  es: {
    title: "Contacto | CholoSoy",
    description: "Reserve su mesa en CholoSoy en Berlín.",
    kitchenClose: "La cocina cierra a las 22:00 h",
    timeLabel: "12:00 hasta 22:00",
  },
  en: {
    title: "Contact | CholoSoy",
    description: "Reserve your table at CholoSoy in Berlin.",
    kitchenClose: "Kitchen closes at 10:00 PM",
    timeLabel: "12:00 until 22:00",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = PAGE_META[locale] ?? PAGE_META.de;

  return {
    title: t.title,
    description: t.description,
  };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tomorrow = getTomorrowDateString();
  const t = PAGE_META[locale] ?? PAGE_META.de;

  const reservation = {
    guests: 2,
    date: tomorrow,
    dateLabel: "",
    time: "12:00",
    timeLabel: t.timeLabel,
    kitchenClose: t.kitchenClose,
  };

  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        <ReservationCard reservation={reservation} locale={locale} />
        <KontaktForm locale={locale} />
      </div>
    </main>
  );
}