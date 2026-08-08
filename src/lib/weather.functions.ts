import { createServerFn } from "@tanstack/react-start";

export type WeatherPoint = {
  time: string;
  temp: number | null;
  windSpeed: number | null;
  windDir: number | null;
  precipProb: number | null;
  precipMm: number | null;
  symbol: string | null;
};

export type WeatherResponse = {
  updatedAt: string;
  points: WeatherPoint[];
};

// Trondheim
const LAT = 63.4305;
const LON = 10.3951;

export const hentVaer = createServerFn({ method: "GET" }).handler(
  async (): Promise<WeatherResponse> => {
    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${LAT}&lon=${LON}`,
      {
        headers: {
          "User-Agent": "Festningen2026Crew/1.0 (personlig festivalapp; kontakt via festningen.no)",
          Accept: "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Værdata utilgjengelig (${res.status})`);
    }

    type Bucket = { summary?: { symbol_code?: string }; details?: Record<string, number> };
    const data = (await res.json()) as {
      properties: {
        timeseries: Array<{
          time: string;
          data: {
            instant: { details: Record<string, number> };
            next_1_hours?: Bucket;
            next_6_hours?: Bucket;
            next_12_hours?: Bucket;
          };
        }>;
      };
    };

    const points: WeatherPoint[] = data.properties.timeseries.map((entry) => {
      const inst = entry.data.instant.details ?? {};
      const buckets = [
        entry.data.next_1_hours,
        entry.data.next_6_hours,
        entry.data.next_12_hours,
      ].filter(Boolean) as Bucket[];
      const next = buckets[0];
      const pick = (key: string) => {
        for (const b of buckets) {
          const v = b.details?.[key];
          if (typeof v === "number") return v;
        }
        return null;
      };
      const symbol =
        buckets.find((b) => b.summary?.symbol_code)?.summary?.symbol_code ?? null;
      void next;
      return {
        time: entry.time,
        temp: inst["air_temperature"] ?? null,
        windSpeed: inst["wind_speed"] ?? null,
        windDir: inst["wind_from_direction"] ?? null,
        precipProb: pick("probability_of_precipitation"),
        precipMm: pick("precipitation_amount"),
        symbol,
      };
    });


    return { updatedAt: new Date().toISOString(), points };
  },
);
