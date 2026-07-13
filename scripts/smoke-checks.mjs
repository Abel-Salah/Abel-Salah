import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const read = (path) => readFileSync(path, "utf8");
const failures = [];

function readTree(path) {
  const stat = statSync(path);
  if (stat.isFile()) return read(path);
  return readdirSync(path)
    .filter((entry) => !["node_modules", "dist", ".git"].includes(entry))
    .map((entry) => readTree(join(path, entry)))
    .join("\n");
}

function expectIncludes(path, expected, label = expected) {
  const content = read(path);
  if (!content.includes(expected)) {
    failures.push(`${path}: missing ${label}`);
  }
}

function expectNotIncludes(path, unexpected, label = unexpected) {
  const content = readTree(path);
  if (content.includes(unexpected)) {
    failures.push(`${path}: unexpected ${label}`);
  }
}

const tidyCalUrl = "https://tidycal.com/skill-lms/abel-rdv";
const publicRoutes = [
  "/",
  "/en",
  "/es",
  "/audit-ia",
  "/automatisation-commerciale",
  "/formation-ia",
  "/en/ai-audit",
  "/en/sales-automation",
  "/en/ai-training",
  "/es/auditoria-ia",
  "/es/automatizacion-comercial",
  "/es/formacion-ia",
  "/blog",
  "/contact",
  "/work",
  "/about",
  "/ecosystem",
];

expectIncludes("src/data/homeLocales.ts", tidyCalUrl, "central TidyCal URL");
expectIncludes("src/lib/conversionEvents.ts", "book_call_click", "booking conversion event");
expectIncludes("src/lib/conversionEvents.ts", "offer_cta_click", "offer conversion event");
expectNotIncludes("src", "calendly.com", "Calendly URL");
expectIncludes("src/pages/BlogPost.tsx", "rehypeSanitize", "Markdown sanitizer");
expectIncludes("src/pages/BlogPost.tsx", "ReactMarkdown", "Markdown renderer");
expectIncludes("src/pages/AdminOpportunities.tsx", "noindex", "admin noindex");
expectIncludes("public/robots.txt", "Disallow: /admin/", "admin robots block");
expectIncludes("public/robots.txt", "Disallow: /styleguide", "styleguide robots block");
expectIncludes("public/llms.txt", tidyCalUrl, "TidyCal in LLM context");
expectIncludes("public/ai.txt", tidyCalUrl, "TidyCal in AI context");
expectIncludes("supabase/config.toml", "[functions.generate-blog-post]\nverify_jwt = true", "blog generation JWT");
expectIncludes("supabase/config.toml", "[functions.manage-opportunities]\nverify_jwt = true", "opportunity admin JWT");
expectIncludes("supabase/functions/draft-job-outreach/index.ts", 'status: "pending_review"', "draft human review status");
expectNotIncludes("supabase/functions", "sendEmail", "automatic email sending");

for (const route of publicRoutes) {
  if (route !== "/") {
    expectIncludes("src/App.tsx", `path="${route}"`, `React route ${route}`);
  }
  expectIncludes("public/sitemap.xml", `https://abelsalah.fr${route === "/" ? "/" : route}`, `sitemap route ${route}`);
}

for (const route of publicRoutes.filter((route) => route !== "/")) {
  if (["/en", "/es"].includes(route)) continue;
  expectIncludes("public/_redirects", `${route} `, `_redirects route ${route}`);
}

if (failures.length > 0) {
  console.error("Smoke checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Smoke checks passed (${publicRoutes.length} public routes + critical invariants).`);
