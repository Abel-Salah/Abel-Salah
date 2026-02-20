import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CopyReveal from "@/components/CopyReveal";
import ProjectCard from "@/components/ProjectCard";
import SEOHead from "@/components/SEOHead";
import abelHero from "@/assets/abel-salah-hero.png";

const stats = [
  { value: "16+", label: "ans d'expérience" },
  { value: "62", label: "projets réalisés" },
  { value: "95%", label: "clients satisfaits" },
];

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
      title: "IA au service de la force de vente",
      context: "Réseau de distribution, 28 commerciaux, processus manuels",
      action: "Automatisation du scoring leads et prévision des ventes par IA",
      result: "+40 % conversion",
    },
    {
      number: "02",
      title: "Digitalisation des processus RH avec l'IA",
      context: "Entreprise en hypercroissance, onboarding et formation non structurés",
      action: "Déploiement d'un LMS intelligent avec parcours personnalisés par IA",
      result: "Intégration ÷3",
    },
    {
      number: "03",
      title: "Stratégie data & acquisition B2B",
      context: "PME sans pipeline commercial structuré",
      action: "Système d'acquisition automatisé : scraping, scoring, CRM IA",
      result: "Pipeline x5",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Abel SALAH | Expert IA pour Entreprises en France - Audit, Stratégie & Déploiement"
        description="Expert en intelligence artificielle pour les entreprises. Audit IA gratuit, automatisation des processus, stratégie data et déploiement de solutions IA sur mesure. 16 ans d'expérience, 62 projets réalisés."
        canonical="/"
      />
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 md:px-6 pt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
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
                16 ans sur le terrain du business. Aujourd'hui, j'aide les entreprises 
                à intégrer l'IA là où ça compte : ventes, opérations, stratégie.
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

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block lg:col-span-5"
            >
              <div className="relative p-4">
                <img
                  src={abelHero}
                  alt="Abel SALAH — Expert IA pour Entreprises"
                  className="w-full max-h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4 -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-24 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="heading-display text-6xl md:text-8xl text-primary">
                  {stat.value}
                </span>
                <p className="text-muted-foreground text-lg mt-2 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
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
      <section className="py-32 px-4 md:px-6 border-t border-border bg-gradient-to-b from-transparent to-[hsl(var(--primary)/0.03)]">
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
            <button
              onClick={() => window.__openCalendly?.()}
              className="inline-flex items-center gap-4 text-xl font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-12 py-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              Réservez un appel
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
