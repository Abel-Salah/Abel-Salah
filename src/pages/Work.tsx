import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    number: "01",
    title: "Automatisation du service client",
    context: "E-commerce avec un volume élevé de tickets support",
    action: "Déploiement d'un chatbot IA avec escalade intelligente",
    result: "-60 % tickets support",
  },
  {
    number: "02",
    title: "Optimisation des processus RH",
    context: "Entreprise en forte croissance, recrutement massif",
    action: "Tri automatisé des CV et pré-qualification par IA",
    result: "5x plus rapide",
  },
  {
    number: "03",
    title: "Prévision des ventes par IA",
    context: "Réseau de distribution multi-canal",
    action: "Modèle prédictif sur données historiques et saisonnières",
    result: "+35 % précision",
  },
];

const Work = () => {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
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
            Des projets concrets où l'IA a créé un impact mesurable.
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
