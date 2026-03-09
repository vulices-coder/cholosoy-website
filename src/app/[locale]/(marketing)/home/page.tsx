import HomeQuote from "@/components/sections/home/HomeQuote";
import HomeGrid from "@/components/sections/home/HomeGrid";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <HomeQuote />
        <HomeGrid />
      </div>
    </main>
  );
}