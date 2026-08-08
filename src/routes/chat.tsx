import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Send, MessageSquare } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { CREW } from "@/data/festival";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Crew-chat – Festningen 2026" },
      {
        name: "description",
        content:
          "Felles chat for Lisbeth, Dømbe og Røsten – planlegg Festningen 2026 i Trondheim sammen.",
      },
      { property: "og:title", content: "Crew-chat – Festningen 2026" },
      { property: "og:description", content: "Snakk sammen før og under Festningen 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Chat,
});

type Melding = {
  id: string;
  avsender: string;
  tekst: string;
  created_at: string;
};

function klokke(iso: string) {
  return new Date(iso).toLocaleString("nb-NO", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Chat() {
  const [navn, setNavn, hydrated] = useLocalStorage<string>("chat-navn", "");
  const [meldinger, setMeldinger] = useState<Melding[]>([]);
  const [tekst, setTekst] = useState("");
  const [laster, setLaster] = useState(true);
  const [feil, setFeil] = useState<string | null>(null);
  const [sender, setSender] = useState(false);
  const bunn = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let aktiv = true;

    void (async () => {
      const { data, error } = await supabase
        .from("chat_meldinger")
        .select("id, avsender, tekst, created_at")
        .order("created_at", { ascending: true })
        .limit(500);
      if (!aktiv) return;
      if (error) setFeil("Klarte ikke å hente meldinger.");
      else setMeldinger((data ?? []) as Melding[]);
      setLaster(false);
    })();

    const channel = supabase
      .channel("chat-meldinger")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_meldinger" },
        (payload) => {
          const ny = payload.new as Melding;
          setMeldinger((prev) => (prev.some((m) => m.id === ny.id) ? prev : [...prev, ny]));
        },
      )
      .subscribe();

    return () => {
      aktiv = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    bunn.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [meldinger.length]);

  const kanSende = useMemo(() => navn.trim() !== "" && tekst.trim() !== "" && !sender, [navn, tekst, sender]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!kanSende) return;
    setSender(true);
    setFeil(null);
    const { error } = await supabase
      .from("chat_meldinger")
      .insert({ avsender: navn.trim().slice(0, 40), tekst: tekst.trim().slice(0, 2000) });
    setSender(false);
    if (error) {
      setFeil("Meldingen ble ikke sendt. Prøv igjen.");
      return;
    }
    setTekst("");
    inputRef.current?.focus();
  }

  if (hydrated && navn.trim() === "") {
    return (
      <PageShell tittel="Crew-chat" undertittel="Hvem er du?">
        <div className="panel space-y-3 p-4">
          <p className="text-sm text-muted-foreground">
            Velg navnet ditt så vet de andre hvem som skriver.
          </p>
          <div className="grid gap-2">
            {CREW.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setNavn(c.navn)}
                className="rounded-md border border-border bg-secondary px-4 py-3 text-left font-display text-lg uppercase tracking-wide hover:border-primary"
              >
                {c.navn}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const v = new FormData(e.currentTarget).get("annet");
              if (typeof v === "string" && v.trim()) setNavn(v.trim().slice(0, 40));
            }}
            className="flex gap-2 pt-1"
          >
            <input
              name="annet"
              placeholder="Annet navn …"
              maxLength={40}
              className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold uppercase text-primary-foreground"
            >
              Bli med
            </button>
          </form>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell tittel="Crew-chat" undertittel={navn ? `Du skriver som ${navn}` : undefined}>
      <div className="panel flex h-[calc(100dvh-16rem)] min-h-[20rem] flex-col overflow-hidden">
        <div className="flex-1 space-y-3 overflow-y-auto p-3">
          {laster && <p className="text-sm text-muted-foreground">Laster meldinger …</p>}
          {!laster && meldinger.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
              <MessageSquare className="size-8" />
              <p className="text-sm">Ingen meldinger ennå. Si hei til crewet!</p>
            </div>
          )}
          {meldinger.map((m) => {
            const min = m.avsender === navn;
            return (
              <div key={m.id} className={`flex flex-col ${min ? "items-end" : "items-start"}`}>
                <span className="px-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                  {m.avsender} · {klokke(m.created_at)}
                </span>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-lg px-3 py-2 text-sm ${
                    min
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-secondary text-foreground"
                  }`}
                >
                  {m.tekst}
                </div>
              </div>
            );
          })}
          <div ref={bunn} />
        </div>

        {feil && <p className="px-3 pb-1 text-xs text-destructive">{feil}</p>}

        <form onSubmit={send} className="flex gap-2 border-t border-border p-2">
          <input
            ref={inputRef}
            value={tekst}
            onChange={(e) => setTekst(e.target.value)}
            placeholder="Skriv en melding …"
            maxLength={2000}
            className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={!kanSende}
            aria-label="Send melding"
            className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-40"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>

      <button
        type="button"
        onClick={() => setNavn("")}
        className="mt-3 text-[11px] uppercase tracking-wide text-muted-foreground underline"
      >
        Bytt navn
      </button>
    </PageShell>
  );
}
