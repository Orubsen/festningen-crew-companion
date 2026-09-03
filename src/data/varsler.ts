export type Varsel = {
  /** Unik id – brukes til å huske at varselet er vist */
  id: string;
  tittel: string;
  tekst: string;
  /** Valgfri lenke som åpnes når man trykker på varselet */
  lenke?: string;
};

/** Legg nye varsler nederst – de vises én gang per nettleser. */
export const VARSLER: Varsel[] = [
  {
    id: "2026-08-22-billetter-rosten-dombe",
    tittel: "🎟️ Røsten og Dømbe har kjøpt festivalpass!",
    tekst:
      "DNB-festivalpass til 1 549,- er sikret for Ruben André Røsten og Adrian Dømbe. Nå mangler bare Lisbeth og Leffe.",
    lenke: "/sjekkliste",
  },
  {
    id: "2026-08-31-billetter-lisbeth",
    tittel: "🎟️ Lisbeth har kjøpt festivalpass!",
    tekst:
      "Nå er det bare Leffe som mangler festivalpass. DNB-passet til 1 549,- er utsolgt, så ordinære billetter må kjøpes via den offisielle linken – og det er svært få igjen.",
    lenke: "/sjekkliste",
  },
  {
    id: "2026-08-31-afterparty-tempo",
    tittel: "🪩 Offisielt afterparty på Club Tempo!",
    tekst:
      "Festningen og Sthu står bak offisielt afterparty på Club Tempo fredag og lørdag. Gratis inngang for alle med Festningen-bånd.",
    lenke: "/program",
  },
  {
    id: "2026-09-04-program-sluppet",
    tittel: "📋 Programmet er sluppet – med tider og scener!",
    tekst:
      "Fullstendig spilleplan for fredag og lørdag er ute. Det meldes strålende vær begge dager! Fra flyplassen tar vi Værnesekspressen til Bakkegata kl. 09:45 eller 10:00.",
    lenke: "/program",
  },
];
