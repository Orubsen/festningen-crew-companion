import { useEffect, useState } from "react";
import { Music2 } from "lucide-react";

const CACHE_PREFIX = "festningen-artistbilde:";

/** Henter artistbilde fra iTunes Search API (åpent, ingen nøkkel) og cacher i localStorage. */
export function ArtistBilde({ navn }: { navn: string }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
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
  }, [navn]);

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
