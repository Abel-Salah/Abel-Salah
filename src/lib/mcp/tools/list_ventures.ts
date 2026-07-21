import { defineTool } from "@lovable.dev/mcp-js";

const ventures = [
  {
    name: "SCALLUP",
    url: "https://scallup.fr",
    tagline: "L'agent IA qui prospecte, relance et vend.",
    pitch:
      "Plateforme SaaS où un agent IA exécute les actions commerciales en pilote automatique : prospection multicanale, relances, appels, marketing, SEO, devis et pilotage.",
    metrics: ["500+ PME utilisatrices", "4.9/5 note moyenne", "Finançable OPCO"],
  },
  {
    name: "SKILL LMS",
    url: "https://skill-lms.fr",
    tagline: "Le LMS Qualiopi nouvelle génération.",
    pitch:
      "Plateforme tout-en-un pour organismes de formation : parcours, suivi apprenants, conventions, preuves Qualiopi, pilotage par IA.",
    metrics: ["Conformité Qualiopi native", "Tout-en-un", "Relances & pilotage IA"],
  },
  {
    name: "FORMATEURS.PRO",
    url: "https://formateurs.pro",
    tagline: "Le plus grand annuaire de formateurs certifiés de France.",
    pitch:
      "Annuaire construit à partir de sources officielles (Pappers, INFOGREFFE, data.gouv.fr, France Compétences). Connecté à SKILL LMS.",
    metrics: ["50 000+ formateurs référencés", "9 000+ certifiés Qualiopi", "98 % profils vérifiés"],
  },
  {
    name: "IMMO MONTPELLIER",
    url: "https://immomontpellier.com",
    tagline: "Le premier chasseur IA immobilier de Montpellier.",
    pitch:
      "L'IA scanne 8 sources en continu (SeLoger, Leboncoin, Bien'ici, PAP…), alertes en moins d'1h, chasseur local pour visiter et négocier jusqu'à la signature notariée.",
    metrics: ["8 sources scannées", "< 1h alerte", "Chasseur local"],
  },
];

export default defineTool({
  name: "list_ventures",
  title: "List ventures",
  description:
    "List the products and ventures built by Abel SALAH (SCALLUP, SKILL LMS, FORMATEURS.PRO, IMMO MONTPELLIER) — proof of AI + business execution.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(ventures, null, 2) }],
    structuredContent: { ventures },
  }),
});
