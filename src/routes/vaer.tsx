import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Wind, Droplets, Thermometer, RefreshCw } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { hentVaer, type WeatherPoint } from "@/lib/weather.functions";

export const Route = createFileRoute("/vaer")({
  head: () => ({
    meta: [
      { title: "Været i Trondheim – Festningen 2026 Crew" },
      {
        name: "description",
        content:
          "Live værvarsel for Trondheim fra MET Norway, med egen fremheving av festivaldagene 4.–5. september 2026.",
      },
      { property: "og:title", content: "Været i Trondheim – Festningen 2026" },
      { property: "og:description", content: "Temperatur, nedbør og vind for festivaldagene." },
    ],
  }),
  component: Vaer,
});

const fmtTid = new Intl.DateTimeFormat("nb-NO", {
  timeZone: "Europe/Oslo",
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function osloDato(iso: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Oslo" }).format(new Date(iso));
}

function symbolTekst(s: string | null) {
  if (!s) return "";
  const base = s.split("_")[0]!;
  const map: Record<string, string> = {
    clearsky: "☀️ Klarvær",
    fair: "🌤️ Lettskyet",
    partlycloudy: "⛅ Delvis skyet",
    cloudy: "☁️ Skyet",
    fog: "🌫️ Tåke",
    lightrain: "🌦️ Lett regn",
    lightrainshowers: "🌦️ Lette regnbyger",
    rain: "🌧️ Regn",
    rainshowers: "🌧️ Regnbyger",
    heavyrain: "⛈️ Kraftig regn",
    heavyrainshowers: "⛈️ Kraftige byger",
    sleet: "🌨️ Sludd",
    snow: "❄️ Snø",
  };
  return map[base] ?? base;
}

function Rad({ p, uthevet }: { p: WeatherPoint; uthevet?: boolean }) {
  return (
    <li
      className={`panel flex items-center gap-3 p-3 ${
        uthevet ? "border-l-4 border-l-primary" : ""
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {fmtTid.format(new Date(p.time))}
        </p>
        <p className="truncate text-sm">{symbolTekst(p.symbol)}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3 text-sm tabular-nums">
        <span className="flex items-center gap-1">
          <Thermometer className="size-3.5 text-primary" />
          {p.temp !== null ? `${Math.round(p.temp)}°` : "–"}
        </span>
        <span className="flex items-center gap-1">
          <Droplets className="size-3.5 text-sky" />
          {p.precipProb !== null ? `${Math.round(p.precipProb)}%` : "–"}
        </span>
        <span className="flex items-center gap-1">
          <Wind className="size-3.5 text-mint" />
          {p.windSpeed !== null ? `${Math.round(p.windSpeed)}` : "–"}
        </span>
      </div>
    </li>
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
  const festivalPunkter =
    data?.points.filter((p) => festivalDager.includes(osloDato(p.time))) ?? [];
  const neste = data?.points.slice(0, 24) ?? [];

  return (
    <PageShell tittel="Vær" undertittel="Trondheim · data fra MET Norway (Yr)">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {data ? `Oppdatert ${fmtTid.format(new Date(data.updatedAt))}` : "Henter værdata…"}
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
            {festivalPunkter.length > 0 ? (
              <ul className="space-y-2">
                {festivalPunkter.map((p) => (
                  <Rad key={p.time} p={p} uthevet />
                ))}
              </ul>
            ) : (
              <div className="panel p-4 text-sm text-muted-foreground">
                Værvarsel for festivaldagene er ikke tilgjengelig ennå. MET gir varsel omtrent 9–10
                dager frem i tid – kom tilbake i slutten av august.
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg uppercase">Neste 24 timer</h2>
            <ul className="space-y-2">
              {neste.map((p) => (
                <Rad key={p.time} p={p} />
              ))}
            </ul>
          </section>

          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Temperatur (°C) · nedbørssannsynlighet (%) · vind (m/s). Data fra MET Norway.
          </p>
        </>
      )}
    </PageShell>
  );
}
