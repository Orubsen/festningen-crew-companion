import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Info, Music2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { artister, DAGER } from "@/data/artister";
import { FESTIVAL } from "@/data/festival";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: "Program og lineup – Festningen 2026 Crew" },
      {
        name: "description",
        content:
          "Alle 16 bekreftede artister på Festningen 2026. Dag og klokkeslett publiseres nærmere festivalstart.",
      },
      { property: "og:title", content: "Program og lineup – Festningen 2026" },
      { property: "og:description", content: "16 bekreftede artister på Festningen 2026 i Trondheim." },
    ],
  }),
  component: Program,
});

type Filter = "alle" | (typeof DAGER)[number] | "ikke-annonsert";

function Program() {
  const [filter, setFilter] = useState<Filter>("alle");
  const [søk, setSøk] = useState("");

  const liste = useMemo(() => {
    return artister.filter((a) => {
      if (søk && !a.navn.toLowerCase().includes(søk.toLowerCase())) return false;
      if (filter === "alle") return true;
      if (filter === "ikke-annonsert") return a.dag === null;
      return a.dag === filter;
    });
  }, [filter, søk]);

  const filtre: { verdi: Filter; navn: string }[] = [
    { verdi: "alle", navn: "Alle" },
    ...DAGER.map((d) => ({ verdi: d as Filter, navn: d })),
    { verdi: "ikke-annonsert", navn: "Ikke annonsert" },
  ];

  return (
    <PageShell tittel="Program" undertittel={`${artister.length} bekreftede artister`}>
      <div className="panel mb-4 flex gap-3 border-l-4 border-l-accent p-3">
        <Info className="mt-0.5 size-5 shrink-0 text-accent" />
        <p className="text-xs leading-relaxed">
          Dagsfordelingen er sluppet: dørene åpner <strong>fredag kl. 15:30</strong> og{" "}
          <strong>lørdag kl. 15:00</strong>. Klokkeslett per artist kommer nærmere festivalstart på{" "}
          <a
            href={FESTIVAL.programUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-accent underline"
          >
            festningen.no/program
          </a>{" "}
          — oppdater artist-filen når det slippes.
        </p>
      </div>

      <input
        value={søk}
        onChange={(e) => setSøk(e.target.value)}
        placeholder="Søk etter artist…"
        className="mb-3 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {filtre.map((f) => (
          <button
            key={f.verdi}
            type="button"
            onClick={() => setFilter(f.verdi)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
              filter === f.verdi
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary text-muted-foreground"
            }`}
          >
            {f.navn}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {liste.map((a) => (
          <li key={a.navn} className="panel flex items-center gap-3 p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-secondary text-primary">
              <Music2 className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg uppercase leading-none">{a.navn}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                {a.dag
                  ? `${a.dag}${a.klokkeslett ? ` · kl. ${a.klokkeslett}` : " · tid ikke annonsert"}${
                      a.scene ? ` · ${a.scene}` : ""
                    }`
                  : "Ikke annonsert ennå"}
              </p>
            </div>
          </li>
        ))}
        {liste.length === 0 && (
          <li className="panel p-6 text-center text-sm text-muted-foreground">
            Ingen artister matcher søket.
          </li>
        )}
      </ul>
    </PageShell>
  );
}
