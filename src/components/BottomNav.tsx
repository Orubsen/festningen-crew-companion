import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ListMusic, CloudSun, Plane, ClipboardCheck, MessageSquare, Beer } from "lucide-react";

const items = [
  { to: "/", label: "Forside", icon: Home },
  { to: "/program", label: "Program", icon: ListMusic },
  { to: "/vaer", label: "Vær", icon: CloudSun },
  { to: "/reise", label: "Reise", icon: Plane },
  { to: "/olpriser", label: "Øl", icon: Beer },
  { to: "/sjekkliste", label: "Sjekk", icon: ClipboardCheck },
  { to: "/chat", label: "Chat", icon: MessageSquare },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md">
      <ul className="mx-auto grid max-w-lg grid-cols-7">

        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 px-0.5 py-2.5 text-[9px] font-semibold uppercase tracking-tight transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-5 shrink-0" strokeWidth={active ? 2.5 : 2} />
                <span className="truncate">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
