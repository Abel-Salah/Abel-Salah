import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { navigationByLang, routes, stripManagedHead } from "./route-heads-data.mjs";

const siteUrl = "https://abelsalah.fr";
const distDir = path.resolve("dist");
const baseIndexPath = path.join(distDir, "index.html");
const ogImage =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/390e6aa2-6998-4951-8b6c-23a48e10b181";

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildHead(route) {
  const canonical = `${siteUrl}${route.path === "/" ? "" : route.path}`;
  const xDefaultPath = route.alternates?.[0]?.path ?? route.path;
  const xDefaultHref = `${siteUrl}${xDefaultPath === "/" ? "" : xDefaultPath}`;
  const alternates = (route.alternates ?? [{ hrefLang: route.lang, path: route.path }])
    .map(
      (alternate) =>
        `    <link rel="alternate" hreflang="${alternate.hrefLang}" href="${siteUrl}${alternate.path === "/" ? "" : alternate.path}" />`
    )
    .join("\n");
  const navigationSchema = `
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      "@id": `${siteUrl}${route.path === "/" ? "" : route.path}#navigation`,
      name: navigationByLang[route.lang].map((item) => item.name),
      url: navigationByLang[route.lang].map(
        (item) => `${siteUrl}${item.path === "/" ? "" : item.path}`
      ),
    })}</script>`;

  const routeFaqSchema = route.faq
    ? `
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: route.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    })}</script>`
    : "";

  const routeServiceSchema = route.service
    ? `
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: route.service.name,
      serviceType: route.service.serviceType,
      description: route.service.description,
      url: canonical,
      provider: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Abel SALAH",
      },
      areaServed: [
        { "@type": "Country", name: "France" },
        { "@type": "Place", name: "Europe" },
        { "@type": "Place", name: "Remote" },
      ],
      audience: {
        "@type": "Audience",
        audienceType: route.service.audience,
      },
      potentialAction: {
        "@type": "ReserveAction",
        target: "https://tidycal.com/skill-lms/abel-rdv",
      },
    })}</script>`
    : "";

  return `    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="author" content="Abel SALAH" />
    <link rel="canonical" href="${canonical}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${xDefaultHref}" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:locale" content="${route.lang === "en" ? "en_US" : route.lang === "es" ? "es_ES" : "fr_FR"}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${ogImage}" />${navigationSchema}${routeServiceSchema}${routeFaqSchema}`;
}

function applyRouteHead(baseHtml, route) {
  const html = stripManagedHead(baseHtml).replace(/<html\s+lang="[^"]*"/i, `<html lang="${route.lang}"`);
  return html.replace(/(<meta\s+name="viewport"[\s\S]*?>)/i, `$1\n${buildHead(route)}`);
}

const baseHtml = await readFile(baseIndexPath, "utf8");

/* Snapshot de l'index.html vierge issu de `vite build` : prerender-routes.mjs
   s'en sert comme base pour les pages d'articles, puis le supprime. */
await writeFile(path.join(distDir, ".spa-base.html"), baseHtml);

for (const route of routes) {
  const html = applyRouteHead(baseHtml, route);
  if (route.path === "/") {
    await writeFile(baseIndexPath, html);
    continue;
  }

  const routeDir = path.join(distDir, route.path.replace(/^\//, ""));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html);

  const htmlFilePath = path.join(distDir, `${route.path.replace(/^\//, "")}.html`);
  await mkdir(path.dirname(htmlFilePath), { recursive: true });
  await writeFile(htmlFilePath, html);
}

console.log(`Generated static SEO heads for ${routes.length} routes.`);
