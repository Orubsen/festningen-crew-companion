export const FESTIVAL = {
  navn: "Festningen 2026",
  sted: "Kristiansten Festning, Trondheim",
  datoer: "4.–5. september 2026",
  /** Dørene åpner fredag 4. september 2026 kl. 15:30 (Europe/Oslo = UTC+2) */
  doorsOpen: new Date("2026-09-04T15:30:00+02:00"),
  /** Siste hjemreise (Dømbe & Røsten, SK4187 mandag 7. september) */
  hjemreise: new Date("2026-09-07T12:00:00+02:00"),
  billettUrl: "https://tikkio.com/",
  nettsted: "https://festningen.no",
  programUrl: "https://festningen.no/program",
  hotellUrl: "https://www.booking.com/searchresults.no.html?ss=Trondheim",
  spotifyPlaylistId: "2AGRakDy7HpScTuImANnok",
  spotifyUrl: "https://open.spotify.com/playlist/2AGRakDy7HpScTuImANnok",
};

import lisbethBilde from "@/assets/crew-lisbeth.png.asset.json";
import dombeBilde from "@/assets/crew-dombe.png.asset.json";
import rostenBilde from "@/assets/crew-rosten.webp.asset.json";

export const CREW = [
  { id: "lisbeth", navn: "Lisbeth", bilde: lisbethBilde.url, bildePosisjon: "50% 20%" },
  { id: "dombe", navn: "Dømbe", bilde: dombeBilde.url },
  { id: "rosten", navn: "Røsten", bilde: rostenBilde.url },
] as const;
