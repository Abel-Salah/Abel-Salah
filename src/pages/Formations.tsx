import { motion } from "framer-motion";
import { ArrowRight, Banknote, GraduationCap, Package, Repeat, Rocket, Sparkles, TrendingUp, Users } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { TIDYCAL_BOOKING_URL } from "@/data/homeLocales";
import { trackConversionEvent } from "@/lib/conversionEvents";

const programs = [
  {
    number: "01",
    icon: Rocket,
    title: "Lancement d'entreprise",
    text: "Créer votre entreprise en partant de zéro : poser des fondations solides, construire une offre qui se vend et obtenir vos premiers clients.",
    bullets: ["Fondations & cadrage de l'offre", "Système de vente et premiers clients", "Bases légales, fiscales et outils"],
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Développement d'entreprise",
    text: "Faire grandir votre activité : acquisition commerciale, présence digitale et automatisations qui font gagner du temps chaque semaine.",
    bullets: ["Prospection & vente structurées", "Commerce + digital : tunnel et contenu", "Automatisations et outils IA"],
  },
  {
    number: "03",
    icon: Users,
    title: "Coaching mensuel",
    text: "Un accompagnement continu pour garder le cap : un rendez-vous chaque mois pour débloquer les priorités et ajuster la stratégie.",
    bullets: ["Point mensuel individuel", "Priorités et plan d'action", "Accès aux ressources et outils"],
  },
];

const steps = [
  {
    number: "01",
    title: "Vous rejoignez",
    badge: "Zéro prérequis",
    text: "Vous accédez à la formation, aux outils et aux ressources prêtes à l'emploi, même en partant de zéro.",
  },
  {
    number: "02",
    title: "Vous passez à l'action",
    badge: "Pas à pas",
    text: "Vous suivez la formation étape par étape, vous utilisez les outils fournis et vous vous appuyez sur ce qui marche déjà.",
  },
  {
    number: "03",
    title: "Vous encaissez",
    badge: "100 % pour vous",
    text: "Vous revendez les formations ou votre propre produit et vous gardez 100 %, grâce à plusieurs sources de revenus.",
  },
];

const revenues = [
  {
    icon: Repeat,
    title: "Revendre la formation",
    badge: "100 % pour vous",
    text: "Le plus simple pour commencer : vous rejoignez et vous pouvez revendre la formation en gardant tout pour vous.",
  },
  {
    icon: Banknote,
    title: "Commissions d'évolution",
    badge: "Jusqu'à 75 %",
    text: "Une exclusivité : même après avoir vendu un pack, votre client peut évoluer — et vous touchez jusqu'à 75 % du montant qu'il paie.",
  },
  {
    icon: Package,
    title: "Vendre vos produits digitaux",
    badge: "Marge 100 %",
    text: "Créez et vendez vos propres produits — formation, e-book, coaching — grâce aux outils fournis.",
  },
  {
    icon: Sparkles,
    title: "Et bien d'autres…",
    badge: "Bientôt",
    text: "Plusieurs nouvelles sources de revenus arrivent dans les prochains mois.",
  },
];

const Formations = () => (
  <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
    <SEOHead
      title="Formations & Coaching Business | Lancement, Développement — Abel SALAH"
      description="Formations pour lancer et développer votre entreprise (commerce, digital, automatisations) et coaching mensuel. Zéro prérequis : vous rejoignez, vous appliquez, vous encaissez."
      canonical="/formations"
      lang="fr"
      breadcrumbs={[
        { name: "Accueil", path: "/" },
        { name: "Formations", path: "/formations" },
      ]}
    />

    <div className="container mx-auto">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-20 max-w-4xl"
      >
        <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
          Formations & coaching
        </span>
        <h1 className="heading-display text-[clamp(2.75rem,10vw,9rem)] uppercase leading-[0.84] tracking-[-0.05em]">
          Formations
          <br />
          <span className="heading-serif-accent text-primary">qui passent à l'encaisse.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-xl leading-relaxed text-muted-foreground">
          Lancer votre entreprise, la développer — commerce, digital, automatisations — et un
          coaching mensuel pour tenir le rythme. Le principe est simple : vous rejoignez, vous
          appliquez, vous encaissez.
        </p>
      </motion.header>

      {/* Programmes */}
      <section className="border-t border-border pt-16 pb-8">
        <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-10">
          Trois programmes
        </span>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="card-premium card-lift flex min-h-[380px] flex-col p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    ({program.number})
                  </span>
                  <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <h2 className="heading-display mt-12 text-3xl md:text-4xl leading-none">
                  {program.title}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">{program.text}</p>
                <div className="mt-auto space-y-3 border-t border-border pt-6">
                  {program.bullets.map((bullet, bulletIndex) => (
                    <p key={bullet} className="text-sm text-foreground">
                      {String(bulletIndex + 1).padStart(2, "0")}. {bullet}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Le principe */}
      <section className="section-glow overflow-hidden border-t border-border py-20 mt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
              La méthode
            </span>
            <h2 className="heading-display text-5xl md:text-7xl uppercase leading-[0.85] tracking-[-0.05em]">
              Le principe
              <br />
              <span className="heading-serif-accent">est simple /</span>
            </h2>
          </motion.div>
          <div className="space-y-0 divide-y divide-border border-y border-border lg:col-span-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-8"
              >
                <span className="heading-display text-4xl text-primary">{step.number}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <span className="label-mono rounded-full border border-primary/40 px-3 py-1 text-[11px] uppercase tracking-wider text-primary">
                      {step.badge}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources de revenus */}
      <section className="border-t border-border py-20">
        <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
          Plusieurs sources de revenus
        </span>
        <h2 className="heading-display mb-12 text-5xl md:text-7xl uppercase leading-[0.85] tracking-[-0.05em]">
          Vous appliquez,
          <br />
          <span className="text-gradient-primary">vous encaissez /</span>
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {revenues.map((revenue, index) => {
            const Icon = revenue.icon;
            return (
              <motion.div
                key={revenue.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                viewport={{ once: true }}
                className="card-lift border border-border bg-card/30 p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                  <span className="label-mono rounded-full border border-primary/40 px-3 py-1 text-[11px] uppercase tracking-wider text-primary">
                    {revenue.badge}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold">{revenue.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{revenue.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-border py-20 text-center">
        <GraduationCap className="mx-auto mb-8 h-10 w-10 text-primary" aria-hidden="true" />
        <h2 className="heading-display text-5xl md:text-7xl">Prêt à vous lancer ?</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          On cadre votre situation et le bon programme en un appel — et vous repartez avec un plan
          clair, que vous rejoigniez ou non.
        </p>
        <a
          href={TIDYCAL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackConversionEvent("book_call_click", "formations_final", TIDYCAL_BOOKING_URL)
          }
          className="cta-glow mt-10 inline-flex items-center gap-4 rounded-full bg-primary px-9 py-5 text-lg font-semibold text-primary-foreground transition-all hover:gap-6"
        >
          Réserver un appel
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </a>
        <p className="label-mono mt-5 text-xs uppercase tracking-wider text-muted-foreground">
          Appel de 30 min · Gratuit · Sans engagement
        </p>
      </section>
    </div>
  </main>
);

export default Formations;
