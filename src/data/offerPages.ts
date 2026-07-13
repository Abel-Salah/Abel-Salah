import { Bot, BrainCircuit, Workflow } from "lucide-react";

export type OfferSlug = "audit-ia" | "automatisation-commerciale" | "formation-ia";

export const offerPages = {
  "audit-ia": {
    path: "/audit-ia",
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
    path: "/automatisation-commerciale",
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
    path: "/formation-ia",
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
} as const;
