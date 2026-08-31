import { createFileRoute } from "@tanstack/react-router";
import { Countdown } from "@/components/Countdown";
import { CrewCard } from "@/components/CrewCard";
import { InstallApp } from "@/components/InstallApp";
import { VarselKnapp } from "@/components/VarselKnapp";
import { CREW, FESTIVAL } from "@/data/festival";
import starAsset from "@/assets/festningen-star.png.asset.json";
import wordmark from "@/assets/festningen-wordmark.webp.asset.json";
import stemningVideo from "@/assets/festningen-stemning.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Festningen 2026 – Joggegjengen | Festivalguide Trondheim" },
      {
        name: "description",
        content:
          "Personlig festivalkompanjong for Festningen 2026 på Kristiansten Festning i Trondheim: nedtelling, program, vær, reise og sjekkliste.",
      },
      { property: "og:title", content: "Festningen 2026 – Joggegjengen | Festivalguide Trondheim" },
      {
        property: "og:description",
        content:
          "Personlig festivalkompanjong for Festningen 2026 på Kristiansten Festning i Trondheim: nedtelling, program, vær, reise og sjekkliste.",
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

      <InstallApp />
      <VarselKnapp />

      <section className="mt-6">
        <Countdown />
      </section>

      <section
        className="mt-6 rounded-xl border-2 border-destructive bg-destructive/15 p-4"
        style={{ boxShadow: "0 0 0 1px oklch(0.58 0.21 27 / 0.35)" }}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0 text-2xl">🚨</span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl uppercase leading-tight text-destructive">
              Kun Leffe mangler festivalpass!
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              <strong className="text-success">Røsten, Dømbe og Lisbeth har sikret seg festivalpass</strong>,
              men DNB-festivalpasset til 1 549,- er nå{" "}
              <strong className="text-destructive">utsolgt</strong>. Leffe må kjøpe via den offisielle
              linken til ordinærpris, og det er svært få billetter igjen.
            </p>
            <a
              href={FESTIVAL.billettUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-primary-foreground"
            >
              🎟️ Kjøp pass på Tikkio
            </a>
          </div>
        </div>
      </section>

      <section className="panel mt-6 border-l-4 border-l-accent p-3 text-xs leading-relaxed">
        <p className="font-display text-base uppercase leading-none text-accent">
          Siste nytt fra Festningen
        </p>
        <p className="mt-2">
          Prisen på festivalpass steg torsdag 13. august — nå er det fullpris. Rundt{" "}
          <strong>89 % av billettene er solgt</strong>, så de som mangler pass bør ikke vente.
        </p>
        <a
          href="https://nyhetsbrev.festningen.no/p/r/4yn1S6OlNACrPbkXMCvglQ4ppXbu1ZsxesBOZO0OoWU="
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block font-semibold text-accent underline underline-offset-2"
        >
          Les hele nyhetsbrevet
        </a>
      </section>

      <section className="mt-8 space-y-3">
        <details className="panel group overflow-hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3">
            <span className="font-display text-lg uppercase">🎬 Stemning</span>
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground group-open:hidden">
              Vis video
            </span>
            <span className="hidden text-[11px] uppercase tracking-wide text-muted-foreground group-open:inline">
              Skjul
            </span>
          </summary>
          <div className="px-3 pb-3">
            <video
              src={stemningVideo.url}
              controls
              playsInline
              preload="none"
              className="w-full rounded-lg border border-border bg-black"
            />
          </div>
        </details>

        <details className="panel group overflow-hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3">
            <span className="font-display text-lg uppercase">🎧 Spilleliste</span>
            <a
              href={FESTIVAL.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] uppercase tracking-wide text-muted-foreground underline"
            >
              Åpne i Spotify
            </a>
          </summary>
          <div className="px-3 pb-3">
            <iframe
              title="Festningen 2026 Spotify-spilleliste"
              src={`https://open.spotify.com/embed/playlist/${FESTIVAL.spotifyPlaylistId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="w-full rounded-lg border border-border"
            />
          </div>
        </details>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-xl uppercase">Crewet</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CREW.map((c) => (
            <CrewCard
              key={c.id}
              id={c.id}
              navn={c.navn}
              standardBilde={c.bilde}
              {...("bildePosisjon" in c ? { bildePosisjon: c.bildePosisjon } : {})}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Trykk på et kort for å laste opp eget bilde. Bildene lagres kun i din nettleser.
        </p>
      </section>
    </div>
  );
}
