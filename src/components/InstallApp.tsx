import { useEffect, useState } from "react";
import { Download, Share, Plus, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "install-cta-dismissed";

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    // @ts-expect-error iOS Safari legacy property
    window.navigator.standalone === true
  );
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

/**
 * "Installer app" / "Legg til på startskjerm"-CTA for PWA på mobil.
 * - Android/Chrome: fanger `beforeinstallprompt` og viser en installer-knapp.
 * - iOS Safari: viser instruksjon for å legge til på startskjerm.
 * Skjules når appen allerede kjører som installert (standalone) eller
 * etter at brukeren har avvist banneret (lagret i localStorage).
 */
export function InstallApp() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [ios, setIos] = useState(false);
  const [show, setShow] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (isStandalone()) {
      setInstalled(true);
      return;
    }
    if (localStorage.getItem(DISMISS_KEY) === "1") return;

    setIos(isIOS());

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    const onInstalled = () => {
      setInstalled(true);
      setShow(false);
      setDeferred(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    // På iOS viser vi instruksjonen selv om vi ikke får beforeinstallprompt.
    if (isIOS()) setShow(true);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // Vis bare når det er noe å vise og appen ikke er installert.
  const visible = show && !installed && (deferred || ios);
  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") {
      setInstalled(true);
      setShow(false);
    }
    setDeferred(null);
  };

  return (
    <section className="relative mt-4 overflow-hidden rounded-xl border-2 border-primary/60 bg-primary/10 p-4">
      <button
        type="button"
        onClick={dismiss}
        aria-label="Lukk"
        className="absolute right-2 top-2 grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <X className="size-4" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Download className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-lg uppercase leading-none">
            Installer app
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {ios
              ? "Legg til Sommerfest 2027 på startskjermen for rask tilgang — det fungerer som en app."
              : "Legg Sommerfest 2027 på startskjermen for rask tilgang — det fungerer som en app."}
          </p>

          {deferred ? (
            <button
              type="button"
              onClick={install}
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Download className="size-4" /> Legg til på startskjerm
            </button>
          ) : ios ? (
            <ol className="mt-3 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="grid size-5 shrink-0 place-items-center rounded bg-secondary text-primary">
                  1
                </span>
                Trykk på
                <Share className="inline size-4 text-primary" /> Del-knappen i
                Safari.
              </li>
              <li className="flex items-center gap-2">
                <span className="grid size-5 shrink-0 place-items-center rounded bg-secondary text-primary">
                  2
                </span>
                Velg
                <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                  <Plus className="inline size-3.5" /> Legg til på hjem-skjerm
                </span>
              </li>
            </ol>
          ) : null}
        </div>
      </div>
    </section>
  );
}
