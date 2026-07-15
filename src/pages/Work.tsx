import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import SEOHead from "@/components/SEOHead";
import { workAlternates, workCanonicalByLocale, workLocales, type PageLocale } from "@/data/workLocales";

const Work = ({ locale = "fr" }: { locale?: PageLocale }) => {
  const t = workLocales[locale];

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDescription}
        canonical={workCanonicalByLocale[locale]}
        lang={locale}
        alternates={workAlternates}
        breadcrumbs={[
          { name: t.breadcrumbHome, path: locale === "fr" ? "/" : `/${locale}` },
          { name: t.breadcrumbSelf, path: workCanonicalByLocale[locale] },
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
          <h1 className="heading-display text-[clamp(3rem,10vw,10rem)] leading-[0.85] mb-8">
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">{t.intro}</p>
        </motion.div>

        {/* Projects */}
        <div>
          {t.projects.map((project, index) => (
            <ProjectCard key={project.number} {...project} labels={t.cardLabels} index={index} />
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
          <p className="text-2xl text-muted-foreground mb-4">{t.ctaLine}</p>
          <p className="heading-display text-4xl md:text-5xl">
            {t.ctaPre}
            <span className="text-primary">{t.ctaHighlight}</span>
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default Work;
