import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import BookingCTA from "@/components/BookingCTA";
import SEOHead from "@/components/SEOHead";

export interface OfferPageProps {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  hero: string;
  promise: string;
  outcomes: string[];
  process: string[];
  proofNote: string;
  faq: { question: string; answer: string }[];
}

const OfferPage = ({
  slug,
  title,
  eyebrow,
  description,
  hero,
  promise,
  outcomes,
  process,
  proofNote,
  faq,
}: OfferPageProps) => {
  const pageUrl = `https://abelsalah.fr/${slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: title,
    description,
    url: pageUrl,
    provider: {
      "@type": "Person",
      "@id": "https://abelsalah.fr/#person",
      name: "Abel SALAH",
    },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    serviceType: title,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faq.map((item) => ({
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
        title={`${title} | Abel SALAH`}
        description={description}
        canonical={`/${slug}`}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: title, path: `/${slug}` },
        ]}
        schema={[serviceSchema, faqSchema]}
      />

      <div className="container mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mb-20"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-8">
            {eyebrow}
          </span>
          <h1 className="heading-display text-[clamp(3rem,9vw,8rem)] leading-[0.88] mb-8">
            {hero}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            {promise}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
            <BookingCTA source={`${slug}_hero`} offer={slug}>
              Réserver un audit
              <ArrowRight className="w-4 h-4" />
            </BookingCTA>
            <p className="text-sm text-muted-foreground">
              Appel de cadrage, sans engagement.
            </p>
          </div>
        </motion.header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border pt-16">
          <div className="lg:col-span-5">
            <h2 className="heading-display text-4xl md:text-5xl mb-6">
              Résultats visés
            </h2>
            <p className="text-muted-foreground leading-relaxed">{proofNote}</p>
          </div>
          <div className="lg:col-span-7 grid gap-4">
            {outcomes.map((outcome) => (
              <div key={outcome} className="flex items-start gap-4 border border-border p-5">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                <p className="text-lg text-foreground">{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-16 mt-16">
          <h2 className="heading-display text-4xl md:text-5xl mb-10">
            Méthode
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <div key={step} className="border border-border p-6">
                <span className="heading-display text-4xl text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg text-foreground mt-6 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-16 mt-16">
          <h2 className="heading-display text-4xl md:text-5xl mb-10">FAQ</h2>
          <div className="grid gap-6">
            {faq.map((item) => (
              <article key={item.question} className="border-l-2 border-border pl-6">
                <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-16 mt-16 text-center">
          <h2 className="heading-display text-4xl md:text-6xl mb-8">
            On cadre votre prochain levier IA ?
          </h2>
          <BookingCTA source={`${slug}_footer`} offer={slug}>
            Prendre rendez-vous
            <ArrowRight className="w-4 h-4" />
          </BookingCTA>
        </section>
      </div>
    </main>
  );
};

export default OfferPage;
