import "@/styles/tokens.css";
import "@/styles/globals.scss";
import { Josefin_Sans, Just_Me_Again_Down_Here } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const handwritten = Just_Me_Again_Down_Here({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwritten",
});

export const metadata = {
  title: "CholoSoy",
  description: "Peruanische Küche in Berlin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${josefin.variable} ${handwritten.variable}`}>
        {children}
      </body>
    </html>
  );
}