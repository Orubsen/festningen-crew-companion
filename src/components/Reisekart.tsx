import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { MapPin, Bus, Car, ExternalLink } from "lucide-react";
import { hentReiserute } from "@/lib/maps.functions";

const KEY = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as
  | string
  | undefined;

const FESTNING_Q = "Kristiansten+festning,+Trondheim";
const FLYPLASS_Q = "Trondheim+lufthavn+V%C3%A6rnes";
const SENTRUM_Q = "Torvet,+Trondheim";

function Kart({ src, tittel }: { src: string; tittel: string }) {
  return (
    <iframe
      title={tittel}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="aspect-[4/3] w-full rounded-md border border-border"
      allowFullScreen
    />
  );
}

function RuteSammendrag({
  minutter,
  km,
}: {
  minutter: number | null;
  km: number | null;
}) {
  return (
    <p className="font-display text-lg tabular-nums text-primary">
      {minutter !== null ? `${minutter} min` : "–"}
      {km !== null && <span className="text-muted-foreground"> · {km} km</span>}
    </p>
  );
}

export function Reisekart() {
  const hent = useServerFn(hentReiserute);
  const { data, isPending } = useQuery({
    queryKey: ["reiserute"],
    queryFn: () => hent(),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <div className="space-y-4">
      <section className="panel p-4">
        <header className="mb-3 flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
            <MapPin className="size-4" />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-xl uppercase leading-none">Festivalen</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Kristiansten festning, Kristianstens gate 1, Trondheim
            </p>
          </div>
        </header>
        {KEY ? (
          <Kart
            tittel="Kart over Kristiansten festning"
            src={`https://www.google.com/maps/embed/v1/place?key=${KEY}&q=${FESTNING_Q}&zoom=15`}
          />
        ) : (
          <p className="text-xs text-muted-foreground">Kart er ikke tilgjengelig akkurat nå.</p>
        )}
        <a
          className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-accent"
          href="https://www.google.com/maps/dir/?api=1&destination=Kristiansten+festning,+Trondheim"
          target="_blank"
          rel="noreferrer"
        >
          Åpne veibeskrivelse <ExternalLink className="size-3.5" />
        </a>
      </section>

      <section className="panel p-4">
        <header className="mb-3 flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
            <Bus className="size-4" />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-xl uppercase leading-none">
              Værnes → sentrum
            </h2>
            <p className="mt-1 text-xs uppercase tracking-wide text-accent">
              Ankomstdag · fredag 4. september
            </p>
            <p className="text-xs text-muted-foreground">Kollektivt fra flyplassen</p>
          </div>
        </header>

        {isPending && <p className="text-xs text-muted-foreground">Henter rute …</p>}

        {data?.kollektiv.feil && (
          <p className="text-xs text-muted-foreground">{data.kollektiv.feil}</p>
        )}

        {data && !data.kollektiv.feil && (
          <div className="space-y-2">
            <RuteSammendrag minutter={data.kollektiv.minutter} km={data.kollektiv.km} />
            {data.kollektiv.steg.map((s, i) => (
              <div key={i} className="rounded-md border border-border bg-secondary/50 p-3">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-base uppercase leading-none">
                    {s.linje}
                  </p>
                  <p className="text-xs tabular-nums text-primary">
                    {s.fraTid} – {s.tilTid}
                  </p>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {s.fra} → {s.til}
                </p>
              </div>
            ))}
            <p className="text-[11px] text-muted-foreground">
              Tider er et estimat basert på dagens ruteplan — sjekk AtB/Flybussen nærmere
              avreise.
            </p>
          </div>
        )}

        {KEY && (
          <div className="mt-3">
            <Kart
              tittel="Kart fra Værnes til Trondheim sentrum"
              src={`https://www.google.com/maps/embed/v1/directions?key=${KEY}&origin=${FLYPLASS_Q}&destination=${SENTRUM_Q}&mode=transit`}
            />
          </div>
        )}
      </section>

      <section className="panel p-4">
        <header className="mb-3 flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
            <Car className="size-4" />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-xl uppercase leading-none">
              Værnes → festningen
            </h2>
            <p className="text-xs text-muted-foreground">Med bil eller taxi</p>
          </div>
        </header>
        {data && !data.kjoring.feil ? (
          <RuteSammendrag minutter={data.kjoring.minutter} km={data.kjoring.km} />
        ) : (
          <p className="text-xs text-muted-foreground">
            {data?.kjoring.feil ?? "Henter rute …"}
          </p>
        )}
      </section>
    </div>
  );
}
