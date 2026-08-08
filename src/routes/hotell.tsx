import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Building2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { HOTELLER, type Hotell } from "@/data/hoteller";

export const Route = createFileRoute("/hotell")({
  head: () => ({
    meta: [
      { title: "Hotell i Trondheim – Festningen 2026 Crew" },
      {
        name: "description",
        content:
          "Aktuelle hoteller og leiligheter i Trondheim 4.–7. september 2026, med ferdig utfylte bookinglenker for crewet.",
      },
      { property: "og:title", content: "Hotell i Trondheim – Festningen 2026" },
      { property: "og:description", content: "Bookinglenker for 4.–7. september 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HotellSide,
});

const logoToken = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY as string | undefined;

function Logo({ h }: { h: Hotell }) {
  const [feilet, setFeilet] = useState(false);
  const src = logoToken
    ? `https://img.logo.dev/${h.domene}?token=${logoToken}&size=96&format=png`
    : null;

  if (!src || feilet) {
    return (
      <span className="grid size-12 shrink-0 place-items-center rounded-md bg-secondary text-primary">
        <Building2 className="size-5" />
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${h.navn} logo`}
      loading="lazy"
      onError={() => setFeilet(true)}
      className="size-12 shrink-0 rounded-md bg-secondary object-contain p-1"
    />
  );
}

function HotellSide() {
  return (
    <PageShell tittel="Hotell" undertittel="4.–7. september 2026 · Trondheim">
      <p className="panel mb-4 border-l-4 border-l-accent p-3 text-xs leading-relaxed">
        Ingenting er booket ennå. Alle lenkene er forhåndsutfylt med datoene våre — sjekk pris og
        avstand til Kristiansten Festning før vi bestemmer oss.
      </p>

      <ul className="space-y-2">
        {HOTELLER.map((h) => (
          <li key={h.lenke}>
            <a
              href={h.lenke}
              target="_blank"
              rel="noreferrer"
              className="panel flex items-center gap-3 p-3 transition-colors hover:border-primary"
            >
              <Logo h={h} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-lg uppercase leading-none">{h.navn}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{h.beskrivelse}</p>
              </div>
              <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
