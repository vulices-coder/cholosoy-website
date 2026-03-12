"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import styles from "./AboutIntro.module.scss";

const LOCALES = new Set(["de", "es", "en"]);

type Locale = "de" | "es" | "en";

function getLocaleFromPath(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return LOCALES.has(first) ? (first as Locale) : "de";
}

type AboutDict = {
  kicker: string;
  title: string;
  storyTitle: string;
  berlin2013: string;
  berlin2013p1: string;
  berlin2013p2: string;
  berlin2015: string;
  berlin2015p1: string;
  berlin2015p2: string;
  berlin2015p3: string;
  founderTitle: string;
  founderP1: string;
  founderP2: string;
  founderP3: string;
  founderP4: string;
  founderP5: string;
  visionTitle: string;
  year2000: string;
  visionP1: string;
  visionP2: string;
  rootsTitle: string;
  year2012: string;
  rootsP1: string;
  rootsHighlight1: string;
  rootsHighlight2: string;
  rootsP2: string;
  rootsP3: string;
  futureTitle: string;
  futureP1: string;
  altCausita: string;
  altTimbal: string;
  altPasta: string;
  altMariscos: string;
  altKoch: string;
};

const ABOUT_DICT: Record<Locale, AboutDict> = {
  de: {
    kicker: "CholoSoy - Authentischer Geschmack aus Peru in Berlin",
    title: "Über Uns",
    storyTitle: "Unsere Geschichte",
    berlin2013: "Berlin, 2013",
    berlin2013p1:
      "Die peruanische Küche war damals kaum mehr als eine Illusion - ihr Geschmack ein Rätsel, das es zu entschlüsseln galt.",
    berlin2013p2:
      "Auf den Flohmärkten in der Sonnenallee wurde jeden Samstag Guano gefunden, zubereitet mit rätselhaften Pepperonen oder goldenem Leuchten Poppas - orange wie Aji Amarillo, zumindest vielleicht. Doch im Geschmack lagen Welten dazwischen. Beides zu mischen war ein Experiment für Mutige.",
    berlin2015: "Berlin, 2015",
    berlin2015p1:
      "Die peruanische Gastronomie hat Grenzen überwunden, und ihre essenziellen Zutaten haben nun ihre verschiedenen Wege in Deutschland.",
    berlin2015p2:
      "Sie zu integrieren war eine Herausforderung - sie zu beherrschen, eine Kunst.",
    berlin2015p3:
      "CholoSoy lässt Sie nun auf eine kulinarische Reise durch Peru - entdecken Sie eine neue Art, die Welt mit dem Gaumen zu bereisen.",
    founderTitle: "Unser Gründer und Küchenchef",
    founderP1:
      "Seit 1998 bildet sich unser Küchenchef autodidaktisch in der Gastronomieszene Limas aus.",
    founderP2:
      "Seine Leidenschaft begann in der Welt der Cocktails - zunächst als Barkell in einer der bekanntesten Bars im berühmten Stadtteil Barranco.",
    founderP3:
      "Mit Leidenschaft und Engagement arbeitete er sich zum Barmixer und schließlich zum Geschäftsführer hoch.",
    founderP4: "Anschließend entdeckte er seine Leidenschaft fürs Kochen.",
    founderP5:
      "Er begann als Küchenchef seine Leidenschaft für Kochkurse und Restaurants und empfahl eine Mehrfachspezialisation - einer der Säulen der peruanischen Küche. Dort entwickelte er seine fähigkeit, traditionelle Aromen kreativ und respektvoll zu kombinieren.",
    visionTitle: "Eine kulinarische Vision",
    year2000: "Im Jahr 2000",
    visionP1:
      "eröffnete er seine eigene Bar mit einem innovativen Konzept: Peru erlebte Kompinationen von Ceviche, Pollo, frittierte Yuca mit Huancaina-Sauce und eine Tortilla Kombiniert mit einer außergewöhnlichen Cocktailkunst, die ihn von anderen abhob.",
    visionP2:
      "Er verwandelte sein kulturelles Zentrum mit Konzerten, Ausstellungen, Theater, Tanz und Poesie - ein fester Bestandteil der künstlerischen Szene Limas.",
    rootsTitle: "Peruanische Wurzeln in Deutschland",
    year2012: "Im Jahr 2012",
    rootsP1:
      "zog er nach Deutschland, um sein gastronomisches Ausklang zu formalisieren.",
    rootsHighlight1: "2015 erhielt er ein Diplom als professioneller Koch",
    rootsHighlight2: "Berlin 2013 gründete er das Projekt CholoSoy",
    rootsP2:
      "- Peruanische Events bekamen mit dem Ziel, die peruanische Küche auf wachsenden Märkten und in kulturellen Rahmen bekannt zu machen.",
    rootsP3:
      "Nach seinen Ausbildungen im 2017 sammelte er Erfahrung in Hotel, Restaurants und Großküchen in verschiedenen Regionen Deutschlands - zunächst als Chef de Partie, später Chefkoch.",
    futureTitle: "Die Zukunft CholoSoy Restaurant",
    futureP1:
      "Heute widmet er sich mit ganzer Kraft der Gründung des CholoSoy Restaurants - einem Ort, der den deutschen Gaumen mit authentischen peruanischen Spezialitäten begeistern möchte, zubereitet mit Leidenschaft, handwerklichem Können und tiefem Respekt für die kulinarische Tradition Perus.",
    altCausita: "Causita",
    altTimbal: "Timbal",
    altPasta: "Pasta",
    altMariscos: "Mariscos",
    altKoch: "Koch",
  },
  es: {
    kicker: "CholoSoy - Sabor auténtico del Perú en Berlín",
    title: "Sobre Nosotros",
    storyTitle: "Nuestra historia",
    berlin2013: "Berlín, 2013",
    berlin2013p1:
      "En aquel entonces, la cocina peruana era poco más que una ilusión: su sabor, un enigma que había que descifrar.",
    berlin2013p2:
      "En los mercadillos de Sonnenallee aparecían cada sábado ingredientes encontrados y mezclas improvisadas, con colores que recordaban al ají amarillo, aunque el sabor fuera otro. Entre intentos y contrastes nació una búsqueda valiente por acercarse al verdadero sabor del Perú.",
    berlin2015: "Berlín, 2015",
    berlin2015p1:
      "La gastronomía peruana ha cruzado fronteras, y sus ingredientes esenciales han encontrado nuevos caminos en Alemania.",
    berlin2015p2:
      "Integrarlos fue un reto; dominarlos, un arte.",
    berlin2015p3:
      "Hoy CholoSoy le invita a emprender un viaje culinario por el Perú y a descubrir una nueva forma de recorrer el mundo con el paladar.",
    founderTitle: "Nuestro fundador y chef",
    founderP1:
      "Desde 1998, nuestro chef se formó de manera autodidacta en la escena gastronómica de Lima.",
    founderP2:
      "Su pasión comenzó en el mundo de los cócteles, primero como barman en uno de los bares más reconocidos del famoso distrito de Barranco.",
    founderP3:
      "Con pasión y dedicación fue ascendiendo hasta convertirse en jefe de barra y posteriormente en gerente.",
    founderP4:
      "Más adelante descubrió también su pasión por la cocina.",
    founderP5:
      "Como chef, profundizó en cursos, restaurantes y especializaciones, una de las bases de la cocina peruana. Allí desarrolló su capacidad de combinar aromas tradicionales con creatividad y respeto.",
    visionTitle: "Una visión culinaria",
    year2000: "En el año 2000",
    visionP1:
      "abrió su propio bar con un concepto innovador: combinaciones de ceviche, pollo, yuca frita con salsa huancaína y tortilla, acompañadas por una coctelería extraordinaria que lo distinguía de los demás.",
    visionP2:
      "Transformó su centro cultural en un espacio para conciertos, exposiciones, teatro, danza y poesía, convirtiéndose en una parte viva de la escena artística limeña.",
    rootsTitle: "Raíces peruanas en Alemania",
    year2012: "En el año 2012",
    rootsP1:
      "se trasladó a Alemania para formalizar su trayectoria gastronómica.",
    rootsHighlight1:
      "En 2015 obtuvo un diploma como cocinero profesional",
    rootsHighlight2:
      "En Berlín, en 2013, fundó el proyecto CholoSoy",
    rootsP2:
      "- eventos peruanos nacidos con el objetivo de dar a conocer la cocina peruana en nuevos mercados y contextos culturales.",
    rootsP3:
      "Tras su formación, en 2017 acumuló experiencia en hoteles, restaurantes y grandes cocinas de distintas regiones de Alemania, primero como Chef de Partie y más tarde como chef principal.",
    futureTitle: "El futuro de CholoSoy Restaurant",
    futureP1:
      "Hoy dedica toda su energía a la creación del restaurante CholoSoy: un lugar que busca conquistar el paladar alemán con auténticas especialidades peruanas, preparadas con pasión, oficio y un profundo respeto por la tradición culinaria del Perú.",
    altCausita: "Causita",
    altTimbal: "Timbal",
    altPasta: "Pasta",
    altMariscos: "Mariscos",
    altKoch: "Chef",
  },
  en: {
    kicker: "CholoSoy - Authentic Peruvian flavor in Berlin",
    title: "About Us",
    storyTitle: "Our story",
    berlin2013: "Berlin, 2013",
    berlin2013p1:
      "At that time, Peruvian cuisine was little more than an illusion in Berlin - its flavor a mystery waiting to be discovered.",
    berlin2013p2:
      "At the Sonnenallee flea markets, ingredients and improvised combinations appeared every Saturday, sometimes with colors reminiscent of ají amarillo, yet with entirely different flavors. Out of those contrasts grew a bold search for the true taste of Peru.",
    berlin2015: "Berlin, 2015",
    berlin2015p1:
      "Peruvian gastronomy has crossed borders, and its essential ingredients have found their way into Germany.",
    berlin2015p2:
      "Integrating them was a challenge; mastering them, an art.",
    berlin2015p3:
      "Today, CholoSoy invites you on a culinary journey through Peru and offers a new way to travel the world through taste.",
    founderTitle: "Our founder and head chef",
    founderP1:
      "Since 1998, our chef has trained in Lima’s gastronomy scene as a self-taught professional.",
    founderP2:
      "His passion began in the world of cocktails, first as a bartender in one of the best-known bars in the famous Barranco district.",
    founderP3:
      "With passion and commitment, he worked his way up to bar manager and eventually to general manager.",
    founderP4:
      "Later, he also discovered his passion for cooking.",
    founderP5:
      "As a chef, he deepened his craft through courses, restaurant experience and multiple specializations, one of the pillars of Peruvian cuisine. There he developed his ability to combine traditional flavors with creativity and respect.",
    visionTitle: "A culinary vision",
    year2000: "In the year 2000",
    visionP1:
      "he opened his own bar with an innovative concept: combinations of ceviche, chicken, fried yuca with huancaína sauce and tortilla, paired with exceptional cocktail craftsmanship that set him apart.",
    visionP2:
      "He transformed his cultural venue into a place for concerts, exhibitions, theater, dance and poetry, becoming a lively part of Lima’s artistic scene.",
    rootsTitle: "Peruvian roots in Germany",
    year2012: "In the year 2012",
    rootsP1:
      "he moved to Germany to formalize and expand his gastronomic journey.",
    rootsHighlight1:
      "In 2015 he earned a diploma as a professional chef",
    rootsHighlight2:
      "In Berlin, in 2013, he founded the CholoSoy project",
    rootsP2:
      "- Peruvian events created with the goal of introducing Peruvian cuisine to growing markets and cultural spaces.",
    rootsP3:
      "After his training, in 2017 he gained experience in hotels, restaurants and large kitchens across different regions of Germany, first as Chef de Partie and later as head chef.",
    futureTitle: "The future of CholoSoy Restaurant",
    futureP1:
      "Today, he devotes all his energy to building the CholoSoy Restaurant - a place designed to inspire the German palate with authentic Peruvian specialties, prepared with passion, craftsmanship and deep respect for Peru’s culinary tradition.",
    altCausita: "Causita",
    altTimbal: "Timbal",
    altPasta: "Pasta",
    altMariscos: "Seafood",
    altKoch: "Chef",
  },
};

