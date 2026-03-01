import Link from "next/link";
import Image from "next/image";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import styles from "./Start.module.scss";

export default function StartPage() {
  return (
    <main className={styles.wrapper}>
      <Container size="lg">
        <div className={styles.inner}>
          <div className={styles.logo}>
            <Image
              src="/images/brand/logo.svg"
              alt="CholoSoy Logo"
              width={200}
              height={200}
              priority
            />
          </div>

          <div className={styles.actions}>
            <Link href="de/home">
              <Button variant="primary">Home</Button>
            </Link>

            <Link href="de/kontakt">
              <Button variant="ghost">Kontakt</Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}