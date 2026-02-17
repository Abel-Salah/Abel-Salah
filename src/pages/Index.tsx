import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CopyReveal from "@/components/CopyReveal";
import ProjectCard from "@/components/ProjectCard";

const Index = () => {
  const copyExamples = [
    {
      before: "We're the best solution in the market",
      after: "Your reports done in 3 clicks. No training needed.",
    },
    {
      before: "Our innovative platform helps businesses",
      after: "Cut 10 hours of manual work. Every week.",
    },
    {
      before: "Contact us to learn more",
      after: "Book a 15-min demo. See results before you commit.",
    },
  ];

  const projects = [
    {
      number: "01",
      title: "Analytics Dashboard Rebrand",
      context: "B2B SaaS with complex data visualization",
      action: "Rewrote the entire dashboard copy for clarity and action",
      result: "+42% user activation",
    },
    {
      number: "02",
      title: "Fintech App Launch",
      context: "Mobile banking app entering Australian market",
      action: "Created brand voice, onboarding flows, and in-app copy",
      result: "3x more signups",
    },
    {
      number: "03",
      title: "Email Lifecycle Overhaul",
      context: "E-commerce brand with high churn",
      action: "Strategic 12-email sequence with behavioral triggers",
      result: "-28% churn rate",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 md:px-6 pt-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl"
          >
            <h1 className="heading-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] mb-8">
              Words don't sell.
              <span className="text-primary"> Strategy does.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mt-12 mb-16"
          >
            I'm Liam Fletcher — strategic copywriter based in Melbourne. 
            I help startups and digital products move people to action.
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
              See the work
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
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
              The difference
            </span>
            <h2 className="heading-display text-4xl md:text-6xl">
              Generic vs. Strategic
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
              Selected work
            </span>
            <h2 className="heading-display text-4xl md:text-6xl">
              Projects that <span className="text-primary">convert</span>
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
              View all projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="heading-display text-5xl md:text-7xl mb-12"
          >
            Ready to convert?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 text-xl font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-12 py-6 hover:bg-primary/90 transition-colors"
            >
              Start a project
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
