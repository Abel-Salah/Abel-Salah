import OfferPage from "./OfferPage";

const AutomatisationCommerciale = () => (
  <OfferPage
    slug="automatisation-commerciale"
    title="Automatisation commerciale IA"
    eyebrow="Prospection, relance et CRM"
    description="Automatisation commerciale avec l'IA : qualification, scoring, relances, CRM et reporting pour équipes B2B."
    hero="Automatisation commerciale"
    promise="Structurer un système commercial plus régulier : meilleurs leads, relances plus fiables, CRM mieux exploité et temps commercial recentré sur les opportunités utiles."
    outcomes={[
      "Scoring et segmentation des prospects à partir de signaux exploitables.",
      "Séquences de relance plus personnalisées, avec contrôle humain.",
      "Pipeline CRM plus lisible pour suivre priorités, blocages et conversion.",
    ]}
    process={[
      "Audit du cycle commercial, des sources de leads et du CRM existant.",
      "Conception d'un workflow simple : collecte, scoring, relance, suivi.",
      "Déploiement progressif avec mesure des taux de réponse, RDV et conversion.",
    ]}
    proofNote="Les gains annoncés doivent venir de vos données de conversion. Les exemples servent de repères, pas de promesse standardisée."
    faq={[
      {
        question: "L'IA remplace-t-elle les commerciaux ?",
        answer: "Non. Elle automatise les tâches répétitives et aide à prioriser, mais la relation, la négociation et la décision restent humaines.",
      },
      {
        question: "Peut-on partir d'un CRM existant ?",
        answer: "Oui. L'approche privilégie l'intégration aux outils déjà utilisés avant d'ajouter une nouvelle brique.",
      },
    ]}
  />
);

export default AutomatisationCommerciale;
