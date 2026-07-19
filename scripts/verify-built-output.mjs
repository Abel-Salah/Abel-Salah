import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const siteUrl = "https://abelsalah.fr";
const tidyCalUrl = "https://tidycal.com/skill-lms/abel-rdv";
const failures = [];

const publicRoutes = [
  { path: "/", file: "index.html", lang: "fr", title: "Expert IA pour Entreprises | Audit IA" },
  { path: "/en", file: "en/index.html", lang: "en", title: "AI Consultant for Business | AI Audit" },
  { path: "/es", file: "es/index.html", lang: "es", title: "Consultor IA para Empresas | Auditoría IA" },
  { path: "/audit-ia", file: "audit-ia/index.html", lang: "fr", title: "Audit IA Entreprise" },
  { path: "/automatisation-commerciale", file: "automatisation-commerciale/index.html", lang: "fr", title: "Automatisation Commerciale IA" },
  { path: "/formation-ia", file: "formation-ia/index.html", lang: "fr", title: "Formation IA Entreprise" },
  { path: "/en/ai-audit", file: "en/ai-audit/index.html", lang: "en", title: "AI Audit for Business" },
  { path: "/en/sales-automation", file: "en/sales-automation/index.html", lang: "en", title: "AI Sales Automation" },
  { path: "/en/ai-training", file: "en/ai-training/index.html", lang: "en", title: "AI Training for Business" },
  { path: "/es/auditoria-ia", file: "es/auditoria-ia/index.html", lang: "es", title: "Auditoría IA Empresa" },
  { path: "/es/automatizacion-comercial", file: "es/automatizacion-comercial/index.html", lang: "es", title: "Automatización Comercial IA" },
  { path: "/es/formacion-ia", file: "es/formacion-ia/index.html", lang: "es", title: "Formación IA Empresa" },
  { path: "/blog", file: "blog/index.html", lang: "fr", title: "Blog IA Entreprise" },
  { path: "/contact", file: "contact/index.html", lang: "fr", title: "Prendre RDV Expert IA" },
  { path: "/work", file: "work/index.html", lang: "fr", title: "Réalisations IA" },
  { path: "/about", file: "about/index.html", lang: "fr", title: "À propos d'Abel SALAH" },
  { path: "/ecosystem", file: "ecosystem/index.html", lang: "fr", title: "Écosystème IA" },
  { path: "/cv", file: "cv/index.html", lang: "fr", title: "CV Abel SALAH" },
  { path: "/en/cv", file: "en/cv/index.html", lang: "en", title: "Resume Abel SALAH" },
  { path: "/es/cv", file: "es/cv/index.html", lang: "es", title: "CV Abel SALAH" },
  { path: "/en/work", file: "en/work/index.html", lang: "en", title: "AI Work" },
  { path: "/es/work", file: "es/work/index.html", lang: "es", title: "Proyectos IA" },
  { path: "/en/about", file: "en/about/index.html", lang: "en", title: "About Abel SALAH" },
  { path: "/es/about", file: "es/about/index.html", lang: "es", title: "Sobre Abel SALAH" },
  { path: "/en/contact", file: "en/contact/index.html", lang: "en", title: "Book an AI Expert" },
  { path: "/es/contact", file: "es/contact/index.html", lang: "es", title: "Reservar Cita Experto IA" },
  { path: "/en/ecosystem", file: "en/ecosystem/index.html", lang: "en", title: "AI Ecosystem" },
  { path: "/es/ecosystem", file: "es/ecosystem/index.html", lang: "es", title: "Ecosistema IA" },
  { path: "/produits", file: "produits/index.html", lang: "fr", title: "Produits IA" },
  { path: "/en/products", file: "en/products/index.html", lang: "en", title: "AI Products" },
  { path: "/es/productos", file: "es/productos/index.html", lang: "es", title: "Productos IA" },
  { path: "/en/blog", file: "en/blog/index.html", lang: "en", title: "Business AI Blog" },
  { path: "/es/blog", file: "es/blog/index.html", lang: "es", title: "Blog IA Empresa" },
  { path: "/expert-ia-montpellier", file: "expert-ia-montpellier/index.html", lang: "fr", title: "Expert IA à Montpellier" },
  { path: "/expert-ia-paris", file: "expert-ia-paris/index.html", lang: "fr", title: "Expert IA à Paris" },
  { path: "/expert-ia-marseille", file: "expert-ia-marseille/index.html", lang: "fr", title: "Expert IA à Marseille" },
  { path: "/es/experto-ia-malaga", file: "es/experto-ia-malaga/index.html", lang: "es", title: "Experto en IA en Málaga" },
  { path: "/es/experto-ia-barcelona", file: "es/experto-ia-barcelona/index.html", lang: "es", title: "Experto en IA en Barcelona" },
];

