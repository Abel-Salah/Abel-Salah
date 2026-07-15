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

    if (serviceRoutes.has(route.path)) {
      expectIncludes(html, '"@type":"Service"', `Service JSON-LD for ${route.path}`);
      expectIncludes(html, '"potentialAction":{"@type":"ReserveAction"', `ReserveAction JSON-LD for ${route.path}`);
      expectIncludes(html, "https://tidycal.com/skill-lms/abel-rdv", `booking action for ${route.path}`);
    }

    if (route.path !== "/" && !["/en", "/es"].includes(route.path)) {
      expectIncludes(redirects, `${route.path} /${route.path.slice(1)}.html 200`, `_redirects entry for ${route.path}`);
    }
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

console.log(`Built output verified (${publicRoutes.length} routes + SEO/conversion invariants).`);
