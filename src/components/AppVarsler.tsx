import { useEffect } from "react";
import { toast } from "sonner";
import { VARSLER } from "@/data/varsler";

const LAGRINGSNOKKEL = "viste-varsler";

function lesViste(): string[] {
  try {
    const raw = window.localStorage.getItem(LAGRINGSNOKKEL);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Viser nye appvarsler som toast, og som ekte pushvarsel (systemvarsel)
 * dersom brukeren har gitt tillatelse.
 */
export function AppVarsler() {
  useEffect(() => {
    const viste = lesViste();
    const nye = VARSLER.filter((v) => !viste.includes(v.id));
    if (nye.length === 0) return;

    const timer = window.setTimeout(() => {
      for (const v of nye) {
        toast(v.tittel, {
          description: v.tekst,
          duration: 12000,
          ...(v.lenke
            ? {
                action: {
                  label: "Se mer",
                  onClick: () => {
                    window.location.href = v.lenke!;
                  },
                },
              }
            : {}),
        });

        try {
          if ("Notification" in window && Notification.permission === "granted") {
            const n = new Notification(v.tittel, {
              body: v.tekst,
              icon: "/favicon.png",
              tag: v.id,
            });
            if (v.lenke) {
              n.onclick = () => {
                window.focus();
                window.location.href = v.lenke!;
              };
            }
          }
        } catch {
          /* systemvarsler støttes ikke – toast holder */
        }
      }

      try {
        window.localStorage.setItem(
          LAGRINGSNOKKEL,
          JSON.stringify([...viste, ...nye.map((v) => v.id)]),
        );
      } catch {
        /* ignorer */
      }
    }, 800);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}

/** Ber om tillatelse til systemvarsler (må kalles fra en brukerhandling). */
export async function beOmVarselTillatelse(): Promise<NotificationPermission | "unsupported"> {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  if (Notification.permission !== "default") return Notification.permission;
  return await Notification.requestPermission();
}