// Pages locales : leur head statique doit embarquer les JSON-LD de la page
const locationRoutes = new Set([
  "/expert-ia-montpellier",
  "/expert-ia-paris",
  "/expert-ia-marseille",
  "/es/experto-ia-malaga",
  "/es/experto-ia-barcelona",
]);

// Articles de fond pré-rendus (synchro avec blogSlugAlternates dans src/data/blogLocales.ts)
const articleRoutes = [
  { path: "/blog/pourquoi-faire-appel-expert-ia-entreprise", lang: "fr" },
  { path: "/blog/audit-ia-entreprise-par-ou-commencer", lang: "fr" },
  { path: "/blog/automatisation-ia-pme-guide-pratique", lang: "fr" },
  { path: "/blog/ia-force-de-vente-cas-concrets", lang: "fr" },
  { path: "/blog/strategie-ia-entreprise-2026", lang: "fr" },
  { path: "/en/blog/why-hire-an-ai-expert-for-your-business", lang: "en" },
  { path: "/en/blog/business-ai-audit-where-to-start", lang: "en" },
  { path: "/en/blog/ai-automation-for-smes-practical-guide", lang: "en" },
  { path: "/en/blog/ai-for-sales-teams-real-world-cases", lang: "en" },
  { path: "/en/blog/business-ai-strategy-2026-priorities", lang: "en" },
  { path: "/es/blog/por-que-contratar-un-experto-ia-empresa", lang: "es" },
  { path: "/es/blog/auditoria-ia-empresa-por-donde-empezar", lang: "es" },
  { path: "/es/blog/automatizacion-ia-pymes-guia-practica", lang: "es" },
  { path: "/es/blog/ia-fuerza-de-ventas-casos-reales", lang: "es" },
  { path: "/es/blog/estrategia-ia-empresa-2026", lang: "es" },
];

const serviceRoutes = new Set([
  "/audit-ia",
  "/automatisation-commerciale",
  "/formation-ia",
  "/en/ai-audit",
  "/en/sales-automation",
  "/en/ai-training",
  "/es/auditoria-ia",
  "/es/automatizacion-comercial",
  "/es/formacion-ia",
]);

function read(relativePath) {
  return readFileSync(path.join(distDir, relativePath), "utf8");
}

function readTree(dir) {
  return readdirSync(dir)
    .map((entry) => {
      const fullPath = path.join(dir, entry);
      const stat = statSync(fullPath);
      return stat.isDirectory() ? readTree(fullPath) : readFileSync(fullPath, "utf8");
    })
    .join("\n");
}

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function expectIncludes(content, expected, label) {
  expect(content.includes(expected), `missing ${label}: ${expected}`);
}

function canonicalFor(routePath) {
  return `${siteUrl}${routePath === "/" ? "" : routePath}`;
}

function sitemapUrlFor(routePath) {
  return `${siteUrl}${routePath}`;
}

expect(existsSync(distDir), "dist directory does not exist; run npm run build first");

