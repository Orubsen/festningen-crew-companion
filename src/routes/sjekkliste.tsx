import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, AlertOctagon, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { FESTIVAL } from "@/data/festival";

export const Route = createFileRoute("/sjekkliste")({
  head: () => ({
    meta: [
      { title: "Sjekkliste – Festningen 2026 Crew" },
      {
        name: "description",
        content:
          "Hva mangler før Festningen 2026? Hotell i Trondheim og festivalpass — huk av når det er ordnet.",
      },
      { property: "og:title", content: "Sjekkliste – Festningen 2026" },
      { property: "og:description", content: "Hotell og festivalpass må fortsatt ordnes." },
    ],
  }),
  component: Sjekkliste,
});

function Banner({
  id,
  emoji,
  tittel,
  ordnetTittel,
  beskrivelse,
  lenke,
  lenketekst,
  standardOrdnet = false,
}: {
  id: string;
  emoji: string;
  tittel: string;
  ordnetTittel: string;
  beskrivelse: string;
  lenke: string;
  lenketekst: string;
  standardOrdnet?: boolean;
}) {
  const [ordnet, setOrdnet, hydrated] = useLocalStorage<boolean>(
    `sjekkliste-${id}`,
    standardOrdnet,
  );
  const done = hydrated && ordnet;

  return (
    <section
      className={`rounded-xl border-2 p-4 ${
        done
          ? "border-success bg-success/10"
          : "animate-pulse-none border-destructive bg-destructive/15"
      }`}
      style={done ? undefined : { boxShadow: "0 0 0 1px oklch(0.58 0.21 27 / 0.35)" }}
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 shrink-0 ${done ? "text-success" : "text-destructive"}`}>
          {done ? <CheckCircle2 className="size-6" /> : <AlertOctagon className="size-6" />}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl uppercase leading-tight">
            {emoji} {done ? ordnetTittel : tittel}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">{beskrivelse}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={lenke}
              {...(lenke.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-2 text-xs font-semibold uppercase tracking-wide"
            >
              {lenketekst} <ExternalLink className="size-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOrdnet(!ordnet)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wide ${
                done
                  ? "bg-success text-success-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {done ? "Ordnet ✅ – angre" : "Marker som ordnet"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sjekkliste() {
  return (
    <PageShell tittel="Sjekkliste" undertittel="Dette må ordnes før avreise">
      <div className="space-y-4">
        <Banner
          id="hotell-ruben-adrian"
          emoji="🏨"
          tittel="Hotell er bestilt for Dømbe & Røsten"
          ordnetTittel="Hotell er bestilt for Dømbe & Røsten"
          beskrivelse="Radisson Blu Royal Garden, 4.–7. september 2026. Reservasjonsnummer 1J25•••• (skjult). Frokost inkludert."
          lenke="/hotell"
          lenketekst="Se hotellinfo"
          standardOrdnet
        />
        <Banner
          id="hotell-leffe-lisbeth"
          emoji="🏨"
          tittel="Hotell er bestilt for Leffe & Lisbeth"
          ordnetTittel="Hotell er bestilt for Leffe & Lisbeth"
          beskrivelse="Leffe & Lisbeth har bestilt rom i Trondheim 4.–6. september 2026 (to netter)."
          lenke="/hotell"
          lenketekst="Se hotellinfo"
          standardOrdnet
        />
        <Banner
          id="billetter-rosten-dombe-lisbeth"
          emoji="🎟️"
          tittel="Festivalpass er kjøpt for Røsten, Dømbe & Lisbeth"
          ordnetTittel="Festivalpass er kjøpt for Røsten, Dømbe & Lisbeth"
          beskrivelse="DNB-festivalpass kjøpt 22. august 2026 til 1 549,- for Ruben André Røsten, Adrian Dømbe og Lisbeth. Dørene åpner 4. sep kl. 15:00, stenger 5. sep kl. 23:00. 18+."
          lenke={FESTIVAL.billettUrl}
          lenketekst="Se billettsiden"
          standardOrdnet
        />
        <Banner
          id="billetter-leffe"
          emoji="🎟️"
          tittel="Festivalpass er kjøpt for Leffe"
          ordnetTittel="Festivalpass er kjøpt for Leffe"
          beskrivelse="Leffe har sikret seg festivalpass til Festningen 4.–5. september 2026. Alle i gjengen er nå klare for festival."
          lenke={FESTIVAL.billettUrl}
          lenketekst="Se billettsiden"
          standardOrdnet
        />
      </div>

      <p className="mt-6 text-center text-[11px] text-muted-foreground">
        Statusen lagres lokalt i din nettleser.
      </p>
    </PageShell>
  );
}
