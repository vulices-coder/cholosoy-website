import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: 24 }}>
      <h1>404 – Seite nicht gefunden</h1>
      <p>Diese Seite existiert nicht.</p>
      <Link href="/home">Zurück zu Home</Link>
    </main>
  );
}