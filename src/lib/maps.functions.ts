import { createServerFn } from "@tanstack/react-start";

export const FLYPLASS = "Trondheim lufthavn Værnes, Stjørdal, Norway";
export const SENTRUM = "Torvet, Trondheim, Norway";
export const FESTNINGEN = "Kristiansten festning, Trondheim, Norway";

/** Ankomstdag: fredag 4. september 2026, ca. kl. 11:00 norsk tid */
const AVREISE_ISO = "2026-09-04T09:00:00Z";

export type RuteSteg = {
  instruksjon: string;
  linje: string | null;
  fra: string | null;
  til: string | null;
  fraTid: string | null;
  tilTid: string | null;
};

export type Rute = {
  modus: "DRIVE" | "TRANSIT";
  minutter: number | null;
  km: number | null;
  steg: RuteSteg[];
  feil?: string;
};

export type ReiseruteSvar = {
  kjoring: Rute;
  kollektiv: Rute;
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

type GRoute = {
  duration?: string;
  distanceMeters?: number;
  legs?: Array<{
    steps?: Array<{
      navigationInstruction?: { instructions?: string };
      transitDetails?: {
        stopDetails?: {
          departureStop?: { name?: string };
          arrivalStop?: { name?: string };
        };
        localizedValues?: {
          departureTime?: { time?: { text?: string } };
          arrivalTime?: { time?: { text?: string } };
        };
        transitLine?: { nameShort?: string; name?: string };
      };
    }>;
  }>;
};

async function hentRute(
  modus: "DRIVE" | "TRANSIT",
  origin: string,
  destination: string,
): Promise<Rute> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
  if (!lovableKey || !mapsKey) {
    return { modus, minutter: null, km: null, steg: [], feil: "Kart-tilkobling mangler." };
  }

  const body: Record<string, unknown> = {
    origin: { address: origin },
    destination: { address: destination },
    travelMode: modus,
    departureTime: AVREISE_ISO,
    languageCode: "no",
    units: "METRIC",
  };
  if (modus === "DRIVE") body["routingPreference"] = "TRAFFIC_AWARE";

  const res = await fetch(`${GATEWAY_URL}/routes/directions/v2:computeRoutes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": mapsKey,
      "Content-Type": "application/json",
      "X-Goog-FieldMask":
        "routes.duration,routes.distanceMeters,routes.legs.steps.navigationInstruction,routes.legs.steps.transitDetails",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const tekst = await res.text();
    console.error(`Routes API feilet [${res.status}]: ${tekst}`);
    return {
      modus,
      minutter: null,
      km: null,
      steg: [],
      feil: `Klarte ikke hente rute (${res.status}).`,
    };
  }

  const data = (await res.json()) as { routes?: GRoute[] };
  const rute = data.routes?.[0];
  if (!rute) return { modus, minutter: null, km: null, steg: [], feil: "Fant ingen rute." };

  const sekunder = Number.parseInt(String(rute.duration ?? "0").replace("s", ""), 10);
  const steg: RuteSteg[] =
    rute.legs?.[0]?.steps
      ?.map((s) => {
        const td = s.transitDetails;
        return {
          instruksjon: s.navigationInstruction?.instructions ?? "",
          linje: td?.transitLine?.nameShort ?? td?.transitLine?.name ?? null,
          fra: td?.stopDetails?.departureStop?.name ?? null,
          til: td?.stopDetails?.arrivalStop?.name ?? null,
          fraTid: td?.localizedValues?.departureTime?.time?.text ?? null,
          tilTid: td?.localizedValues?.arrivalTime?.time?.text ?? null,
        };
      })
      .filter((s) => (modus === "TRANSIT" ? Boolean(s.linje) : Boolean(s.instruksjon)))
      .slice(0, modus === "TRANSIT" ? 6 : 8) ?? [];

  return {
    modus,
    minutter: Number.isFinite(sekunder) ? Math.round(sekunder / 60) : null,
    km: rute.distanceMeters ? Math.round(rute.distanceMeters / 100) / 10 : null,
    steg,
  };
}

export const hentReiserute = createServerFn({ method: "GET" }).handler(
  async (): Promise<ReiseruteSvar> => {
    const [kjoring, kollektiv] = await Promise.all([
      hentRute("DRIVE", FLYPLASS, FESTNINGEN),
      hentRute("TRANSIT", FLYPLASS, SENTRUM),
    ]);
    return { kjoring, kollektiv };
  },
);
