export const FESTIVAL = {
  navn: "Festningen 2026",
  sted: "Kristiansten Festning, Trondheim",
  datoer: "4.–5. september 2026",
  /** Dørene åpner fredag 4. september 2026 kl. 15:00 (Europe/Oslo = UTC+2) */
  doorsOpen: new Date("2026-09-04T15:00:00+02:00"),
  /** Siste hjemreise (Dømbe & Røsten, mandag 7. september) */
  hjemreise: new Date("2026-09-07T17:10:00+02:00"),
  billettUrl: "https://tikkio.com/",
  nettsted: "https://festningen.no",
  programUrl: "https://festningen.no/program",
  hotellUrl: "https://www.booking.com/searchresults.no.html?ss=Trondheim",
};

export const CREW = [
  { id: "lisbeth", navn: "Lisbeth" },
  { id: "dombe", navn: "Dømbe" },
  { id: "rosten", navn: "Røsten" },
] as const;
