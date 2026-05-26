import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { ventures } from "@/data/ventures";

const Ecosystem = () => {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <SEOHead
        title="Écosystème | Produits IA construits par Abel SALAH"
        description="Les 4 produits IA conçus et opérés par Abel SALAH : SCALLUP, SKILL LMS, Formateurs.pro et Immo Montpellier. La preuve par l'exécution."
        canonical="/ecosystem"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Écosystème", path: "/ecosystem" },
        ]}
      />

      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-8">
            Preuves d'exécution
          </span>
          <h1 className="heading-display text-[clamp(3rem,10vw,10rem)] leading-[0.85] mb-12">
            Écosystème
          </h1>
          <p className="text-2xl md:text-3xl text-foreground max-w-3xl leading-relaxed">
            Je ne théorise pas l'IA.
            <br />
            <span className="text-primary">Je la construis.</span>
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mt-8 leading-relaxed">
            Avant de déployer l'IA chez vous, je l'ai déployée chez moi.
            Voici les 4 produits que je conçois et opère — chacun est une preuve
            concrète d'une capacité que j'apporte ensuite à mes clients.
          </p>
        </motion.div>

        {/* Ventures */}
        <div>
          {ventures.map((venture, index) => (
            <motion.article
              key={venture.domain}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-t border-border py-20 md:py-28"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="lg:col-span-7">
                  <a
                    href={venture.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative overflow-hidden border border-border hover:border-primary transition-colors"
                  >
                    <img
                      src={venture.image}
                      alt={`${venture.name} — ${venture.tagline}`}
                      loading="lazy"
                      width={1920}
                      height={1216}
                      className="w-full h-auto grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-background/90 backdrop-blur-sm border border-border group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </a>
                </div>

                {/* Text */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-baseline gap-6">
                    <span className="heading-display text-3xl md:text-4xl text-muted-foreground/40">
                      {venture.number}
                    </span>
                    <a
                      href={venture.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
                    >
                      {venture.domain} ↗
                    </a>
                  </div>

                  <h2 className="heading-display text-4xl md:text-5xl leading-tight">
                    <a
                      href={venture.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {venture.name}
                    </a>
                  </h2>

                  <p className="text-2xl text-foreground leading-snug">
                    {venture.tagline}
                  </p>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    {venture.pitch}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    {venture.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="heading-display text-2xl md:text-3xl text-primary">
                          {m.value}
                        </p>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Proof */}
                  <div className="pt-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                      Ce que ça prouve
                    </span>
                    <p className="text-lg text-primary font-medium leading-snug">
                      {venture.proof}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20 mt-12 text-center"
        >
          <p className="text-xl text-muted-foreground mb-4">
            Vous voulez ce niveau d'exécution IA dans votre entreprise ?
          </p>
          <Link
            to="/contact"
            className="heading-display text-4xl md:text-5xl inline-block hover:text-primary transition-colors"
          >
            Parlons-en <span className="text-primary">→</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default Ecosystem;
