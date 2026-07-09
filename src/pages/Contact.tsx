import { motion } from "framer-motion";
import { Linkedin, Youtube } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { TIDYCAL_BOOKING_URL } from "@/lib/booking";

const Contact = () => {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <SEOHead
        title="Prendre RDV Expert IA | Audit Gratuit — Abel SALAH"
        description="Réservez votre audit IA gratuit avec Abel SALAH. Réponse sous 24h, accompagnement personnalisé pour PME et ETI. Prenez rendez-vous en ligne."
        canonical="/contact"
        breadcrumbs={[{ name: "Accueil", path: "/" }, { name: "Contact", path: "/contact" }]}
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
            Contact
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Un projet en tête ? Réservez un créneau directement dans mon agenda.
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-16">
          {/* TidyCal Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 md:col-span-7"
          >
            <div className="w-full rounded-lg overflow-hidden border border-border" style={{ height: "700px" }}>
              <iframe
                src={TIDYCAL_BOOKING_URL}
                width="100%"
                height="100%"
                frameBorder="0"
                title="TidyCal - Prendre RDV avec Abel SALAH"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-12 md:col-span-5"
          >
            <div className="space-y-12">
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  Temps de réponse
                </span>
                <p className="text-2xl text-foreground">Sous 24 heures</p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  Comment ça se passe
                </span>
                <ul className="space-y-2 text-lg text-muted-foreground">
                  <li>• Choisissez un créneau</li>
                  <li>• Appel découverte de 30 min</li>
                  <li>• Proposition sous 48h</li>
                </ul>
              </div>

              <div className="border-t border-border pt-12">
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  Pas encore prêt ?
                </span>
                <p className="text-lg text-foreground">
                  Pas de souci. Réservez quand même.
                  <br />
                  <span className="text-primary">Discutons simplement.</span>
                </p>
              </div>

              <div className="border-t border-border pt-12">
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  Suivez-moi
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/abel-salah/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-12 h-12 border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-colors text-foreground"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.youtube.com/@abelsalah"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-12 h-12 border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-colors text-foreground"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
