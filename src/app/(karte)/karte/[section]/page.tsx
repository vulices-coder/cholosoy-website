import Link from "next/link";
import { notFound } from "next/navigation";

const SECTIONS = ["vorspeisen", "hauptspeisen", "desserts", "getraenke"] as const;

type Section = (typeof SECTIONS)[number];

export default function KarteSectionPage({
  params,
}: {
  params: { section: string };
}) {
  const section = params.section as Section;

  if (!SECTIONS.includes(section)) notFound();

  const index = SECTIONS.indexOf(section);
  const prev = SECTIONS[index - 1] ?? null;
  const next = SECTIONS[index + 1] ?? null;

  return (
    <main>
      {/* Logo centrado + navegación interna (baseline: sin navbar global) */}
      <header style={{ display: "flex", justifyContent: "center", padding: 16 }}>
        <Link href="/home" aria-label="Zurück zur Home">
          <strong>CholoSoy</strong>
        </Link>
      </header>

      <section style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
        <h1>Karte: {section}</h1>

        <nav style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 16 }}>
          {prev ? <Link href={`/karte/${prev}`}>← Prev</Link> : <span style={{ opacity: 0.4 }}>← Prev</span>}

          <div style={{ display: "flex", gap: 8 }}>
            {SECTIONS.map((s, i) => (
              <Link key={s} href={`/karte/${s}`} aria-current={s === section ? "page" : undefined}>
                {i + 1}
              </Link>
            ))}
          </div>

          {next ? <Link href={`/karte/${next}`}>Next →</Link> : <span style={{ opacity: 0.4 }}>Next →</span>}
        </nav>

        <p style={{ marginTop: 24, opacity: 0.8 }}>
          (Placeholder) Aquí luego renderizamos items desde Prisma/Supabase vía RSC queries.
        </p>
      </section>
    </main>
  );
}