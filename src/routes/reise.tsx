import { createFileRoute } from "@tanstack/react-router";
import { Plane, Clock, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reisekart } from "@/components/Reisekart";

export const Route = createFileRoute("/reise")({
  head: () => ({
    meta: [
      { title: "Reiseplan – Festningen 2026 Crew" },
      {
        name: "description",
        content:
          "Fly ut og hjem for crewet: SK4154 fredag 4. september, DY173 søndag 6. september (Lisbeth) og SK4187 mandag 7. september (Dømbe og Røsten).",
      },
      { property: "og:title", content: "Reiseplan – Festningen 2026" },
      {
        property: "og:description",
        content:
          "Fly ut og hjem for crewet: SK4154 fredag 4. september, DY173 søndag 6. september og SK4187 mandag 7. september.",
      },
    ],
  }),
  component: Reise,
});

type Fly = {
  rute: string;
  tid: string;
  selskap: string;
  fly?: string;
  fra?: string;
  til?: string;
  referanse?: string;
  varighet?: string;
  status?: string;
  lenke?: string;
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
      <div className="mt-1.5 space-y-0.5 text-xs text-muted-foreground">
        {f.fra && f.til && (
          <p>
            {f.fra} → {f.til}
          </p>
        )}
        <p>
          {f.selskap}
          {f.fly ? ` · ${f.fly}` : ""}
          {f.varighet ? ` · ${f.varighet}` : ""}
        </p>
        {f.referanse && (
          <p>
            Ref. {f.referanse} · {f.status || "Bekreftet"}
          </p>
        )}
      </div>
      {f.lenke && (
        <a
          href={f.lenke}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide"
        >
          Se bestilling <ExternalLink className="size-3.5" />
        </a>
      )}
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
            f={{
              rute: "SK4154",
              tid: "08:35–09:35",
              fra: "Flesland (BGO), Bergen",
              til: "Trondheim-Værnes (TRD), Trondheim",
              selskap: "Scandinavian Airlines",
              fly: "SAS Link",
              referanse: "XA82SJ",
              varighet: "1h 0m",
              status: "Bekreftet",
            }}
          />
        </Kort>

        <Kort
          tittel="Lisbeths hjemreise"
          dato="Søndag 6. september 2026"
          hvem="Lisbeth"
        >
          <FlyRad
            f={{
              rute: "DY173",
              tid: "09:45–10:45",
              fra: "Trondheim-Værnes (TRD), Trondheim",
              til: "Flesland (BGO), Bergen",
              selskap: "Norwegian Air Shuttle",
              referanse: "XA7OZD",
              varighet: "1h 0m",
              status: "Bekreftet",
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
              tid: "19:50",
              selskap: "SAS Link",
              fly: "Embraer 195",
            }}
          />
        </Kort>

        <Reisekart />
      </div>
    </PageShell>
  );
}
