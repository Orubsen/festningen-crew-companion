declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"];

export function initAnalytics() {
  // Google tag (gtag.js) is loaded inline in src/routes/__root.tsx so it is
  // present in the initial HTML even before React hydrates. This function is
  // kept as a no-op hook for compatibility with the root component.
}

export function trackPageView(path: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  if (!measurementId) return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    send_to: measurementId,
  });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  if (!measurementId) return;

  window.gtag("event", name, params);
}
