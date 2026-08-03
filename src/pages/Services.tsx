import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import SEOHead from "@/components/SEOHead";
import { offerPages } from "@/data/offerPages";

const services = [offerPages["audit-ia"], offerPages["automatisation-commerciale"], offerPages["formation-ia"]];

const Services = () => (
  <main className="min-h-screen bg-background px-4 pb-20 pt-32 md:px-6">
    <SEOHead
      title="Services IA pour entreprises | Audit, automatisation et formation — Abel SALAH"
      description="Découvrez les services d'Abel SALAH pour les entreprises : audit IA, déploiement d'automatisations commerciales et formation des équipes."
      canonical="/services"
      lang="fr"
      breadcrumbs={[{ name: "Accueil", path: "/" }, { name: "Services", path: "/services" }]}
    />

    <div className="container mx-auto">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 max-w-4xl"
      >
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Ce que je propose</p>
        <h1 className="heading-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.84] tracking-[-0.05em]">
          Des services IA<br /><span className="text-primary">qui passent à l'action.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-xl leading-relaxed text-muted-foreground">
          J'aide les dirigeants et les équipes à identifier les bons usages, déployer des systèmes utiles et faire adopter l'IA dans le travail réel.
        </p>
      </motion.header>

      <section aria-labelledby="services-title" className="grid gap-5 lg:grid-cols-3">
        <h2 id="services-title" className="sr-only">Services d'accompagnement IA</h2>
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.path}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="flex min-h-[390px] flex-col border border-border bg-card/30 p-7"
            >
              <Icon className="mb-10 h-8 w-8 text-primary" aria-hidden="true" />
              <p className="mb-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">{service.eyebrow}</p>
              <h3 className="mb-5 text-3xl font-semibold tracking-tight">{service.title}</h3>
              <p className="flex-1 leading-relaxed text-muted-foreground">{service.intro}</p>
              <Link to={service.path} className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">
                Découvrir l'accompagnement <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          );
        })}
      </section>

      <section className="mt-20 flex flex-col justify-between gap-8 border-t border-border pt-10 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Vous ne savez pas par où commencer ?</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">On clarifie votre priorité en 30 minutes.</h2>
        </div>
        <Link to="/contact" className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground">
          Échanger sur votre projet <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </div>
  </main>
);

export default Services;
