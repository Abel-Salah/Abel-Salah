import OfferPage from "./OfferPage";

const AuditIa = () => (
  <OfferPage
    slug="audit-ia"
    title="Audit IA"
    eyebrow="Diagnostic IA pour dirigeants"
    description="Audit IA pour identifier les cas d'usage prioritaires, réduire les risques et construire une feuille de route actionnable."
    hero="Audit IA"
    promise="Une lecture claire de vos processus, données et opportunités pour décider où l'IA peut créer de la valeur sans disperser vos équipes."
    outcomes={[
      "Cartographie des processus à automatiser ou augmenter.",
      "Priorisation des cas d'usage selon impact, faisabilité et délai.",
      "Feuille de route 30/60/90 jours avec quick wins et risques.",
    ]}
    process={[
      "Cadrage des enjeux business, contraintes métier et outils existants.",
      "Analyse des données, irritants opérationnels et scénarios IA réalistes.",
      "Restitution claire avec priorités, budget indicatif et prochaines actions.",
    ]}
    proofNote="Les chiffres sont cadrés projet par projet : l'objectif est d'identifier les gains réellement mesurables avant de promettre un ROI."
    faq={[
      {
        question: "Combien de temps dure un audit IA ?",
        answer: "Un premier cadrage peut se faire en quelques jours, puis une analyse plus complète dépend du nombre d'équipes et d'outils à auditer.",
      },
      {
        question: "Faut-il déjà avoir des données propres ?",
        answer: "Non. L'audit sert justement à qualifier la qualité, l'accessibilité et les manques de données avant tout déploiement.",
      },
    ]}
  />
);

export default AuditIa;
