import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Gauge, Palette, Search, Target, Users } from "lucide-react";
import { Link } from "react-router";
import SEOHead from "@/components/SEOHead";
import { trackConversionEvent } from "@/lib/conversionEvents";

const criteria = [
  { key: "experience", label: "Expérience utilisateur", question: "Un visiteur comprend-il quoi faire en moins de 10 secondes ?", icon: Users },
  { key: "design", label: "Design & confiance", question: "Le site paraît-il actuel, lisible et professionnel sur mobile ?", icon: Palette },
  { key: "content", label: "Qualité du contenu", question: "Les offres, preuves et bénéfices sont-ils concrets ?", icon: CheckCircle2 },
  { key: "visibility", label: "Visibilité", question: "Le site répond-il aux recherches de vos clients ?", icon: Search },
  { key: "conversion", label: "Conversion", question: "Les appels à l’action et le contact sont-ils évidents ?", icon: Target },
] as const;

type Scores = Record<(typeof criteria)[number]["key"], number>;
const initialScores: Scores = { experience: 3, design: 3, content: 3, visibility: 2, conversion: 2 };

const SiteScore = () => {
  const [scores, setScores] = useState<Scores>(initialScores);
  const total = useMemo(() => Object.values(scores).reduce((sum, value) => sum + value, 0), [scores]);
  const percentage = Math.round((total / 25) * 100);
  const level = percentage < 50 ? "Priorités à clarifier" : percentage < 75 ? "Base intéressante" : "Base solide à optimiser";

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-32 text-foreground md:px-8">
      <SEOHead title="Score express de votre site | Abel SALAH" description="Évaluez rapidement l’expérience, le design, le contenu et la capacité de conversion de votre site." canonical="/outils/score-site" lang="fr" breadcrumbs={[{ name: "Outils gratuits", path: "/outils" }, { name: "Score express du site", path: "/outils/score-site" }]} />
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.28em] text-primary">Outil gratuit · 2 minutes</p>
          <h1 className="heading-display text-5xl leading-[0.9] md:text-8xl">Quel est le vrai potentiel de votre site ?</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">Notez votre site sur cinq critères. Vous obtiendrez un repère pour identifier les chantiers qui peuvent améliorer la compréhension, la confiance et les demandes entrantes.</p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-start">
          <div className="space-y-8 border-y border-border py-8">
            {criteria.map(({ key, label, question, icon: Icon }) => (
              <label key={key} className="block">
                <span className="flex items-start gap-3"><Icon className="mt-1 h-5 w-5 shrink-0 text-primary" /><span><strong className="block">{label}</strong><span className="text-sm text-muted-foreground">{question}</span></span><strong className="ml-auto shrink-0 text-primary">{scores[key]}/5</strong></span>
                <input aria-label={`${label} : ${question}`} type="range" min="1" max="5" value={scores[key]} onChange={(event) => setScores((current) => ({ ...current, [key]: Number(event.target.value) }))} className="mt-5 h-2 w-full cursor-pointer accent-primary" />
              </label>
            ))}
          </div>

          <aside className="rounded-2xl border border-primary/30 bg-primary/5 p-8 lg:sticky lg:top-28">
            <Gauge className="h-8 w-8 text-primary" />
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">Score indicatif</p>
            <p className="mt-3 text-7xl font-extrabold tracking-tight text-primary">{percentage}<span className="text-3xl">/100</span></p>
            <p className="mt-3 text-xl font-semibold">{level}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Ce score ne remplace pas une analyse réelle de vos pages, de vos données et de vos objectifs.</p>
            <Link to="/contact?subject=Score%20express%20du%20site" onClick={() => trackConversionEvent("offer_cta_click", "site_score", "/contact")} className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">Recevoir mes priorités <ArrowRight className="h-5 w-5" /></Link>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default SiteScore;
