export type EventItem = {
  id: string;
  title: string;
  description: string;
  dateLabel: string; // "13.06.2025"
  imageSrc: string;  // "/images/events/01.jpg"
};

export const events: EventItem[] = Array.from({ length: 12 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    id: `event-${num}`,
    title: "Los Kjarkas",
    description:
      "– treten ein einziges Mal in unserem Lokal auf! Mit ihren bekannten Hits wie „Llorando se fue“ und vielen weiteren. Das darfst du nicht verpassen – wir freuen uns auf Ihren Besuch! Es wird CD’s, T-Shirts und Poster zum Verkauf geben.",
    dateLabel: "13.06.2025",
    imageSrc: `/images/events/${num}.jpg`,
  };
});
