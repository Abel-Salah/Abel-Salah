import type { PageLocale } from "@/data/workLocales";

interface VentureText {
  tagline: string;
  pitch: string;
  proof: string;
  metrics: { value: string; label: string }[];
}

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
  proofLabel: string;
  ctaLine: string;
  ctaLink: string;
  ventures: Record<string, VentureText>;
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
    seoTitle: "Produits IA & Start-ups | 4 Projets Live — Abel SALAH",
    seoDescription:
      "4 produits IA conçus et opérés : SCALLUP, SKILL LMS, Formateurs.pro, Immo Montpellier. Preuve d'exécution par Abel SALAH, expert IA.",
    breadcrumbHome: "Accueil",
    breadcrumbSelf: "Écosystème",
    eyebrow: "Preuves d'exécution",
    title: "Écosystème",
    statementLine1: "Je ne théorise pas l'IA.",
    statementHighlight: "Je la construis.",
    intro:
      "Avant de déployer l'IA chez vous, je l'ai déployée chez moi. Voici les 4 produits que je conçois et opère — chacun est une preuve concrète d'une capacité que j'apporte ensuite à mes clients.",
    proofLabel: "Ce que ça prouve",
    ctaLine: "Vous voulez ce niveau d'exécution IA dans votre entreprise ?",
    ctaLink: "Parlons-en",
    ventures: {
      "scallup.fr": {
        tagline: "L'agent IA qui prospecte, relance et vend.",
        pitch:
          "Plateforme SaaS où un agent IA exécute les actions commerciales en pilote automatique : prospection multicanale, relances, appels, marketing, SEO, devis et pilotage. Intégré nativement aux outils métier.",
        proof: "Concevoir et opérer un produit SaaS IA B2B à l'échelle, de la stratégie au revenu.",
        metrics: [
          { value: "500+", label: "PME utilisatrices" },
          { value: "4.9/5", label: "Note moyenne" },
          { value: "OPCO", label: "Finançable" },
        ],
      },
      "skill-lms.fr": {
        tagline: "Le LMS Qualiopi nouvelle génération.",
        pitch:
          "Plateforme tout-en-un pour organismes de formation : création de parcours, suivi apprenants, automatisation des conventions et convocations, centralisation des preuves Qualiopi, pilotage par IA.",
        proof: "Maîtriser les plateformes métier complexes et la conformité réglementaire (Qualiopi).",
        metrics: [
          { value: "Qualiopi", label: "Conformité native" },
          { value: "Tout-en-un", label: "Formations + LMS + preuves" },
          { value: "IA", label: "Relances & pilotage" },
        ],
      },
      "formateurs.pro": {
        tagline: "Le plus grand annuaire de formateurs certifiés de France.",
        pitch:
          "Annuaire construit à partir de sources officielles (Pappers, INFOGREFFE, data.gouv.fr, France Compétences). Réseau connecté à SKILL LMS pour fluidifier la mise en relation entreprises ↔ formateurs.",
        proof: "Data engineering, SEO programmatique et écosystèmes produits connectés.",
        metrics: [
          { value: "50 000+", label: "Formateurs référencés" },
          { value: "9 000+", label: "Certifiés Qualiopi" },
          { value: "98 %", label: "Profils vérifiés" },
        ],
      },
      "immomontpellier.com": {
        tagline: "Le premier chasseur IA immobilier de Montpellier.",
        pitch:
          "L'IA scanne 8 sources en continu (SeLoger, Leboncoin, Bien'ici, PAP…), envoie des alertes en moins d'1h, et un chasseur local prend le relais pour visiter et négocier jusqu'à la signature notariée.",
        proof: "Appliquer l'IA verticalement (scraping, scoring, matching) à un secteur traditionnel.",
        metrics: [
          { value: "8", label: "Sources scannées 24/7" },
          { value: "<1h", label: "Délai d'alerte" },
          { value: "250+", label: "Acquéreurs accompagnés" },
        ],
      },
    },
  },
  en: {
    seoTitle: "AI Products & Start-ups | 4 Live Projects — Abel SALAH",
    seoDescription:
      "4 AI products designed and operated: SCALLUP, SKILL LMS, Formateurs.pro, Immo Montpellier. Proof of execution by Abel SALAH, AI expert.",
    breadcrumbHome: "Home",
    breadcrumbSelf: "Ecosystem",
    eyebrow: "Proof of execution",
    title: "Ecosystem",
    statementLine1: "I don't theorise about AI.",
    statementHighlight: "I build it.",
    intro:
      "Before deploying AI in your company, I deployed it in mine. Here are the 4 products I design and operate — each one is concrete proof of a capability I then bring to my clients.",
    proofLabel: "What it proves",
    ctaLine: "Want this level of AI execution in your company?",
    ctaLink: "Let's talk",
    ventures: {
      "scallup.fr": {
        tagline: "The AI agent that prospects, follows up and sells.",
        pitch:
          "SaaS platform where an AI agent runs sales actions on autopilot: multichannel prospecting, follow-ups, calls, marketing, SEO, quotes and reporting. Natively integrated with business tools.",
        proof: "Designing and operating a B2B AI SaaS product at scale, from strategy to revenue.",
        metrics: [
          { value: "500+", label: "SME users" },
          { value: "4.9/5", label: "Average rating" },
          { value: "OPCO", label: "Funding eligible" },
        ],
      },
      "skill-lms.fr": {
        tagline: "The next-generation Qualiopi LMS.",
        pitch:
          "All-in-one platform for training organisations: course creation, learner tracking, automated agreements and invitations, centralised Qualiopi evidence, AI-driven management.",
        proof: "Mastering complex business platforms and regulatory compliance (Qualiopi).",
        metrics: [
          { value: "Qualiopi", label: "Native compliance" },
          { value: "All-in-one", label: "Courses + LMS + evidence" },
          { value: "AI", label: "Follow-ups & management" },
        ],
      },
      "formateurs.pro": {
        tagline: "France's largest directory of certified trainers.",
        pitch:
          "Directory built from official sources (Pappers, INFOGREFFE, data.gouv.fr, France Compétences). Network connected to SKILL LMS to streamline matching between companies and trainers.",
        proof: "Data engineering, programmatic SEO and connected product ecosystems.",
        metrics: [
          { value: "50,000+", label: "Listed trainers" },
          { value: "9,000+", label: "Qualiopi certified" },
          { value: "98%", label: "Verified profiles" },
        ],
      },
      "immomontpellier.com": {
        tagline: "Montpellier's first AI property hunter.",
        pitch:
          "The AI scans 8 sources continuously (SeLoger, Leboncoin, Bien'ici, PAP…), sends alerts in under an hour, and a local hunter takes over to visit and negotiate through to the notarised signature.",
        proof: "Applying AI vertically (scraping, scoring, matching) to a traditional industry.",
        metrics: [
          { value: "8", label: "Sources scanned 24/7" },
          { value: "<1h", label: "Alert time" },
          { value: "250+", label: "Buyers supported" },
        ],
      },
    },
  },
  es: {
    seoTitle: "Productos IA & Start-ups | 4 Proyectos Live — Abel SALAH",
    seoDescription:
      "4 productos IA diseñados y operados: SCALLUP, SKILL LMS, Formateurs.pro, Immo Montpellier. Prueba de ejecución de Abel SALAH, experto en IA.",
    breadcrumbHome: "Inicio",
    breadcrumbSelf: "Ecosistema",
    eyebrow: "Pruebas de ejecución",
    title: "Ecosistema",
    statementLine1: "No teorizo sobre la IA.",
    statementHighlight: "La construyo.",
    intro:
      "Antes de desplegar la IA en tu empresa, la desplegué en la mía. Estos son los 4 productos que diseño y opero — cada uno es una prueba concreta de una capacidad que luego aporto a mis clientes.",
    proofLabel: "Lo que demuestra",
    ctaLine: "¿Quieres este nivel de ejecución IA en tu empresa?",
    ctaLink: "Hablemos",
    ventures: {
      "scallup.fr": {
        tagline: "El agente IA que prospecta, hace seguimiento y vende.",
        pitch:
          "Plataforma SaaS donde un agente IA ejecuta las acciones comerciales en piloto automático: prospección multicanal, seguimientos, llamadas, marketing, SEO, presupuestos y gestión. Integrado de forma nativa con las herramientas de negocio.",
        proof: "Diseñar y operar un producto SaaS IA B2B a escala, de la estrategia al ingreso.",
        metrics: [
          { value: "500+", label: "Pymes usuarias" },
          { value: "4,9/5", label: "Nota media" },
          { value: "OPCO", label: "Financiable" },
        ],
      },
      "skill-lms.fr": {
        tagline: "El LMS Qualiopi de nueva generación.",
        pitch:
          "Plataforma todo en uno para organismos de formación: creación de itinerarios, seguimiento de alumnos, automatización de convenios y convocatorias, centralización de evidencias Qualiopi, gestión con IA.",
        proof: "Dominar plataformas de negocio complejas y la conformidad regulatoria (Qualiopi).",
        metrics: [
          { value: "Qualiopi", label: "Conformidad nativa" },
          { value: "Todo en uno", label: "Formaciones + LMS + evidencias" },
          { value: "IA", label: "Seguimientos y gestión" },
        ],
      },
      "formateurs.pro": {
        tagline: "El mayor directorio de formadores certificados de Francia.",
        pitch:
          "Directorio construido a partir de fuentes oficiales (Pappers, INFOGREFFE, data.gouv.fr, France Compétences). Red conectada a SKILL LMS para agilizar la conexión entre empresas y formadores.",
        proof: "Data engineering, SEO programático y ecosistemas de producto conectados.",
        metrics: [
          { value: "50 000+", label: "Formadores referenciados" },
          { value: "9 000+", label: "Certificados Qualiopi" },
          { value: "98 %", label: "Perfiles verificados" },
        ],
      },
      "immomontpellier.com": {
        tagline: "El primer cazador inmobiliario IA de Montpellier.",
        pitch:
          "La IA escanea 8 fuentes en continuo (SeLoger, Leboncoin, Bien'ici, PAP…), envía alertas en menos de 1 h, y un cazador local toma el relevo para visitar y negociar hasta la firma notarial.",
        proof: "Aplicar la IA verticalmente (scraping, scoring, matching) a un sector tradicional.",
        metrics: [
          { value: "8", label: "Fuentes escaneadas 24/7" },
          { value: "<1h", label: "Tiempo de alerta" },
          { value: "250+", label: "Compradores acompañados" },
        ],
      },
    },
  },
};
