import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://abelsalah.fr";
const distDir = path.resolve("dist");
const baseIndexPath = path.join(distDir, "index.html");
const ogImage =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/390e6aa2-6998-4951-8b6c-23a48e10b181";

const homeAlternates = [
  { hrefLang: "fr", path: "/" },
  { hrefLang: "en", path: "/en" },
  { hrefLang: "es", path: "/es" },
];

const auditAlternates = [
  { hrefLang: "fr", path: "/audit-ia" },
  { hrefLang: "en", path: "/en/ai-audit" },
  { hrefLang: "es", path: "/es/auditoria-ia" },
];

const automationAlternates = [
  { hrefLang: "fr", path: "/automatisation-commerciale" },
  { hrefLang: "en", path: "/en/sales-automation" },
  { hrefLang: "es", path: "/es/automatizacion-comercial" },
];

const trainingAlternates = [
  { hrefLang: "fr", path: "/formation-ia" },
  { hrefLang: "en", path: "/en/ai-training" },
  { hrefLang: "es", path: "/es/formacion-ia" },
];

const cvAlternates = [
  { hrefLang: "fr", path: "/cv" },
  { hrefLang: "en", path: "/en/cv" },
  { hrefLang: "es", path: "/es/cv" },
];

const workAlternates = [
  { hrefLang: "fr", path: "/work" },
  { hrefLang: "en", path: "/en/work" },
  { hrefLang: "es", path: "/es/work" },
];

const aboutAlternates = [
  { hrefLang: "fr", path: "/about" },
  { hrefLang: "en", path: "/en/about" },
  { hrefLang: "es", path: "/es/about" },
];

const contactAlternates = [
  { hrefLang: "fr", path: "/contact" },
  { hrefLang: "en", path: "/en/contact" },
  { hrefLang: "es", path: "/es/contact" },
];

const ecosystemAlternates = [
  { hrefLang: "fr", path: "/ecosystem" },
  { hrefLang: "en", path: "/en/ecosystem" },
  { hrefLang: "es", path: "/es/ecosystem" },
];

const productsAlternates = [
  { hrefLang: "fr", path: "/produits" },
  { hrefLang: "en", path: "/en/products" },
  { hrefLang: "es", path: "/es/productos" },
];

