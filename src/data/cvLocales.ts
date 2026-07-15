export type CVLocale = "fr" | "en" | "es";

interface CVExperience {
  role: string;
  link?: { label: string; url: string };
  dates: string;
  sub: string;
  bullets: string[];
}

interface CVHighlight {
  figure: string;
  figureSuffix: string;
  title: string;
  desc: string;
}

export interface CVContent {
  seoTitle: string;
  seoDescription: string;
  printLabel: string;
  kicker: string;
  taglineLine1: string;
  taglineLine2: string;
  location: string;
  page1Aria: string;
  page2Aria: string;
  profileTitle: string;
  profileText: string;
  experienceTitle: string;
  experiences: CVExperience[];
  skillsTitle: string;
  skills: { name: string; desc: string }[];
  languagesTitle: string;
  languages: { name: string; level: string }[];
  referencesTitle: string;
  references: { name: string; sub: string }[];
  educationTitle: string;
  education: { name: string; sub: string }[];
  footerLeft: string;
  page1Label: string;
  page2Label: string;
  highlightsTitle: string;
  highlights: CVHighlight[];
  toolsTitle: string;
  toolsIntro: string;
  toolGroupLabels: [string, string, string, string];
  clientsTitle: string;
  clients: string[];
  availabilityTitle: string;
  availabilityText: string;
  interestsTitle: string;
  interestsText: string;
}

export const cvAlternates = [
  { hrefLang: "fr", path: "/cv" },
  { hrefLang: "en", path: "/en/cv" },
  { hrefLang: "es", path: "/es/cv" },
];

export const cvCanonicalByLocale: Record<CVLocale, string> = {
  fr: "/cv",
  en: "/en/cv",
  es: "/es/cv",
};

