import { createFileRoute } from "@tanstack/react-router";
import { Countdown } from "@/components/Countdown";
import { CrewCard } from "@/components/CrewCard";
import { CREW, FESTIVAL } from "@/data/festival";
import starAsset from "@/assets/festningen-star.png.asset.json";
import wordmark from "@/assets/festningen-wordmark.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Festningen 2026 – Crew | Nedtelling og festivalguide" },
      {
        name: "description",
        content:
          "Personlig festivalkompanjong for Festningen 2026 på Kristiansten Festning i Trondheim: nedtelling, program, vær, reise og sjekkliste.",
      },
      { property: "og:title", content: "Festningen 2026 – Crew" },
      {
        property: "og:description",
        content: "Nedtelling, lineup, vær, reiseplan og sjekkliste for Festningen 4.–5. september 2026.",
      },
    ],
  }),
  component: Forside,
});

function Forside() {
  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-28 pt-8">
      <section className="relative overflow-hidden rounded-xl border border-border bg-card/60 px-4 py-8 text-center">
        <img
          src={starAsset.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 w-56 opacity-15"
        />
        <img src={wordmark.url} alt="Festningen" className="mx-auto mb-4 w-52" />
        <h1 className="font-display text-5xl uppercase leading-[0.9] text-stone-carve sm:text-6xl">
          Festningen
          <br />
          <span className="text-primary">2026</span>
        </h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-accent">
          {FESTIVAL.datoer}
        </p>
        <p className="text-xs text-muted-foreground">{FESTIVAL.sted}</p>
      </section>

      <section className="mt-6">
        <Countdown />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-xl uppercase">Crewet</h2>
        <div className="grid grid-cols-3 gap-3">
          {CREW.map((c) => (
            <CrewCard key={c.id} id={c.id} navn={c.navn} standardBilde={c.bilde} />
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Trykk på et kort for å laste opp eget bilde. Bildene lagres kun i din nettleser.
        </p>
      </section>
    </div>
  );
}
