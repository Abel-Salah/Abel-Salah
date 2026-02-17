import { motion } from "framer-motion";
import liamPortrait from "@/assets/liam-fletcher-portrait.jpg";

const services = [
  "Audit IA",
  "Stratégie d'implémentation",
  "Formation des équipes",
  "Automatisation des processus",
  "Conseil en data & IA",
  "Accompagnement au changement",
];

const clients = [
  "Dirigeants & CEO",
  "Directeurs de la transformation",
  "Équipes produit",
  "DSI & CTO",
  "PME & grands groupes",
];

const About = () => {
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
            À propos
          </h1>
        </motion.div>

        {/* Main Content with Photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32"
        >
          {/* Photo */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img 
                src={liamPortrait} 
                alt="Abel SALAH — Expert IA en Entreprise"
                className="w-full max-w-sm grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4 -z-10" />
            </motion.div>
            <p className="text-sm text-muted-foreground mt-6 uppercase tracking-wider">
              France
            </p>
          </div>

          {/* Text */}
          <div className="lg:col-span-8">
            <p className="text-3xl md:text-4xl leading-relaxed text-foreground mb-8">
              Je ne vends pas de la technologie.
              <br />
              <span className="text-primary">
                Je crée de la valeur business avec l'IA.
              </span>
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Mon travail se situe à l'intersection de la stratégie, de la data
              et des objectifs métier. Chaque recommandation, chaque déploiement,
              chaque formation est fondé sur l'analyse, testé en conditions réelles
              et optimisé pour des résultats concrets.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Après 8 ans d'expérience dans la transformation digitale et l'IA
              auprès de startups, PME et grands groupes en France et au-delà,
              j'ai compris une chose : la clarté de la stratégie fait toute la différence.
              Le reste, c'est du bruit.
            </p>
          </div>
        </motion.div>

        {/* Services & Clients Grid */}
        <div className="grid grid-cols-12 gap-8 border-t border-border pt-20">
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6"
          >
            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
              Services
            </span>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="text-2xl text-foreground hover:text-primary transition-colors cursor-default"
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Clients */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6"
          >
            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
              Avec qui je travaille
            </span>
            <ul className="space-y-4">
              {clients.map((client, index) => (
                <motion.li
                  key={client}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="text-2xl text-foreground hover:text-primary transition-colors cursor-default"
                >
                  {client}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20 mt-20"
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
            Philosophie
          </span>
          <blockquote className="heading-display text-4xl md:text-6xl leading-tight">
            "L'IA mal déployée coûte cher.
            <br />
            <span className="text-primary">L'IA bien déployée change tout."</span>
          </blockquote>
        </motion.div>
      </div>
    </main>
  );
};

export default About;
