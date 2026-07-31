/* Entrée SSR utilisée uniquement au build par scripts/prerender-routes.mjs :
   rend le HTML complet d'une route pour l'écrire dans dist/ (SEO / crawlers sans JS).
   Ce module n'est jamais chargé côté client. */
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { AppShell } from "./App";

// Réexport pour que le script de pré-rendu partage la source de vérité des slugs
export { blogSlugAlternates, blogCanonicalByLocale } from "@/data/blogLocales";

export function render(url: string): Promise<{ html: string; helmet: HelmetServerState }> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      </HelmetProvider>,
      {
        // onAllReady attend la résolution des routes lazy (React.lazy + Suspense)
        onAllReady() {
          const sink = new PassThrough();
          let html = "";
          sink.on("data", (chunk: Buffer) => {
            html += chunk.toString();
          });
          sink.on("end", () => resolve({ html, helmet: helmetContext.helmet! }));
          pipe(sink);
        },
        onError(error) {
          reject(error instanceof Error ? error : new Error(String(error)));
        },
      }
    );
  });
}
