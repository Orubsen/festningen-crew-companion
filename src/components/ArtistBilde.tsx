import { useEffect, useState } from "react";
import { Music2 } from "lucide-react";
import { ARTISTBILDER } from "@/data/artistbilder";

const CACHE_PREFIX = "festningen-artistbilde:";

/**
 * Viser offisielt artistbilde når vi har det. Faller tilbake til iTunes
 * Search API (åpent, ingen nøkkel) og cacher i localStorage.
 */
export function ArtistBilde({ navn }: { navn: string }) {
  const offisielt = ARTISTBILDER[navn] ?? null;
  const [url, setUrl] = useState<string | null>(offisielt);

  useEffect(() => {
    if (offisielt) {
      setUrl(offisielt);
      return;
    }
    let avbrutt = false;
    const nøkkel = CACHE_PREFIX + navn;
    const cachet = localStorage.getItem(nøkkel);
    if (cachet !== null) {
      setUrl(cachet || null);
      return;
    }
    const ctrl = new AbortController();
    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(navn)}&entity=musicArtist,album&limit=5&country=NO`,
      { signal: ctrl.signal },
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { results?: { artworkUrl100?: string; artistName?: string }[] } | null) => {
        const treff = data?.results?.find(
          (r) =>
            r.artworkUrl100 &&
            r.artistName?.toLowerCase().includes(navn.toLowerCase().split(" ")[0]!),
        );
        const funnet = treff?.artworkUrl100?.replace("100x100", "300x300") ?? "";
        if (avbrutt) return;
        localStorage.setItem(nøkkel, funnet);
        setUrl(funnet || null);
      })
      .catch(() => {});
    return () => {
      avbrutt = true;
      ctrl.abort();
    };
  }, [navn, offisielt]);

  if (!url) {
    return (
      <span className="grid size-12 shrink-0 place-items-center rounded-md bg-secondary text-primary">
        <Music2 className="size-4" />
      </span>
    );
  }

  return (
    <img
      src={url}
      alt={`Bilde av ${navn}`}
      loading="lazy"
      className="size-12 shrink-0 rounded-md border border-border object-cover"
    />
  );
}
