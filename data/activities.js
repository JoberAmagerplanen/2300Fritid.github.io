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
 * id: 1 = Fodbold (grøn #2ecc71)
 * id: 2 = Dans (blå #3498db)
 * id: 3 = Krea & kultur (orange #e67e22)
 * id: 4 = Boksning (lyserosa #f1a3d6)
 * id: 5 = Andet (brun #a0522d)
 */

const activities = [
  {
    id: 1,
    title: "Fodboldtræning for børn",
    category: "Fodbold",
    x: 45,
    y: 86.7,
    location: "Sundby Idrætspark",
    description: "Aktivt fodboldtræning for børn 6-12 år. Alle niveauer velkomne!",
    time: "Mandag & onsdag 16:00-17:30",
    contact: "Jesper Hansen - 40 12 34 56"
  },
  {
    id: 1,
    title: "Fodboldtræning for unge",
    category: "Fodbold",
    x: 50,
    y: 86.7,
    location: "Sundby Idrætspark",
    description: "Aktivt fodboldtræning for unge 13-17 år. Alle niveauer velkomne!",
    time: "Tirsdag & torsdag 17:00-18:30",
    contact: "Jesper Hansen - 40 12 34 56"
  },
  {
    id: 2,
    title: "Moderne Dans for Voksne",
    category: "Dans",
    x: 55,
    y: 45,
    location: "Kulturhuset Fritid",
    description: "Lær moderne danseteknikker i et sjovt og afslappet miljø.",
    time: "Tirsdag 19:00-20:30",
    contact: "Maria Andersen - 30 98 76 54"
  },
  {
    id: 3,
    title: "Kunstneriske Workshops",
    category: "Krea & kultur",
    x: 50,
    y: 55,
    location: "Kunstcenter Amagerplanen",
    description: "Maleri, tegning, keramik og kreativ skaberimulighed for alle aldre.",
    time: "Torsdag 17:00-19:00",
    contact: "Anna Larsen - 40 50 60 70"
  },
  {
    id: 4,
    title: "Boksning for Nybegyndere",
    category: "Boksning",
    x: 42,
    y: 50,
    location: "Fitnesscenter Amager",
    description: "Kom i gang med boksning. Kondition, teknik og sjov i én pakke!",
    time: "Onsdag & fredag 18:00-19:00",
    contact: "Søren Jensen - 25 11 22 33"
  },
  {
    id: 5,
    title: "Skateboard & Parkour",
    category: "Andet",
    x: 35,
    y: 60,
    location: "Skate Park Amagerplanen",
    description: "Lær at skate eller parkour i et sjovt community. Alle niveauer velkomne!",
    time: "Lørdag & søndag 14:00-17:00",
    contact: "Rasmus Pedersen - 30 11 22 33"
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
