import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
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
            Contact
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Un projet en tête ? Parlons de la façon dont l'IA peut
            accélérer vos résultats.
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-16">
          {/* Form */}
          <div className="col-span-12 md:col-span-7">
            <ContactForm />
          </div>

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
                  Quoi inclure
                </span>
                <ul className="space-y-2 text-lg text-muted-foreground">
                  <li>• Description rapide du projet</li>
                  <li>• Délais envisagés</li>
                  <li>• Budget estimé (optionnel)</li>
                </ul>
              </div>

              <div className="border-t border-border pt-12">
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  Pas encore prêt ?
                </span>
                <p className="text-lg text-foreground">
                  Pas de souci. Envoyez un message quand même.
                  <br />
                  <span className="text-primary">Discutons simplement.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
