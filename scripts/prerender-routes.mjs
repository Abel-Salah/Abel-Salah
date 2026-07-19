/* Pré-rendu au build : injecte le HTML complet de chaque page dans dist/,
   pour que le contenu soit lisible sans JavaScript (Google, crawlers IA).

   Prérequis (dans cet ordre, cf. `npm run build`) :
   1. vite build                                     → dist/ (client)
   2. vite build --ssr src/entry-prerender.tsx …     → dist-ssr/entry-prerender.js
   3. node scripts/generate-static-route-heads.mjs   → heads statiques + dist/.spa-base.html
   4. node scripts/prerender-routes.mjs              → ce script

   Le client re-render entièrement au chargement (createRoot.render, pas d'hydratation),
   le HTML pré-rendu sert uniquement aux crawlers et au premier affichage. */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { routes, stripManagedHead } from "./route-heads-data.mjs";

// Charge les builds production de react/react-dom (les dépendances SSR sont externalisées)
process.env.NODE_ENV ??= "production";

const distDir = path.resolve("dist");
const ssrEntryPath = path.resolve("dist-ssr/entry-prerender.js");

if (!existsSync(ssrEntryPath)) {
  console.error(
    "dist-ssr/entry-prerender.js introuvable — lancer `vite build --ssr src/entry-prerender.tsx --outDir dist-ssr` avant ce script."
  );
  process.exit(1);
}

const { render, blogSlugAlternates, blogCanonicalByLocale } = await import(
  pathToFileURL(ssrEntryPath).href
);

const articleRoutes = blogSlugAlternates.flatMap((entry) =>
  ["fr", "en", "es"].map((lang) => ({
    lang,
    path: `${blogCanonicalByLocale[lang]}/${entry[lang]}`,
  }))
);

/* framer-motion rend les styles `initial` côté serveur (opacity:0, transform…) :
   sans ce nettoyage, le contenu pré-rendu serait invisible sans JavaScript.
   On ne touche qu'aux attributs style contenant `opacity:0` strict (les
   animations d'entrée), jamais aux classes Tailwind ni aux autres styles inline. */
function revealMotionStyles(html) {
  return html.replace(/ style="([^"]*)"/g, (match, style) => {
    if (!/opacity:\s*0(?![.\d])/.test(style)) return match;
    const kept = style
      .split(";")
      .map((declaration) => declaration.trim())
      .filter(
        (declaration) =>
          declaration &&
          !/^opacity:\s*0(?![.\d])/.test(declaration) &&
          !declaration.startsWith("transform:") &&
          !declaration.startsWith("will-change:")
      );
    return kept.length > 0 ? ` style="${kept.join(";")}"` : "";
  });
}

const ROOT_MARKER = '<div id="root"></div>';

function injectBody(html, body, label) {
  if (!html.includes(ROOT_MARKER)) {
    throw new Error(`${label}: marqueur ${ROOT_MARKER} introuvable dans le fichier cible`);
  }
  return html.replace(ROOT_MARKER, `<div id="root">${body}</div>`);
}

async function renderPage(routePath) {
  const { html, helmet } = await render(routePath);
  const body = revealMotionStyles(html);
  if (!body.includes("<h1")) {
    throw new Error(`${routePath}: aucun <h1> dans le rendu (fallback Suspense ou page vide ?)`);
  }
  return { body, helmet };
}

function targetFiles(routePath) {
  const relative = routePath.replace(/^\//, "");
  return [path.join(relative, "index.html"), `${relative}.html`];
}

/* 1. Les routes publiques : les fichiers avec heads statiques existent déjà,
   on y injecte le corps rendu — et, pour les routes marquées injectHelmetSchemas
   (pages locales), les JSON-LD produits par la page elle-même
   (ProfessionalService, FAQPage, BreadcrumbList), invisibles sinon sans JS. */
for (const route of routes) {
  const { body, helmet } = await renderPage(route.path);
  const files = route.path === "/" ? ["index.html"] : targetFiles(route.path);
  const helmetSchemas = route.injectHelmetSchemas ? helmet.script.toString() : "";
  for (const file of files) {
    const filePath = path.join(distDir, file);
    let current = await readFile(filePath, "utf8");
    if (helmetSchemas) {
      current = current.replace("</head>", `${helmetSchemas}</head>`);
    }
    await writeFile(filePath, injectBody(current, body, route.path));
  }
}

/* 2. Les articles de fond du blog : head complet fourni par react-helmet-async
   (title, meta, canonical, hreflang, JSON-LD Article/Breadcrumb), corps rendu,
   le tout appliqué sur l'index.html vierge sauvegardé par generate-static-route-heads. */
const basePath = path.join(distDir, ".spa-base.html");
const baseHtml = await readFile(basePath, "utf8");

for (const article of articleRoutes) {
  const { body, helmet } = await renderPage(article.path);
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script]
    .map((part) => part.toString())
    .filter(Boolean)
    .join("\n    ")
    // helmet sérialise la prop React telle quelle ; l'attribut HTML normalisé est en minuscules
    .replaceAll('hrefLang="', 'hreflang="');
  if (!head.includes("<title")) {
    throw new Error(`${article.path}: helmet n'a pas produit de <title>`);
  }

  let html = stripManagedHead(baseHtml).replace(
    /<html\s+lang="[^"]*"/i,
    `<html lang="${article.lang}"`
  );
  html = html.replace(/(<meta\s+name="viewport"[\s\S]*?>)/i, `$1\n    ${head}`);
  html = injectBody(html, body, article.path);

  for (const file of targetFiles(article.path)) {
    const filePath = path.join(distDir, file);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, html);
  }
}

await rm(basePath, { force: true });

console.log(
  `Prerendered ${routes.length + articleRoutes.length} pages (${routes.length} routes + ${articleRoutes.length} articles).`
);
