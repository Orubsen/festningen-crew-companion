export type Artist = {
  /** Artistnavn */
  navn: string;
  /** "Fredag 4/9" | "Lørdag 5/9" | null (null = ikke annonsert) */
  dag: "Fredag 4/9" | "Lørdag 5/9" | null;
  /** Start-slutt, f.eks. "15:45–16:15", eller null */
  klokkeslett: string | null;
  /** Valgfri scene */
  scene?: string | null;
};

/**
 * REDIGER MEG: Hentet fra de offisielle programplakatene
 * (Hovedscene / Scene 2) for fredag 4. og lørdag 5. september.
 * Rekkefølgen under følger spilletidene.
 */
export const artister: Artist[] = [
  // Fredag 4. september
  { navn: "Musti", dag: "Fredag 4/9", klokkeslett: "15:45–16:15", scene: "Scene 2" },
  { navn: "Erik og Kriss", dag: "Fredag 4/9", klokkeslett: "16:20–17:05", scene: "Hovedscene" },
  { navn: "Skinny E", dag: "Fredag 4/9", klokkeslett: "17:15–17:45", scene: "Scene 2" },
  { navn: "Undergrunn", dag: "Fredag 4/9", klokkeslett: "17:55–18:45", scene: "Hovedscene" },
  { navn: "Tobias Sten", dag: "Fredag 4/9", klokkeslett: "18:55–19:45", scene: "Scene 2" },
  { navn: "Sigrid", dag: "Fredag 4/9", klokkeslett: "20:00–20:50", scene: "Hovedscene" },
  { navn: "Bausa", dag: "Fredag 4/9", klokkeslett: "21:00–21:45", scene: "Scene 2" },
  { navn: "Soppgirobygget", dag: "Fredag 4/9", klokkeslett: "22:00–23:00", scene: "Hovedscene" },
  // Lørdag 5. september
  { navn: "Zimmermann", dag: "Lørdag 5/9", klokkeslett: "15:15–15:45", scene: "Scene 2" },
  { navn: "Donkeyboy", dag: "Lørdag 5/9", klokkeslett: "15:55–16:40", scene: "Hovedscene" },
  { navn: "Ari Bajgora", dag: "Lørdag 5/9", klokkeslett: "16:50–17:50", scene: "Scene 2" },
  { navn: "Marcus og Martinus", dag: "Lørdag 5/9", klokkeslett: "18:05–18:50", scene: "Hovedscene" },
  { navn: "Synne Vo", dag: "Lørdag 5/9", klokkeslett: "19:00–19:45", scene: "Scene 2" },
  { navn: "TIX", dag: "Lørdag 5/9", klokkeslett: "19:55–20:40", scene: "Hovedscene" },
  { navn: "Søte & Rare", dag: "Lørdag 5/9", klokkeslett: "20:55–21:25", scene: "Scene 2" },
  { navn: "DJ Snake", dag: "Lørdag 5/9", klokkeslett: "21:40–23:00", scene: "Hovedscene" },
];

export const DAGER = ["Fredag 4/9", "Lørdag 5/9"] as const;

/** Dørene åpner per dag (fra festningen.no/program) */
export const DØRENE_ÅPNER: Record<(typeof DAGER)[number], string> = {
  "Fredag 4/9": "15:30",
  "Lørdag 5/9": "15:00",
};
