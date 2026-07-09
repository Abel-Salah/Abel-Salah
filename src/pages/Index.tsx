import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import CopyReveal from "@/components/CopyReveal";
import ProjectCard from "@/components/ProjectCard";
import SEOHead from "@/components/SEOHead";
import cvAsset from "@/assets/cv-abel-salah-consultant-ia.pdf.asset.json";
import BookingCTA from "@/components/BookingCTA";

const stats = [
{ value: "16+", label: "ans d'expérience" },
{ value: "60+", label: "projets & chantiers pilotés" },
{ value: "IA", label: "ventes, ops & stratégie" }];


const Index = () => {
  const copyExamples = [
  {
    before: "On fait tout manuellement",
    after: "Automatisez 80 % des tâches répétitives avec l'IA"
  },
  {
    before: "L'IA, c'est trop complexe pour nous",
    after: "Un plan d'action clair, des résultats en 3 mois"
  },
  {
    before: "On ne sait pas par où commencer",
    after: "Audit IA gratuit. Priorisez ce qui compte vraiment."
  }];


  const projects = [
  {
    number: "01",
    title: "IA au service de la force de vente",
    context: "Réseau de distribution, 28 commerciaux, processus manuels",
    action: "Automatisation du scoring leads et prévision des ventes par IA",
    result: "conversion améliorée"
  },
  {
    number: "02",
    title: "Digitalisation des processus RH avec l'IA",
    context: "Entreprise en hypercroissance, onboarding et formation non structurés",
    action: "Déploiement d'un LMS intelligent avec parcours personnalisés par IA",
    result: "onboarding accéléré"
  },
  {
    number: "03",
    title: "Stratégie data & acquisition B2B",
    context: "PME sans pipeline commercial structuré",
    action: "Système d'acquisition automatisé : scraping, scoring, CRM IA",
    result: "pipeline structuré"
  }];


  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Expert IA pour Entreprises | Audit Gratuit — Abel SALAH"
        description="Audit IA gratuit pour PME & ETI. Identifiez les bons cas d'usage, automatisez vos processus et construisez une feuille de route IA réaliste."
        canonical="/"
        breadcrumbs={[{ name: "Accueil", path: "/" }]}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 md:px-6 pt-20 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-6xl">

                <h1 className="heading-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] mb-8">
                  L'IA ne remplace pas votre entreprise.
                  <span className="text-primary"> Elle l'accélère.</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl mt-12 mb-16">

                16 ans sur le terrain. Aujourd'hui, j'aide les entreprises 
                à intégrer l'IA là où ça compte : ventes, opérations, stratégie.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">

                <Link
                  to="/work"
                  className="inline-flex items-center gap-4 text-xl font-semibold uppercase tracking-wider text-primary hover:gap-6 transition-all group">

                  Voir les réalisations
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>

                <a
                  href={cvAsset.url}
                  download
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm font-medium text-muted-foreground hover:text-primary">

                  <Download className="w-4 h-4" />
                  Télécharger mon CV (PDF)
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Portrait — collé en bas à droite */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block absolute bottom-0 right-[5%] w-[34%] max-w-[520px]">

          <img
            src="/optimized/abel-hero.jpg"
            alt="Abel SALAH — Expert IA pour Entreprises"
            width={780}
            height={1040}
            className="w-full object-contain"
          />

        </motion.div>
      </section>

      {/* Key Stats Section */}
      <section className="py-24 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {stats.map((stat, index) =>
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center">

                <span className="heading-display text-6xl md:text-8xl text-primary">
                  {stat.value}
                </span>
                <p className="text-muted-foreground text-lg mt-2 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            )}
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
            className="mb-20">

            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
              La différence
            </span>
            <h2 className="heading-display text-4xl md:text-6xl">
              Avant l'IA vs. Avec l'IA
            </h2>
          </motion.div>

          <div className="space-y-12">
            {copyExamples.map((example, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-l-2 border-border hover:border-primary transition-colors pl-8 py-4">

                <CopyReveal
                before={example.before}
                after={example.after}
                className="text-2xl md:text-3xl" />

              </motion.div>
            )}
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
            className="mb-16">

            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
              Cas d'usage
            </span>
            <h2 className="heading-display text-4xl md:text-6xl">
              Des projets qui <span className="text-primary">transforment</span>
            </h2>
          </motion.div>

          <div>
            {projects.map((project, index) =>
            <ProjectCard key={project.number} {...project} index={index} />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12">

            <Link
              to="/work"
              className="inline-flex items-center gap-4 text-lg font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-all group">

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
            className="heading-display text-5xl md:text-7xl mb-12">

            Prêt à passer à l'action ?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}>

            <BookingCTA
              source="home_final_cta"
              className="inline-flex items-center gap-4 text-xl font-semibold uppercase tracking-wider px-12 py-6">

              Réservez un appel
              <ArrowRight className="w-6 h-6" />
            </BookingCTA>
          </motion.div>
        </div>
      </section>
    </main>);

};

export default Index;
