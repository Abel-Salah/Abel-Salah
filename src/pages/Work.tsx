import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import SEOHead from "@/components/SEOHead";

const projects = [
  {
    number: "01",
    title: "IA & performance commerciale retail",
    context: "Réseau multi-sites, équipe commerciale et opérations terrain",
    action: "Outils IA pour le scoring client, prévision de stocks et optimisation des ventes",
    result: "marges mieux pilotées",
  },
  {
    number: "02",
    title: "Automatisation de l'acquisition B2B",
    context: "Startup sans équipe commerciale structurée",
    action: "Pipeline automatisé : scraping, scoring par IA, séquences d'emailing intelligentes",
    result: "leads mieux qualifiés",
  },
  {
    number: "03",
    title: "Plateforme de formation augmentée par l'IA",
    context: "Former des équipes commerciales à grande échelle",
    action: "Création d'un LMS avec parcours adaptatifs générés par IA",
    result: "adoption renforcée",
  },
  {
    number: "04",
    title: "IA pour le e-commerce : recommandation & conversion",
    context: "Site e-commerce avec taux de conversion faible",
    action: "Moteur de recommandation IA et optimisation du tunnel de vente",
    result: "tunnel clarifié",
  },
  {
    number: "05",
    title: "Stratégie data & CRM intelligent",
    context: "Données clients dispersées, pas de vision unifiée",
    action: "Centralisation CRM IA (HubSpot), segmentation automatique, scoring prédictif",
    result: "cycle mieux suivi",
  },
];

const Work = () => {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <SEOHead
        title="Cas d'usage IA en Entreprise — Abel SALAH"
        description="Découvrez des cas d'usage IA en entreprise : automatisation commerciale, formation augmentée, CRM intelligent et stratégie data."
        canonical="/work"
        breadcrumbs={[{ name: "Accueil", path: "/" }, { name: "Réalisations", path: "/work" }]}
      />
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="heading-display text-[clamp(3rem,10vw,10rem)] leading-[0.85] mb-8">
            Réalisations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Des missions concrètes où l'IA a créé un impact mesurable.
            Stratégie, exécution, résultats.
          </p>
        </motion.div>

        {/* Projects */}
        <div>
          {projects.map((project, index) => (
            <ProjectCard key={project.number} {...project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20 mt-20 text-center"
        >
          <p className="text-2xl text-muted-foreground mb-4">
            Envie d'un cas d'usage similaire ?
          </p>
          <p className="heading-display text-4xl md:text-5xl">
            Créons <span className="text-primary">le vôtre.</span>
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default Work;
