import { createFileRoute, Link } from "@tanstack/react-router";
import { Countdown } from "@/components/Countdown";
import { InstallApp } from "@/components/InstallApp";
import { SOMMERFEST_2027 } from "@/data/festival";
import sommerfestLogo from "@/assets/sommerfest-2027-logo.jpg.asset.json";
import { Instagram, Facebook, Ticket, MapPin, Calendar, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sommerfest 2027 – Joggegjengen | Festivalguide Trondheim" },
      {
        name: "description",
        content:
          "Personlig festivalguide for Sommerfest 2027 på Kristiansten Festning i Trondheim: nedtelling, billetter, program og praktisk info.",
      },
      { property: "og:title", content: "Sommerfest 2027 – Joggegjengen | Festivalguide Trondheim" },
      {
        property: "og:description",
        content:
          "Personlig festivalguide for Sommerfest 2027 på Kristiansten Festning i Trondheim: nedtelling, billetter, program og praktisk info.",
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
          src={sommerfestLogo.url}
          alt="Sommerfest 2027"
          className="mx-auto mb-6 w-full max-w-xs rounded-lg"
        />
        <h1 className="font-display text-4xl uppercase leading-[0.9] text-stone-carve sm:text-5xl">
          Sommerfest
          <br />
          <span className="text-primary">2027</span>
        </h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-accent">
          {SOMMERFEST_2027.datoer}
        </p>
        <p className="text-xs text-muted-foreground">{SOMMERFEST_2027.sted}</p>
      </section>

      <InstallApp />

      <section className="mt-6">
        <Countdown
          festival={SOMMERFEST_2027}
          forhåndsTekst="Nedtelling til portene åpner"
          underTekst="Dørene åpner fredag 11. juni 2027 kl. 16:00"
          etterTekst="Sommerfest 2027 er i gang – kos dere!"
        />
      </section>

      <section className="panel mt-6 p-4">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg uppercase text-primary">
          <Ticket className="size-5" /> Billetter
        </h2>
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-sm">{SOMMERFEST_2027.billetter.presale.navn}</p>
              <p className="font-display text-2xl tabular-nums text-primary">
                {SOMMERFEST_2027.billetter.presale.pris.toLocaleString("nb-NO")},-
              </p>
            </div>
            <p className="text-xs text-muted-foreground">Begrenset antall presale-billetter.</p>
          </div>

          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-sm">{SOMMERFEST_2027.billetter.plattfest.navn}</p>
              <p className="font-display text-2xl tabular-nums text-primary">
                {SOMMERFEST_2027.billetter.plattfest.pris.toLocaleString("nb-NO")},-
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {SOMMERFEST_2027.billetter.plattfest.merknad} Aldersgrense{" "}
              {SOMMERFEST_2027.billetter.plattfest.aldersgrense}+.
            </p>
          </div>
        </div>

        <a
          href={SOMMERFEST_2027.billettUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground"
        >
          <Ticket className="size-4" /> Kjøp billetter på Tikkio
        </a>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          For bordbestilling på faktura for 6 pers eller mer, send mail til{" "}
          <a href="mailto:vip@sommerfesttrd.no" className="text-accent underline">
            vip@sommerfesttrd.no
          </a>
        </p>
      </section>

      <section className="panel mt-6 p-4">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg uppercase text-primary">
          <Calendar className="size-5" /> Praktisk info
        </h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-3">
            <Calendar className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>
              <strong className="text-foreground">Dato:</strong> {SOMMERFEST_2027.datoer}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>
              <strong className="text-foreground">Sted:</strong> {SOMMERFEST_2027.sted}
              <br />
              <span className="text-xs text-muted-foreground">{SOMMERFEST_2027.adresse}</span>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>
              <strong className="text-foreground">Aldersgrense:</strong>{" "}
              {SOMMERFEST_2027.aldersgrense} år
            </span>
          </li>
        </ul>
      </section>

      <section className="panel mt-6 p-4">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg uppercase text-primary">
          Følg Sommerfest
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={SOMMERFEST_2027.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm font-semibold transition-colors hover:border-primary"
          >
            <Instagram className="size-4 text-primary" /> Instagram
          </a>
          <a
            href={SOMMERFEST_2027.facebook}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm font-semibold transition-colors hover:border-primary"
          >
            <Facebook className="size-4 text-primary" /> Facebook
          </a>
        </div>
      </section>

      <section className="panel mt-6 border-l-4 border-l-accent p-3 text-xs leading-relaxed">
        <p className="font-display text-base uppercase leading-none text-accent">
          Program kommer!
        </p>
        <p className="mt-2">
          Artistprogrammet for Sommerfest 2027 er ikke sluppet ennå. Følg med på{" "}
          <a
            href={SOMMERFEST_2027.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-accent underline"
          >
            @sommerfesttrd
          </a>{" "}
          for oppdateringer.
        </p>
      </section>

      <section className="panel mt-6 border-l-4 border-l-primary p-3 text-xs leading-relaxed">
        <p className="font-display text-base uppercase leading-none text-primary">
          Festningen 2026
        </p>
        <p className="mt-2">
          Alt fra fjorårets festivalguide – program, vær, reise, kart, chat og mer – ligger nå i{" "}
          <Link to="/festningen-2026" className="font-semibold text-accent underline">
            arkiv-fanen
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
