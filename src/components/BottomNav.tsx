import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Archive, Ticket } from "lucide-react";

const items = [
  { to: "/", label: "Sommerfest", icon: Home },
  { to: "/festningen-2026", label: "2026", icon: Archive },
  { to: "/festningen-2026", label: "Billetter", icon: Ticket },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md">
      <ul className="mx-auto grid max-w-lg grid-cols-3">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <li key={to + label}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 px-0.5 py-3 text-[10px] font-semibold uppercase tracking-tight transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-6 shrink-0" strokeWidth={active ? 2.5 : 2} />
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
