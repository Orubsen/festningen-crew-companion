import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Info, Heart } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ArtistBilde } from "@/components/ArtistBilde";
import { artister, DAGER } from "@/data/artister";
import { FESTIVAL } from "@/data/festival";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: "Program og lineup – Festningen 2026 Crew" },
      {
        name: "description",
        content:
          "Alle 16 bekreftede artister på Festningen 2026. Marker dine favoritter og filtrer «Disse artistene vil jeg se». Dag og klokkeslett publiseres nærmere festivalstart.",
      },
      { property: "og:title", content: "Program og lineup – Festningen 2026" },
      { property: "og:description", content: "16 bekreftede artister på Festningen 2026 i Trondheim." },
    ],
  }),
  component: Program,
});

type Filter = "alle" | (typeof DAGER)[number] | "ikke-annonsert" | "jeg-vil-se";

const JEG_VIL_SE_KEY = "festningen-jeg-vil-se-artister";

function Program() {
  const [filter, setFilter] = useState<Filter>("alle");
  const [søk, setSøk] = useState("");
  const [ønsket, setØnsket, ønsketHydrated] = useLocalStorage<string[]>(JEG_VIL_SE_KEY, []);

  const ønsketSet = useMemo(() => new Set(ønsket), [ønsket]);

  const toggleArtist = (navn: string) => {
    setØnsket((prev) => {
      const ny = new Set(prev);
      if (ny.has(navn)) ny.delete(navn);
      else ny.add(navn);
      return Array.from(ny);
    });
  };

  const liste = useMemo(() => {
    return artister.filter((a) => {
      if (søk && !a.navn.toLowerCase().includes(søk.toLowerCase())) return false;
      if (filter === "alle") return true;
      if (filter === "ikke-annonsert") return a.dag === null;
      if (filter === "jeg-vil-se") return ønsketSet.has(a.navn);
      return a.dag === filter;
    });
  }, [filter, søk, ønsketSet]);

  const filtre: { verdi: Filter; navn: string }[] = [
    { verdi: "alle", navn: "Alle" },
    ...DAGER.map((d) => ({ verdi: d as Filter, navn: d })),
    { verdi: "jeg-vil-se", navn: "Jeg vil se" },
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
            {f.verdi === "jeg-vil-se" && ønsketHydrated && ønsket.length > 0
              ? ` (${ønsket.length})`
              : ""}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {liste.map((a) => {
          const erØnsket = ønsketSet.has(a.navn);
          return (
            <li key={a.navn} className="panel flex items-center gap-3 p-3">
              <ArtistBilde navn={a.navn} />
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
              <button
                type="button"
                onClick={() => toggleArtist(a.navn)}
                aria-label={erØnsket ? `Fjern ${a.navn} fra ønskeliste` : `Legg til ${a.navn} i ønskeliste`}
                className={`grid size-10 shrink-0 place-items-center rounded-full border transition-colors ${
                  erØnsket
                    ? "border-destructive bg-destructive/20 text-destructive"
                    : "border-border bg-secondary text-muted-foreground hover:text-primary"
                }`}
              >
                <Heart className={`size-5 ${erØnsket ? "fill-current" : ""}`} />
              </button>
            </li>
          );
        })}
        {liste.length === 0 && (
          <li className="panel p-6 text-center text-sm text-muted-foreground">
            {filter === "jeg-vil-se"
              ? "Du har ikke markert noen artister ennå. Trykk hjertet ved siden av artisten du vil se."
              : "Ingen artister matcher søket."}
          </li>
        )}
      </ul>
    </PageShell>
  );
}
