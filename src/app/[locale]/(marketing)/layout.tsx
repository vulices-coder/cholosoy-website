import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import styles from "./MarketingLayout.module.scss";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}