import styles from "./Container.module.scss";

export default function Container({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  return <div className={`${styles.container} ${styles[size]}`}>{children}</div>;
}