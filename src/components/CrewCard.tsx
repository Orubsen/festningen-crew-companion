import { useEffect, useRef, useState } from "react";
import { Camera, User } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

export function CrewCard({ id, navn, standardBilde, bildePosisjon }: { id: string; navn: string; standardBilde?: string; bildePosisjon?: string }) {
  const [lagretBilde, setBilde, hydrated] = useLocalStorage<string | null>(`crew-bilde-${id}`, null);
  const bilde = (hydrated ? lagretBilde : null) ?? standardBilde ?? null;
  const inputRef = useRef<HTMLInputElement>(null);
  const [feil, setFeil] = useState<string | null>(null);

  useEffect(() => setFeil(null), [bilde]);

  function velgFil(file: File | undefined) {
    if (!file) return;
    if (file.size > 3_000_000) {
      setFeil("Bildet er for stort (maks 3 MB).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setBilde(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <div className="panel flex flex-col items-center gap-2 p-3 text-center">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative aspect-square w-full overflow-hidden rounded-md border border-border bg-secondary"
        aria-label={`Last opp bilde av ${navn}`}
      >
        {bilde ? (
          <img
            src={bilde}
            alt={navn}
            className="size-full object-cover"
            style={bilde === standardBilde && bildePosisjon ? { objectPosition: bildePosisjon } : undefined}
          />

        ) : (
          <span className="flex size-full items-center justify-center text-muted-foreground">
            <User className="size-8" />
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-background/80 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          <Camera className="size-3" /> {bilde ? "Bytt" : "Last opp"}
        </span>
      </button>
      <p className="font-display text-lg uppercase leading-none">{navn}</p>
      {feil && <p className="text-[10px] text-destructive">{feil}</p>}
      {lagretBilde && (
        <button
          type="button"
          onClick={() => setBilde(null)}
          className="text-[10px] uppercase tracking-wide text-muted-foreground underline"
        >
          Fjern
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => velgFil(e.target.files?.[0])}
      />
    </div>
  );
}
