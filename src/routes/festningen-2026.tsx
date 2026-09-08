import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ListMusic,
  CloudSun,
  Plane,
  Ticket,
  Map,
  Beer,
  ClipboardCheck,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { FESTIVAL } from "@/data/festival";

export const Route = createFileRoute("/festningen-2026")({
  head: () => ({
    meta: [
      { title: "Festningen 2026 – Arkiv | Joggegjengen" },
      {
        name: "description",
        content:
          "Arkivet for Festningen 2026: program, vær, reise, båndbytte, kart, ølpriser, sjekkliste og crew-chat.",
      },
      { property: "og:title", content: "Festningen 2026 – Arkiv | Joggegjengen" },
      {
        property: "og:description",
        content:
          "Arkivet for Festningen 2026: program, vær, reise, båndbytte, kart, ølpriser, sjekkliste og crew-chat.",
      },
    ],
  }),
  component: ArkivForside,
});

const arkivKort = [
  { to: "/program", label: "Program", icon: ListMusic, beskrivelse: "Alle 16 artistene med tid og scene." },
  { to: "/vaer", label: "Vær", icon: CloudSun, beskrivelse: "Timesvarsel for festivaldagene." },
  { to: "/reise", label: "Reise", icon: Plane, beskrivelse: "Fly ut/hjem og Værnesekspressen." },
  { to: "/band", label: "Bytt billett til bånd", icon: Ticket, beskrivelse: "Steder og tider for båndbytte." },
  { to: "/kart", label: "Festivalkart", icon: Map, beskrivelse: "Kart over Festningsparken." },
  { to: "/olpriser", label: "Ølpriser", icon: Beer, beskrivelse: "Billigste øl i Trondheim." },
  { to: "/sjekkliste", label: "Sjekkliste", icon: ClipboardCheck, beskrivelse: "Hva crewet ordnet før avreise." },
  { to: "/chat", label: "Crew-chat", icon: MessageSquare, beskrivelse: "Chatten fra Festningen 2026." },
] as const;

function ArkivForside() {
  return (
    <PageShell tittel="Festningen 2026" undertittel="Arkiv for forrige festival">
      <div className="panel mb-4 border-l-4 border-l-accent p-3 text-xs leading-relaxed">
        <p className="flex items-center gap-2 font-semibold text-accent">
          <Calendar className="size-4" /> {FESTIVAL.datoer}
        </p>
        <p className="mt-1 text-muted-foreground">
          Dette er arkivet for Festningen 2026. Her finner dere alt fra program og reise til chat og
          sjekkliste.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {arkivKort.map(({ to, label, icon: Icon, beskrivelse }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex h-full flex-col rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary"
            >
              <Icon className="size-6 text-primary" strokeWidth={2} />
              <p className="mt-2 font-display text-base uppercase leading-tight">{label}</p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{beskrivelse}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
