import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { workCanonicalByLocale } from "@/data/workLocales";
import {
  homeAlternates,
  homeContent,
  type HomeLocale,
  TIDYCAL_BOOKING_URL,
} from "@/data/homeLocales";
import { trackConversionEvent } from "@/lib/conversionEvents";

interface IndexProps {
  locale?: HomeLocale;
}

const Index = ({ locale = "fr" }: IndexProps) => {
  const [showIntroCard, setShowIntroCard] = useState(false);
  const content = homeContent[locale];
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const ribbonsParallax = useTransform(scrollY, [0, 900], [0, 110]);

  useEffect(() => {
    if (sessionStorage.getItem("abel-intro-card-seen") === "true") return;

    const showOnce = () => {
      if (sessionStorage.getItem("abel-intro-card-seen") === "true") return;
      sessionStorage.setItem("abel-intro-card-seen", "true");
      setShowIntroCard(true);
      window.removeEventListener("mouseleave", handleExitIntent);
      window.removeEventListener("scroll", handleMobileScroll);
    };

    const handleExitIntent = (event: MouseEvent) => {
      if (event.clientY <= 0 && window.innerWidth >= 768) showOnce();
    };

    const handleMobileScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (window.innerWidth < 768 && scrollableHeight > 0 && window.scrollY / scrollableHeight >= 0.5) showOnce();
    };

    window.addEventListener("mouseleave", handleExitIntent);
    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    return () => {
      window.removeEventListener("mouseleave", handleExitIntent);
      window.removeEventListener("scroll", handleMobileScroll);
    };
  }, []);

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
        <div className="home-hero-backdrop absolute inset-0" />
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : ribbonsParallax, rotate: -34 }}
          className="absolute right-[-8vw] top-0 h-[72vh] w-[58vw] overflow-hidden opacity-90 blur-[0.2px]"
        >
          <motion.div
            initial={{ x: 90, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="home-hero-ribbons h-full w-full shadow-[0_0_120px_rgba(37,99,235,0.45)]"
          />
        </motion.div>
        <div className="home-hero-grain pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative mx-auto min-h-[calc(100vh-8rem)]">
          <div className="grid min-h-[calc(100vh-8rem)] grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-9">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-6xl">
                <div className="mb-8 flex items-center gap-3 text-muted-foreground">
                  <span className="h-3 w-3 rounded-full bg-[#ffa600] shadow-[0_0_28px_rgba(255,166,0,0.8)]" />
                  <span className="label-mono text-xs uppercase tracking-[0.18em]">{content.eyebrow}</span>
                </div>
                <h1 className="heading-display text-[clamp(3rem,12.5vw,11rem)] uppercase leading-[0.76] tracking-[-0.07em] mb-8">
                  {content.heroTop}
                  <span className="text-primary">{" *"}</span>
                  <br />
                  {content.heroBottom}
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
                  onClick={() =>
                    trackConversionEvent("book_call_click", `home_hero_${locale}`, TIDYCAL_BOOKING_URL)
                  }
                  className="cta-glow inline-flex items-center gap-4 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:gap-6 transition-all group">

                  {content.primaryCta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
            width={1070}
            height={1604}
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>

        {showIntroCard && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="fixed bottom-6 right-6 z-40 hidden w-[260px] overflow-hidden rounded-3xl border border-border bg-card/90 shadow-2xl shadow-black/20 backdrop-blur-xl md:block"
          >
            <button
              type="button"
              aria-label={content.closeIntroLabel}
              onClick={() => setShowIntroCard(false)}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/70 text-background hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <a
              href={TIDYCAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackConversionEvent("book_call_click", `home_intro_card_${locale}`, TIDYCAL_BOOKING_URL)
              }
              className="block transition-transform hover:-translate-y-1"
            >
              <div className="intro-card-media relative aspect-[9/12]">
                <img
                  src="/lovable-uploads/c01cf145-c272-4f46-ae5d-c1aebfcf3888.webp"
                  alt={content.videoAlt}
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-90"
                  loading="lazy"
                  width={1024}
                  height={1536}
                  decoding="async"
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
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="text-center">

                <span className="heading-display text-6xl md:text-8xl text-primary">
                  {stat.value}
                </span>
                <p className="label-mono text-muted-foreground text-sm mt-3 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="section-glow overflow-hidden py-28 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
                {content.proofLabel}
              </span>
              <h2 className="heading-display text-4xl md:text-7xl uppercase leading-[0.9] tracking-[-0.045em]">
                {content.proofTitleTop}
                <br />
                <span className="heading-serif-accent">{content.proofTitleBottom}</span>
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {content.proofIntro}
              </p>
              <Link
                to="/outils/calculateur-taches-manuelles"
                onClick={() => trackConversionEvent("offer_cta_click", `manual_work_calculator_${locale}`, "/outils/calculateur-taches-manuelles")}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Estimer maintenant <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <div className="divide-y divide-border border-y border-border lg:col-span-7">
              {content.proofItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className="grid gap-6 py-8 md:grid-cols-[120px_1fr]"
                >
                  <span className="heading-display text-5xl text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-glow overflow-hidden py-28 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
              {content.beforeAfterLabel}
            </span>
            <h2 className="heading-display text-5xl md:text-8xl uppercase leading-[0.82] tracking-[-0.05em]">
              {content.beforeAfterTitleTop}
              <br />
              <span className="text-gradient-primary">{content.beforeAfterTitleBottom}</span>
            </h2>
          </motion.div>

          <div className="divide-y divide-border border-y border-border">
            {content.beforeAfterItems.map((item, index) => (
              <motion.div
                key={item.area}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-8 py-10 md:grid-cols-12 md:items-start"
              >
                <div className="md:col-span-3">
                  <span className="label-mono text-xs uppercase tracking-[0.2em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold">{item.area}</h3>
                </div>
                <div className="grid gap-6 md:col-span-9 md:grid-cols-2">
                  <div className="border border-border bg-card/25 p-6">
                    <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {content.beforeAfterBefore}
                    </span>
                    <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                      {item.before}
                    </p>
                  </div>
                  <div className="border border-primary/45 bg-primary/5 p-6">
                    <span className="label-mono text-xs uppercase tracking-[0.2em] text-primary">
                      {content.beforeAfterAfter}
                    </span>
                    <p className="mt-5 text-lg leading-relaxed text-foreground">
                      {item.after}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-glow overflow-hidden py-28 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mb-20">

            <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
              {content.servicesLabel}
            </span>
            <h2 className="heading-display text-5xl md:text-8xl uppercase leading-[0.82] tracking-[-0.05em]">
              {content.servicesTitleTop}
              <br />
              <span className="heading-serif-accent">{content.servicesTitleBottom}</span>
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
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group card-premium min-h-[420px] p-8 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
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
                <Link
                  to={service.href}
                  className="mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                >
                  {content.serviceCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-glow overflow-hidden py-32 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mb-16">

            <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
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
                transition={{ duration: 0.4, delay: index * 0.05 }}
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
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mt-12">

            <Link
              to={workCanonicalByLocale[locale]}
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
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="heading-display text-5xl md:text-7xl mb-12">

            {content.finalTitle}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}>

            <a
              href={TIDYCAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackConversionEvent("book_call_click", `home_final_${locale}`, TIDYCAL_BOOKING_URL)
              }
              className="cta-glow inline-flex items-center gap-4 text-xl font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-12 py-6 rounded-lg hover:opacity-90 transition-opacity">

              {content.finalCta}
              <ArrowRight className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>);

};

export default Index;
