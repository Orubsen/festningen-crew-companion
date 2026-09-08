import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Beer, Clock, ExternalLink, Globe } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import {
  MEDIANPRIS_HALVLITER,
  MEDIANPRIS_LITER,
  PILS_KILDE,
  pilssteder,
  tilbudstekst,
} from "@/data/pilspriser";

export const Route = createFileRoute("/olpriser")({
  head: () => ({
    meta: [
      { title: "Ølpriser i Trondheim – Sommerfest 2027 Crew" },
      {
        name: "description",
        content:
          "Oppdaterte ølpriser på 73 barer og spisesteder i Trondheim, sortert fra billigst til dyrest – med pris per liter, tilbudstider og lenke til stedets hjemmeside.",
      },
      { property: "og:title", content: "Ølpriser i Trondheim" },
      {
        property: "og:description",
        content: "Billigste øl i Trondheim under Sommerfest 2027, oppdatert fra Barpris.no.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Olpriser,
});

function sokUrl(navn: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(`${navn} Trondheim`)}`;
}

function Olpriser() {
  const [søk, setSøk] = useState("");
  const [kunTilbud, setKunTilbud] = useState(false);

  const liste = useMemo(() => {
    return pilssteder
      .filter((s) => (kunTilbud ? s.tilbud : true))
      .filter((s) => s.navn.toLowerCase().includes(søk.toLowerCase()))
      .sort((a, b) => a.pris - b.pris);
  }, [søk, kunTilbud]);

  return (
    <PageShell tittel="Ølpriser" undertittel={`${pilssteder.length} steder i Trondheim`}>
      <div className="panel mb-4 grid grid-cols-2 gap-3 p-3 text-center">
        <div>
          <p className="font-display text-3xl text-primary">{MEDIANPRIS_HALVLITER},-</p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Median halvliter
          </p>
        </div>
        <div>
          <p className="font-display text-3xl text-muted-foreground">{MEDIANPRIS_LITER},-</p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Median per liter
          </p>
        </div>
        <p className="col-span-2 border-t border-border pt-2 text-[11px] leading-relaxed text-muted-foreground">
          Prisen gjelder glasstørrelsen som står oppgitt. ⏰ = «før/etter klokken»-pris, 🎓 =
          studentpris.
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
        onClick={() => setKunTilbud((v) => !v)}
        className={`mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
          kunTilbud
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-secondary text-muted-foreground"
        }`}
      >
        <Clock className="size-3.5" /> Kun «før/etter kl.»-priser
      </button>

      <ul className="space-y-2">
        {liste.map((s, i) => {
          const tilbud = tilbudstekst(s);
          return (
            <li key={s.navn} className="panel p-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-secondary text-primary">
                  {i === 0 && !søk && !kunTilbud ? (
                    <Beer className="size-4" />
                  ) : (
                    <span className="text-xs font-bold tabular-nums">{i + 1}</span>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold leading-tight">{s.navn}</p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    {s.drikke} · {s.storrelse} L{s.bydel ? ` · ${s.bydel}` : ""}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span
                    className={`font-display text-2xl tabular-nums ${
                      s.prisPerLiter <= 150 ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {s.pris},-
                  </span>
                  <p className="text-[10px] tabular-nums text-muted-foreground">
                    {s.prisPerLiter} kr/L
                  </p>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide">
                {tilbud && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 font-semibold text-primary">
                    <Clock className="size-3" /> {tilbud}
                  </span>
                )}
                {s.studentpris && (
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-muted-foreground">
                    🎓 Studentpris
                  </span>
                )}
                {s.bekreftelser > 0 && (
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-muted-foreground">
                    ✓ {s.bekreftelser} bekreftelser
                  </span>
                )}
                <a
                  href={s.nettside ?? sokUrl(s.navn)}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1 font-semibold text-accent underline underline-offset-2"
                >
                  <Globe className="size-3" /> {s.nettside ? "Hjemmeside" : "Søk"}
                </a>
              </div>
            </li>
          );
        })}
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
        Kilde: Barpris.no <ExternalLink className="size-3" />
      </a>
    </PageShell>
  );
}
