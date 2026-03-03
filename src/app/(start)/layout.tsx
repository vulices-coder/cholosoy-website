import Footer from "@/app/components/layout/Footer";

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}