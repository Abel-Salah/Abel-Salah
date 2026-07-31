import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { locationBySlug, locations } from "@/data/locationLocales";
import { contactCanonicalByLocale } from "@/data/contactLocales";
import { TIDYCAL_BOOKING_URL } from "@/data/homeLocales";
import { trackConversionEvent } from "@/lib/conversionEvents";

const SITE_URL = "https://abelsalah.fr";

const Location = ({ slug }: { slug: string }) => {
  const t = locationBySlug[slug];
  const homePath = t.lang === "es" ? "/es" : "/";
  const otherCities = locations.filter((location) => location.slug !== slug);

  const localServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}${t.path}#localservice`,
    name: `Abel SALAH — ${t.kicker}`,
    description: t.seoDescription,
    url: `${SITE_URL}${t.path}`,
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Abel SALAH",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montpellier",
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "City", name: t.city },
      { "@type": "Country", name: t.country === "ES" ? "España" : "France" },
    ],
    availableLanguage: ["fr", "es", "en"],
    priceRange: "$$",
    potentialAction: {
      "@type": "ReserveAction",
      target: TIDYCAL_BOOKING_URL,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDescription}
        canonical={t.path}
        lang={t.lang}
        breadcrumbs={[
          { name: t.breadcrumbHome, path: homePath },
          { name: t.kicker, path: t.path },
        ]}
        jsonLd={[localServiceSchema, faqSchema]}
      />

      <div className="container mx-auto px-4 md:px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-[0.2em] mb-6">
            <MapPin className="w-4 h-4 text-primary" />
            {t.kicker}
          </p>
          <h1 className="heading-display text-4xl md:text-6xl mb-6">
            {t.titlePre}
            <span className="text-primary">{t.titleHighlight}</span>
          </h1>
          <div className="space-y-4">
            {t.intro.map((paragraph, index) => (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8">{t.servicesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.services.map((service) => (
              <div
                key={service.to}
                className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors flex flex-col"
              >
                <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 flex-1">{service.text}</p>
                <Link
                  to={service.to}
                  className="inline-flex items-center gap-1 py-2 text-sm text-primary font-medium hover:gap-2 transition-all"
                >
                  {service.linkLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Ancrage local */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.localTitle}</h2>
          <div className="space-y-4 mb-8">
            {t.local.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-4">
            {t.sectorsTitle}
          </h3>
          <div className="flex flex-wrap gap-2">
            {t.sectors.map((sector) => (
              <span key={sector} className="text-sm px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                {sector}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Modalités */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8">{t.termsTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {t.terms.map((term) => (
              <div key={term.label} className="border border-border rounded-lg p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-2">
                  {term.label}
                </p>
                <p className="text-foreground leading-relaxed">{term.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8">{t.faqTitle}</h2>
          <div className="space-y-8">
            {t.faq.map((item) => (
              <div key={item.q}>
                <h3 className="text-lg font-semibold mb-2">{item.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-lg border border-primary/30 bg-primary/5 text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.ctaTitle}</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t.ctaText}</p>
          <a
            href={TIDYCAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversionEvent("book_call_click", `location-${t.slug}`, TIDYCAL_BOOKING_URL)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {t.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="mt-4 text-sm">
            <Link to={contactCanonicalByLocale[t.lang]} className="text-primary hover:underline">
              {t.ctaContactLabel}
            </Link>
          </p>
        </motion.div>

        {/* Autres villes */}
        <section className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">
            {t.otherCitiesTitle}{" "}
            {otherCities.map((city, index) => (
              <span key={city.slug}>
                {index > 0 && " · "}
                <Link to={city.path} className="text-foreground hover:text-primary transition-colors font-medium">
                  {city.city}
                </Link>
              </span>
            ))}
          </p>
        </section>
      </div>
    </main>
  );
};

export default Location;