const navigationByLang = {
  fr: [
    { name: "Accueil", path: "/" },
    { name: "Audit IA", path: "/audit-ia" },
    { name: "Automatisation commerciale", path: "/automatisation-commerciale" },
    { name: "Formation IA", path: "/formation-ia" },
    { name: "Realisations", path: "/work" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ],
  en: [
    { name: "Home", path: "/en" },
    { name: "AI Audit", path: "/en/ai-audit" },
    { name: "Sales Automation", path: "/en/sales-automation" },
    { name: "AI Training", path: "/en/ai-training" },
    { name: "Work", path: "/en/work" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/en/contact" },
  ],
  es: [
    { name: "Inicio", path: "/es" },
    { name: "Auditoria IA", path: "/es/auditoria-ia" },
    { name: "Automatizacion comercial", path: "/es/automatizacion-comercial" },
    { name: "Formacion IA", path: "/es/formacion-ia" },
    { name: "Proyectos", path: "/es/work" },
    { name: "Blog", path: "/blog" },
    { name: "Contacto", path: "/es/contact" },
  ],
};

const routes = [
  {
    path: "/",
    lang: "fr",
    title: "Expert IA pour Entreprises | Audit IA — Abel SALAH",
    description:
      "Audit IA pour PME & ETI. Identifiez les bons cas d'usage, automatisez vos processus et construisez une feuille de route IA réaliste.",
    alternates: homeAlternates,
  },
  {
    path: "/en",
    lang: "en",
    title: "AI Consultant for Business | AI Audit — Abel SALAH",
    description:
      "AI audit for SMEs and growing companies. Identify practical use cases, automate workflows, and build a realistic AI roadmap.",
    alternates: homeAlternates,
  },
  {
    path: "/es",
    lang: "es",
    title: "Consultor IA para Empresas | Auditoría IA — Abel SALAH",
    description:
      "Auditoría IA para pymes y empresas en crecimiento. Identifique casos de uso, automatice procesos y construya una hoja de ruta realista.",
    alternates: homeAlternates,
  },
  {
    path: "/audit-ia",
    lang: "fr",
    title: "Audit IA Entreprise | Identifier les bons cas d'usage — Abel SALAH",
    description:
      "Audit IA pour PME et ETI : diagnostic des processus, priorisation ROI, feuille de route 30/60/90 jours et recommandations actionnables.",
    alternates: auditAlternates,
    service: {
      name: "Audit IA entreprise",
      serviceType: "AI audit",
      audience: "PME, ETI, dirigeants",
      description:
        "Diagnostic des processus, priorisation des cas d'usage IA, roadmap 30/60/90 jours et recommandations actionnables.",
    },
  },
  {
    path: "/automatisation-commerciale",
    lang: "fr",
    title: "Automatisation Commerciale IA | CRM, Prospection, Scoring — Abel SALAH",
    description:
      "Automatisez votre prospection commerciale avec l'IA : scoring leads, enrichissement, messages personnalisés, CRM et suivi des opportunités.",
    alternates: automationAlternates,
    service: {
      name: "Automatisation commerciale IA",
      serviceType: "AI sales automation",
      audience: "Equipes commerciales, dirigeants, PME",
      description:
        "Scoring leads, enrichissement, brouillons personnalises, suivi CRM et regles anti-spam avec validation humaine.",
    },
  },
  {
    path: "/formation-ia",
    lang: "fr",
    title: "Formation IA Entreprise | Dirigeants, Managers, Equipes — Abel SALAH",
    description:
      "Formation IA pour dirigeants et équipes : cas d'usage métier, prompting utile, automatisation responsable et adoption concrète.",
    alternates: trainingAlternates,
    service: {
      name: "Formation IA entreprise",
      serviceType: "AI training",
      audience: "Dirigeants, managers, equipes operationnelles",
      description:
        "Ateliers IA par metier, prompting utile, automatisation responsable et routines d'adoption terrain.",
    },
  },
  {
    path: "/en/ai-audit",
    lang: "en",
    title: "AI Audit for Business | Practical Use Cases — Abel SALAH",
    description:
      "AI audit for SMEs and growing companies: workflow diagnosis, ROI prioritization, 30/60/90-day roadmap and practical recommendations.",
    alternates: auditAlternates,
    service: {
      name: "AI audit for business",
      serviceType: "AI audit",
      audience: "SMEs, executives, growing companies",
      description:
        "Workflow diagnosis, ROI prioritization, 30/60/90-day AI roadmap and practical recommendations.",
    },
  },
  {
    path: "/en/sales-automation",
    lang: "en",
    title: "AI Sales Automation | CRM, Prospecting, Lead Scoring — Abel SALAH",
    description:
      "Automate sales workflows with AI: lead scoring, enrichment, personalized drafts, CRM follow-up and opportunity tracking.",
    alternates: automationAlternates,
    service: {
      name: "AI sales automation",
      serviceType: "AI sales automation",
      audience: "Sales teams, founders, SMEs",
      description:
        "Lead scoring, enrichment, personalized drafts, CRM follow-up and human validation workflow.",
    },
  },
  {
    path: "/en/ai-training",
    lang: "en",
    title: "AI Training for Business | Executives, Managers, Teams — Abel SALAH",
    description:
      "AI training for executives and teams: business use cases, useful prompting, responsible automation and practical adoption.",
    alternates: trainingAlternates,
    service: {
      name: "AI training for business",
      serviceType: "AI training",
      audience: "Executives, managers, operational teams",
      description:
        "Business AI workshops, useful prompting, responsible automation and practical team adoption.",
    },
  },
  {
    path: "/es/auditoria-ia",
    lang: "es",
    title: "Auditoría IA Empresa | Casos de Uso Reales — Abel SALAH",
    description:
      "Auditoría IA para pymes y equipos: diagnóstico de procesos, priorización ROI, roadmap 30/60/90 días y recomendaciones prácticas.",
    alternates: auditAlternates,
    service: {
      name: "Auditoria IA para empresas",
      serviceType: "AI audit",
      audience: "Pymes, directivos, empresas en crecimiento",
      description:
        "Diagnostico de procesos, priorizacion ROI, roadmap IA 30/60/90 dias y recomendaciones practicas.",
    },
  },
  {
    path: "/es/automatizacion-comercial",
    lang: "es",
    title: "Automatización Comercial IA | CRM, Prospección, Scoring — Abel SALAH",
    description:
      "Automatice procesos comerciales con IA: scoring de leads, enriquecimiento, mensajes personalizados, CRM y seguimiento.",
    alternates: automationAlternates,
    service: {
      name: "Automatizacion comercial IA",
      serviceType: "AI sales automation",
      audience: "Equipos comerciales, directivos, pymes",
      description:
        "Scoring de leads, enriquecimiento, borradores personalizados, seguimiento CRM y validacion humana.",
    },
  },
  {
    path: "/es/formacion-ia",
    lang: "es",
    title: "Formación IA Empresa | Directivos, Managers, Equipos — Abel SALAH",
    description:
      "Formación IA para directivos y equipos: casos de uso, prompting útil, automatización responsable y adopción concreta.",
    alternates: trainingAlternates,
    service: {
      name: "Formacion IA para empresas",
      serviceType: "AI training",
      audience: "Directivos, managers, equipos operativos",
      description:
        "Talleres IA por rol, prompting util, automatizacion responsable y adopcion practica por equipos.",
    },
  },
  {
    path: "/work",
    lang: "fr",
    title: "Réalisations IA & Business Cases — Abel SALAH",
    description:
      "Cas concrets d'IA en entreprise : automatisation commerciale, LMS, acquisition, scoring leads et transformation opérationnelle.",
    alternates: workAlternates,
  },
  {
    path: "/en/work",
    lang: "en",
    title: "AI Work & Business Cases — Abel SALAH",
    description:
      "Real-world AI business cases: sales automation, LMS, acquisition, lead scoring and operational transformation.",
    alternates: workAlternates,
  },
  {
    path: "/es/work",
    lang: "es",
    title: "Proyectos IA & Casos de Negocio — Abel SALAH",
    description:
      "Casos reales de IA en empresa: automatización comercial, LMS, captación, scoring de leads y transformación operativa.",
    alternates: workAlternates,
  },
  {
    path: "/about",
    lang: "fr",
    title: "À propos d'Abel SALAH | Consultant IA & Business",
    description:
      "Parcours d'Abel SALAH, consultant IA pour PME, ETI et dirigeants avec 16 ans d'expérience commerciale et digitale.",
    alternates: aboutAlternates,
  },
  {
    path: "/en/about",
    lang: "en",
    title: "About Abel SALAH | AI & Business Consultant",
    description:
      "The story of Abel SALAH, AI consultant for SMEs, mid-caps and executives with 16 years of sales and digital experience.",
    alternates: aboutAlternates,
  },
  {
    path: "/es/about",
    lang: "es",
    title: "Sobre Abel SALAH | Consultor IA & Negocio",
    description:
      "Trayectoria de Abel SALAH, consultor IA para pymes y directivos con 16 años de experiencia comercial y digital.",
    alternates: aboutAlternates,
  },
  {
    path: "/ecosystem",
    lang: "fr",
    title: "Écosystème IA : Outils & Expertises — Abel SALAH",
    description:
      "La stack IA d'Abel SALAH : Anthropic Claude, OpenAI, Gemini, Make, n8n, HubSpot, Supabase… Outils maîtrisés en production et expertises mobilisées sur chaque projet.",
    alternates: ecosystemAlternates,
  },
  {
    path: "/en/ecosystem",
    lang: "en",
    title: "AI Ecosystem: Tools & Expertise — Abel SALAH",
    description:
      "Abel SALAH's AI stack: Anthropic Claude, OpenAI, Gemini, Make, n8n, HubSpot, Supabase… Tools mastered in production and expertise applied to every project.",
    alternates: ecosystemAlternates,
  },
  {
    path: "/es/ecosystem",
    lang: "es",
    title: "Ecosistema IA: Herramientas & Experiencia — Abel SALAH",
    description:
      "El stack IA de Abel SALAH: Anthropic Claude, OpenAI, Gemini, Make, n8n, HubSpot, Supabase… Herramientas dominadas en producción y experiencia aplicada en cada proyecto.",
    alternates: ecosystemAlternates,
  },
  {
    path: "/produits",
    lang: "fr",
    title: "Produits IA & Start-ups | 4 Projets Live — Abel SALAH",
    description:
      "4 produits IA conçus et opérés : SCALLUP, SKILL LMS, Formateurs.pro, Immo Montpellier. Preuve d'exécution par Abel SALAH, expert IA.",
    alternates: productsAlternates,
  },
  {
    path: "/en/products",
    lang: "en",
    title: "AI Products & Start-ups | 4 Live Projects — Abel SALAH",
    description:
      "4 AI products designed and operated: SCALLUP, SKILL LMS, Formateurs.pro, Immo Montpellier. Proof of execution by Abel SALAH, AI expert.",
    alternates: productsAlternates,
  },
  {
    path: "/es/productos",
    lang: "es",
    title: "Productos IA & Start-ups | 4 Proyectos Live — Abel SALAH",
    description:
      "4 productos IA diseñados y operados: SCALLUP, SKILL LMS, Formateurs.pro, Immo Montpellier. Prueba de ejecución de Abel SALAH, experto en IA.",
    alternates: productsAlternates,
  },
  {
    path: "/blog",
    lang: "fr",
    title: "Blog IA Entreprise | Guides & Cas Concrets — Abel SALAH",
    description:
      "Guides pratiques et cas concrets pour intégrer l'intelligence artificielle en entreprise, automatiser les processus et former les équipes.",
  },
  {
    path: "/contact",
    lang: "fr",
    title: "Prendre RDV Expert IA | Audit Gratuit — Abel SALAH",
    description:
      "Réservez votre audit IA gratuit avec Abel SALAH. Réponse sous 24h, accompagnement personnalisé pour PME et ETI.",
    alternates: contactAlternates,
  },
  {
    path: "/en/contact",
    lang: "en",
    title: "Book an AI Expert | Free Audit — Abel SALAH",
    description:
      "Book your free AI audit with Abel SALAH. Response within 24h, personalised support for SMEs and mid-caps.",
    alternates: contactAlternates,
  },
  {
    path: "/es/contact",
    lang: "es",
    title: "Reservar Cita Experto IA | Auditoría Gratuita — Abel SALAH",
    description:
      "Reserve su auditoría IA gratuita con Abel SALAH. Respuesta en 24 h, acompañamiento personalizado para pymes.",
    alternates: contactAlternates,
  },
  {
    path: "/cv",
    lang: "fr",
    title: "CV Abel SALAH | Consultant IA & AI Transformation Lead",
    description:
      "CV d'Abel SALAH, consultant IA et AI Transformation Lead : GenAI, automatisation, copilotes IA, formation et adoption métier. Plus de 60 projets B2B menés.",
    alternates: cvAlternates,
  },
  {
    path: "/en/cv",
    lang: "en",
    title: "Resume Abel SALAH | AI Consultant & AI Transformation Lead",
    description:
      "Resume of Abel SALAH, AI consultant and AI Transformation Lead: GenAI, automation, AI copilots, training and business adoption. 60+ B2B projects delivered.",
    alternates: cvAlternates,
  },
  {
    path: "/es/cv",
    lang: "es",
    title: "CV Abel SALAH | Consultor IA & AI Transformation Lead",
    description:
      "CV de Abel SALAH, consultor IA y AI Transformation Lead: GenAI, automatización, copilotos IA, formación y adopción operativa. Más de 60 proyectos B2B realizados.",
    alternates: cvAlternates,
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function stripManagedHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[\s\S]*?>/gi, "")
    .replace(/<meta\s+name="author"[\s\S]*?>/gi, "")
    .replace(/<meta\s+name="keywords"[\s\S]*?>/gi, "")
    .replace(/<meta\s+property="og:[\s\S]*?>/gi, "")
    .replace(/<meta\s+name="twitter:[\s\S]*?>/gi, "")
    .replace(/<link\s+rel="canonical"[\s\S]*?>/gi, "")
    .replace(/<link\s+rel="alternate"[\s\S]*?>/gi, "");
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
    <meta name="twitter:image" content="${ogImage}" />${navigationSchema}${routeServiceSchema}`;
}

function applyRouteHead(baseHtml, route) {
  const html = stripManagedHead(baseHtml).replace(/<html\s+lang="[^"]*"/i, `<html lang="${route.lang}"`);
  return html.replace(/(<meta\s+name="viewport"[\s\S]*?>)/i, `$1\n${buildHead(route)}`);
}

const baseHtml = await readFile(baseIndexPath, "utf8");
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
