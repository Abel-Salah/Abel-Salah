import { defineTool } from "@lovable.dev/mcp-js";

const offers = [
  {
    slug: "audit-ia",
    title: "Audit IA pour PME & ETI",
    url: "https://abelsalah.fr/audit-ia",
    summary:
      "Diagnostic des processus, priorisation ROI des cas d'usage, roadmap 30/60/90 jours actionnable.",
  },
  {
    slug: "automatisation-commerciale",
    title: "Automatisation commerciale par l'IA",
    url: "https://abelsalah.fr/automatisation-commerciale",
    summary:
      "Agents IA et workflows pour la prospection, la qualification, les relances et le pilotage commercial.",
  },
  {
    slug: "formation-ia",
    title: "Formation IA pour équipes et dirigeants",
    url: "https://abelsalah.fr/formation-ia",
    summary:
      "Formation opérationnelle, coaching dirigeants, e-learning et routines d'adoption terrain.",
  },
];

export default defineTool({
  name: "list_offers",
  title: "List consulting offers",
  description:
    "List Abel SALAH's consulting offers (AI audit, sales automation, AI training) with URL and short summary.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(offers, null, 2) }],
    structuredContent: { offers },
  }),
});
