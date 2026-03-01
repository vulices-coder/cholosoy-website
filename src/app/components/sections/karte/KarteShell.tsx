import styles from "./KarteShell.module.scss";

export default function KarteShell({ children }: { children: React.ReactNode }) {
  return <div className={styles.screen}>{children}</div>;
}