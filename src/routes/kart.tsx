import { createFileRoute } from "@tanstack/react-router";
import { Map } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import kartAsset from "@/assets/festivalkart.png.asset.json";

export const Route = createFileRoute("/kart")({
  head: () => ({
    meta: [
      { title: "Festivalkart – Festningen 2026" },
      {
        name: "description",
        content:
          "Festivalkart for Festningen 2026 på Kristiansten Festning. Gjør deg kjent med innganger, barer, mat og aktiviteter før du drar.",
      },
      { property: "og:title", content: "Festivalkart – Festningen 2026" },
      {
        property: "og:description",
        content:
          "Festivalkart for Festningen 2026 på Kristiansten Festning. Gjør deg kjent med området før festivalen.",
      },
    ],
  }),
  component: KartSide,
});

function KartSide() {
  return (
    <PageShell tittel="Festivalkart" undertittel="Gjør deg kjent med området">
      <section className="panel overflow-hidden">
        <div className="p-4">
          <h2 className="flex items-center gap-2 font-display text-lg uppercase leading-tight">
            <Map className="size-5 shrink-0 text-primary" />
            Kart over Festningsparken
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Trykk på kartet for å åpne det i full størrelse.
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
        <p className="p-4 text-[11px] text-muted-foreground">
          Offisielt festivalkart fra Festningen 2026.
        </p>
      </section>
    </PageShell>
  );
}
