import Image from "next/image";
import Container from "@/components/ui/Container";
import styles from "./AboutIntro.module.scss";

export default function AboutIntro() {
  return (
    <section className={styles.section}>
      <Container size="lg">
        <div className={styles.inner}>
          <div className={styles.textCol}>
            <p className={styles.kicker}>
              CholoSoy - Authentischer Geschmack aus Peru in Berlin
            </p>

            <h1 className={styles.title}>Über Uns</h1>

            <div className={styles.copy}>
              <h3 className={styles.h3}>Unsere Geschichte</h3>

              <p className={styles.red}>Berlin, 2013</p>
              <p>
                Die peruanische Küche war damals kaum mehr als eine Illusion - ihr
                Geschmack ein Rätsel, das es zu entschlüsseln galt.
              </p>
              <p>
                Auf den Flohmärkten in der Sonnenallee wurde jeden Samstag Guano
                gefunden, zubereitet mit rätselhaften Pepperonen oder goldenem
                Leuchten Poppas - orange wie Aji Amarillo, zumindest vielleicht.
                Doch im Geschmack lagen Welten dazwischen. Beides zu mischen war
                ein Experiment für Mutige.
              </p>

              <p className={styles.red}>Berlin, 2015</p>
              <p>
                Die peruanische Gastronomie hat Grenzen überwunden, und ihre
                essenziellen Zutaten haben nun ihre verschiedenen Wege in
                Deutschland.
              </p>
              <p>
                Sie zu integrieren war eine Herausforderung - sie zu beherrschen,
                eine Kunst.
              </p>
              <p>
                CholoSoy lässt Sie nun auf eine kulinarische Reise durch Peru -
                entdecken Sie eine neue Art, die Welt mit dem Gaumen zu bereisen.
              </p>

              <h3 className={styles.h3}>Unser Gründer und Küchenchef</h3>
              <p>
                Seit 1998 bildet sich unser Küchenchef autodidaktisch in der
                Gastronomieszene Limas aus.
              </p>
              <p>
                Seine Leidenschaft begann in der Welt der Cocktails - zunächst als
                Barkell in einer der bekanntesten Bars im berühmten Stadtteil
                Barranco.
              </p>
              <p>
                Mit Leidenschaft und Engagement arbeitete er sich zum Barmixer und
                schließlich zum Geschäftsführer hoch.
              </p>
              <p>
                Anschließend entdeckte er seine Leidenschaft fürs Kochen.
              </p>
              <p>
                Er begann als Küchenchef seine Leidenschaft für Kochkurse und
                Restaurants und empfahl eine Mehrfachspezialisation - einer der
                Säulen der peruanischen Küche. Dort entwickelte er seine
                fähigkeit, traditionelle Aromen kreativ und respektvoll zu
                kombinieren.
              </p>

              <h3 className={styles.h3}>Eine kulinarische Vision</h3>
              <p className={styles.red}>Im Jahr 2000</p>
              <p>
                eröffnete er seine eigene Bar mit einem innovativen Konzept: Peru
                erlebte Kompinationen von Ceviche, Pollo, frittierte Yuca mit
                Huancaina-Sauce und eine Tortilla Kombiniert mit einer
                außergewöhnlichen Cocktailkunst, die ihn von anderen abhob.
              </p>
              <p>
                Er verwandelte sein kulturelles Zentrum mit Konzerten,
                Ausstellungen, Theater, Tanz und Poesie - ein fester Bestandteil
                der künstlerischen Szene Limas.
              </p>

              <h3 className={styles.h3}>Peruanische Wurzeln in Deutschland</h3>
              <p className={styles.red}>Im Jahr 2012</p>
              <p>
                zog er nach Deutschland, um sein gastronomisches Ausklang zu
                formalisieren.
              </p>
              <p className={styles.red}>
                2015 erhielt er ein Diplom als professioneller Koch
              </p>
              <p className={styles.red}>
                Berlin 2013 gründete er das Projekt CholoSoy
              </p>
              <p>
                - Peruanische Events bekamen mit dem Ziel, die peruanische Küche
                auf wachsenden Märkten und in kulturellen Rahmen bekannt zu machen.
              </p>
              <p>
                Nach seinen Ausbildungen im 2017 sammelte er Erfahrung in Hotel,
                Restaurants und Großküchen in verschiedenen Regionen Deutschlands -
                zunächst als Chef de Partie, später Chefkoch.
              </p>

              <h3 className={styles.h3}>Die Zukunft CholoSoy Restaurant</h3>
              <p>
                Heute widmet er sich mit ganzer Kraft der Gründung des CholoSoy
                Restaurants - einem Ort, der den deutschen Gaumen mit
                authentischen peruanischen Spezialitäten begeistern möchte,
                zubereitet mit Leidenschaft, handwerklichem Können und tiefem
                Respekt für die kulinarische Tradition Perus.
              </p>
            </div>
          </div>

          <aside className={styles.mediaCol}>
            <div className={styles.mediaTop}>
              <div className={styles.mediaSmall}>
                <Image
                  src="/images/about/causita.png"
                  alt="Causita"
                  fill
                  className={styles.image}
                  sizes="(max-width: 980px) 100vw, 320px"
                />
              </div>
              <div className={styles.mediaSmall}>
                <Image
                  src="/images/about/timbal.png"
                  alt="Timbal"
                  fill
                  className={styles.image}
                  sizes="(max-width: 980px) 100vw, 320px"
                />
              </div>
              <div className={styles.mediaSmall}>
                <Image
                  src="/images/about/pasta.png"
                  alt="Pasta"
                  fill
                  className={styles.image}
                  sizes="(max-width: 980px) 100vw, 320px"
                />
              </div>
            </div>

            <div className={styles.mediaMid}>
              <Image
                src="/images/about/mariscos.png"
                alt="Mariscos"
                fill
                className={styles.image}
                sizes="(max-width: 980px) 100vw, 320px"
              />
            </div>

            <div className={styles.mediaLarge}>
              <Image
                src="/images/about/koch.png"
                alt="Koch"
                fill
                className={styles.image}
                sizes="(max-width: 980px) 100vw, 320px"
              />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}