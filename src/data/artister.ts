export type Artist = {
  /** Artistnavn */
  navn: string;
  /** "Fredag 4/9" | "Lørdag 5/9" | null (null = ikke annonsert) */
  dag: "Fredag 4/9" | "Lørdag 5/9" | null;
  /** "21:30" eller null (null = ikke annonsert) */
  klokkeslett: string | null;
  /** Valgfri scene */
  scene?: string | null;
};

/**
 * REDIGER MEG: Når Festningen slipper programmet, fyll inn `dag` og
 * `klokkeslett` for hver artist. Resten av appen sorterer og filtrerer
 * automatisk så snart feltene har verdier.
 */
export const artister: Artist[] = [
  { navn: "DJ Snake", dag: null, klokkeslett: null },
  { navn: "Sigrid", dag: null, klokkeslett: null },
  { navn: "Ari Bajgora", dag: null, klokkeslett: null },
  { navn: "Undergrunn", dag: null, klokkeslett: null },
  { navn: "Tobias Sten", dag: null, klokkeslett: null },
  { navn: "TIX", dag: null, klokkeslett: null },
  { navn: "Erik og Kriss", dag: null, klokkeslett: null },
  { navn: "Soppgirobygget", dag: null, klokkeslett: null },
  { navn: "Synne Vo", dag: null, klokkeslett: null },
  { navn: "Musti", dag: null, klokkeslett: null },
  { navn: "Bausa", dag: null, klokkeslett: null },
  { navn: "Donkeyboy", dag: null, klokkeslett: null },
  { navn: "Søte & Rare", dag: null, klokkeslett: null },
  { navn: "Skinny E", dag: null, klokkeslett: null },
  { navn: "Marcus og Martinus", dag: null, klokkeslett: null },
  { navn: "Zimmermann", dag: null, klokkeslett: null },
];

export const DAGER = ["Fredag 4/9", "Lørdag 5/9"] as const;
