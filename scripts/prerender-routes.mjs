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

/* Articles générés (base contenu Lovable) : mis en cache par
   scripts/fetch-generated-posts.mjs. Injectés dans globalThis pour que le SSR
   des pages /blog et /blog/:slug rende leur contenu sans fetch. */
const generatedPostsCachePath = path.resolve("scripts/.generated-posts-cache.json");
let generatedPosts = [];
try {
  generatedPosts = JSON.parse(await readFile(generatedPostsCachePath, "utf8"));
} catch {
  console.warn("Cache d'articles générés absent — lancer scripts/fetch-generated-posts.mjs d'abord.");
}
globalThis.__GENERATED_POSTS__ = generatedPosts;

const generatedArticleRoutes = generatedPosts.map((post) => ({
  lang: post.lang ?? "fr",
  path: `${blogCanonicalByLocale[post.lang ?? "fr"] ?? "/blog"}/${post.slug}`,
  date: post.date,
}));

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

// React 19 rend nativement title/meta/link dans le flux SSR au lieu de laisser
// react-helmet-async les exposer via son contexte serveur. Les JSON-LD restent
// à leur position dans le corps. On extrait donc les éléments de head du flux
// avant d'injecter le corps pré-rendu, afin d'éviter les doublons et de garder
// les schémas dans <head> comme avec React 18.
const MANAGED_HEAD_ELEMENT =
  /<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*\/?\s*>|<link\b[^>]*\/?\s*>|<script\b[^>]*type=(['"])application\/ld\+json\1[^>]*>[\s\S]*?<\/script>/gi;

function splitRenderedHead(html) {
  const elements = [];
  const body = html.replace(MANAGED_HEAD_ELEMENT, (element) => {
    elements.push(element);
    return "";
  });
  return { body, head: elements.join("\n") };
}

async function renderPage(routePath) {
  const { html } = await render(routePath);
  const rendered = splitRenderedHead(html);
  const body = revealMotionStyles(rendered.body);
  if (!body.includes("<h1")) {
    throw new Error(`${routePath}: aucun <h1> dans le rendu (fallback Suspense ou page vide ?)`);
  }
  return { body, head: rendered.head };
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
  const { body, head } = await renderPage(route.path);
  const files = route.path === "/" ? ["index.html"] : targetFiles(route.path);
  const helmetSchemas = route.injectHelmetSchemas
    ? (head.match(/<script\b[^>]*type=(['"])application\/ld\+json\1[^>]*>[\s\S]*?<\/script>/gi) ?? []).join("")
    : "";
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

const allArticleRoutes = [...articleRoutes, ...generatedArticleRoutes];
for (const article of allArticleRoutes) {
  const rendered = await renderPage(article.path);
  const { body } = rendered;
  const head = rendered.head
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

/* ---- Sitemap, flux RSS et _redirects générés depuis les routes réelles ---- */
const SITE_URL = "https://abelsalah.fr";
const xmlEscape = (value) =>
  String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const urlFor = (routePath) => `${SITE_URL}${routePath === "/" ? "/" : routePath}`;

const sitemapEntries = [];
for (const route of routes) {
  const alternates = (route.alternates ?? [])
    .map(
      (alt) =>
        `    <xhtml:link rel="alternate" hreflang="${alt.hrefLang}" href="${urlFor(alt.path)}" />`
    )
    .join("\n");
  sitemapEntries.push(
    `  <url>\n    <loc>${urlFor(route.path)}</loc>\n${alternates ? alternates + "\n" : ""}  </url>`
  );
}
for (const article of allArticleRoutes) {
  const lastmod = article.date ? `\n    <lastmod>${article.date}</lastmod>` : "";
  sitemapEntries.push(`  <url>\n    <loc>${urlFor(article.path)}</loc>${lastmod}\n  </url>`);
}
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset\n  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:xhtml="http://www.w3.org/1999/xhtml"\n>\n${sitemapEntries.join("\n")}\n</urlset>\n`;
await writeFile(path.join(distDir, "sitemap.xml"), sitemapXml);

const rssItems = generatedPosts
  .filter((post) => (post.lang ?? "fr") === "fr")
  .slice(0, 50)
  .map((post) => {
    const link = `${SITE_URL}/blog/${post.slug}`;
    return `    <item>\n      <title>${xmlEscape(post.title)}</title>\n      <link>${link}</link>\n      <guid>${link}</guid>\n      <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n      <description>${xmlEscape(post.meta_description ?? post.excerpt ?? "")}</description>\n    </item>`;
  })
  .join("\n");
const rssXml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Blog IA — Abel SALAH</title>\n    <link>${SITE_URL}/blog</link>\n    <description>Guides pratiques IA pour PME et ETI par Abel SALAH.</description>\n    <language>fr</language>\n${rssItems}\n  </channel>\n</rss>\n`;
await writeFile(path.join(distDir, "rss.xml"), rssXml);

const redirectsPath = path.join(distDir, "_redirects");
let redirects = await readFile(redirectsPath, "utf8").catch(() => "");
const generatedRedirects = generatedArticleRoutes
  .map((article) => `${article.path} ${article.path}/index.html 200!`)
  .join("\n");
if (generatedRedirects) {
  await writeFile(redirectsPath, `${redirects.trimEnd()}\n${generatedRedirects}\n`);
}

console.log(
  `Sitemap: ${sitemapEntries.length} URLs — RSS: ${Math.min(50, generatedPosts.length)} items — redirects articles générés: ${generatedArticleRoutes.length}.`
);

console.log(
  `Prerendered ${routes.length + allArticleRoutes.length} pages (${routes.length} routes + ${articleRoutes.length} static + ${generatedArticleRoutes.length} generated articles).`
);
