import { createFileRoute } from "@tanstack/react-router";
import { Plane, Clock } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/reise")({
  head: () => ({
    meta: [
      { title: "Reiseplan – Festningen 2026 Crew" },
      {
        name: "description",
        content:
          "Fly ut og hjem for crewet: SK4154 fredag 4. september, WF1302 søndag 6. september og SK4187 mandag 7. september.",
      },
      { property: "og:title", content: "Reiseplan – Festningen 2026" },
      { property: "og:description", content: "Alle flyavganger for turen til Trondheim." },
    ],
  }),
  component: Reise,
});

type Fly = {
  rute: string;
  tid: string;
  selskap: string;
  fly: string;
};

function FlyRad({ f, usikker }: { f: Fly; usikker?: boolean }) {
  return (
    <div
      className={`rounded-md border p-3 ${
        usikker ? "border-dashed border-primary/60 bg-primary/5" : "border-border bg-secondary/50"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display text-xl uppercase leading-none">{f.rute}</p>
        <p className="flex items-center gap-1 font-display text-xl tabular-nums text-primary">
          <Clock className="size-4" />
          {f.tid}
        </p>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {f.selskap} · {f.fly}
      </p>
    </div>
  );
}

function Kort({
  tittel,
  dato,
  hvem,
  children,
}: {
  tittel: string;
  dato: string;
  hvem: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel p-4">
      <header className="mb-3 flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
          <Plane className="size-4" />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-xl uppercase leading-none">{tittel}</h2>
          <p className="mt-1 text-xs uppercase tracking-wide text-accent">{dato}</p>
          <p className="text-xs text-muted-foreground">{hvem}</p>
        </div>
      </header>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Reise() {
  return (
    <PageShell tittel="Reise" undertittel="Fly ut og hjem">
      <div className="space-y-4">
        <Kort
          tittel="Utreise"
          dato="Fredag 4. september 2026"
          hvem="Lisbeth, Dømbe og Røsten"
        >
          <FlyRad
            f={{ rute: "SK4154", tid: "09:35", selskap: "SAS Link", fly: "Embraer 195" }}
          />
        </Kort>

        <Kort
          tittel="Lisbeths hjemreise"
          dato="Søndag 6. september 2026"
          hvem="Lisbeth"
        >
          <FlyRad
            f={{
              rute: "WF1302",
              tid: "08:50",
              selskap: "Widerøe",
              fly: "De Havilland DHC-8 400",
            }}
          />
        </Kort>

        <Kort
          tittel="Dømbe & Røstens hjemreise"
          dato="Mandag 7. september 2026"
          hvem="Dømbe og Røsten"
        >
          <FlyRad
            f={{
              rute: "SK4187",
              tid: "Tid TBA",
              selskap: "SAS Link",
              fly: "Embraer 195",
            }}
          />
        </Kort>
      </div>
    </PageShell>
  );
}
