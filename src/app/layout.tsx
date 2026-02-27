import "@/styles/tokens.css";
import "@/styles/globals.scss";
import { Just_Me_Again_Down_Here } from "next/font/google";

const handwritten = Just_Me_Again_Down_Here({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwritten",
});

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
      <body className={handwritten.variable}>{children}</body>
    </html>
  );
}