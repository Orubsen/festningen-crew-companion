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

    const data = (await res.json()) as {
      properties: {
        timeseries: Array<{
          time: string;
          data: {
            instant: { details: Record<string, number> };
            next_1_hours?: { summary?: { symbol_code?: string }; details?: Record<string, number> };
            next_6_hours?: { summary?: { symbol_code?: string }; details?: Record<string, number> };
          };
        }>;
      };
    };

    const points: WeatherPoint[] = data.properties.timeseries.map((entry) => {
      const inst = entry.data.instant.details ?? {};
      const next = entry.data.next_1_hours ?? entry.data.next_6_hours;
      const det = next?.details ?? {};
      return {
        time: entry.time,
        temp: inst["air_temperature"] ?? null,
        windSpeed: inst["wind_speed"] ?? null,
        windDir: inst["wind_from_direction"] ?? null,
        precipProb: det["probability_of_precipitation"] ?? null,
        precipMm: det["precipitation_amount"] ?? null,
        symbol: next?.summary?.symbol_code ?? null,
      };
    });

    return { updatedAt: new Date().toISOString(), points };
  },
);
