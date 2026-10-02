/**
 * events.js (data)
 * 
 * Datastruktur for engangsbegivenheder (events), der kun sker én gang -
 * f.eks. åbningsfester, sæsonfejringer eller ferieaktiviteter.
 * Adskiller sig fra activities.js, som indeholder faste, tilbagevendende aktiviteter.
 * 
 * FELTER:
 * - id: unikt tal (brug næste ledige nummer)
 * - title: eventets navn
 * - dateStart: startdato i formatet "ÅÅÅÅ-MM-DD" (f.eks. "2026-04-18")
 * - dateEnd: VALGFRIT - kun hvis eventet strækker sig over flere dage.
 *            Samme format som dateStart. Udelad feltet helt for et enkeltdags-event.
 * - time: VALGFRIT - klokkeslæt som tekst, f.eks. "14:00-16:00"
 * - location: VALGFRIT - stedet eventet foregår
 * - description: kort beskrivelse af eventet
 * 
 * Events vises automatisk i kronologisk rækkefølge (tidligste dato først).
 * Tilføj eller slet events ved blot at tilføje/fjerne objekter i arrayet -
 * husk komma mellem hvert objekt, og ikke komma efter det sidste.
 */
const events = [
  {
    id: 1,
    title: "Åbningsfest af ny boldbane",
    dateStart: "2026-04-18",
    time: "14:00-16:00",
    location: "Sundby Idrætspark",
    description: "Kom og vær med til at fejre den nye boldbane med boldspil, musik og lidt godt at spise. Alle er velkomne, uanset alder og niveau."
  },
  {
    id: 2,
    title: "Vinterfejring på Amager",
    dateStart: "2026-12-18",
    dateEnd: "2026-12-19",
    time: "15:00-18:00",
    location: "Remiseparken",
    description: "To dage med vinterhygge, varm kakao, bål og aktiviteter for hele familien, inden juleferien begynder."
  },
  {
    id: 3,
    title: "Efterårsferie-aktiviteter",
    dateStart: "2026-10-12",
    dateEnd: "2026-10-16",
    time: "10:00-14:00",
    location: "Flere steder på Amager - se detaljer ved tilmelding",
    description: "En uge med skiftende aktiviteter i efterårsferien - sport, kreativitet og udflugter. Følg med på Instagram for det daglige program."
  }
];
