import { useEffect, useState } from "react";
import { Bell, BellRing } from "lucide-react";
import { toast } from "sonner";
import { beOmVarselTillatelse } from "@/components/AppVarsler";

export function VarselKnapp() {
  const [status, setStatus] = useState<NotificationPermission | "unsupported" | null>(null);

  useEffect(() => {
    setStatus("Notification" in window ? Notification.permission : "unsupported");
  }, []);

  if (status === null || status === "unsupported" || status === "denied") return null;

  if (status === "granted") {
    return (
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
        <BellRing className="size-3.5 text-success" /> Pushvarsler er på
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={async () => {
        const res = await beOmVarselTillatelse();
        setStatus(res);
        if (res === "granted") toast.success("Pushvarsler er slått på 🔔");
      }}
      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-xs font-bold uppercase tracking-wide"
    >
      <Bell className="size-4" /> Slå på pushvarsler
    </button>
  );
}
