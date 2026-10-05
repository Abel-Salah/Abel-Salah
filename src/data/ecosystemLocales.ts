import type { PageLocale } from "@/data/workLocales";

export interface EcosystemContent {
  seoTitle: string;
  seoDescription: string;
  breadcrumbHome: string;
  breadcrumbSelf: string;
  eyebrow: string;
  title: string;
  statementLine1: string;
  statementHighlight: string;
  intro: string;
  toolGroups: { label: string; desc: string }[];
  expertiseTitle: string;
  expertises: { name: string; desc: string }[];
  productsTitle: string;
  productsText: string;
  productsLink: string;
  ctaLine: string;
  ctaLink: string;
}

export const ecosystemAlternates = [
  { hrefLang: "fr", path: "/ecosystem" },
  { hrefLang: "en", path: "/en/ecosystem" },
  { hrefLang: "es", path: "/es/ecosystem" },
];

export const ecosystemCanonicalByLocale: Record<PageLocale, string> = {
  fr: "/ecosystem",
  en: "/en/ecosystem",
  es: "/es/ecosystem",
};

export const ecosystemLocales: Record<PageLocale, EcosystemContent> = {
  fr: {
    seoTitle: "Écosystème IA : Outils & Expertises — Abel SALAH",
    seoDescription:
      "La stack IA d'Abel SALAH : Anthropic Claude, OpenAI, Gemini, Make, n8n, HubSpot, Supabase… Outils maîtrisés en production et expertises mobilisées sur chaque projet.",
    breadcrumbHome: "Accueil",
    breadcrumbSelf: "Écosystème",
    eyebrow: "Stack & expertises",
    title: "Écosystème",
    statementLine1: "Les bons outils, au bon endroit.",
    statementHighlight: "Maîtrisés en production, pas juste testés.",
    intro:
      "Voici l'écosystème d'outils et d'expertises que je mobilise sur chaque mission : IA générative, automatisation, data & CRM, développement. Chaque outil est utilisé en production — sur mes propres produits comme chez mes clients.",
    toolGroups: [
      { label: "IA générative", desc: "Modèles et plateformes GenAI pour les copilotes, agents et contenus." },
      { label: "Automatisation", desc: "Workflows no-code / low-code qui relient l'IA aux outils métier." },
      { label: "Data & CRM", desc: "Centralisation, segmentation et exploitation de la donnée client." },
      { label: "Développement & agents", desc: "RAG, agents IA et développement assisté par l'IA." },
    ],
    expertiseTitle: "Expertises",
    expertises: [
      {
        name: "Stratégie IA & transformation",
        desc: "Diagnostic, roadmap, gouvernance IA, priorisation des cas d'usage, conduite du changement.",
      },
      {
        name: "Automatisation & copilotes IA",
        desc: "Agents IA, workflows no-code, intégrations CRM et API.",
      },
      {
        name: "Formation & adoption",
        desc: "Formation des équipes, accompagnement dirigeants, e-learning et routines d'adoption terrain.",
      },
    ],
    productsTitle: "Construits avec cette stack",
    productsText: "4 produits live, en production — la preuve que cette stack tient la route à l'échelle.",
    productsLink: "Voir les produits",
    ctaLine: "Vous voulez cette stack au service de votre entreprise ?",
    ctaLink: "Parlons-en",
  },
  en: {
    seoTitle: "AI Ecosystem: Tools & Expertise — Abel SALAH",
    seoDescription:
      "Abel SALAH's AI stack: Anthropic Claude, OpenAI, Gemini, Make, n8n, HubSpot, Supabase… Tools mastered in production and expertise applied to every project.",
    breadcrumbHome: "Home",
    breadcrumbSelf: "Ecosystem",
    eyebrow: "Stack & expertise",
    title: "Ecosystem",
    statementLine1: "The right tools, in the right place.",
    statementHighlight: "Mastered in production, not just tried out.",
    intro:
      "Here is the ecosystem of tools and expertise I bring to every engagement: generative AI, automation, data & CRM, development. Every tool is used in production — on my own products as well as with my clients.",
    toolGroups: [
      { label: "Generative AI", desc: "GenAI models and platforms for copilots, agents and content." },
      { label: "Automation", desc: "No-code / low-code workflows connecting AI to business tools." },
      { label: "Data & CRM", desc: "Centralising, segmenting and activating customer data." },
      { label: "Development & agents", desc: "RAG, AI agents and AI-assisted development." },
    ],
    expertiseTitle: "Expertise",
    expertises: [
      {
        name: "AI strategy & transformation",
        desc: "Assessment, roadmap, AI governance, use-case prioritisation, change management.",
      },
      {
        name: "Automation & AI copilots",
        desc: "AI agents, no-code workflows, CRM and API integrations.",
      },
      {
        name: "Training & adoption",
        desc: "Team training, executive coaching, e-learning and practical adoption routines.",
      },
    ],
    productsTitle: "Built with this stack",
    productsText: "4 live products in production — proof that this stack holds up at scale.",
    productsLink: "See the products",
    ctaLine: "Want this stack working for your company?",
    ctaLink: "Let's talk",
  },
  es: {
    seoTitle: "Ecosistema IA: Herramientas & Experiencia — Abel SALAH",
    seoDescription:
      "El stack IA de Abel SALAH: Anthropic Claude, OpenAI, Gemini, Make, n8n, HubSpot, Supabase… Herramientas dominadas en producción y experiencia aplicada en cada proyecto.",
    breadcrumbHome: "Inicio",
    breadcrumbSelf: "Ecosistema",
    eyebrow: "Stack & experiencia",
    title: "Ecosistema",
    statementLine1: "Las herramientas adecuadas, en el lugar adecuado.",
    statementHighlight: "Dominadas en producción, no solo probadas.",
    intro:
      "Este es el ecosistema de herramientas y experiencia que aplico en cada misión: IA generativa, automatización, data & CRM, desarrollo. Cada herramienta se usa en producción — en mis propios productos y con mis clientes.",
    toolGroups: [
      { label: "IA generativa", desc: "Modelos y plataformas GenAI para copilotos, agentes y contenidos." },
      { label: "Automatización", desc: "Workflows no-code / low-code que conectan la IA con las herramientas de negocio." },
      { label: "Data & CRM", desc: "Centralización, segmentación y activación de los datos de clientes." },
      { label: "Desarrollo & agentes", desc: "RAG, agentes IA y desarrollo asistido por IA." },
    ],
    expertiseTitle: "Experiencia",
    expertises: [
      {
        name: "Estrategia IA y transformación",
        desc: "Diagnóstico, roadmap, gobernanza IA, priorización de casos de uso, gestión del cambio.",
      },
      {
        name: "Automatización y copilotos IA",
        desc: "Agentes IA, workflows no-code, integraciones CRM y API.",
      },
      {
        name: "Formación y adopción",
        desc: "Formación de equipos, acompañamiento de directivos, e-learning y rutinas de adopción real.",
      },
    ],
    productsTitle: "Construidos con este stack",
    productsText: "4 productos live en producción — la prueba de que este stack funciona a escala.",
    productsLink: "Ver los productos",
    ctaLine: "¿Quieres este stack al servicio de tu empresa?",
    ctaLink: "Hablemos",
  },
};
