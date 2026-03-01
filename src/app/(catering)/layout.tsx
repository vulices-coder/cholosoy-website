export default function CateringLayout({ children }: { children: React.ReactNode }) {
  // Sin Navbar, porque Catering es “flujo aparte”
  return <>{children}</>;
}