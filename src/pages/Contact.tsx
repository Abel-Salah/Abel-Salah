import { motion } from "framer-motion";
import { Linkedin, Youtube } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { TIDYCAL_BOOKING_URL } from "@/data/homeLocales";
import { contactAlternates, contactCanonicalByLocale, contactLocales } from "@/data/contactLocales";
import type { PageLocale } from "@/data/workLocales";

const Contact = ({ locale = "fr" }: { locale?: PageLocale }) => {
  const t = contactLocales[locale];

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDescription}
        canonical={contactCanonicalByLocale[locale]}
        lang={locale}
        alternates={contactAlternates}
        breadcrumbs={[
          { name: t.breadcrumbHome, path: locale === "fr" ? "/" : `/${locale}` },
          { name: t.breadcrumbSelf, path: contactCanonicalByLocale[locale] },
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
          <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
            {t.eyebrow}
          </span>
          <h1 className="heading-display text-[clamp(3rem,10vw,10rem)] leading-[0.85] mb-8">
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">{t.intro}</p>
        </motion.div>

        {/* grid-cols-12 non responsive : sur mobile, les 11 gaps de gap-16 (64px)
            entre colonnes restent incompressibles même à colonnes nulles, ce qui
            forçait un débordement horizontal de ~700px. Une seule colonne en
            dessous de md supprime ces gaps internes. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Booking Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-7 min-w-0"
          >
            <div className="w-full rounded-lg overflow-hidden border border-border" style={{ height: "700px" }}>
              <iframe
                src={TIDYCAL_BOOKING_URL}
                width="100%"
                height="100%"
                frameBorder="0"
                title={t.iframeTitle}
                className="w-full h-full max-w-full"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-5"
          >
            <div className="space-y-12">
              <div>
                <span className="label-mono text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  {t.responseTimeTitle}
                </span>
                <p className="text-2xl text-foreground">{t.responseTimeValue}</p>
              </div>

              <div>
                <span className="label-mono text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  {t.howTitle}
                </span>
                <ul className="space-y-2 text-lg text-muted-foreground">
                  {t.howSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-12">
                <span className="label-mono text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  {t.notReadyTitle}
                </span>
                <p className="text-lg text-foreground">
                  {t.notReadyLine}
                  <br />
                  <span className="text-primary">{t.notReadyHighlight}</span>
                </p>
              </div>

              <div className="border-t border-border pt-12">
                <span className="label-mono text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  {t.followTitle}
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