export default function AboutIntro() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = ABOUT_DICT[locale];

  return (
    <section className={styles.section}>
      <Container size="lg">
        <div className={styles.inner}>
          <div className={styles.textCol}>
            <p className={styles.kicker}>{t.kicker}</p>

            <h1 className={styles.title}>{t.title}</h1>

            <div className={styles.copy}>
              <h3 className={styles.h3}>{t.storyTitle}</h3>

              <p className={styles.red}>{t.berlin2013}</p>
              <p>{t.berlin2013p1}</p>
              <p>{t.berlin2013p2}</p>

              <p className={styles.red}>{t.berlin2015}</p>
              <p>{t.berlin2015p1}</p>
              <p>{t.berlin2015p2}</p>
              <p>{t.berlin2015p3}</p>

              <h3 className={styles.h3}>{t.founderTitle}</h3>
              <p>{t.founderP1}</p>
              <p>{t.founderP2}</p>
              <p>{t.founderP3}</p>
              <p>{t.founderP4}</p>
              <p>{t.founderP5}</p>

              <h3 className={styles.h3}>{t.visionTitle}</h3>
              <p className={styles.red}>{t.year2000}</p>
              <p>{t.visionP1}</p>
              <p>{t.visionP2}</p>

              <h3 className={styles.h3}>{t.rootsTitle}</h3>
              <p className={styles.red}>{t.year2012}</p>
              <p>{t.rootsP1}</p>
              <p className={styles.red}>{t.rootsHighlight1}</p>
              <p className={styles.red}>{t.rootsHighlight2}</p>
              <p>{t.rootsP2}</p>
              <p>{t.rootsP3}</p>

              <h3 className={styles.h3}>{t.futureTitle}</h3>
              <p>{t.futureP1}</p>
            </div>
          </div>

          <aside className={styles.mediaCol}>
            <div className={styles.mediaTop}>
              <div className={styles.mediaSmall}>
                <Image
                  src="/images/about/causita.png"
                  alt={t.altCausita}
                  fill
                  className={styles.image}
                  sizes="(max-width: 980px) 100vw, 320px"
                />
              </div>
              <div className={styles.mediaSmall}>
                <Image
                  src="/images/about/timbal.png"
                  alt={t.altTimbal}
                  fill
                  className={styles.image}
                  sizes="(max-width: 980px) 100vw, 320px"
                />
              </div>
              <div className={styles.mediaSmall}>
                <Image
                  src="/images/about/pasta.png"
                  alt={t.altPasta}
                  fill
                  className={styles.image}
                  sizes="(max-width: 980px) 100vw, 320px"
                />
              </div>
            </div>

            <div className={styles.mediaMid}>
              <Image
                src="/images/about/mariscos.png"
                alt={t.altMariscos}
                fill
                className={styles.image}
                sizes="(max-width: 980px) 100vw, 320px"
              />
            </div>

            <div className={styles.mediaLarge}>
              <Image
                src="/images/about/koch.png"
                alt={t.altKoch}
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