if (existsSync(distDir)) {
  const sitemap = read("sitemap.xml");
  const robots = read("robots.txt");
  const headers = read("_headers");
  const redirects = read("_redirects");
  // vercel.json vit à la racine du repo (convention Vercel), pas dans public/dist
  const vercelConfig = readFileSync("vercel.json", "utf8");
  const llms = read("llms.txt");
  const ai = read("ai.txt");
  const builtText = readTree(distDir);

  expectIncludes(headers, "X-Content-Type-Options: nosniff", "nosniff security header");
  expectIncludes(headers, "X-Frame-Options: DENY", "frame protection header");
  expectIncludes(headers, "Referrer-Policy: strict-origin-when-cross-origin", "referrer policy header");
  expectIncludes(headers, "Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()", "permissions policy header");
  expectIncludes(robots, "Sitemap: https://abelsalah.fr/sitemap.xml", "robots sitemap directive");
  expectIncludes(robots, "Disallow: /admin/", "admin robots block");
  expectIncludes(robots, "Disallow: /styleguide", "styleguide robots block");
  expectIncludes(llms, tidyCalUrl, "TidyCal URL in llms.txt");
  expectIncludes(ai, tidyCalUrl, "TidyCal URL in ai.txt");
  expect(!builtText.includes("calendly.com"), "dist still contains Calendly URL");
  expectIncludes(builtText, tidyCalUrl, "TidyCal URL in built output");
  expectIncludes(builtText, "book_call_click", "booking conversion event in built output");
  expectIncludes(builtText, "offer_cta_click", "offer conversion event in built output");

  for (const route of publicRoutes) {
    const html = read(route.file);
    const canonical = canonicalFor(route.path);

    expectIncludes(html, `<html lang="${route.lang}">`, `html lang for ${route.path}`);
    expectIncludes(html, `<title>${route.title}`, `title for ${route.path}`);
    expectIncludes(html, `<link rel="canonical" href="${canonical}" />`, `canonical for ${route.path}`);
    expectIncludes(html, '<meta property="og:image"', `Open Graph image for ${route.path}`);
    expectIncludes(html, '<meta name="twitter:card" content="summary_large_image" />', `Twitter card for ${route.path}`);
    expectIncludes(html, '"@type":"SiteNavigationElement"', `SiteNavigationElement JSON-LD for ${route.path}`);
    expectIncludes(sitemap, `<loc>${sitemapUrlFor(route.path)}</loc>`, `sitemap entry for ${route.path}`);

    // Contenu pré-rendu : le corps doit être présent sans JavaScript
    expect(!html.includes('<div id="root"></div>'), `prerendered body missing (empty #root) for ${route.path}`);
    expectIncludes(html, "<h1", `prerendered <h1> for ${route.path}`);

    if (serviceRoutes.has(route.path)) {
      expectIncludes(html, '"@type":"Service"', `Service JSON-LD for ${route.path}`);
      expectIncludes(html, '"potentialAction":{"@type":"ReserveAction"', `ReserveAction JSON-LD for ${route.path}`);
      expectIncludes(html, "https://tidycal.com/skill-lms/abel-rdv", `booking action for ${route.path}`);
    }

    if (locationRoutes.has(route.path)) {
      expectIncludes(html, '"@type":"ProfessionalService"', `ProfessionalService JSON-LD for ${route.path}`);
      expectIncludes(html, '"@type":"FAQPage"', `FAQPage JSON-LD for ${route.path}`);
      expectIncludes(html, '"@type":"BreadcrumbList"', `BreadcrumbList JSON-LD for ${route.path}`);
      expectIncludes(html, '"areaServed"', `areaServed JSON-LD for ${route.path}`);
    }

    if (route.path !== "/" && !["/en", "/es"].includes(route.path)) {
      expectIncludes(redirects, `${route.path} /${route.path.slice(1)}.html 200`, `_redirects entry for ${route.path}`);
    }
  }

  for (const article of articleRoutes) {
    const relative = article.path.slice(1);
    const dirFile = `${relative}/index.html`;
    const flatFile = `${relative}.html`;
    expect(existsSync(path.join(distDir, dirFile)), `missing article file: ${dirFile}`);
    expect(existsSync(path.join(distDir, flatFile)), `missing article file: ${flatFile}`);
    if (!existsSync(path.join(distDir, dirFile))) continue;

    const html = read(dirFile);
    expectIncludes(html, `<html lang="${article.lang}"`, `html lang for ${article.path}`);
    expectIncludes(html, `rel="canonical" href="${canonicalFor(article.path)}"`, `canonical for ${article.path}`);
    expectIncludes(html, '"@type":"Article"', `Article JSON-LD for ${article.path}`);
    expectIncludes(html, '"@type":"BreadcrumbList"', `BreadcrumbList JSON-LD for ${article.path}`);
    expectIncludes(html, 'hreflang="fr"', `FR hreflang for ${article.path}`);
    expectIncludes(html, 'hreflang="en"', `EN hreflang for ${article.path}`);
    expectIncludes(html, 'hreflang="es"', `ES hreflang for ${article.path}`);
    expect(!html.includes('<div id="root"></div>'), `prerendered body missing (empty #root) for ${article.path}`);
    expectIncludes(html, "<h1", `prerendered <h1> for ${article.path}`);
    expectIncludes(sitemap, `<loc>${sitemapUrlFor(article.path)}</loc>`, `sitemap entry for ${article.path}`);
    expectIncludes(redirects, `${article.path} /${relative}.html 200`, `_redirects entry for ${article.path}`);
    expectIncludes(vercelConfig, `"source": "${article.path}"`, `vercel.json rewrite for ${article.path}`);
  }

  for (const route of ["/", "/en", "/es"]) {
    const html = read(route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
    expectIncludes(html, 'hreflang="fr"', `FR hreflang on ${route}`);
    expectIncludes(html, 'hreflang="en"', `EN hreflang on ${route}`);
    expectIncludes(html, 'hreflang="es"', `ES hreflang on ${route}`);
    expectIncludes(html, 'hreflang="x-default"', `x-default hreflang on ${route}`);
  }
}

if (failures.length > 0) {
  console.error("Built output verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Built output verified (${publicRoutes.length} routes + ${articleRoutes.length} prerendered articles + SEO/conversion invariants).`
);
