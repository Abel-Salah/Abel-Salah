import OfferPage from "./OfferPage";

const FormationIa = () => (
  <OfferPage
    slug="formation-ia"
    title="Formation IA équipes"
    eyebrow="Acculturation et adoption"
    description="Formation IA pour dirigeants, managers et équipes opérationnelles : cas d'usage, méthodes, outils et adoption terrain."
    hero="Formation IA"
    promise="Donner aux équipes une méthode concrète pour utiliser l'IA avec discernement, gagner du temps et éviter les usages gadgets ou risqués."
    outcomes={[
      "Compréhension claire des possibilités, limites et risques de l'IA.",
      "Ateliers orientés cas métiers : vente, marketing, opérations, formation.",
      "Méthodes réutilisables pour cadrer, tester et mesurer les usages IA.",
    ]}
    process={[
      "Cadrage du public, du niveau initial et des irritants métiers.",
      "Ateliers pratiques sur des cas concrets, avec supports et exercices.",
      "Plan d'adoption pour transformer les usages testés en routines utiles.",
    ]}
    proofNote="La formation est pensée pour l'usage terrain : chaque module doit produire des actions applicables, pas seulement de la théorie."
    faq={[
      {
        question: "La formation est-elle adaptée aux débutants ?",
        answer: "Oui. Les parcours sont ajustés au niveau des équipes, des fondamentaux dirigeants aux ateliers opérationnels avancés.",
      },
      {
        question: "Peut-on former une équipe commerciale ?",
        answer: "Oui. Les cas de prospection, relance, préparation de rendez-vous et synthèse CRM sont particulièrement adaptés.",
      },
    ]}
  />
);

export default FormationIa;
