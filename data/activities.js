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
 * id: 2 = Dans & Bevægelse (blå #3498db)
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
    title: "Street fodbold for piger (Street Society)",
    category: "Bold",
    x: 39.9,
    y: 54,
    location: "Blå Bane",
    description: "Street fodbold for piger med Street Society – kræver ingen tilmelding, bare duk op!",
    time: "Onsdage kl. 16.30-??",
    contact: "??"
  },
  {
    id: 1,
    title: "Fodbold for drenge (Street Society)",
    category: "Bold",
    x: 42.8,
    y: 57,
    location: "Blå Bane",
    description: "Fodbold for drenge med Street Society – kræver ingen tilmelding, bare duk op!",
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
    y: 78.7,
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
    description: "Mødested og aktiviteter for børn og unge mellem 10-17 år – kræver ikke klubmedlemsskab eller tilmelding, bare duk op!",
    time: "Alle hverdage",
    contact: "??"
  },
  {
    id: 3,
    title: "Garncafé",
    category: "Krea & kultur",
    x: 24.2,
    y: 89.8,
    location: "LykkeBazaren, Urmagerstien 26",
    description: "Fordyb dig i garn og håndarbejde i Garncaféen i Lykkebazaren. Her kan du arbejde med tufting, strik og hækling i kreative rammer – uanset om du er nybegynder eller erfaren.",
    time: "Mange dage kl. 14-16.30",
    contact: "??"
  },
  {
    id: 3,
    title: "Kreacafé",
    category: "Krea & kultur",
    x: 22.1,
    y: 90,
    location: "LykkeBazaren, Urmagerstien 26",
    description: "Fordyb dig i kreative projekter lavet af genbrugsmaterialer fra byens genbrugsstationer. Her kan du give materialer nyt liv og skabe noget helt dit eget.",
    time: "Søndage kl. 13.30-15.30",
    contact: "??"
  },
  {
    id: 3,
    title: "Sycafé",
    category: "Krea & kultur",
    x: 23.3,
    y: 50.4,
    location: "Hørgårdens Nærgenbrugsstation",
    description: "Kom i gang med dine egne sy-projekter. Sycaféen er et åbent fællesskab, hvor der er plads til fordybelse, idéudveksling og inspiration fra andre.",
    time: "Torsdage kl. 14.30-17.30",
    contact: "??"
  },
  {
    id: 3,
    title: "Strikkecafé",
    category: "Krea & kultur",
    x: 19.7,
    y: 93.8,
    location: "Solvang bibliotek",
    description: "Strikkecafé. Alle er velkomne, og er du ny til strik, har vi strikkepinde og garn til rådighed. Det er helt uforpligtende og gratis at deltage.",
    time: "Onsdage kl. 15-17",
    contact: "??"
  },
  {
    id: 5,
    title: "Bemandede legepladser Bonderen & Byggeren",
    category: "Andet",
    x: 32.1,
    y: 73.5,
    location: "Remiseparken",
    description: "De bemandede legepladser \"Bonderen\" og \"Byggeren\". Der tilbydes løbende aktiviteter, som er åbne for alle. Det kan blandt andet være bålaktiviteter, grønne aktiviteter, bygge insekthoteller, fuglekasser og/eller andet sjovt.",
    time: "Alle dage",
    contact: ""
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
    contact: ""
  },
  {
    id: 2,
    title: "Dans for piger",
    category: "Dans & Bevægelse",
    x: 10.4,
    y: 45.1,
    location: "A-huset",
    description: "Dans for piger. Kræver tilmelding.",
    time: "Onsdage kl. ??",
    contact: "Chika ??"
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
