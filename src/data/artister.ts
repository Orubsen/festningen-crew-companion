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
 * REDIGER MEG: Dag er hentet fra festningen.no/program. Klokkeslett er ennå
 * ikke publisert — fyll inn `klokkeslett` når det slippes, så sorterer
 * resten av appen automatisk.
 * Rekkefølgen under følger programplakaten.
 */
export const artister: Artist[] = [
  // Fredag 4. september
  { navn: "Musti", dag: "Fredag 4/9", klokkeslett: null },
  { navn: "Erik og Kriss", dag: "Fredag 4/9", klokkeslett: null },
  { navn: "Undergrunn", dag: "Fredag 4/9", klokkeslett: null },
  { navn: "Tobias Sten", dag: "Fredag 4/9", klokkeslett: null },
  { navn: "Skinny E", dag: "Fredag 4/9", klokkeslett: null },
  { navn: "Sigrid", dag: "Fredag 4/9", klokkeslett: null },
  { navn: "Bausa", dag: "Fredag 4/9", klokkeslett: null },
  { navn: "Soppgirobygget", dag: "Fredag 4/9", klokkeslett: null },
  // Lørdag 5. september
  { navn: "Zimmermann", dag: "Lørdag 5/9", klokkeslett: null },
  { navn: "Donkeyboy", dag: "Lørdag 5/9", klokkeslett: null },
  { navn: "Søte & Rare", dag: "Lørdag 5/9", klokkeslett: null },
  { navn: "Marcus og Martinus", dag: "Lørdag 5/9", klokkeslett: null },
  { navn: "Synne Vo", dag: "Lørdag 5/9", klokkeslett: null },
  { navn: "TIX", dag: "Lørdag 5/9", klokkeslett: null },
  { navn: "Ari Bajgora", dag: "Lørdag 5/9", klokkeslett: null },
  { navn: "DJ Snake", dag: "Lørdag 5/9", klokkeslett: null },
];

export const DAGER = ["Fredag 4/9", "Lørdag 5/9"] as const;

/** Dørene åpner per dag (fra festningen.no/program) */
export const DØRENE_ÅPNER: Record<(typeof DAGER)[number], string> = {
  "Fredag 4/9": "15:30",
  "Lørdag 5/9": "15:00",
};
