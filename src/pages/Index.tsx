import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CopyReveal from "@/components/CopyReveal";
import ProjectCard from "@/components/ProjectCard";

const Index = () => {
  const copyExamples = [
    {
      before: "On fait tout manuellement",
      after: "Automatisez 80 % des tâches répétitives avec l'IA",
    },
    {
      before: "L'IA, c'est trop complexe pour nous",
      after: "Un plan d'action clair, des résultats en 3 mois",
    },
    {
      before: "On ne sait pas par où commencer",
      after: "Audit IA gratuit. Priorisez ce qui compte vraiment.",
    },
  ];

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

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 md:px-6 pt-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl"
          >
            <h1 className="heading-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] mb-8">
              L'IA ne remplace pas votre entreprise.
              <span className="text-primary"> Elle l'accélère.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mt-12 mb-16"
          >
            Je suis Abel SALAH — expert en intelligence artificielle appliquée aux entreprises. 
            J'aide les dirigeants et les équipes à exploiter pleinement le potentiel de l'IA.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-4 text-xl font-semibold uppercase tracking-wider text-primary hover:gap-6 transition-all group"
            >
              Voir les réalisations
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Copy Transformation Section */}
      <section className="py-32 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
              La différence
            </span>
            <h2 className="heading-display text-4xl md:text-6xl">
              Avant l'IA vs. Avec l'IA
            </h2>
          </motion.div>

          <div className="space-y-12">
            {copyExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-l-2 border-border hover:border-primary transition-colors pl-8 py-4"
              >
                <CopyReveal
                  before={example.before}
                  after={example.after}
                  className="text-2xl md:text-3xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
              Cas d'usage
            </span>
            <h2 className="heading-display text-4xl md:text-6xl">
              Des projets qui <span className="text-primary">transforment</span>
            </h2>
          </motion.div>

          <div>
            {projects.map((project, index) => (
              <ProjectCard key={project.number} {...project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-4 text-lg font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-all group"
            >
              Voir toutes les réalisations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="heading-display text-5xl md:text-7xl mb-12"
          >
            Prêt à passer à l'action ?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 text-xl font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-12 py-6 hover:bg-primary/90 transition-colors"
            >
              Réservez un appel
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
