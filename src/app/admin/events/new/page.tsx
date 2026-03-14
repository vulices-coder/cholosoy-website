import EventCreateForm from "@/components/admin/events/EventCreateForm";

export default function AdminEventNewPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="mx-auto grid max-w-3xl gap-6">
        <div className="grid gap-2">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Admin
          </p>
          <h1 className="text-3xl font-semibold text-neutral-900">
            Crear nuevo evento
          </h1>
          <p className="text-sm text-neutral-600">
            Sube la imagen a Supabase Storage y guarda el evento en Neon con Prisma.
          </p>
        </div>

        <EventCreateForm />
      </div>
    </main>
  );
}