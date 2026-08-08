import { useEffect, useState } from "react";
import { FESTIVAL } from "@/data/festival";

function diff(target: Date) {
  const ms = target.getTime() - Date.now();
  const clamped = Math.max(0, ms);
  return {
    ferdig: ms <= 0,
    dager: Math.floor(clamped / 86400000),
    timer: Math.floor((clamped / 3600000) % 24),
    min: Math.floor((clamped / 60000) % 60),
    sek: Math.floor((clamped / 1000) % 60),
  };
}

function Tall({ verdi, etikett }: { verdi: number; etikett: string }) {
  return (
    <div className="panel flex min-w-0 flex-1 flex-col items-center px-1 py-3">
      <span className="font-display text-3xl tabular-nums leading-none text-primary sm:text-4xl">
        {String(verdi).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {etikett}
      </span>
    </div>
  );
}

export function Countdown() {
  const [tick, setTick] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const i = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, []);

  if (!mounted) {
    return <div className="h-24 animate-pulse rounded-lg bg-card" aria-hidden />;
  }

  void tick;
  const doors = diff(FESTIVAL.doorsOpen);
  const pågår = doors.ferdig;
  const t = pågår ? diff(FESTIVAL.hjemreise) : doors;

  return (
    <div>
      <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {pågår ? "🎉 Vi er her! Nedtelling til hjemreise" : "Nedtelling til portene åpner"}
      </p>
      <div className="flex gap-2">
        <Tall verdi={t.dager} etikett="Dager" />
        <Tall verdi={t.timer} etikett="Timer" />
        <Tall verdi={t.min} etikett="Min" />
        <Tall verdi={t.sek} etikett="Sek" />
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {pågår
          ? "Festningen pågår – kos dere!"
          : "Portene åpner fredag 4. september 2026 kl. 15:00"}
      </p>
    </div>
  );
}
