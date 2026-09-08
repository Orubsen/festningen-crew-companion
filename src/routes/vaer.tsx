import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCw, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { hentVaer, type WeatherPoint } from "@/lib/weather.functions";

export const Route = createFileRoute("/vaer")({
  head: () => ({
    meta: [
      { title: "Været i Trondheim – Sommerfest 2027 Crew" },
      {
        name: "description",
        content:
          "Værtabell for Trondheim time for time, som på Yr, med egen fremheving av festivaldagene 11.–12. juni 2027.",
      },
      { property: "og:title", content: "Været i Trondheim – Sommerfest 2027" },
      { property: "og:description", content: "Timesvarsel: temperatur, nedbør og vind fra Yr/MET." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Vaer,
});

const YR_URL = "https://www.yr.no/nb/innhold/1-211102/table.html";

const fmtDag = new Intl.DateTimeFormat("nb-NO", {
  timeZone: "Europe/Oslo",
  weekday: "long",
  day: "numeric",
  month: "long",
});
const fmtKlokke = new Intl.DateTimeFormat("nb-NO", {
  timeZone: "Europe/Oslo",
  hour: "2-digit",
  minute: "2-digit",
});
const fmtOppdatert = new Intl.DateTimeFormat("nb-NO", {
  timeZone: "Europe/Oslo",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function osloDato(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Oslo" }).format(new Date(iso));
}

function symbolEmoji(s: string | null) {
  if (!s) return "·";
  const base = s.split("_")[0]!;
  const map: Record<string, string> = {
    clearsky: "☀️",
    fair: "🌤️",
    partlycloudy: "⛅",
    cloudy: "☁️",
    fog: "🌫️",
    lightrain: "🌦️",
    lightrainshowers: "🌦️",
    rain: "🌧️",
    rainshowers: "🌧️",
    heavyrain: "⛈️",
    heavyrainshowers: "⛈️",
    sleet: "🌨️",
    snow: "❄️",
  };
  return map[base] ?? "🌡️";
}

function vindPil(deg: number | null) {
  if (deg === null) return "";
  const retninger = ["↓", "↙", "←", "↖", "↑", "↗", "→", "↘"];
  return retninger[Math.round(deg / 45) % 8]!;
}

function Tabell({ punkter }: { punkter: WeatherPoint[] }) {
  return (
    <table className="w-full table-fixed text-sm tabular-nums">
      <thead>
        <tr className="text-[10px] uppercase tracking-wide text-muted-foreground">
          <th className="w-16 py-1 text-left font-semibold">Kl.</th>
          <th className="w-10 py-1 text-left font-semibold">Vær</th>
          <th className="py-1 text-right font-semibold">Temp</th>
          <th className="py-1 text-right font-semibold">Nedbør</th>
          <th className="py-1 text-right font-semibold">Vind</th>
        </tr>
      </thead>
      <tbody>
        {punkter.map((p) => (
          <tr
            key={p.time}
            className="border-t border-border"
          >
            <td className="py-1.5 text-left text-xs text-muted-foreground">
              {fmtKlokke.format(new Date(p.time))}
            </td>
            <td className="py-1.5 text-left">{symbolEmoji(p.symbol)}</td>
            <td className="py-1.5 text-right font-semibold text-primary">
              {p.temp !== null ? `${Math.round(p.temp)}°` : "–"}
            </td>
            <td className="py-1.5 text-right text-sky">
              {p.precipMm !== null && p.precipMm > 0
                ? `${p.precipMm.toFixed(1)} mm`
                : p.precipProb !== null
                  ? `${Math.round(p.precipProb)} %`
                  : "0"}
            </td>
            <td className="py-1.5 text-right text-mint">
              {p.windSpeed !== null ? `${vindPil(p.windDir)} ${Math.round(p.windSpeed)}` : "–"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Dag({
  dato,
  punkter,
  uthevet,
}: {
  dato: string;
  punkter: WeatherPoint[];
  uthevet?: boolean | undefined;
}) {
  const temper = punkter.map((p) => p.temp).filter((t): t is number => t !== null);
  const min = temper.length ? Math.round(Math.min(...temper)) : null;
  const maks = temper.length ? Math.round(Math.max(...temper)) : null;
  return (
    <details
      open={uthevet}
      className={`panel overflow-hidden ${uthevet ? "border-l-4 border-l-primary" : ""}`}
    >
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-3">
        <span className="font-display text-base uppercase leading-none">
          {fmtDag.format(new Date(punkter[0]!.time))}
        </span>
        <span className="text-sm tabular-nums text-muted-foreground">
          {min !== null ? `${min}° / ${maks}°` : ""}
        </span>
      </summary>
      <div className="px-3 pb-3">
        <Tabell punkter={punkter} />
      </div>
      <span className="sr-only">{dato}</span>
    </details>
  );
}

function Vaer() {
  const fetchVaer = useServerFn(hentVaer);
  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["vaer-trondheim"],
    queryFn: () => fetchVaer(),
    refetchInterval: 60 * 60 * 1000,
    staleTime: 30 * 60 * 1000,
  });

  const festivalDager = ["2026-09-04", "2026-09-05"];

  const grupper = new Map<string, WeatherPoint[]>();
  for (const p of data?.points ?? []) {
    const d = osloDato(p.time);
    const liste = grupper.get(d) ?? [];
    liste.push(p);
    grupper.set(d, liste);
  }
  const dager = Array.from(grupper.entries());
  const festival = dager.filter(([d]) => festivalDager.includes(d));
  const resten = dager.filter(([d]) => !festivalDager.includes(d));

  return (
    <PageShell tittel="Vær" undertittel="Trondheim · timesvarsel fra Yr / MET Norway">
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          {data ? `Oppdatert ${fmtOppdatert.format(new Date(data.updatedAt))}` : "Henter værdata…"}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide"
        >
          <RefreshCw className={`size-3.5 ${isFetching ? "animate-spin" : ""}`} /> Oppdater
        </button>
      </div>

      {isPending && (
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-card" />
          ))}
        </div>
      )}

      {isError && (
        <div className="panel border-l-4 border-l-destructive p-4 text-sm">
          Klarte ikke å hente værvarsel. {(error as Error).message}
        </div>
      )}

      {data && (
        <>
          <section className="mb-6">
            <h2 className="mb-2 font-display text-lg uppercase text-primary">
              Festivaldagene 4.–5. september
            </h2>
            {festival.length > 0 ? (
              <div className="space-y-2">
                {festival.map(([d, punkter]) => (
                  <Dag key={d} dato={d} punkter={punkter} uthevet />
                ))}
              </div>
            ) : (
              <div className="panel p-4 text-sm text-muted-foreground">
                Varselet for festivaldagene er ikke ute ennå. Yr/MET gir varsel omtrent 9–10 dager
                frem i tid – kom tilbake i slutten av august.
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg uppercase">Time for time</h2>
            <div className="space-y-2">
              {resten.map(([d, punkter], i) => (
                <Dag key={d} dato={d} punkter={punkter} uthevet={i === 0} />
              ))}
            </div>
          </section>

          <a
            href={YR_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-1.5 text-xs text-primary underline underline-offset-2"
          >
            Se full tabell på Yr.no <ExternalLink className="size-3" />
          </a>

          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Temperatur (°C) · nedbør (mm, ellers sannsynlighet i %) · vind (m/s med retning). Data
            fra MET Norway / Yr.
          </p>
        </>
      )}
    </PageShell>
  );
}
