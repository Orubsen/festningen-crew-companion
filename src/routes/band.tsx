import { createFileRoute } from "@tanstack/react-router";
import { MapPin, IdCard, AlertTriangle } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import kartAsset from "@/assets/festivalkart.png.asset.json";

export const Route = createFileRoute("/band")({
  head: () => ({
    meta: [
      { title: "Bytt billett til bånd – Festningen 2026" },
      {
        name: "description",
        content:
          "Bytt billetten din til festivalbånd på Sirkus Shopping, i Krambugata eller i Festningsparken. Husk personlig oppmøte og fysisk ID.",
      },
      { property: "og:title", content: "Bytt billett til bånd – Festningen 2026" },
      {
        property: "og:description",
        content: "Åpningstider for billettbytte til festivalbånd + festivalkart.",
      },
    ],
  }),
  component: BandSide,
});

const STEDER = [
  {
    navn: "Sirkus Shopping",
    tider: [
      { dag: "Onsdag 2. september", tid: "11:00 – 18:00" },
      { dag: "Torsdag 3. september", tid: "11:00 – 18:00" },
      { dag: "Fredag 4. september", tid: "11:00 – 15:00" },
    ],
  },
  {
    navn: "Krambugata, ved Comfort Hotel",
    tider: [
      { dag: "Onsdag 2. september", tid: "11:00 – 18:00" },
      { dag: "Torsdag 3. september", tid: "11:00 – 18:00" },
      { dag: "Fredag 4. september", tid: "11:00 – 15:00" },
    ],
  },
  {
    navn: "Festningsparken",
    tider: [
      { dag: "Onsdag 2. september", tid: "11:00 – 18:00" },
      { dag: "Torsdag 3. september", tid: "11:00 – 18:00" },
      { dag: "Fredag 4. september", tid: "11:00 – 23:00" },
      { dag: "Lørdag 5. september", tid: "11:00 – 23:00" },
    ],
  },
] as const;

function BandSide() {
  return (
    <PageShell tittel="Bytt billett til bånd" undertittel="Bytt billetten til festivalbånd før du drar">
      <div className="space-y-4">
        {STEDER.map((sted) => (
          <section key={sted.navn} className="panel p-4">
            <h2 className="flex items-center gap-2 font-display text-lg uppercase leading-tight">
              <MapPin className="size-5 shrink-0 text-primary" />
              {sted.navn}
            </h2>
            <ul className="mt-2 space-y-1">
              {sted.tider.map((t) => (
                <li key={t.dag} className="flex items-baseline justify-between gap-3 text-xs">
                  <span className="text-muted-foreground">{t.dag}</span>
                  <span className="font-semibold tabular-nums">{t.tid}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section
          className="rounded-xl border-2 border-destructive bg-destructive/15 p-4"
          style={{ boxShadow: "0 0 0 1px oklch(0.58 0.21 27 / 0.35)" }}
        >
          <h2 className="flex items-center gap-2 font-display text-lg uppercase leading-tight text-destructive">
            <AlertTriangle className="size-5 shrink-0" />
            Husk dette!
          </h2>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed">
            <li className="flex items-start gap-2">
              <IdCard className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>
                <strong>Personlig oppmøte og fysisk ID</strong> – du kan ikke hente bånd for andre.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-base">🔞</span>
              <span>
                ID sjekkes for å verifisere <strong>alder</strong> – ikke navnet på billetten.
              </span>
            </li>
          </ul>
        </section>

        <section className="panel overflow-hidden">
          <div className="p-3">
            <h2 className="font-display text-lg uppercase leading-tight">🗺️ Festivalkart</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Gjør deg kjent med kartet nå, så er det lettere å finne fram på festivalen!
            </p>
          </div>
          <a href={kartAsset.url} target="_blank" rel="noreferrer">
            <img
              src={kartAsset.url}
              alt="Festivalkart over Festningsparken med inngang, barer, toaletter, mat og aktiviteter"
              loading="lazy"
              className="w-full"
            />
          </a>
          <p className="p-3 text-[11px] text-muted-foreground">
            Trykk på kartet for å åpne det i full størrelse.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
