import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const SITE_URL = "https://abelsalah.fr";
const DIST_DIR = "dist";
const today = new Date().toISOString().slice(0, 10);
const ogImage =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/yFKPGRyIVtelP0DcFywODGT5Ywu2/social-images/social-1771719056921-ABEL_SALAH.webp";

const routes = [
  {
    path: "/",
    title: "Expert IA pour Entreprises | Audit IA — Abel SALAH",
    description:
      "Audit IA pour PME & ETI. Identifiez les bons cas d'usage, automatisez vos processus et construisez une feuille de route IA réaliste.",
    priority: "1.0",
    changefreq: "monthly",
  },
  {
    path: "/audit-ia",
    title: "Audit IA Entreprise | Abel SALAH",
    description:
      "Audit IA pour identifier les cas d'usage prioritaires, réduire les risques et construire une feuille de route actionnable.",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/automatisation-commerciale",
    title: "Automatisation Commerciale IA | Abel SALAH",
    description:
      "Automatisation commerciale avec l'IA : qualification, scoring, relances, CRM et reporting pour équipes B2B.",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/formation-ia",
    title: "Formation IA Équipes | Abel SALAH",
    description:
      "Formation IA pour dirigeants, managers et équipes opérationnelles : cas d'usage, méthodes, outils et adoption terrain.",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/work",
    title: "Cas d'usage IA en Entreprise — Abel SALAH",
    description:
      "Cas d'usage IA en entreprise : automatisation commerciale, formation augmentée, CRM intelligent et stratégie data.",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/ecosystem",
    title: "Produits IA & Start-ups | Abel SALAH",
    description:
      "Produits IA conçus et opérés : SCALLUP, SKILL LMS, Formateurs.pro, Immo Montpellier. Preuve d'exécution par Abel SALAH.",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/about",
    title: "Abel SALAH | Expert IA — 16 Ans d'Expérience",
    description:
      "Ancien directeur commercial, aujourd'hui expert IA. Audit, automatisation et stratégie data pour PME & ETI.",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/blog",
    title: "Blog IA Entreprise | Guides Pratiques — Abel SALAH",
    description:
      "Guides pratiques IA entreprise : audit, automatisation, stratégie data et cas concrets par Abel SALAH.",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/contact",
    title: "Prendre RDV Expert IA | Abel SALAH",
    description:
      "Réservez votre audit IA avec Abel SALAH. Accompagnement personnalisé pour PME et ETI.",
    priority: "0.8",
    changefreq: "monthly",
  },
];

const blogRoutes = [
  ["pourquoi-faire-appel-expert-ia-entreprise", "Pourquoi faire appel à un expert IA en entreprise ?", "2026-02-10"],
  ["audit-ia-entreprise-par-ou-commencer", "Audit IA en entreprise : par où commencer ?", "2026-02-05"],
  ["automatisation-ia-pme-guide-pratique", "Automatisation IA pour PME : guide pratique", "2026-01-28"],
  ["ia-force-de-vente-cas-concrets", "L'IA au service de la force de vente : cas concrets", "2026-01-20"],
  ["strategie-ia-entreprise-2026", "Stratégie IA en entreprise : les priorités 2026", "2026-01-15"],
].map(([slug, title, date]) => ({
  path: `/blog/${slug}`,
  title: `${title} — Abel SALAH`,
  description:
    "Guide pratique sur l'intelligence artificielle en entreprise, l'automatisation et la stratégie IA.",
  priority: "0.7",
  changefreq: "monthly",
  lastmod: date,
}));

const allRoutes = [...routes, ...blogRoutes];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function routeHtmlPath(routePath) {
  if (routePath === "/") return join(DIST_DIR, "index.html");
  return join(DIST_DIR, routePath.replace(/^\//, ""), "index.html");
}

function buildHead(route, originalHead) {
  const canonical = `${SITE_URL}${route.path === "/" ? "" : route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const schema = {
    "@context": "https://schema.org",
    "@type": route.path.startsWith("/blog/") ? "Article" : "WebPage",
    headline: route.title,
    name: route.title,
    description: route.description,
    url: canonical,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    author: { "@id": `${SITE_URL}/#person`, name: "Abel SALAH" },
  };

  return originalHead
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?">/s, `<meta name="description" content="${description}">`)
    .replace(/<meta property="og:title" content=".*?">/s, `<meta property="og:title" content="${title}">`)
    .replace(/<meta name="twitter:title" content=".*?">/s, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta property="og:description" content=".*?">/s, `<meta property="og:description" content="${description}">`)
    .replace(/<meta name="twitter:description" content=".*?">/s, `<meta name="twitter:description" content="${description}">`)
    .replace(
      "</head>",
      [
        `<link rel="canonical" href="${canonical}">`,
        `<meta property="og:url" content="${canonical}">`,
        `<meta property="og:image" content="${ogImage}">`,
        `<meta name="twitter:image" content="${ogImage}">`,
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
        "</head>",
      ].join("\n")
    );
}

const indexHtml = await readFile(join(DIST_DIR, "index.html"), "utf8");

for (const route of allRoutes) {
  const outputPath = routeHtmlPath(route.path);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, buildHead(route, indexHtml));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    const loc = `${SITE_URL}${route.path === "/" ? "" : route.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${route.lastmod ?? today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

await writeFile(join(DIST_DIR, "sitemap.xml"), sitemap);
