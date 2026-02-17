import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

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

const Work = () => {
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
            Work
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Selected projects where strategy met execution. 
            Real results, real impact.
          </p>
        </motion.div>

        {/* Projects */}
        <div>
          {projects.map((project, index) => (
            <ProjectCard key={project.number} {...project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20 mt-20 text-center"
        >
          <p className="text-2xl text-muted-foreground mb-4">
            Like what you see?
          </p>
          <p className="heading-display text-4xl md:text-5xl">
            Let's create <span className="text-primary">your</span> case study.
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default Work;
