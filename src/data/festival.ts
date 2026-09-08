export const FESTIVAL = {
  navn: "Festningen 2026",
  sted: "Kristiansten Festning, Trondheim",
  datoer: "4.–5. september 2026",
  /** Dørene åpner fredag 4. september 2026 kl. 15:30 (Europe/Oslo = UTC+2) */
  doorsOpen: new Date("2026-09-04T15:30:00+02:00"),
  /** Siste hjemreise (Dømbe & Røsten, SK4187 mandag 7. september) */
  hjemreise: new Date("2026-09-07T19:50:00+02:00"),
  billettUrl: "https://tikkio.com/events/58410-festningen-2026",
  nettsted: "https://festningen.no",
  programUrl: "https://festningen.no/program",
  hotellUrl: "https://www.booking.com/searchresults.no.html?ss=Trondheim",
  spotifyPlaylistId: "2AGRakDy7HpScTuImANnok",
  spotifyUrl: "https://open.spotify.com/playlist/2AGRakDy7HpScTuImANnok",
};

export const SOMMERFEST_2027 = {
  navn: "Sommerfest 2027",
  sted: "Kristiansten Festning, Trondheim",
  adresse: "Kristianstensbakken 60, 7014 Trondheim, Norge",
  datoer: "11.–12. juni 2027",
  /** Dørene åpner fredag 11. juni 2027 kl. 16:00 (Europe/Oslo = UTC+2) */
  doorsOpen: new Date("2027-06-11T16:00:00+02:00"),
  /** Festivalen slutter lørdag 12. juni 2027 kl. 23:00 */
  slutt: new Date("2027-06-12T23:00:00+02:00"),
  billettUrl: "https://tikkio.com/events/64533-sommerfest2027",
  nettsted: "https://www.sommerfesttrd.no",
  instagram: "https://www.instagram.com/sommerfesttrd/",
  facebook: "https://www.facebook.com/sommerfesttrd",
  hotellUrl: "https://www.booking.com/searchresults.no.html?ss=Trondheim",
  aldersgrense: 18,
  arrangor: "FESTNINGEN AS",
  billetter: {
    presale: { navn: "Presale festivalpass", pris: 1299, valuta: "NOK" },
    plattfest: {
      navn: "Plattfest festivalpass",
      pris: 2599,
      valuta: "NOK",
      aldersgrense: 20,
      merknad: "Tilgang til hele festivalen inkludert Plattfest!",
    },
  },
} as const;

import lisbethBilde from "@/assets/crew-lisbeth.png.asset.json";
import dombeBilde from "@/assets/crew-dombe.png.asset.json";
import rostenBilde from "@/assets/crew-rosten.webp.asset.json";
import leffeBilde from "@/assets/crew-leffe.png.asset.json";

export const CREW = [
  { id: "lisbeth", navn: "Lisbeth", bilde: lisbethBilde.url, bildePosisjon: "50% 20%" },
  { id: "dombe", navn: "Dømbe", bilde: dombeBilde.url },
  { id: "rosten", navn: "Røsten", bilde: rostenBilde.url },
  { id: "leffe", navn: "Leffe", bilde: leffeBilde.url, bildePosisjon: "50% 25%" },
] as const;
