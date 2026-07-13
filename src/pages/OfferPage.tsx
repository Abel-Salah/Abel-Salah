import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { TIDYCAL_BOOKING_URL } from "@/data/homeLocales";
import { offerPages, type OfferSlug } from "@/data/offerPages";

interface OfferPageProps {
  slug: OfferSlug;
}

const OfferPage = ({ slug }: OfferPageProps) => {
  const offer = offerPages[slug];

  if (!offer) {
    return <Navigate to="/contact" replace />;
  }

  const Icon = offer.icon;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: offer.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <SEOHead
        title={offer.seoTitle}
        description={offer.seoDescription}
        canonical={offer.path}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: offer.title, path: offer.path },
        ]}
        jsonLd={faqSchema}
      />

      <section className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-8">
            <span className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Icon className="h-5 w-5 text-primary" />
              {offer.eyebrow}
            </span>
            <h1 className="heading-display text-[clamp(3.8rem,10vw,10rem)] uppercase leading-[0.82] tracking-[-0.05em]">
              {offer.title}
            </h1>
          </div>
          <p className="text-xl leading-relaxed text-muted-foreground lg:col-span-4">
            {offer.intro}
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {offer.outcomes.map((outcome, index) => (
            <motion.div
              key={outcome}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="min-h-[220px] border border-border bg-card/30 p-7"
            >
              <span className="heading-display text-5xl text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-10 text-lg leading-relaxed text-foreground">
                {outcome}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-border py-20">
        <div className="container mx-auto grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Méthode
            </span>
            <h2 className="heading-display mt-6 text-5xl uppercase leading-none md:text-7xl">
              Simple.
              <br />
              Mesurable.
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border lg:col-span-8">
            {offer.method.map((step, index) => (
              <div key={step} className="flex gap-5 py-7">
                <CheckCircle2 className="mt-1 h-6 w-6 flex-none text-primary" />
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Etape {index + 1}
                  </span>
                  <p className="mt-3 text-xl leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto py-20">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="border border-primary/40 bg-primary/5 p-8 lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.2em] text-primary">
              Preuve et prudence
            </span>
            <p className="mt-6 text-xl leading-relaxed">{offer.proof}</p>
          </div>
          <div className="border border-border p-8 lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Pages liées
            </span>
            <div className="mt-6 space-y-4">
              {offer.related.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center justify-between border-b border-border pb-4 text-lg hover:text-primary"
                >
                  {item.label}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto border-t border-border py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 className="heading-display text-5xl uppercase leading-none lg:col-span-4">
            Questions
          </h2>
          <div className="space-y-8 lg:col-span-8">
            {offer.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-2xl font-semibold">{item.question}</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto border-t border-border py-20 text-center">
        <h2 className="heading-display text-5xl md:text-7xl">
          Vous voulez cadrer le sujet ?
        </h2>
        <a
          href={TIDYCAL_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-4 rounded-full bg-primary px-9 py-5 text-lg font-semibold text-primary-foreground hover:gap-6 transition-all"
        >
          Réserver un appel
          <ArrowRight className="h-5 w-5" />
        </a>
      </section>
    </main>
  );
};

export default OfferPage;
