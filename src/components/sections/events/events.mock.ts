export type EventItem = {
  id: string;
  title: string;
  description: string;
  dateLabel: string;
  imageSrc: string;
};

type Locale = "de" | "es" | "en";

export function getEvents(locale: Locale): EventItem[] {
  const dict: Record<Locale, EventItem[]> = {
    de: [
      {
        id: "event-01",
        title: "Noche de Cumbia Peruana",
        description:
          "Erleben Sie einen mitreißenden Abend mit klassischer und moderner peruanischer Cumbia. Tanz, gute Stimmung und die besten Rhythmen aus Peru erwarten Sie bei CholoSoy.",
        dateLabel: "Fr. 01.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/18.jpg",
      },
      {
        id: "event-02",
        title: "Fiesta Latina de Sábado",
        description:
          "Ein festlicher Samstagabend mit lateinamerikanischen Hits, Tanzfläche, Cocktails und einer lebendigen Atmosphäre für alle, die feiern und genießen möchten.",
        dateLabel: "Sa. 02.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/02.jpg",
      },
      {
        id: "event-03",
        title: "Domingo Criollo",
        description:
          "Genießen Sie peruanische Música Criolla zur Mittagszeit mit traditionellen Klängen, kultureller Atmosphäre und ausgewählten Spezialitäten unseres Hauses.",
        dateLabel: "So. 03.05.2026 · 13:00 Uhr",
        imageSrc: "/images/events/03.jpg",
      },
      {
        id: "event-04",
        title: "Rock en Español Live",
        description:
          "Ein Abend voller Klassiker des Rock en Español – live, energiegeladen und perfekt für alle, die lateinamerikanische Rockmusik lieben.",
        dateLabel: "Do. 07.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/04.jpg",
      },
      {
        id: "event-05",
        title: "Salsa Night",
        description:
          "Freitagabend im Zeichen der Salsa: rhythmische Musik, Tanz und sommerliche Stimmung in einem authentischen peruanisch-lateinamerikanischen Ambiente.",
        dateLabel: "Fr. 08.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/05.jpg",
      },
      {
        id: "event-06",
        title: "Electro Tropical Session",
        description:
          "Eine moderne Mischung aus elektronischen Beats und tropischen Einflüssen. Perfekt für Gäste, die ein zeitgemäßes, urbanes CholoSoy-Erlebnis suchen.",
        dateLabel: "Sa. 09.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/06.jpg",
      },
      {
        id: "event-07",
        title: "Sonntagsbrunch mit Criolla-Musik",
        description:
          "Traditionelle peruanische Mittagsatmosphäre mit sanfter Live-Musik, kulinarischen Spezialitäten und einem entspannten Start in den Sonntag.",
        dateLabel: "So. 10.05.2026 · 13:00 Uhr",
        imageSrc: "/images/events/20.jpg",
      },
      {
        id: "event-08",
        title: "Peña Peruana",
        description:
          "Ein klassischer Abend im Stil einer peruanischen Peña mit folkloristischen und criollistischen Einflüssen, ideal für Kultur- und Musikliebhaber.",
        dateLabel: "Do. 14.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/10.jpg",
      },
      {
        id: "event-09",
        title: "Cumbia & Fiesta",
        description:
          "Ein lebendiger Freitag mit peruanischer Cumbia, Tanz und Festival-Stimmung. Ideal für Gruppen, Freundeskreise und alle, die ausgelassen feiern möchten.",
        dateLabel: "Fr. 15.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/09.jpg",
      },
      {
        id: "event-10",
        title: "Sábado de Salsa y Sabor",
        description:
          "Salsa, gutes Essen und Cocktails verbinden sich zu einem warmen, energiegeladenen Samstagabend voller Bewegung und lateinamerikanischem Flair.",
        dateLabel: "Sa. 16.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/10.jpg",
      },
      {
        id: "event-11",
        title: "Domingo Familiar Peruano",
        description:
          "Ein musikalischer Sonntagnachmittag für Familien und Freunde mit entspannter Live-Musik, peruanischer Küche und kulturellem Ambiente.",
        dateLabel: "So. 17.05.2026 · 13:00 Uhr",
        imageSrc: "/images/events/11.jpg",
      },
      {
        id: "event-12",
        title: "Noche de Rock Latino",
        description:
          "Gitarren, Energie und bekannte Hymnen des lateinamerikanischen Rock sorgen für einen besonderen Donnerstagabend bei CholoSoy.",
        dateLabel: "Do. 21.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/12.jpg",
      },
      {
        id: "event-13",
        title: "Fiesta CholoSoy",
        description:
          "Freitag ist Partynacht: ein abwechslungsreicher Mix aus Latin Sounds, Partyklassikern und guter Stimmung im CholoSoy-Stil.",
        dateLabel: "Fr. 22.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/13.jpg",
      },
      {
        id: "event-14",
        title: "Elektronische Nacht",
        description:
          "Ein moderner Samstag mit elektronischer Musik, Latin-House-Vibes und einer stilvollen Abendatmosphäre für ein urbanes Publikum.",
        dateLabel: "Sa. 23.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/08.jpg",
      },
      {
        id: "event-15",
        title: "Salsa Brunch Session",
        description:
          "Sonntags genießen Sie einen musikalischen Lunch mit Salsa-Rhythmen, peruanischen Spezialitäten und entspannter Mittagsstimmung.",
        dateLabel: "So. 24.05.2026 · 13:00 Uhr",
        imageSrc: "/images/events/15.jpg",
      },
      {
        id: "event-16",
        title: "Música Criolla en Vivo",
        description:
          "Eine Hommage an die traditionelle peruanische Criolla-Musik mit emotionalen Melodien, kulinarischen Erlebnissen und authentischer Atmosphäre.",
        dateLabel: "Do. 28.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/16.jpg",
      },
      {
        id: "event-17",
        title: "Gran Noche de Cumbia",
        description:
          "Ein Abend mit tanzbaren peruanischen Cumbia-Klängen, energiegeladener Stimmung und einem echten Festgefühl im Restaurant.",
        dateLabel: "Fr. 29.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/17.jpg",
      },
      {
        id: "event-18",
        title: "Sábado de Fiesta Latina",
        description:
          "Zum Monatsende feiern wir mit einer großen Latin-Party, Musikmix, Cocktails und einer unvergesslichen Samstagnacht bei CholoSoy.",
        dateLabel: "Sa. 30.05.2026 · 20:00 Uhr",
        imageSrc: "/images/events/18.jpg",
      },
      {
        id: "event-19",
        title: "Domingo de Cierre Musical",
        description:
          "Ein entspannter musikalischer Sonntag zum Monatsabschluss mit Live-Atmosphäre, peruanischem Essen und kulturellem Flair.",
        dateLabel: "So. 31.05.2026 · 13:00 Uhr",
        imageSrc: "/images/events/19.jpg",
      },
    ],
    es: [
      {
        id: "event-01",
        title: "Noche de Cumbia Peruana",
        description:
          "Disfrute de una noche vibrante con cumbia peruana clásica y moderna. Baile, buen ambiente y los mejores ritmos del Perú le esperan en CholoSoy.",
        dateLabel: "Vie. 01.05.2026 · 20:00 h",
        imageSrc: "/images/events/18.jpg",
      },
      {
        id: "event-02",
        title: "Fiesta Latina de Sábado",
        description:
          "Una noche festiva de sábado con éxitos latinoamericanos, pista de baile, cócteles y un ambiente animado para quienes quieren celebrar y disfrutar.",
        dateLabel: "Sáb. 02.05.2026 · 20:00 h",
        imageSrc: "/images/events/02.jpg",
      },
      {
        id: "event-03",
        title: "Domingo Criollo",
        description:
          "Disfrute de música criolla peruana al mediodía, con sonidos tradicionales, ambiente cultural y especialidades seleccionadas de nuestra casa.",
        dateLabel: "Dom. 03.05.2026 · 13:00 h",
        imageSrc: "/images/events/03.jpg",
      },
      {
        id: "event-04",
        title: "Rock en Español Live",
        description:
          "Una noche llena de clásicos del rock en español: en vivo, con energía y perfecta para quienes aman la música rock latinoamericana.",
        dateLabel: "Jue. 07.05.2026 · 20:00 h",
        imageSrc: "/images/events/04.jpg",
      },
      {
        id: "event-05",
        title: "Noche de Salsa",
        description:
          "El viernes se llena de salsa: música rítmica, baile y un ambiente veraniego en un entorno auténticamente peruano y latinoamericano.",
        dateLabel: "Vie. 08.05.2026 · 20:00 h",
        imageSrc: "/images/events/05.jpg",
      },
      {
        id: "event-06",
        title: "Sesión Electro Tropical",
        description:
          "Una mezcla moderna de beats electrónicos e influencias tropicales. Ideal para quienes buscan una experiencia CholoSoy urbana y contemporánea.",
        dateLabel: "Sáb. 09.05.2026 · 20:00 h",
        imageSrc: "/images/events/06.jpg",
      },
      {
        id: "event-07",
        title: "Brunch dominical con música criolla",
        description:
          "Un ambiente tradicional peruano al mediodía con música en vivo suave, especialidades culinarias y un domingo relajado.",
        dateLabel: "Dom. 10.05.2026 · 13:00 h",
        imageSrc: "/images/events/20.jpg",
      },
      {
        id: "event-08",
        title: "Peña Peruana",
        description:
          "Una noche clásica al estilo de una peña peruana, con influencias folclóricas y criollas, ideal para amantes de la cultura y la música.",
        dateLabel: "Jue. 14.05.2026 · 20:00 h",
        imageSrc: "/images/events/10.jpg",
      },
      {
        id: "event-09",
        title: "Cumbia y Fiesta",
        description:
          "Un viernes lleno de cumbia peruana, baile y ambiente festivo. Ideal para grupos de amigos y para todos los que quieren celebrar.",
        dateLabel: "Vie. 15.05.2026 · 20:00 h",
        imageSrc: "/images/events/09.jpg",
      },
      {
        id: "event-10",
        title: "Sábado de Salsa y Sabor",
        description:
          "Salsa, buena comida y cócteles se unen en un sábado cálido, lleno de energía y sabor latinoamericano.",
        dateLabel: "Sáb. 16.05.2026 · 20:00 h",
        imageSrc: "/images/events/10.jpg",
      },
      {
        id: "event-11",
        title: "Domingo Familiar Peruano",
        description:
          "Una tarde dominical musical para familias y amigos, con música en vivo relajada, cocina peruana y un ambiente cultural acogedor.",
        dateLabel: "Dom. 17.05.2026 · 13:00 h",
        imageSrc: "/images/events/11.jpg",
      },
      {
        id: "event-12",
        title: "Noche de Rock Latino",
        description:
          "Guitarras, energía e himnos conocidos del rock latinoamericano crean una noche especial de jueves en CholoSoy.",
        dateLabel: "Jue. 21.05.2026 · 20:00 h",
        imageSrc: "/images/events/12.jpg",
      },
      {
        id: "event-13",
        title: "Fiesta CholoSoy",
        description:
          "El viernes es noche de fiesta: una mezcla variada de sonidos latinos, clásicos de fiesta y buen ambiente al estilo CholoSoy.",
        dateLabel: "Vie. 22.05.2026 · 20:00 h",
        imageSrc: "/images/events/13.jpg",
      },
      {
        id: "event-14",
        title: "Noche Electrónica",
        description:
          "Un sábado moderno con música electrónica, vibras de latin house y una atmósfera elegante para un público urbano.",
        dateLabel: "Sáb. 23.05.2026 · 20:00 h",
        imageSrc: "/images/events/08.jpg",
      },
      {
        id: "event-15",
        title: "Sesión de Brunch con Salsa",
        description:
          "Los domingos disfrute de un almuerzo musical con ritmos de salsa, especialidades peruanas y un ambiente relajado al mediodía.",
        dateLabel: "Dom. 24.05.2026 · 13:00 h",
        imageSrc: "/images/events/15.jpg",
      },
      {
        id: "event-16",
        title: "Música Criolla en Vivo",
        description:
          "Un homenaje a la música criolla peruana tradicional con melodías emotivas, experiencias culinarias y una atmósfera auténtica.",
        dateLabel: "Jue. 28.05.2026 · 20:00 h",
        imageSrc: "/images/events/16.jpg",
      },
      {
        id: "event-17",
        title: "Gran Noche de Cumbia",
        description:
          "Una noche con cumbia peruana bailable, ambiente enérgico y una verdadera sensación de fiesta dentro del restaurante.",
        dateLabel: "Vie. 29.05.2026 · 20:00 h",
        imageSrc: "/images/events/17.jpg",
      },
      {
        id: "event-18",
        title: "Sábado de Fiesta Latina",
        description:
          "Para cerrar el mes celebramos con una gran fiesta latina, mezcla musical, cócteles y una noche inolvidable en CholoSoy.",
        dateLabel: "Sáb. 30.05.2026 · 20:00 h",
        imageSrc: "/images/events/18.jpg",
      },
      {
        id: "event-19",
        title: "Domingo de Cierre Musical",
        description:
          "Un domingo relajado para cerrar el mes con ambiente en vivo, comida peruana y mucho sabor cultural.",
        dateLabel: "Dom. 31.05.2026 · 13:00 h",
        imageSrc: "/images/events/19.jpg",
      },
    ],
    en: [
      {
        id: "event-01",
        title: "Peruvian Cumbia Night",
        description:
          "Experience an exciting evening of classic and modern Peruvian cumbia. Dance, great atmosphere and the best rhythms from Peru await you at CholoSoy.",
        dateLabel: "Fri. 01.05.2026 · 8:00 PM",
        imageSrc: "/images/events/18.jpg",
      },
      {
        id: "event-02",
        title: "Saturday Latin Party",
        description:
          "A festive Saturday evening with Latin hits, dance floor, cocktails and a lively atmosphere for everyone who wants to celebrate and enjoy.",
        dateLabel: "Sat. 02.05.2026 · 8:00 PM",
        imageSrc: "/images/events/02.jpg",
      },
      {
        id: "event-03",
        title: "Criollo Sunday",
        description:
          "Enjoy Peruvian música criolla at lunchtime with traditional sounds, cultural atmosphere and selected specialties from our kitchen.",
        dateLabel: "Sun. 03.05.2026 · 1:00 PM",
        imageSrc: "/images/events/03.jpg",
      },
      {
        id: "event-04",
        title: "Rock en Español Live",
        description:
          "An evening full of Rock en Español classics — live, energetic and perfect for all lovers of Latin American rock music.",
        dateLabel: "Thu. 07.05.2026 · 8:00 PM",
        imageSrc: "/images/events/04.jpg",
      },
      {
        id: "event-05",
        title: "Salsa Night",
        description:
          "Friday night dedicated to salsa: rhythmic music, dancing and a summery atmosphere in an authentic Peruvian-Latin American setting.",
        dateLabel: "Fri. 08.05.2026 · 8:00 PM",
        imageSrc: "/images/events/05.jpg",
      },
      {
        id: "event-06",
        title: "Electro Tropical Session",
        description:
          "A modern mix of electronic beats and tropical influences. Perfect for guests looking for a contemporary urban CholoSoy experience.",
        dateLabel: "Sat. 09.05.2026 · 8:00 PM",
        imageSrc: "/images/events/06.jpg",
      },
      {
        id: "event-07",
        title: "Sunday Brunch with Criolla Music",
        description:
          "Traditional Peruvian lunchtime atmosphere with soft live music, culinary specialties and a relaxed start to Sunday.",
        dateLabel: "Sun. 10.05.2026 · 1:00 PM",
        imageSrc: "/images/events/20.jpg",
      },
      {
        id: "event-08",
        title: "Peruvian Peña Night",
        description:
          "A classic evening in the spirit of a Peruvian peña with folkloric and criollo influences, ideal for culture and music lovers.",
        dateLabel: "Thu. 14.05.2026 · 8:00 PM",
        imageSrc: "/images/events/10.jpg",
      },
      {
        id: "event-09",
        title: "Cumbia & Party",
        description:
          "A lively Friday with Peruvian cumbia, dancing and festival vibes. Ideal for groups of friends and everyone who loves to celebrate.",
        dateLabel: "Fri. 15.05.2026 · 8:00 PM",
        imageSrc: "/images/events/09.jpg",
      },
      {
        id: "event-10",
        title: "Saturday of Salsa and Flavor",
        description:
          "Salsa, great food and cocktails come together in a warm and energetic Saturday evening full of movement and Latin flavor.",
        dateLabel: "Sat. 16.05.2026 · 8:00 PM",
        imageSrc: "/images/events/10.jpg",
      },
      {
        id: "event-11",
        title: "Peruvian Family Sunday",
        description:
          "A musical Sunday afternoon for families and friends with relaxed live music, Peruvian cuisine and a welcoming cultural atmosphere.",
        dateLabel: "Sun. 17.05.2026 · 1:00 PM",
        imageSrc: "/images/events/11.jpg",
      },
      {
        id: "event-12",
        title: "Latin Rock Night",
        description:
          "Guitars, energy and well-known Latin rock anthems create a special Thursday evening at CholoSoy.",
        dateLabel: "Thu. 21.05.2026 · 8:00 PM",
        imageSrc: "/images/events/12.jpg",
      },
      {
        id: "event-13",
        title: "CholoSoy Party",
        description:
          "Friday means party night: a varied mix of Latin sounds, party classics and a great CholoSoy atmosphere.",
        dateLabel: "Fri. 22.05.2026 · 8:00 PM",
        imageSrc: "/images/events/13.jpg",
      },
      {
        id: "event-14",
        title: "Electronic Night",
        description:
          "A modern Saturday with electronic music, Latin house vibes and a stylish evening atmosphere for an urban audience.",
        dateLabel: "Sat. 23.05.2026 · 8:00 PM",
        imageSrc: "/images/events/08.jpg",
      },
      {
        id: "event-15",
        title: "Salsa Brunch Session",
        description:
          "On Sundays, enjoy a musical lunch with salsa rhythms, Peruvian specialties and a relaxed midday mood.",
        dateLabel: "Sun. 24.05.2026 · 1:00 PM",
        imageSrc: "/images/events/15.jpg",
      },
      {
        id: "event-16",
        title: "Live Música Criolla",
        description:
          "A tribute to traditional Peruvian criolla music with emotional melodies, culinary experiences and an authentic atmosphere.",
        dateLabel: "Thu. 28.05.2026 · 8:00 PM",
        imageSrc: "/images/events/16.jpg",
      },
      {
        id: "event-17",
        title: "Great Cumbia Night",
        description:
          "An evening with danceable Peruvian cumbia, energetic atmosphere and a true party feeling inside the restaurant.",
        dateLabel: "Fri. 29.05.2026 · 8:00 PM",
        imageSrc: "/images/events/17.jpg",
      },
      {
        id: "event-18",
        title: "Saturday Latin Fiesta",
        description:
          "To close the month, we celebrate with a big Latin party, music mix, cocktails and an unforgettable Saturday night at CholoSoy.",
        dateLabel: "Sat. 30.05.2026 · 8:00 PM",
        imageSrc: "/images/events/18.jpg",
      },
      {
        id: "event-19",
        title: "Musical Closing Sunday",
        description:
          "A relaxed musical Sunday to close the month with live atmosphere, Peruvian food and cultural flair.",
        dateLabel: "Sun. 31.05.2026 · 1:00 PM",
        imageSrc: "/images/events/19.jpg",
      },
    ],
  };

  return dict[locale];
}