export type PageLocale = "fr" | "en" | "es";

interface WorkProject {
  number: string;
  title: string;
  context: string;
  action: string;
  result: string;
}

export interface WorkContent {
  seoTitle: string;
  seoDescription: string;
  breadcrumbHome: string;
  breadcrumbSelf: string;
  title: string;
  intro: string;
  cardLabels: { context: string; action: string; result: string };
  projects: WorkProject[];
  ctaLine: string;
  ctaPre: string;
  ctaHighlight: string;
}

export const workAlternates = [
  { hrefLang: "fr", path: "/work" },
  { hrefLang: "en", path: "/en/work" },
  { hrefLang: "es", path: "/es/work" },
];

export const workCanonicalByLocale: Record<PageLocale, string> = {
  fr: "/work",
  en: "/en/work",
  es: "/es/work",
};

export const workLocales: Record<PageLocale, WorkContent> = {
  fr: {
    seoTitle: "Résultats IA en Entreprise | +40% Conversion — Abel SALAH",
    seoDescription:
      "Découvrez 5 cas concrets d'IA en entreprise : +40% conversion, pipeline x5, cycle de vente -40%. Résultats mesurables par Abel SALAH, expert IA.",
    breadcrumbHome: "Accueil",
    breadcrumbSelf: "Réalisations",
    title: "Réalisations",
    intro: "Des missions concrètes où l'IA a créé un impact mesurable. Stratégie, exécution, résultats.",
    cardLabels: { context: "Contexte", action: "Action", result: "Résultat" },
    projects: [
      {
        number: "01",
        title: "IA & performance commerciale retail",
        context: "Réseau de 3 magasins, 28 collaborateurs, CA 4.8M €",
        action: "Outils IA pour le scoring client, prévision de stocks et optimisation des ventes",
        result: "+25 % rentabilité",
      },
      {
        number: "02",
        title: "Automatisation de l'acquisition B2B",
        context: "Startup sans équipe commerciale structurée",
        action: "Pipeline automatisé : scraping, scoring par IA, séquences d'emailing intelligentes",
        result: "500+ leads / mois",
      },
      {
        number: "03",
        title: "Plateforme de formation augmentée par l'IA",
        context: "Former des équipes commerciales à grande échelle",
        action: "Création d'un LMS avec parcours adaptatifs générés par IA",
        result: "3 villes, 95 % complétion",
      },
      {
        number: "04",
        title: "IA pour le e-commerce : recommandation & conversion",
        context: "Site e-commerce avec taux de conversion faible",
        action: "Moteur de recommandation IA et optimisation du tunnel de vente",
        result: "+60 % conversion",
      },
      {
        number: "05",
        title: "Stratégie data & CRM intelligent",
        context: "Données clients dispersées, pas de vision unifiée",
        action: "Centralisation CRM IA (HubSpot), segmentation automatique, scoring prédictif",
        result: "Cycle de vente -40 %",
      },
    ],
    ctaLine: "Envie d'un cas d'usage similaire ?",
    ctaPre: "Créons ",
    ctaHighlight: "le vôtre.",
  },
  en: {
    seoTitle: "AI Results in Business | +40% Conversion — Abel SALAH",
    seoDescription:
      "Discover 5 real-world AI business cases: +40% conversion, 5x pipeline, sales cycle -40%. Measurable results by Abel SALAH, AI expert.",
    breadcrumbHome: "Home",
    breadcrumbSelf: "Work",
    title: "Work",
    intro: "Real-world engagements where AI created measurable impact. Strategy, execution, results.",
    cardLabels: { context: "Context", action: "Action", result: "Result" },
    projects: [
      {
        number: "01",
        title: "AI & retail sales performance",
        context: "Network of 3 stores, 28 employees, €4.8M revenue",
        action: "AI tools for customer scoring, inventory forecasting and sales optimisation",
        result: "+25% profitability",
      },
      {
        number: "02",
        title: "B2B acquisition automation",
        context: "Startup without a structured sales team",
        action: "Automated pipeline: scraping, AI scoring, smart email sequences",
        result: "500+ leads / month",
      },
      {
        number: "03",
        title: "AI-augmented training platform",
        context: "Training sales teams at scale",
        action: "Built an LMS with AI-generated adaptive learning paths",
        result: "3 cities, 95% completion",
      },
      {
        number: "04",
        title: "AI for e-commerce: recommendation & conversion",
        context: "E-commerce site with a low conversion rate",
        action: "AI recommendation engine and sales funnel optimisation",
        result: "+60% conversion",
      },
      {
        number: "05",
        title: "Data strategy & intelligent CRM",
        context: "Scattered customer data, no unified view",
        action: "AI CRM centralisation (HubSpot), automatic segmentation, predictive scoring",
        result: "Sales cycle -40%",
      },
    ],
    ctaLine: "Want a similar use case?",
    ctaPre: "Let's build ",
    ctaHighlight: "yours.",
  },
  es: {
    seoTitle: "Resultados IA en Empresa | +40 % Conversión — Abel SALAH",
    seoDescription:
      "Descubra 5 casos reales de IA en empresa: +40 % de conversión, pipeline x5, ciclo de venta -40 %. Resultados medibles por Abel SALAH, experto en IA.",
    breadcrumbHome: "Inicio",
    breadcrumbSelf: "Proyectos",
    title: "Proyectos",
    intro: "Misiones concretas donde la IA generó un impacto medible. Estrategia, ejecución, resultados.",
    cardLabels: { context: "Contexto", action: "Acción", result: "Resultado" },
    projects: [
      {
        number: "01",
        title: "IA y rendimiento comercial retail",
        context: "Red de 3 tiendas, 28 empleados, 4,8 M€ de facturación",
        action: "Herramientas IA para scoring de clientes, previsión de stocks y optimización de ventas",
        result: "+25 % rentabilidad",
      },
      {
        number: "02",
        title: "Automatización de la captación B2B",
        context: "Startup sin equipo comercial estructurado",
        action: "Pipeline automatizado: scraping, scoring con IA, secuencias de emailing inteligentes",
        result: "500+ leads / mes",
      },
      {
        number: "03",
        title: "Plataforma de formación potenciada por IA",
        context: "Formar equipos comerciales a gran escala",
        action: "Creación de un LMS con itinerarios adaptativos generados por IA",
        result: "3 ciudades, 95 % de finalización",
      },
      {
        number: "04",
        title: "IA para e-commerce: recomendación y conversión",
        context: "E-commerce con tasa de conversión baja",
        action: "Motor de recomendación IA y optimización del embudo de venta",
        result: "+60 % conversión",
      },
      {
        number: "05",
        title: "Estrategia data y CRM inteligente",
        context: "Datos de clientes dispersos, sin visión unificada",
        action: "Centralización CRM IA (HubSpot), segmentación automática, scoring predictivo",
        result: "Ciclo de venta -40 %",
      },
    ],
    ctaLine: "¿Quieres un caso de uso similar?",
    ctaPre: "Creemos ",
    ctaHighlight: "el tuyo.",
  },
};
