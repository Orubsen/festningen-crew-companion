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
];
