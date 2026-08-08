import type { ReactNode } from "react";
import starAsset from "@/assets/festningen-star.png.asset.json";

export function PageShell({
  tittel,
  undertittel,
  children,
}: {
  tittel: string;
  undertittel?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-28 pt-6">
      <header className="mb-5 flex items-center gap-3">
        <img src={starAsset.url} alt="" aria-hidden className="size-10 shrink-0" />
        <div className="min-w-0">
          <h1 className="truncate font-display text-2xl uppercase text-stone-carve">{tittel}</h1>
          {undertittel && (
            <p className="truncate text-xs text-muted-foreground">{undertittel}</p>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}
