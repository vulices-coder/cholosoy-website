import styles from "./Button.module.scss";

type Variant = "primary" | "ghost";

export default function Button({
  children,
  variant = "primary",
  type = "button",
}: {
  children: React.ReactNode;
  variant?: Variant;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button className={`${styles.btn} ${styles[variant]}`} type={type}>
      {children}
    </button>
  );
}