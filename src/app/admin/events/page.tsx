import Link from "next/link";
import { getAdminEvents } from "@/lib/queries/events";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default async function AdminEventsPage() {
  const events = await getAdminEvents();

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-2">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              Admin
            </p>
            <h1 className="text-3xl font-semibold text-neutral-900">
              Events Dashboard
            </h1>
            <p className="text-sm text-neutral-600">
              Übersicht aller Events aus Neon.
            </p>
          </div>

          <Link
            href="/admin/events/new"
            className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Neues Event
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
          <div className="grid grid-cols-[2fr_1.4fr_1.5fr_1fr] gap-4 border-b border-black/10 px-6 py-4 text-sm font-medium text-neutral-500">
            <div>Titel</div>
            <div>Datum</div>
            <div>Ort</div>
            <div>Status</div>
          </div>

          {events.length === 0 ? (
            <div className="px-6 py-10 text-sm text-neutral-500">
              Noch keine Events vorhanden.
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="grid grid-cols-[2fr_1.4fr_1.5fr_1fr] gap-4 px-6 py-4 text-sm"
                >
                  <div className="grid gap-1">
                    <span className="font-medium text-neutral-900">
                      {event.title}
                    </span>
                    <span className="text-neutral-500">{event.slug}</span>
                  </div>

                  <div className="text-neutral-700">
                    {formatDate(event.date)}
                  </div>

                  <div className="text-neutral-700">
                    {event.location ?? "—"}
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        event.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : event.status === "CANCELED"
                          ? "bg-red-100 text-red-700"
                          : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}