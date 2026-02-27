import Image from "next/image";
import Container from "@/app/components/ui/Container";
import styles from "./AboutIntro.module.scss";

export default function AboutIntro() {
  return (
    <section className={styles.section}>
      <Container size="lg">
        <div className={styles.grid}>
          <div className={styles.text}>
            <p className={styles.kicker}>
              CholoSoy – Authentischer Geschmack aus Peru in Berlin
            </p>

            <h1 className={styles.title}>Über Uns</h1>

            <div className={styles.body}>
              <p>
                Unser Geschmack verbindet Streetfood, Kultur und Handwerk – inspiriert
                von Peru und neu interpretiert für Berlin.
              </p>
              <p>
                Wir kochen mit Respekt vor Tradition, aber mit dem Mut, Neues zu
                kombinieren. So entsteht ein Erlebnis, das man nicht nur isst, sondern
                spürt.
              </p>
              <p>
                CholoSoy ist mehr als ein Restaurant: Es ist eine Reise – durch Aromen,
                Erinnerungen und Begegnungen.
              </p>
            </div>
          </div>

          <div className={styles.media}>
            <Image
              src="/images/about/chef.jpg"
              alt="CholoSoy Gründer"
              width={420}
              height={560}
              className={styles.image}
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
