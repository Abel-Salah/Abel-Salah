import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const checks = [
  {
    file: "index.html",
    mustContain: [
      '<html lang="fr">',
      "<title>Expert IA pour Entreprises | Audit IA — Abel SALAH</title>",
      '<link rel="canonical" href="https://abelsalah.fr" />',
    ],
  },
  {
    file: "audit-ia/index.html",
    mustContain: [
      '<html lang="fr">',
      "<title>Audit IA Entreprise | Identifier les bons cas d'usage — Abel SALAH</title>",
      '<link rel="canonical" href="https://abelsalah.fr/audit-ia" />',
      '<link rel="alternate" hreflang="en" href="https://abelsalah.fr/en/ai-audit" />',
    ],
  },
  {
    file: "en/ai-audit/index.html",
    mustContain: [
      '<html lang="en">',
      "<title>AI Audit for Business | Practical Use Cases — Abel SALAH</title>",
      '<link rel="canonical" href="https://abelsalah.fr/en/ai-audit" />',
      '<link rel="alternate" hreflang="fr" href="https://abelsalah.fr/audit-ia" />',
    ],
  },
  {
    file: "es/auditoria-ia/index.html",
    mustContain: [
      '<html lang="es">',
      "<title>Auditoría IA Empresa | Casos de Uso Reales — Abel SALAH</title>",
      '<link rel="canonical" href="https://abelsalah.fr/es/auditoria-ia" />',
      '<link rel="alternate" hreflang="fr" href="https://abelsalah.fr/audit-ia" />',
    ],
  },
  {
    file: "contact/index.html",
    mustContain: [
      "<title>Prendre RDV Expert IA | Audit Gratuit — Abel SALAH</title>",
      '<link rel="canonical" href="https://abelsalah.fr/contact" />',
    ],
  },
];

const forbiddenExactFiles = [
  "about",
  "audit-ia",
  "automatisation-commerciale",
  "blog",
  "contact",
  "ecosystem",
  "formation-ia",
  "work",
  "en/ai-audit",
  "en/ai-training",
  "en/sales-automation",
  "es/auditoria-ia",
  "es/automatizacion-comercial",
  "es/formacion-ia",
];

let failures = 0;

for (const check of checks) {
  const html = await readFile(path.join(distDir, check.file), "utf8");
  for (const expected of check.mustContain) {
    if (!html.includes(expected)) {
      console.error(`Missing in ${check.file}: ${expected}`);
      failures += 1;
    }
  }
}

for (const routePath of forbiddenExactFiles) {
  const fullPath = path.join(distDir, routePath);
  try {
    const info = await stat(fullPath);
    if (info.isFile()) {
      console.error(`Unexpected extensionless file: dist/${routePath}`);
      failures += 1;
    }
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
}

if (failures > 0) {
  process.exitCode = 1;
} else {
  console.log("Static SEO heads verified.");
}
