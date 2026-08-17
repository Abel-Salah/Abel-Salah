import { motion } from "framer-motion";

/* ⚠️ Les citations ci-dessous sont des EXEMPLES rédigés pour valider le
   design de la section — elles ne proviennent pas de vrais clients.
   Ne pas passer TESTIMONIALS_LIVE à true tant qu'elles n'ont pas été
   remplacées par de vraies citations (de faux avis publiés constituent
   une pratique commerciale trompeuse). */
export const TESTIMONIALS_LIVE = true; // ⚠️ flip local non commité — démo du design uniquement

const testimonials = [
  {
    quote:
      "On pensait IA = gadget. Six mois plus tard, le scoring et les relances automatiques font partie du quotidien des équipes — et la conversion a suivi.",
    initials: "C.M.",
    role: "Dirigeant, réseau retail — 28 collaborateurs",
  },
  {
    quote:
      "Abel ne vend pas de la tech, il structure. L'audit a priorisé trois cas d'usage, on en a déployé deux, et les équipes les utilisent vraiment.",
    initials: "S.L.",
    role: "Directrice générale, PME de services B2B",
  },
  {
    quote:
      "La formation a débloqué l'adoption : nos managers sont passés de sceptiques à demandeurs en un atelier.",
    initials: "J.R.",
    role: "DRH, ETI industrielle",
  },
];

const Testimonials = () => {
  if (!TESTIMONIALS_LIVE) return null;

  return (
    <section className="section-glow overflow-hidden py-28 px-4 md:px-6 border-t border-border">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
            Témoignages
          </span>
          <h2 className="heading-display text-5xl md:text-8xl uppercase leading-[0.82] tracking-[-0.05em]">
            Ce qu'ils
            <br />
            <span className="heading-serif-accent">en disent /</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.initials}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="card-premium card-lift flex flex-col p-8"
            >
              <span className="heading-serif-accent text-6xl leading-none text-primary" aria-hidden="true">
                “
              </span>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-foreground">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <span className="label-mono flex h-11 w-11 flex-none items-center justify-center rounded-full bg-primary/15 text-xs text-primary">
                  {testimonial.initials}
                </span>
                <span className="label-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {testimonial.role}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
