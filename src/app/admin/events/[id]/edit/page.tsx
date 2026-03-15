import { notFound } from "next/navigation";
import { getEventById } from "@/lib/queries/events";
import EditEventForm from "../../EditEventForm";

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
    <main className="min-h-screen bg-neutral-50 px-6 py-12 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 grid gap-2">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Admin
          </p>
          <h1 className="text-3xl font-semibold text-neutral-900">
            Evento bearbeiten
          </h1>
          <p className="text-sm text-neutral-600">
            Ändere Titel, Beschreibung, Datum, Ort, Status und Bild.
          </p>
        </div>

        <EditEventForm event={event} />
      </div>
    </main>
  );
}