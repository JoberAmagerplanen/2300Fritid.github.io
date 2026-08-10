/**
 * activities.js
 * 
 * Datastruktur for lokale aktiviteter.
 * 
 * VIGTIG: x og y er procent-koordinater (0-100) på kortbilledet.
 * x = procent fra venstre (0 = helt til venstre, 100 = helt til højre)
 * y = procent fra top (0 = helt øverst, 100 = helt nederst)
 * 
 * Så selvom billedet skalerer responsivt, placeres pins korrekt i forhold til billedets proportioner.
 * 
 * ===== KATEGORI-MAPPING (id til kategori) =====
 * id: 1 = Bold (grøn #2ecc71)
 * id: 2 = Dans & bevægelse (blå #3498db)
 * id: 3 = Krea & kultur (orange #e67e22)
 * id: 4 = Kampsport (lyserosa #f1a3d6)
 * id: 5 = Andet (brun #a0522d)
 * 
 * NOTE: x/y-koordinater herunder er sat til tilfældige placeholder-værdier
 * og skal justeres senere efter vejledningen nederst i filen.
 */
const activities = [
  {
    id: 1,
    title: "Leg og Bold (Idrætsprojektet)",
    category: "Bold",
    x: 14.9,
    y: 49.9,
    location: "Rød Bane",
    description: "\"Leg og Bold\" fodbold med Idrætsprojektet, B1908 og Brobold – kræver ingen tilmelding, bare duk op!",
    time: "Torsdage kl. 15-17",
    contact: "??"
  },
  {
    id: 1,
    title: "Street fodbold (GAME)",
    category: "Bold",
    x: 25.9,
    y: 81.5,
    location: "Tvillingebanerne i Remiseparken",
    description: "Street fodbold med GAME – kræver ingen tilmelding, bare duk op!",
    time: "Fredage kl. 16-17",
    contact: "??"
  },
  {
    id: 1,
    title: "Street café for piger (Street Society)",
    category: "Bold",
    x: 41.9,
    y: 54.2,
    location: "Blå Bane",
    description: "Street fodbold for piger med Street Society – kræver ingen tilmelding, bare duk op!",
    time: "Onsdage kl. 16.30-18.00",
    contact: "??"
  },
  {
    id: 1,
    title: "Lørdagsbold for drenge (Street Society)",
    category: "Bold",
    x: 43,
    y: 57.8,
    location: "Blå Bane",
    description: "Street fodbold for drenge med Street Society – kræver ingen tilmelding, bare duk op!",
    time: "Lørdage kl. 16-18",
    contact: "??"
  },
  {
    id: 1,
    title: "Åben onsdagstræning (B1908)",
    category: "Bold",
    x: 40.7,
    y: 86.2,
    location: "Sundby Idrætspark",
    description: "Åben onsdagstræning med B1908 - åbent for alle uanset køn, alder og fodboldevner.",
    time: "Onsdage kl. 12.30-14.30",
    contact: "??"
  },
  {
    id: 4,
    title: "Boksning (ABC-boksning)",
    category: "Kampsport",
    x: 41.3,
    y: 56,
    location: "Blå Bane",
    description: "Boksning med ABC-boksning – kræver ingen tilmelding, bare duk op!",
    time: "Tirsdage kl. 16-18",
    contact: "??"
  },
  {
    id: 5,
    title: "Street basket (GAME)",
    category: "Bold",
    x: 27.5,
    y: 81.8,
    location: "Tvillingebanerne i Remiseparken",
    description: "Street basket med GAME – kræver ingen tilmelding, bare duk op!",
    time: "Onsdage kl. 16.15-17.15",
    contact: "??"
  },
  {
    id: 5,
    title: "Idrætscontaineren - mødested for unge",
    category: "Andet",
    x: 24.8,
    y: 78.2,
    location: "Idrætscontaineren i Remiseparken",
    description: "Mødested og aktiviteter for børn og unge arrangeret af Ungeværket Jokeren – kræver ikke klubmedlemsskab eller tilmelding, bare duk op!",
    time: "Alle hverdage",
    contact: "??"
  },
  {
    id: 5,
    title: "Buret - mødested for unge",
    category: "Andet",
    x: 60.6,
    y: 9.1,
    location: "Buret på Prags Boulevard",
    description: "Mødested og aktiviteter for børn og unge mellem 10-17 år arrangeret af Ungeværket Amager Nordøst– kræver ikke klubmedlemsskab eller tilmelding, bare duk op!",
    time: "Alle hverdage kl. 14-17.30. Lørdage i ulige uger kl. 10.30-13.30",
    contact: "??"
  },
  {
    id: 3,
    title: "Garncafé",
    category: "Krea & kultur",
    x: 24.2,
    y: 89.8,
    location: "LykkeBazaren, Urmagerstien 26",
    description: "Fordyb dig i garn og håndarbejde i Garncaféen i Lykkebazaren. Her kan du arbejde med tufting, strik og hækling i kreative rammer, uanset om du er nybegynder eller erfaren – kræver ingen tilmelding, bare duk op!",
    time: "Mandage kl. 14-16.30",
    contact: "https://kbhgenbruger.kk.dk/aktiviteter-og-events/garn-cafe-paa-remiseparken-naergenbrugsstation-lykkebazaren-0"
  },
  {
    id: 3,
    title: "Kreacafé",
    category: "Krea & kultur",
    x: 22.1,
    y: 90,
    location: "LykkeBazaren, Urmagerstien 26",
    description: "Fordyb dig i kreative projekter lavet af genbrugsmaterialer fra byens genbrugsstationer. Her kan du give materialer nyt liv og skabe noget helt dit eget – kræver ingen tilmelding, bare duk op!",
    time: "Søndage kl. 13.30-15.30",
    contact: "https://kbhgenbruger.kk.dk/aktiviteter-og-events/krea-cafe-i-remiseparken-naergenbrugsstation-lykkebazaren-0"
  },
  {
    id: 3,
    title: "Sycafé",
    category: "Krea & kultur",
    x: 23.3,
    y: 50.4,
    location: "Hørgårdens Nærgenbrugsstation",
    description: "Kom i gang med dine egne sy-projekter. Sycaféen er et åbent fællesskab, hvor der er plads til fordybelse, idéudveksling og inspiration fra andre – kræver ingen tilmelding, bare duk op!",
    time: "Torsdage kl. 14.30-17.30",
    contact: "https://kbhgenbruger.kk.dk/aktiviteter-og-events/sy-cafe-paa-hoergaarden-naergenbrugsstation-2"
  },
  {
    id: 3,
    title: "Strikkecafé",
    category: "Krea & kultur",
    x: 19.7,
    y: 93.8,
    location: "Solvang bibliotek",
    description: "Strikkecafé. Alle er velkomne, og er du ny til strik, har vi strikkepinde og garn til rådighed. Det er helt uforpligtende og gratis at deltage – kræver ingen tilmelding, bare duk op!",
    time: "Onsdage kl. 15-17",
    contact: "https://bibliotek.kk.dk/solvang-bibliotek/aktiviteter/faellesskaber/kreative-faellesskaber/strikkecafe"
  },
  {
    id: 5,
    title: "Bemandede legepladser Bonderen & Byggeren",
    category: "Andet",
    x: 32.1,
    y: 73.9,
    location: "Remiseparken",
    description: "De bemandede legepladser \"Bonderen\" og \"Byggeren\". Der tilbydes løbende aktiviteter, som er åbne for alle. Det kan blandt andet være bålaktiviteter og grønne aktiviteter",
    time: "Alle dage",
    contact: "https://legeplads.kk.dk/vaelg-en-bydel/amager/remiseparken-bonderen-og-byggeren-b"
  },
  {
    id: 5,
    title: "Bemandet legeplads Øselsgade",
    category: "Andet",
    x: 36.1,
    y: 34.8,
    location: "Øselsgade 5",
    description: "Den bemandede legeplads i Øselsgade. Legeplads med indendørs mødested, med pool, bordtennis og bordfodbold. Man kan også være kreativ eller spille brætspil.",
    time: "Alle dage",
    contact: "https://legeplads.kk.dk/vaelg-en-bydel/amager/oeselsgade-b"
  },
  {
    id: 2,
    title: "Dans for piger",
    category: "Dans & bevægelse",
    x: 10.4,
    y: 45.1,
    location: "A-huset",
    description: "?.",
    time: "Onsdage kl. ??",
    contact: "Chika ??"
  },
  {
    id: 4,
    title: "Boksning (Street Society)",
    category: "Kampsport",
    x: 19,
    y: 42.8,
    location: "Laden",
    description: "Boksning med Street Society – kræver ingen tilmelding, bare duk op!",
    time: "?",
    contact: "?"
  },
  {
    id: 3,
    title: "Glimt Amager",
    category: "Krea & kultur",
    x: 22.4,
    y: 34.9,
    location: "Sundholmsvej 8",
    description: "Bliv undervist i cirkusdiscipliner og fysisk teater af professionelle cirkusartister og performere. Lær bl.a. luftakrobatik, akrobatik på gulv, partnerakrobatik, linedans og jonglering. Vi tilbyder cirkushold for børn i alderen 7-9 og 10-13 år samt to ungdomshold gennem Københavns Ungdomsskole 13-18 år.",
    time: "Eftermiddage",
    contact: "https://www.glimtamager.dk/portfolio-item/cirkushold/"
  },
  {
    id: 3,
    title: "Kulturpiloterne",
    category: "Krea & kultur",
    x: 21.8,
    y: 93.8,
    location: "Remisevej 14",
    description: "Kunst, scenekunst, udvikling af kreative projekter og kulturproduktion til mange, er noget af det indhold vi arbejder sammen om i Kulturpilot. Kulturpiloterne er en gruppe børn og unge, der arbejder med forskellige former for kunst og kultur. Vi har ikke sæsoner som andre fritidstilbud. Du er altid velkommen, da vi arbejder meget projektorienteret. Skriv og hør om vi har plads og hvornår det kan passe at du starter på holdet. Det koster ikke noget at deltage, men vi forventer at du møder op hver gang, på samme vis som til alle andre fritidsaktiviteter.",
    time: "Eftermiddage",
    contact: "https://kulturogfritids.kk.dk/huse/kulturpilot-amager"
  }
];
/**
 * VEJLEDNING TIL JUSTERING AF PIN-PLACERING:
 * 
 * 1. Åbn browserens Developer Tools (F12)
 * 2. Åbn fanen "Console"
 * 3. Klik på et sted på kortbilledet – koordinaterne vises i konsollen
 * 4. Kopier x og y værdierne og indsæt dem i aktivitetens x og y felt ovenfor
 * 5. Gem filen og genindlæs siden (Ctrl+F5) for at se resultatet
 * 
 * Eksempel output i konsollen:
 *   Map clicked at: x: 48.5%, y: 62.3%
 * 
 * Så indsætter du x: 48.5 og y: 62.3 i den ønskede aktivitet.
 */
