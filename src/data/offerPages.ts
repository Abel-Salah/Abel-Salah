import { Bot, BrainCircuit, Workflow } from "lucide-react";

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

export const offerPages = {
  "audit-ia": {
    lang: "fr",
    path: "/audit-ia",
    alternates: auditAlternates,
    title: "Audit IA pour PME & ETI",
    eyebrow: "Diagnostic IA",
    seoTitle: "Audit IA Entreprise | Identifier les bons cas d'usage — Abel SALAH",
    seoDescription:
      "Audit IA pour PME et ETI : diagnostic des processus, priorisation ROI, feuille de route 30/60/90 jours et recommandations actionnables.",
    intro:
      "Un audit IA sert à séparer les vrais leviers business des effets de mode. L'objectif : trouver les cas d'usage utiles, chiffrables et déployables avec vos équipes.",
    icon: BrainCircuit,
    outcomes: [
      "Cartographie des processus où l'IA peut réduire la friction",
      "Priorisation des cas d'usage par impact, effort, risque et données disponibles",
      "Roadmap 30/60/90 jours avec quick wins et prérequis techniques",
    ],
    method: [
      "Entretien dirigeant et objectifs business",
      "Analyse des workflows ventes, opérations, formation ou support",
      "Synthèse priorisée avec recommandations pragmatiques",
    ],
    proof:
      "Les gains annoncés sont cadrés comme des objectifs ou ordres de grandeur issus de projets internes et doivent être validés avec vos données réelles.",
    related: [
      { label: "Automatisation commerciale", href: "/automatisation-commerciale" },
      { label: "Formation IA", href: "/formation-ia" },
    ],
    faq: [
      {
        question: "Combien de temps dure un audit IA ?",
        answer:
          "La première qualification dure 30 minutes. Un audit complet se déroule ensuite généralement sur quelques jours selon le périmètre et l'accès aux informations.",
      },
      {
        question: "Faut-il déjà avoir des données structurées ?",
        answer:
          "Non. L'audit permet justement d'évaluer les données disponibles, les manques et les cas d'usage réalistes avant d'investir dans un outil.",
      },
    ],
  },
  "automatisation-commerciale": {
    lang: "fr",
    path: "/automatisation-commerciale",
    alternates: automationAlternates,
    title: "Automatisation commerciale IA",
    eyebrow: "Prospection & CRM",
    seoTitle: "Automatisation Commerciale IA | CRM, Prospection, Scoring — Abel SALAH",
    seoDescription:
      "Automatisez votre prospection commerciale avec l'IA : scoring leads, enrichissement, messages personnalisés, CRM et suivi des opportunités.",
    intro:
      "L'automatisation commerciale doit aider les équipes à mieux prioriser, personnaliser et suivre. Pas à envoyer plus de messages génériques.",
    icon: Workflow,
    outcomes: [
      "Scoring des prospects selon des signaux business exploitables",
      "Messages et relances personnalisés avec validation humaine",
      "Suivi CRM plus fiable pour piloter pipeline, priorités et prochaines actions",
    ],
    method: [
      "Cadrage de l'offre, ICP, secteurs et critères de qualification",
      "Conception du workflow : sourcing, scoring, brouillons, validation, suivi",
      "Mise en place d'un tableau de pilotage et règles anti-spam",
    ],
    proof:
      "Les exemples de conversion ou de pipeline sont des repères de projets, pas des garanties. La performance dépend de l'offre, du marché et de la qualité des données.",
    related: [
      { label: "Audit IA", href: "/audit-ia" },
      { label: "Formation IA", href: "/formation-ia" },
    ],
    faq: [
      {
        question: "Est-ce que les candidatures ou messages partent automatiquement ?",
        answer:
          "La recommandation est un mode semi-automatique : l'IA prépare, score et rédige, puis une validation humaine protège votre image et limite le risque de spam.",
      },
      {
        question: "Peut-on connecter LinkedIn, Malt ou des job boards ?",
        answer:
          "Oui si les conditions d'utilisation et les API le permettent. Sinon, on privilégie une recherche contrôlée, un CRM et des actions manuelles assistées.",
      },
    ],
  },
  "formation-ia": {
    lang: "fr",
    path: "/formation-ia",
    alternates: trainingAlternates,
    title: "Formation IA pour équipes",
    eyebrow: "Adoption terrain",
    seoTitle: "Formation IA Entreprise | Dirigeants, Managers, Equipes — Abel SALAH",
    seoDescription:
      "Formation IA pour dirigeants et équipes : cas d'usage métier, prompting utile, automatisation responsable et adoption concrète.",
    intro:
      "Une bonne formation IA ne se limite pas aux prompts. Elle aide chaque équipe à comprendre les usages, les limites et les méthodes qui changent vraiment le travail.",
    icon: Bot,
    outcomes: [
      "Ateliers adaptés aux métiers : vente, RH, formation, opérations ou direction",
      "Bibliothèque de cas d'usage et prompts contextualisés",
      "Règles d'usage responsable : données sensibles, validation, qualité des réponses",
    ],
    method: [
      "Diagnostic du niveau actuel et des outils déjà utilisés",
      "Ateliers courts avec cas réels de l'entreprise",
      "Support de suivi pour transformer l'apprentissage en routines opérationnelles",
    ],
    proof:
      "L'objectif est l'adoption mesurable : usages réellement repris par les équipes, temps gagné et qualité contrôlée dans les processus concernés.",
    related: [
      { label: "Audit IA", href: "/audit-ia" },
      { label: "Automatisation commerciale", href: "/automatisation-commerciale" },
    ],
    faq: [
      {
        question: "La formation est-elle adaptée aux débutants ?",
        answer:
          "Oui. Le contenu part des usages métier et monte progressivement vers les méthodes, les limites et les automatisations utiles.",
      },
      {
        question: "Peut-on former uniquement les dirigeants ?",
        answer:
          "Oui. Un format dirigeant peut se concentrer sur la stratégie, les risques, la priorisation des cas d'usage et la gouvernance IA.",
      },
    ],
  },
  "ai-audit": {
    lang: "en",
    path: "/en/ai-audit",
    alternates: auditAlternates,
    title: "AI audit for SMEs and teams",
    eyebrow: "AI diagnosis",
    seoTitle: "AI Audit for Business | Practical Use Cases — Abel SALAH",
    seoDescription:
      "AI audit for SMEs and growing companies: workflow diagnosis, ROI prioritization, 30/60/90-day roadmap and practical recommendations.",
    intro:
      "An AI audit separates useful business opportunities from noise. The goal is to identify use cases that are realistic, measurable and deployable with your team.",
    icon: BrainCircuit,
    outcomes: [
      "Map workflows where AI can reduce friction",
      "Prioritize use cases by impact, effort, risk and data readiness",
      "Build a 30/60/90-day roadmap with quick wins and technical prerequisites",
    ],
    method: ["Executive goals interview", "Sales, operations, training or support workflow review", "Prioritized recommendations"],
    proof:
      "Expected gains are framed as objectives or benchmarks from internal projects and must be validated against your own data.",
    related: [
      { label: "Sales automation", href: "/en/sales-automation" },
      { label: "AI training", href: "/en/ai-training" },
    ],
    faq: [
      { question: "How long does an AI audit take?", answer: "The first qualification call takes 30 minutes. A complete audit usually takes a few days depending on scope and access to information." },
      { question: "Do we need structured data already?", answer: "No. The audit evaluates available data, gaps and realistic use cases before investing in tooling." },
    ],
  },
  "sales-automation": {
    lang: "en",
    path: "/en/sales-automation",
    alternates: automationAlternates,
    title: "AI sales automation",
    eyebrow: "Prospecting & CRM",
    seoTitle: "AI Sales Automation | CRM, Prospecting, Lead Scoring — Abel SALAH",
    seoDescription:
      "Automate sales workflows with AI: lead scoring, enrichment, personalized drafts, CRM follow-up and opportunity tracking.",
    intro:
      "Sales automation should help teams prioritize, personalize and follow up better. It should not send more generic messages.",
    icon: Workflow,
    outcomes: ["Lead scoring based on business signals", "Personalized drafts with human validation", "More reliable CRM follow-up"],
    method: ["Define offer, ICP, sectors and qualification criteria", "Design sourcing, scoring, drafting and validation workflow", "Set up tracking and anti-spam rules"],
    proof:
      "Conversion and pipeline examples are project benchmarks, not guarantees. Performance depends on offer, market and data quality.",
    related: [
      { label: "AI audit", href: "/en/ai-audit" },
      { label: "AI training", href: "/en/ai-training" },
    ],
    faq: [
      { question: "Are messages sent automatically?", answer: "The recommended setup is semi-automated: AI prepares, scores and drafts, then human validation protects your brand." },
      { question: "Can it connect to LinkedIn, Malt or job boards?", answer: "Yes when APIs and terms allow it. Otherwise we use controlled research, CRM tracking and assisted manual actions." },
    ],
  },
  "ai-training": {
    lang: "en",
    path: "/en/ai-training",
    alternates: trainingAlternates,
    title: "AI training for teams",
    eyebrow: "Practical adoption",
    seoTitle: "AI Training for Business | Executives, Managers, Teams — Abel SALAH",
    seoDescription:
      "AI training for executives and teams: business use cases, useful prompting, responsible automation and practical adoption.",
    intro:
      "Good AI training is not just about prompts. It helps each team understand use cases, limits and methods that actually improve work.",
    icon: Bot,
    outcomes: ["Workshops tailored to business roles", "Contextual prompt and use-case library", "Responsible usage rules"],
    method: ["Assess current maturity and tools", "Run short workshops with real company cases", "Turn learning into operational routines"],
    proof:
      "The goal is measurable adoption: real usage by teams, time saved and quality controlled in the relevant workflows.",
    related: [
      { label: "AI audit", href: "/en/ai-audit" },
      { label: "Sales automation", href: "/en/sales-automation" },
    ],
    faq: [
      { question: "Is the training suitable for beginners?", answer: "Yes. It starts from business use cases and gradually moves toward methods, limits and useful automation." },
      { question: "Can only executives be trained?", answer: "Yes. An executive format focuses on strategy, risks, prioritization and AI governance." },
    ],
  },
  "auditoria-ia": {
    lang: "es",
    path: "/es/auditoria-ia",
    alternates: auditAlternates,
    title: "Auditoría IA para empresas",
    eyebrow: "Diagnóstico IA",
    seoTitle: "Auditoría IA Empresa | Casos de Uso Reales — Abel SALAH",
    seoDescription:
      "Auditoría IA para pymes y equipos: diagnóstico de procesos, priorización ROI, roadmap 30/60/90 días y recomendaciones prácticas.",
    intro:
      "Una auditoría IA separa las oportunidades útiles del ruido. El objetivo es identificar casos de uso realistas, medibles y desplegables con el equipo.",
    icon: BrainCircuit,
    outcomes: ["Mapeo de procesos con fricción", "Priorización por impacto, esfuerzo, riesgo y datos", "Roadmap 30/60/90 días"],
    method: ["Entrevista de objetivos", "Análisis de workflows comerciales, operativos o formativos", "Recomendaciones priorizadas"],
    proof:
      "Los resultados esperados se presentan como objetivos o referencias de proyectos y deben validarse con datos reales.",
    related: [
      { label: "Automatización comercial", href: "/es/automatizacion-comercial" },
      { label: "Formación IA", href: "/es/formacion-ia" },
    ],
    faq: [
      { question: "¿Cuánto dura una auditoría IA?", answer: "La primera llamada dura 30 minutos. Una auditoría completa suele tomar unos días según el alcance." },
      { question: "¿Necesitamos datos estructurados?", answer: "No. La auditoría evalúa datos disponibles, carencias y casos de uso realistas." },
    ],
  },
  "automatizacion-comercial": {
    lang: "es",
    path: "/es/automatizacion-comercial",
    alternates: automationAlternates,
    title: "Automatización comercial IA",
    eyebrow: "Prospección & CRM",
    seoTitle: "Automatización Comercial IA | CRM, Prospección, Scoring — Abel SALAH",
    seoDescription:
      "Automatice procesos comerciales con IA: scoring de leads, enriquecimiento, mensajes personalizados, CRM y seguimiento.",
    intro:
      "La automatización comercial debe ayudar a priorizar, personalizar y hacer mejor seguimiento. No enviar más mensajes genéricos.",
    icon: Workflow,
    outcomes: ["Scoring de prospectos con señales de negocio", "Borradores personalizados con validación humana", "Seguimiento CRM más fiable"],
    method: ["Definir oferta, ICP, sectores y criterios", "Diseñar sourcing, scoring, borradores y validación", "Configurar seguimiento y reglas anti-spam"],
    proof:
      "Los ejemplos de conversión o pipeline son referencias, no garantías. Dependen de la oferta, mercado y calidad de datos.",
    related: [
      { label: "Auditoría IA", href: "/es/auditoria-ia" },
      { label: "Formación IA", href: "/es/formacion-ia" },
    ],
    faq: [
      { question: "¿Los mensajes se envían automáticamente?", answer: "Se recomienda un modo semi-automático: la IA prepara y redacta, una persona valida." },
      { question: "¿Se puede conectar a LinkedIn o job boards?", answer: "Sí cuando las APIs y condiciones lo permiten. Si no, se usa investigación controlada y acciones asistidas." },
    ],
  },
  "formacion-ia": {
    lang: "es",
    path: "/es/formacion-ia",
    alternates: trainingAlternates,
    title: "Formación IA para equipos",
    eyebrow: "Adopción práctica",
    seoTitle: "Formación IA Empresa | Directivos, Managers, Equipos — Abel SALAH",
    seoDescription:
      "Formación IA para directivos y equipos: casos de uso, prompting útil, automatización responsable y adopción concreta.",
    intro:
      "Una buena formación IA no se limita a prompts. Ayuda a cada equipo a entender usos, límites y métodos que cambian el trabajo real.",
    icon: Bot,
    outcomes: ["Talleres adaptados a cada función", "Biblioteca de casos y prompts contextualizados", "Reglas de uso responsable"],
    method: ["Diagnóstico de madurez y herramientas", "Talleres con casos reales", "Seguimiento para convertir aprendizaje en rutinas"],
    proof:
      "El objetivo es una adopción medible: usos reales, tiempo ganado y calidad controlada en los procesos afectados.",
    related: [
      { label: "Auditoría IA", href: "/es/auditoria-ia" },
      { label: "Automatización comercial", href: "/es/automatizacion-comercial" },
    ],
    faq: [
      { question: "¿Sirve para principiantes?", answer: "Sí. Parte de casos de uso de negocio y avanza hacia métodos, límites y automatizaciones útiles." },
      { question: "¿Se puede formar solo a directivos?", answer: "Sí. El formato directivo se centra en estrategia, riesgos, priorización y gobernanza IA." },
    ],
  },
} as const;

export type OfferSlug = keyof typeof offerPages;
