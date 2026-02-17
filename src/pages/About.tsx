import { motion } from "framer-motion";
import liamPortrait from "@/assets/liam-fletcher-portrait.jpg";

const services = [
  "Landing page copy",
  "Brand messaging & positioning",
  "Email sequences",
  "Website copy",
  "Product copy & UX writing",
  "Sales pages",
];

const clients = [
  "Founders & CEOs",
  "Growth teams",
  "Product managers",
  "Marketing leaders",
  "Startups & scale-ups",
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
            About
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
                alt="Liam Fletcher - Strategic Copywriter"
                className="w-full max-w-sm grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4 -z-10" />
            </motion.div>
            <p className="text-sm text-muted-foreground mt-6 uppercase tracking-wider">
              Melbourne, Australia
            </p>
          </div>

          {/* Text */}
          <div className="lg:col-span-8">
            <p className="text-3xl md:text-4xl leading-relaxed text-foreground mb-8">
              I don't write pretty words.
              <br />
              <span className="text-primary">
                I write copy that moves people to act.
              </span>
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              My work sits at the intersection of strategy, psychology, and
              business goals. Every headline, every CTA, every email is built on
              research, tested against reality, and optimized for results.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              After 8 years working with startups, agencies, and product teams across 
              Australia and beyond, I've learned one thing: clarity converts. 
              Everything else is noise.
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
              Who I work with
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
            Philosophy
          </span>
          <blockquote className="heading-display text-4xl md:text-6xl leading-tight">
            "Good copy is expensive.
            <br />
            <span className="text-primary">Bad copy is way more."</span>
          </blockquote>
        </motion.div>
      </div>
    </main>
  );
};

export default About;
