import "@/styles/tokens.css";
import "@/styles/globals.scss";

export const metadata = {
  title: "CholoSoy",
  description: "Peruanische Küche in Berlin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}