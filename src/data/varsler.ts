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
    id: "2027-sommerfest-presale",
    tittel: "🤠 Sommerfest 2027 – presale ute nå!",
    tekst:
      "Dørene åpner fredag 11. juni 2027 kl. 16:00. Presale festivalpass koster 1 299,-. Alt fra Festningen 2026 ligger i arkiv-fanen.",
    lenke: "https://tikkio.com/events/64533-sommerfest2027",
  },
];
