import { createFileRoute } from "@tanstack/react-router";
import { Countdown } from "@/components/Countdown";
import { CrewCard } from "@/components/CrewCard";
import { InstallApp } from "@/components/InstallApp";
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
              Festivalpass må kjøpes nå!
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Det er ikke lenge igjen til Festningen 2026, og det går rykter om at det er{