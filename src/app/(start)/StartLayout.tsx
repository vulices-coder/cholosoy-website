import Footer from "@/components/layout/Footer";
import styles from "./StartLayout.module.scss";

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.content}>{children}</div>
      <div className={styles.footerSlot}>
        <Footer />
      </div>
    </div>
  );
}