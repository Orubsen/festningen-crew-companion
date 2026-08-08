import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Beer, Clock, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import {
  MEDIANPRIS_TRONDELAG,
  MEDIANPRIS_TRONDHEIM,
  PILS_KILDE,
  pilssteder,
} from "@/data/pilspriser";

export const Route = createFileRoute("/olpriser")({
  head: () => ({
    meta: [
      { title: "Ølpriser i Trondheim – Festningen 2026 Crew" },
      {
        name: "description",
        content:
          "Oversikt over ølpriser per halvliter på 58 barer og spisesteder i Trondheim, sortert fra billigst til dyrest.",
      },
      { property: "og:title", content: "Ølpriser i Trondheim" },
      {
        property: "og:description",
        content: "Billigste halvliter i Trondheim under Festningen 2026.",
      },
    ],
  }),
  component: Olpriser,
});

function Olpriser() {
  const [søk, setSøk] = useState("");
  const [kunHappy, setKunHappy] = useState(false);

  const liste = useMemo(() => {
    return pilssteder
      .filter((s) => (kunHappy ? s.happyHour : true))
      .filter((s) => s.navn.toLowerCase().includes(søk.toLowerCase()))
      .sort((a, b) => a.pris - b.pris);
  }, [søk, kunHappy]);

  return (
    <PageShell tittel="Ølpriser" undertittel={`${pilssteder.length} steder i Trondheim`}>
      <div className="panel mb-4 grid grid-cols-2 gap-3 p-3 text-center">
        <div>
          <p className="font-display text-3xl text-primary">{MEDIANPRIS_TRONDHEIM},-</p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Median Trondheim
          </p>
        </div>
        <div>
          <p className="font-display text-3xl text-muted-foreground">{MEDIANPRIS_TRONDELAG},-</p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Median Trøndelag
          </p>
        </div>
        <p className="col-span-2 border-t border-border pt-2 text-[11px] text-muted-foreground">
          Alle priser er per halvliter. ⏰ = happy hour, * = usikker pris.
        </p>
      </div>

      <input
        value={søk}
        onChange={(e) => setSøk(e.target.value)}
        placeholder="Søk etter sted…"
        className="mb-3 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
      />

      <button
        type="button"
        onClick={() => setKunHappy((v) => !v)}
        className={`mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
          kunHappy
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-secondary text-muted-foreground"
        }`}
      >
        <Clock className="size-3.5" /> Kun happy hour
      </button>

      <ul className="space-y-2">
        {liste.map((s, i) => (
          <li key={s.navn} className="panel flex items-center gap-3 p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-secondary text-primary">
              {i === 0 && !søk && !kunHappy ? <Beer className="size-4" /> : (
                <span className="text-xs font-bold tabular-nums">{i + 1}</span>
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold leading-tight">{s.navn}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                {s.happyHour ? "Happy hour · " : ""}
                {s.usikker ? "Usikker pris" : "Bekreftet pris"}
              </p>
            </div>
            <span
              className={`shrink-0 font-display text-2xl tabular-nums ${
                s.pris <= 100 ? "text-primary" : "text-foreground"
              }`}
            >
              {s.pris},-
            </span>
          </li>
        ))}
        {liste.length === 0 && (
          <li className="panel p-6 text-center text-sm text-muted-foreground">
            Ingen steder matcher søket.
          </li>
        )}
      </ul>

      <a
        href={PILS_KILDE}
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground underline"
      >
        Kilde: Pilsguiden.no <ExternalLink className="size-3" />
      </a>
    </PageShell>
  );
}
