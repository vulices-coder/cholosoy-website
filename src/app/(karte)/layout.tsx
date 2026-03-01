import KarteShell from "@/app/components/sections/karte/KarteShell";

export default function KarteLayout({ children }: { children: React.ReactNode }) {
  return <KarteShell>{children}</KarteShell>;
}