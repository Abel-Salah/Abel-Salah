import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Download, X } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import cvAsset from "@/assets/cv-abel-salah-consultant-ia.pdf.asset.json";
import {
  homeAlternates,
  homeContent,
  type HomeLocale,
  TIDYCAL_BOOKING_URL,
} from "@/data/homeLocales";

interface IndexProps {
  locale?: HomeLocale;
}

const Index = ({ locale = "fr" }: IndexProps) => {
  const [showIntroCard, setShowIntroCard] = useState(true);
  const content = homeContent[locale];

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <SEOHead
        title={content.seoTitle}
        description={content.seoDescription}
        canonical={content.canonical}
        lang={locale}
        alternates={homeAlternates}
        breadcrumbs={[{ name: content.breadcrumb, path: content.canonical }]}
      />

      <section className="relative min-h-screen px-4 md:px-6 pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(39,91,255,0.45),transparent_32%),radial-gradient(circle_at_20%_20%,rgba(255,166,0,0.12),transparent_18%),linear-gradient(135deg,#030303_0%,#050712_45%,#020202_100%)]" />
        <div className="absolute right-[-8vw] top-0 h-[72vh] w-[58vw] rotate-[-34deg] overflow-hidden opacity-90 blur-[0.2px]">
          <motion.div
            initial={{ x: 90, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="h-full w-full bg-[repeating-linear-gradient(90deg,rgba(25,89,255,0.15)_0px,rgba(25,89,255,0.85)_70px,rgba(99,161,255,0.9)_112px,rgba(0,0,0,0.95)_150px)] shadow-[0_0_120px_rgba(37,99,235,0.45)]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative mx-auto min-h-[calc(100vh-8rem)]">
          <div className="grid min-h-[calc(100vh-8rem)] grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-9">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-6xl">
                <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="h-3 w-3 rounded-full bg-[#ffa600] shadow-[0_0_28px_rgba(255,166,0,0.8)]" />
                  <span>{content.eyebrow}</span>
                </div>
                <h1 className="heading-display text-[clamp(4.5rem,13vw,13rem)] uppercase leading-[0.76] tracking-[-0.07em] mb-8">
                  {content.heroTop}
                  <br />
                  {content.heroBottom}
                  <span className="text-primary"> *</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="text-xl md:text-2xl text-foreground max-w-xl leading-relaxed mb-12">
                {content.intro}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">

                <a
                  href={TIDYCAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:gap-6 transition-all group">

                  {content.primaryCta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </a>

                <a
                  href={cvAsset.url}
                  download
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-4 text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">

                  <Download className="w-4 h-4" />
                  {content.cvCta}
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden lg:block absolute bottom-0 right-[4%] w-[34%] max-w-[560px]">
          <img
            alt={content.portraitAlt}
            className="w-full object-contain drop-shadow-[0_35px_80px_rgba(0,0,0,0.65)]"
            src="/lovable-uploads/25c961c5-9b15-45eb-9b03-efab8873db58.webp"
          />
        </motion.div>

        {showIntroCard && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="fixed bottom-6 right-6 z-40 hidden w-[260px] overflow-hidden rounded-3xl border border-white/10 bg-[#111111]/90 shadow-2xl shadow-black/50 backdrop-blur-xl md:block"
          >
            <button
              type="button"
              aria-label={content.closeIntroLabel}
              onClick={() => setShowIntroCard(false)}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-primary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <a
              href={TIDYCAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[9/12] bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.6),transparent_34%),linear-gradient(180deg,#151515,#050505)]">
                <img
                  src="/lovable-uploads/c01cf145-c272-4f46-ae5d-c1aebfcf3888.webp"
                  alt={content.videoAlt}
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-90"
                  loading="lazy"
                />
                <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5">
                  <div className="mb-3 inline-flex rounded-full bg-[#ffa600] px-4 py-2 text-sm font-semibold text-white">
                    {content.videoHello}
                  </div>
                  <p className="text-lg font-bold leading-tight">
                    {content.videoText}
                  </p>
                </div>
              </div>
            </a>
          </motion.div>
        )}
      </section>

      <section className="py-24 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {content.stats.map((stat, index) =>
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center">

                <span className="heading-display text-6xl md:text-8xl text-primary">
                  {stat.value}
                </span>
                <p className="text-muted-foreground text-lg mt-2 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="py-28 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20">

            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
              {content.servicesLabel}
            </span>
            <h2 className="heading-display text-5xl md:text-8xl uppercase leading-[0.82] tracking-[-0.05em]">
              {content.servicesTitleTop}
              <br />
              {content.servicesTitleBottom}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {content.services.map((service, index) => {
              const Icon = service.icon;
              return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="group min-h-[420px] border border-border bg-card/35 p-8 hover:border-primary/60 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    ({service.number})
                  </span>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="heading-display mt-16 text-4xl md:text-5xl leading-none">
                  {service.title}
                </h3>
                <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                  {service.text}
                </p>
                <div className="mt-10 space-y-3 border-t border-border pt-6">
                  {service.bullets.map((bullet, bulletIndex) => (
                    <p key={bullet} className="text-sm text-foreground">
                      {String(bulletIndex + 1).padStart(2, "0")}. {bullet}
                    </p>
                  ))}
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16">

            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
              {content.missionLabel}
            </span>
            <h2 className="heading-display text-5xl md:text-8xl uppercase leading-[0.82] tracking-[-0.05em]">
              {content.missionTitleTop}
              <br />
              {content.missionTitleBottom}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-y border-border">
            {content.missionSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="min-h-[260px] border-border p-8 md:border-r last:border-r-0"
              >
                <span className="heading-display text-5xl text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-12 text-2xl font-semibold">{step}</h3>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12">

            <Link
              to="/work"
              className="inline-flex items-center gap-4 text-lg font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-all group">

              {content.workCta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 md:px-6 border-t border-border bg-gradient-to-b from-transparent to-[hsl(var(--primary)/0.03)]">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="heading-display text-5xl md:text-7xl mb-12">

            {content.finalTitle}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}>

            <a
              href={TIDYCAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-xl font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-12 py-6 rounded-lg hover:opacity-90 transition-opacity">

              {content.finalCta}
              <ArrowRight className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>);

};

export default Index;
