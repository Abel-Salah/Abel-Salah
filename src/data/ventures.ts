import scallupImg from "@/assets/ventures/scallup.webp";
import skillLmsImg from "@/assets/ventures/skill-lms.jpg";
import formateursProImg from "@/assets/ventures/formateurs-pro.webp";
import immoMontpellierImg from "@/assets/ventures/immo-montpellier.webp";

export interface Venture {
  number: string;
  name: string;
  url: string;
  domain: string;
  tagline: string;
  pitch: string;
  proof: string;
  image: string;
  metrics: { value: string; label: string }[];
}

export const ventures: Venture[] = [
  {
    number: "01",
    name: "SCALLUP",
    url: "https://scallup.fr",
    domain: "scallup.fr",
    tagline: "L'agent IA qui prospecte, relance et vend.",
    pitch:
      "Plateforme SaaS où un agent IA exécute les actions commerciales en pilote automatique : prospection multicanale, relances, appels, marketing, SEO, devis et pilotage. Intégré nativement aux outils métier.",
    proof:
      "Concevoir et opérer un produit SaaS IA B2B à l'échelle, de la stratégie au revenu.",
    image: scallupImg,
    metrics: [
      { value: "500+", label: "PME utilisatrices" },
      { value: "4.9/5", label: "Note moyenne" },
      { value: "OPCO", label: "Finançable" },
    ],
  },
  {
    number: "02",
    name: "SKILL LMS",
    url: "https://skill-lms.fr",
    domain: "skill-lms.fr",
    tagline: "Le LMS Qualiopi nouvelle génération.",
    pitch:
      "Plateforme tout-en-un pour organismes de formation : création de parcours, suivi apprenants, automatisation des conventions et convocations, centralisation des preuves Qualiopi, pilotage par IA.",
    proof:
      "Maîtriser les plateformes métier complexes et la conformité réglementaire (Qualiopi).",
    image: skillLmsImg,
    metrics: [
      { value: "Qualiopi", label: "Conformité native" },
      { value: "Tout-en-un", label: "Formations + LMS + preuves" },
      { value: "IA", label: "Relances & pilotage" },
    ],
  },
  {
    number: "03",
    name: "FORMATEURS.PRO",
    url: "https://formateurs.pro",
    domain: "formateurs.pro",
    tagline: "Le plus grand annuaire de formateurs certifiés de France.",
    pitch:
      "Annuaire construit à partir de sources officielles (Pappers, INFOGREFFE, data.gouv.fr, France Compétences). Réseau connecté à SKILL LMS pour fluidifier la mise en relation entreprises ↔ formateurs.",
    proof:
      "Data engineering, SEO programmatique et écosystèmes produits connectés.",
    image: formateursProImg,
    metrics: [
      { value: "50 000+", label: "Formateurs référencés" },
      { value: "9 000+", label: "Certifiés Qualiopi" },
      { value: "98 %", label: "Profils vérifiés" },
    ],
  },
  {
    number: "04",
    name: "IMMO MONTPELLIER",
    url: "https://immomontpellier.com",
    domain: "immomontpellier.com",
    tagline: "Le premier chasseur IA immobilier de Montpellier.",
    pitch:
      "L'IA scanne 8 sources en continu (SeLoger, Leboncoin, Bien'ici, PAP…), envoie des alertes en moins d'1h, et un chasseur local prend le relais pour visiter et négocier jusqu'à la signature notariée.",
    proof:
      "Appliquer l'IA verticalement (scraping, scoring, matching) à un secteur traditionnel.",
    image: immoMontpellierImg,
    metrics: [
      { value: "8", label: "Sources scannées 24/7" },
      { value: "<1h", label: "Délai d'alerte" },
      { value: "250+", label: "Acquéreurs accompagnés" },
    ],
  },
];
