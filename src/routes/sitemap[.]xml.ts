import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://festningen-crew-companion.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/festningen-2026", changefreq: "monthly", priority: "0.8" },
          { path: "/program", changefreq: "monthly", priority: "0.5" },
          { path: "/vaer", changefreq: "monthly", priority: "0.5" },
          { path: "/reise", changefreq: "monthly", priority: "0.5" },
          { path: "/band", changefreq: "monthly", priority: "0.5" },
          { path: "/kart", changefreq: "monthly", priority: "0.5" },
          { path: "/hotell", changefreq: "monthly", priority: "0.5" },
          { path: "/olpriser", changefreq: "weekly", priority: "0.6" },
          { path: "/sjekkliste", changefreq: "monthly", priority: "0.5" },
          { path: "/chat", changefreq: "monthly", priority: "0.5" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