export const cvLocales: Record<CVLocale, CVContent> = {
  fr: {
    seoTitle: "CV Abel Salah | Consultant IA & AI Transformation Lead",
    seoDescription:
      "CV d'Abel Salah, consultant IA et AI Transformation Lead : GenAI, automatisation, copilotes IA, formation et adoption métier. Plus de 60 projets B2B menés.",
    printLabel: "Imprimer / Enregistrer en PDF",
    kicker: "Consultant IA · AI Transformation Lead",
    taglineLine1: "GenAI, automatisation & adoption métier — plus de 60 projets B2B menés.",
    taglineLine2: "Fondateur de SKILLCO.",
    location: "Montpellier — France & Espagne",
    page1Aria: "CV Abel Salah — page 1 sur 2",
    page2Aria: "CV Abel Salah — page 2 sur 2",
    profileTitle: "Profil",
    profileText:
      "J'accompagne les entreprises dans l'intégration opérationnelle de l'IA : cas d'usage, automatisations, copilotes IA, formation des équipes et conduite du changement. Un seul objectif : des gains mesurables — productivité, coûts, performance commerciale et adoption terrain.",
    experienceTitle: "Expérience",
    experiences: [
      {
        role: "Fondateur — ",
        link: { label: "SKILLCO", url: "https://skillco.fr" },
        dates: "2021 — auj. · Montpellier",
        sub: "Solutions IA, transformation digitale & formation",
        bullets: [
          "Conseil stratégique IA : diagnostic, cas d'usage, priorisation, roadmap et gouvernance",
          "Déploiement d'automatisations métier, copilotes et agents IA, outils internes",
          "Accompagnement des dirigeants et des équipes vers une adoption concrète de l'IA",
          "Conception de parcours de formation IA : e-learning, ateliers pratiques, coaching",
          "Références : Docaposte, Maisons du Monde, École Française, EIG, Ville de Marseille",
        ],
      },
      {
        role: "Chef de projet — ",
        link: { label: "SKILL LMS", url: "https://skill-lms.fr" },
        dates: "2019 — auj. · Montpellier",
        sub: "Plateforme SaaS LMS & conformité formation",
        bullets: [
          "Pilotage du développement d'une plateforme LMS orientée conformité Qualiopi",
          "Digitalisation des processus administratifs, pédagogiques et commerciaux",
          "Automatisation du suivi, des documents, des évaluations et du reporting",
          "Intégration progressive de l'IA dans la gestion pédagogique et l'expérience utilisateur",
        ],
      },
      {
        role: "Directeur — Intersport",
        dates: "2016 — 2020 · Cahors",
        sub: "3 magasins franchisés · 28 collaborateurs · 4,8 M€ de CA",
        bullets: [
          "Pilotage commercial, opérationnel et managérial de plusieurs points de vente",
          "Digitalisation retail : click & collect, optimisation des process internes",
          "Résultat : jusqu'à +30 % de chiffre d'affaires sur le périmètre accompagné",
        ],
      },
    ],
    skillsTitle: "Compétences",
    skills: [
      {
        name: "Stratégie IA & transformation",
        desc: "Diagnostic, roadmap, gouvernance IA, priorisation des cas d'usage, conduite du changement.",
      },
      {
        name: "Automatisation & copilotes IA",
        desc: "Agents IA, workflows no-code, intégrations CRM et API.",
      },
      {
        name: "Business & adoption",
        desc: "Formation des équipes, accompagnement dirigeants, prospection B2B, performance commerciale.",
      },
    ],
    languagesTitle: "Langues",
    languages: [
      { name: "Espagnol", level: "Bilingue" },
      { name: "Français", level: "Courant" },
      { name: "Anglais", level: "Professionnel" },
    ],
    referencesTitle: "Références",
    references: [
      { name: "Yann Ciernieski", sub: "PDG Intersport (46) — +30 % de CA" },
      { name: "Guillaume Lambert", sub: "Dirigeant SAGA" },
    ],
    educationTitle: "Formation",
    education: [
      { name: "Master Commerce & Marketing", sub: "ESG Toulouse · 2014 — 2016" },
      { name: "Licence Développement Commercial", sub: "IGS Toulouse · 2012 — 2013" },
    ],
    footerLeft: "Abel Salah — Consultant IA",
    page1Label: "Page 1 / 2",
    page2Label: "Page 2 / 2",
    highlightsTitle: "Réalisations clés",
    highlights: [
      {
        figure: "300",
        figureSuffix: " demandes / jour",
        title: "Standard IA — Ville de Marseille",
        desc: "Agent IA métier orientant automatiquement les usagers vers les bons services, avec un gain net de réactivité.",
      },
      {
        figure: "SaaS",
        figureSuffix: " prospection IA B2B",
        title: "Création de ScallUp",
        desc: "Solution no-code / low-code pour générer, scorer et engager des leads via l'intelligence artificielle.",
      },
      {
        figure: "Grands",
        figureSuffix: " comptes",
        title: "Docaposte & groupes",
        desc: "Parcours de formation IA, automatisation commerciale, e-learning sur mesure et intégration CRM.",
      },
    ],
    toolsTitle: "Outils & logiciels",
    toolsIntro: "La stack au service des projets : IA générative, automatisation, data & CRM, développement.",
    toolGroupLabels: ["IA générative", "Automatisation", "Data & CRM", "Développement & agents"],
    clientsTitle: "Ils m'ont fait confiance",
    clients: ["Docaposte", "Maisons du Monde", "École Française", "EIG", "Ville de Marseille", "Intersport"],
    availabilityTitle: "Disponibilités",
    availabilityText:
      "Disponible pour des missions de conseil IA, des formations en entreprise et des collaborations stratégiques — en indépendant ou en poste (AI Transformation Lead). France & Espagne.",
    interestsTitle: "Intérêts",
    interestsText:
      "Intelligence artificielle, innovation d'entreprise, entrepreneuriat, nouvelles technologies, course, VTT, football.",
  },
  en: {
    seoTitle: "Resume Abel Salah | AI Consultant & AI Transformation Lead",
    seoDescription:
      "Resume of Abel Salah, AI consultant and AI Transformation Lead: GenAI, automation, AI copilots, training and business adoption. 60+ B2B projects delivered.",
    printLabel: "Print / Save as PDF",
    kicker: "AI Consultant · AI Transformation Lead",
    taglineLine1: "GenAI, automation & business adoption — 60+ B2B projects delivered.",
    taglineLine2: "Founder of SKILLCO.",
    location: "Montpellier — France & Spain",
    page1Aria: "Resume Abel Salah — page 1 of 2",
    page2Aria: "Resume Abel Salah — page 2 of 2",
    profileTitle: "Profile",
    profileText:
      "I help companies put AI to work: use cases, automations, AI copilots, team training and change management. One goal: measurable gains — productivity, costs, sales performance and real-world adoption.",
    experienceTitle: "Experience",
    experiences: [
      {
        role: "Founder — ",
        link: { label: "SKILLCO", url: "https://skillco.fr" },
        dates: "2021 — present · Montpellier",
        sub: "AI solutions, digital transformation & training",
        bullets: [
          "Strategic AI consulting: assessment, use cases, prioritisation, roadmap and governance",
          "Deployment of business automations, AI copilots and agents, internal tools",
          "Coaching executives and teams towards concrete AI adoption",
          "Design of AI training programmes: e-learning, hands-on workshops, coaching",
          "Clients: Docaposte, Maisons du Monde, École Française, EIG, City of Marseille",
        ],
      },
      {
        role: "Project Lead — ",
        link: { label: "SKILL LMS", url: "https://skill-lms.fr" },
        dates: "2019 — present · Montpellier",
        sub: "SaaS LMS platform & training compliance",
        bullets: [
          "Led the development of an LMS platform built for Qualiopi compliance",
          "Digitised administrative, learning and sales processes",
          "Automated tracking, documents, assessments and reporting",
          "Progressive AI integration into learning management and user experience",
        ],
      },
      {
        role: "Director — Intersport",
        dates: "2016 — 2020 · Cahors",
        sub: "3 franchised stores · 28 employees · €4.8M revenue",
        bullets: [
          "Commercial, operational and people management across several stores",
          "Retail digitisation: click & collect, internal process optimisation",
          "Result: up to +30% revenue growth across the managed scope",
        ],
      },
    ],
    skillsTitle: "Skills",
    skills: [
      {
        name: "AI strategy & transformation",
        desc: "Assessment, roadmap, AI governance, use-case prioritisation, change management.",
      },
      {
        name: "Automation & AI copilots",
        desc: "AI agents, no-code workflows, CRM and API integrations.",
      },
      {
        name: "Business & adoption",
        desc: "Team training, executive coaching, B2B prospecting, sales performance.",
      },
    ],
    languagesTitle: "Languages",
    languages: [
      { name: "Spanish", level: "Bilingual" },
      { name: "French", level: "Fluent" },
      { name: "English", level: "Professional" },
    ],
    referencesTitle: "References",
    references: [
      { name: "Yann Ciernieski", sub: "CEO Intersport (46) — +30% revenue" },
      { name: "Guillaume Lambert", sub: "CEO, SAGA" },
    ],
    educationTitle: "Education",
    education: [
      { name: "Master's in Business & Marketing", sub: "ESG Toulouse · 2014 — 2016" },
      { name: "Bachelor's in Business Development", sub: "IGS Toulouse · 2012 — 2013" },
    ],
    footerLeft: "Abel Salah — AI Consultant",
    page1Label: "Page 1 / 2",
    page2Label: "Page 2 / 2",
    highlightsTitle: "Key achievements",
    highlights: [
      {
        figure: "300",
        figureSuffix: " requests / day",
        title: "AI switchboard — City of Marseille",
        desc: "Business AI agent automatically routing users to the right services, with a clear gain in responsiveness.",
      },
      {
        figure: "SaaS",
        figureSuffix: " B2B AI prospecting",
        title: "Built ScallUp",
        desc: "No-code / low-code solution to generate, score and engage leads with AI.",
      },
      {
        figure: "Key",
        figureSuffix: " accounts",
        title: "Docaposte & groups",
        desc: "AI training programmes, sales automation, custom e-learning and CRM integration.",
      },
    ],
    toolsTitle: "Tools & software",
    toolsIntro: "The stack behind the projects: generative AI, automation, data & CRM, development.",
    toolGroupLabels: ["Generative AI", "Automation", "Data & CRM", "Development & agents"],
    clientsTitle: "Selected clients",
    clients: ["Docaposte", "Maisons du Monde", "École Française", "EIG", "City of Marseille", "Intersport"],
    availabilityTitle: "Availability",
    availabilityText:
      "Available for AI consulting engagements, corporate training and strategic collaborations — freelance or in-house (AI Transformation Lead). France & Spain.",
    interestsTitle: "Interests",
    interestsText:
      "Artificial intelligence, business innovation, entrepreneurship, new technologies, running, mountain biking, football.",
  },
  es: {
    seoTitle: "CV Abel Salah | Consultor IA & AI Transformation Lead",
    seoDescription:
      "CV de Abel Salah, consultor IA y AI Transformation Lead: GenAI, automatización, copilotos IA, formación y adopción operativa. Más de 60 proyectos B2B realizados.",
    printLabel: "Imprimir / Guardar en PDF",
    kicker: "Consultor IA · AI Transformation Lead",
    taglineLine1: "GenAI, automatización y adopción operativa — más de 60 proyectos B2B realizados.",
    taglineLine2: "Fundador de SKILLCO.",
    location: "Montpellier — Francia y España",
    page1Aria: "CV Abel Salah — página 1 de 2",
    page2Aria: "CV Abel Salah — página 2 de 2",
    profileTitle: "Perfil",
    profileText:
      "Acompaño a las empresas en la integración operativa de la IA: casos de uso, automatizaciones, copilotos IA, formación de equipos y gestión del cambio. Un solo objetivo: resultados medibles — productividad, costes, rendimiento comercial y adopción real.",
    experienceTitle: "Experiencia",
    experiences: [
      {
        role: "Fundador — ",
        link: { label: "SKILLCO", url: "https://skillco.fr" },
        dates: "2021 — act. · Montpellier",
        sub: "Soluciones IA, transformación digital y formación",
        bullets: [
          "Consultoría estratégica IA: diagnóstico, casos de uso, priorización, roadmap y gobernanza",
          "Despliegue de automatizaciones de negocio, copilotos y agentes IA, herramientas internas",
          "Acompañamiento de directivos y equipos hacia una adopción real de la IA",
          "Diseño de itinerarios de formación IA: e-learning, talleres prácticos, coaching",
          "Referencias: Docaposte, Maisons du Monde, École Française, EIG, Ayuntamiento de Marsella",
        ],
      },
      {
        role: "Jefe de proyecto — ",
        link: { label: "SKILL LMS", url: "https://skill-lms.fr" },
        dates: "2019 — act. · Montpellier",
        sub: "Plataforma SaaS LMS y conformidad en formación",
        bullets: [
          "Dirección del desarrollo de una plataforma LMS orientada a la conformidad Qualiopi",
          "Digitalización de los procesos administrativos, pedagógicos y comerciales",
          "Automatización del seguimiento, documentos, evaluaciones y reporting",
          "Integración progresiva de la IA en la gestión pedagógica y la experiencia de usuario",
        ],
      },
      {
        role: "Director — Intersport",
        dates: "2016 — 2020 · Cahors",
        sub: "3 tiendas franquiciadas · 28 empleados · 4,8 M€ de facturación",
        bullets: [
          "Gestión comercial, operativa y de equipos de varios puntos de venta",
          "Digitalización retail: click & collect, optimización de procesos internos",
          "Resultado: hasta +30 % de facturación en el perímetro gestionado",
        ],
      },
    ],
    skillsTitle: "Competencias",
    skills: [
      {
        name: "Estrategia IA y transformación",
        desc: "Diagnóstico, roadmap, gobernanza IA, priorización de casos de uso, gestión del cambio.",
      },
      {
        name: "Automatización y copilotos IA",
        desc: "Agentes IA, workflows no-code, integraciones CRM y API.",
      },
      {
        name: "Negocio y adopción",
        desc: "Formación de equipos, acompañamiento de directivos, prospección B2B, rendimiento comercial.",
      },
    ],
    languagesTitle: "Idiomas",
    languages: [
      { name: "Español", level: "Bilingüe" },
      { name: "Francés", level: "Fluido" },
      { name: "Inglés", level: "Profesional" },
    ],
    referencesTitle: "Referencias",
    references: [
      { name: "Yann Ciernieski", sub: "CEO Intersport (46) — +30 % de facturación" },
      { name: "Guillaume Lambert", sub: "Director general de SAGA" },
    ],
    educationTitle: "Formación",
    education: [
      { name: "Máster en Comercio y Marketing", sub: "ESG Toulouse · 2014 — 2016" },
      { name: "Grado en Desarrollo Comercial", sub: "IGS Toulouse · 2012 — 2013" },
    ],
    footerLeft: "Abel Salah — Consultor IA",
    page1Label: "Página 1 / 2",
    page2Label: "Página 2 / 2",
    highlightsTitle: "Logros clave",
    highlights: [
      {
        figure: "300",
        figureSuffix: " solicitudes / día",
        title: "Centralita IA — Ayuntamiento de Marsella",
        desc: "Agente IA que orienta automáticamente a los usuarios hacia los servicios adecuados, con una clara mejora de la capacidad de respuesta.",
      },
      {
        figure: "SaaS",
        figureSuffix: " prospección IA B2B",
        title: "Creación de ScallUp",
        desc: "Solución no-code / low-code para generar, puntuar y captar leads mediante inteligencia artificial.",
      },
      {
        figure: "Grandes",
        figureSuffix: " cuentas",
        title: "Docaposte y grandes grupos",
        desc: "Itinerarios de formación IA, automatización comercial, e-learning a medida e integración CRM.",
      },
    ],
    toolsTitle: "Herramientas y software",
    toolsIntro: "El stack al servicio de los proyectos: IA generativa, automatización, data y CRM, desarrollo.",
    toolGroupLabels: ["IA generativa", "Automatización", "Data & CRM", "Desarrollo y agentes"],
    clientsTitle: "Han confiado en mí",
    clients: ["Docaposte", "Maisons du Monde", "École Française", "EIG", "Ayuntamiento de Marsella", "Intersport"],
    availabilityTitle: "Disponibilidad",
    availabilityText:
      "Disponible para misiones de consultoría IA, formaciones en empresa y colaboraciones estratégicas — como independiente o en plantilla (AI Transformation Lead). Francia y España.",
    interestsTitle: "Intereses",
    interestsText:
      "Inteligencia artificial, innovación empresarial, emprendimiento, nuevas tecnologías, running, BTT, fútbol.",
  },
};
