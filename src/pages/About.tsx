import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Youtube, ArrowUpRight, Download } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { ventures } from "@/data/ventures";
import { aboutAlternates, aboutCanonicalByLocale, aboutLocales } from "@/data/aboutLocales";
import { cvCanonicalByLocale } from "@/data/cvLocales";
import { productsCanonicalByLocale } from "@/data/productsLocales";
import type { PageLocale } from "@/data/workLocales";

const About = ({ locale = "fr" }: { locale?: PageLocale }) => {
  const t = aboutLocales[locale];

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDescription}
        canonical={aboutCanonicalByLocale[locale]}
        lang={locale}
        alternates={aboutAlternates}
        breadcrumbs={[
          { name: t.breadcrumbHome, path: locale === "fr" ? "/" : `/${locale}` },
          { name: t.breadcrumbSelf, path: aboutCanonicalByLocale[locale] },
        ]}
      />

      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20">

          <h1 className="heading-display text-[clamp(3rem,10vw,10rem)] leading-[0.85] mb-8">
            {t.title}
          </h1>
        </motion.div>

        {/* Main Content with Photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">

          {/* Photo */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-4">

              <img
                alt={t.photoAlt}
                className="w-full max-w-sm grayscale hover:grayscale-0 transition-all duration-500"
                src="/lovable-uploads/c01cf145-c272-4f46-ae5d-c1aebfcf3888.webp"
                width={1024}
                height={1536}
                loading="lazy"
                decoding="async"
              />

              <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4 -z-10" />
            </motion.div>
            <p className="text-sm text-muted-foreground mt-6 uppercase tracking-wider">
              {t.location}
            </p>
          </div>

          {/* Text */}
          <div className="lg:col-span-8">
            <p className="text-3xl md:text-4xl leading-relaxed text-foreground mb-8">
              {t.statementLine1}
              <br />
              <span className="text-primary">{t.statementHighlight}</span>
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">{t.paragraph1}</p>
            <p className="text-xl text-muted-foreground leading-relaxed">{t.paragraph2}</p>
          </div>
        </motion.div>

        {/* Services & Clients Grid */}
        {/* grid-cols-12 sans override mobile : les 11 gaps fixes entre colonnes
            restaient incompressibles même à colonnes nulles → débordement horizontal. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border pt-20">
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6">

            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
              {t.servicesTitle}
            </span>
            <ul className="space-y-4">
              {t.services.map((service, index) =>
              <motion.li
                key={service}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="text-2xl text-foreground hover:text-primary transition-colors cursor-default">

                  {service}
                </motion.li>
              )}
            </ul>
          </motion.div>

          {/* Clients */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6">

            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
              {t.clientsTitle}
            </span>
            <ul className="space-y-4">
              {t.clients.map((client, index) =>
              <motion.li
                key={client}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="text-2xl text-foreground hover:text-primary transition-colors cursor-default">

                  {client}
                </motion.li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Certifications & Partenariats */}
        <div className="border-t border-border pt-20 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}>

            <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
              {t.recognitionTitle}
            </span>
            <ul className="space-y-4">
              {t.certifications.map((cert, index) =>
              <motion.li
                key={cert}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="text-2xl text-foreground hover:text-primary transition-colors cursor-default">

                  {cert}
                </motion.li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Retrouvez-moi */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20 mt-20">

          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
            {t.findMeTitle}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://www.linkedin.com/in/abel-salah/"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-border hover:border-primary transition-colors p-8 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Linkedin className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl text-foreground group-hover:text-primary transition-colors">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">{t.linkedinSub}</p>
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="https://www.youtube.com/@abelsalah"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-border hover:border-primary transition-colors p-8 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Youtube className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl text-foreground group-hover:text-primary transition-colors">YouTube</p>
                  <p className="text-sm text-muted-foreground">{t.youtubeSub}</p>
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </a>
            <Link
              to={cvCanonicalByLocale[locale]}
              className="group border border-border hover:border-primary transition-colors p-8 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Download className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl text-foreground group-hover:text-primary transition-colors">{t.cvTitle}</p>
                  <p className="text-sm text-muted-foreground">{t.cvSub}</p>
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </motion.div>

        {/* Ce que je construis — teaser /ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20 mt-20">

          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
            {t.buildingTitle}
          </span>
          <p className="text-2xl md:text-3xl text-foreground leading-snug mb-12 max-w-3xl">
            {t.buildingPre}
            <span className="text-primary">{t.buildingHighlight}</span>
            {t.buildingPost}
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {ventures.map((v) => (
              <li key={v.domain} className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{v.number}</p>
                <p className="text-lg md:text-xl text-foreground font-medium leading-tight">{v.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{v.domain}</p>
              </li>
            ))}
          </ul>
          <Link
            to={productsCanonicalByLocale[locale]}
            className="inline-flex items-center gap-2 text-lg text-foreground hover:text-primary transition-colors group story-link"
          >
            {t.ecosystemLink}
            <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20 mt-20">

          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
            {t.philosophyTitle}
          </span>
          <blockquote className="heading-display text-4xl md:text-6xl leading-tight">
            {t.quoteLine1}
            <br />
            <span className="text-primary">{t.quoteLine2}</span>
          </blockquote>
        </motion.div>
      </div>
    </main>);

};

export default About;
