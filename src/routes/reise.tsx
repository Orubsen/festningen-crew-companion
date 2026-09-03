import { createFileRoute } from "@tanstack/react-router";
import { Plane, Clock, ExternalLink, Bus } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reisekart } from "@/components/Reisekart";
import vaernesLogo from "@/assets/vaernesekspressen-logo.png.asset.json";

export const Route = createFileRoute("/reise")({
  head: () => ({
    meta: [
      { title: "Reiseplan – Festningen 2026 Crew" },
      {
        name: "description",
        content:
          "Fly ut og hjem for crewet: SK4154 fredag 4. september, WF678 (Leffe), DY173 søndag 6. september (Lisbeth), WF681 (Leffe) og SK4187 mandag 7. september (Dømbe og Røsten).",
      },
      { property: "og:title", content: "Reiseplan – Festningen 2026" },
      {
        property: "og:description",
        content:
          "Fly ut og hjem for crewet: SK4154 fredag 4. september, WF678 (Leffe), DY173 søndag 6. september (Lisbeth), WF681 (Leffe) og SK4187 mandag 7. september (Dømbe og Røsten).",
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
              lenke:
                "https://www.sas.no/book-new/revenue/flights?cartId=ef6cc863-4025-4ae3-9f54-0d23cb53ff53",
            }}
          />
        </Kort>

        <section className="panel p-4">
          <header className="mb-3 flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
              <Bus className="size-4" />
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-xl uppercase leading-none">Fra flyplassen</h2>
              <p className="mt-1 text-xs uppercase tracking-wide text-accent">
                Ankomstdag · fredag 4. september
              </p>
              <p className="text-xs text-muted-foreground">
                Værnesekspressen til Bakkegata — for alle som lander før lunsj
              </p>
            </div>
          </header>
          <div className="space-y-2">
            <div className="rounded-md border border-border bg-secondary/50 p-3">
              <div className="flex items-center justify-between gap-3">
                <img
                  src={vaernesLogo.url}
                  alt="Værnesekspressen"
                  className="h-7 w-auto shrink-0"
                />
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Værnes → Bakkegata
                </p>
              </div>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                <p className="flex items-center gap-1.5">
                  <Clock className="size-3.5 shrink-0" />
                  Avgang <strong className="text-foreground">09:45</strong> — fremme{" "}
                  <strong className="text-foreground">10:18</strong>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="size-3.5 shrink-0" />
                  Avgang <strong className="text-foreground">10:00</strong> — fremme{" "}
                  <strong className="text-foreground">10:33</strong>
                </p>
                <p className="text-[11px]">
                  Passer fint for SK4154 (ankomst 09:35). Ta den til Bakkegata i sentrum.
                </p>
              </div>
              <a
                href="https://billett.ueb.no/no/UNI:Operator:VerExp/3?route=9&stat=1"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide"
              >
                Bestill billett <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </section>

        <Kort
          tittel="Leffes utreise"
          dato="Fredag 4. september 2026"
          hvem="Leffe"
        >
          <FlyRad
            f={{
              rute: "WF678",
              tid: "12:10–13:20",
              fra: "Bergen (BGO)",
              til: "Trondheim (TRD)",
              selskap: "Widerøe",
              fly: "De Havilland DHC-8 400",
              varighet: "1h 10m",
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
          tittel="Leffes hjemreise"
          dato="Søndag 6. september 2026"
          hvem="Leffe"
        >
          <FlyRad
            f={{
              rute: "WF681",
              tid: "17:10–18:20",
              fra: "Trondheim (TRD)",
              til: "Bergen (BGO)",
              selskap: "Widerøe",
              fly: "De Havilland DHC-8 400",
              varighet: "1h 10m",
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

