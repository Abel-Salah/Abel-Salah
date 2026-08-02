import { ArrowUpRight, BrainCircuit, Calculator, Gamepad2, MailCheck } from "lucide-react";
import { Link } from "react-router";
import SEOHead from "@/components/SEOHead";
import { trackConversionEvent } from "@/lib/conversionEvents";

const externalTools = [
  {
    icon: MailCheck,
    eyebrow: "Prospection · quelques minutes",
    title: "Évaluez votre email de prospection",
    description: "Obtenez un retour rapide sur la clarté et l’efficacité d’un email commercial avant de l’envoyer.",
    href: "https://tom-orbach-grader.base44.app/",
    label: "Tester mon email",
    featured: true,
  },
  {
    icon: Gamepad2,
    eyebrow: "Pédagogie · jeu rapide",
    title: "Saurez-vous reconnaître l’IA ?",
    description: "Un format ludique pour entraîner votre regard face aux textes générés par l’intelligence artificielle.",
    href: "https://tom-orbach-game.base44.app/",
    label: "Jouer maintenant",
    featured: false,
  },
  {
    icon: BrainCircuit,
    eyebrow: "Réflexion · profil marketing",
    title: "Découvrez votre profil marketing",
    description: "Un quiz court pour prendre du recul sur votre manière de communiquer et de développer votre activité.",
    href: "https://tom-orbach-quiz.base44.app/",
    label: "Faire le quiz",
    featured: false,
  },
];

const Tools = () => (
  <main className="min-h-screen bg-background px-4 pb-24 pt-32 text-foreground md:px-8">
    <SEOHead
      title="Outils gratuits IA et entreprise | Abel SALAH"
      description="Des outils gratuits pour estimer le coût du travail manuel, améliorer vos emails de prospection et mieux comprendre l’IA en entreprise."
      canonical="/outils"
      lang="fr"
      breadcrumbs={[{ name: "Outils gratuits", path: "/outils" }]}
    />

    <section className="mx-auto max-w-6xl">
      <div className="max-w-3xl">
        <p className="mb-6 text-xs uppercase tracking-[0.28em] text-primary">Outils gratuits · passer à l’action</p>
        <h1 className="heading-display text-5xl leading-[0.9] md:text-8xl">Un premier diagnostic avant de décider.</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Des outils courts pour rendre visibles vos pertes de temps, améliorer votre prospection et mieux utiliser l’IA. Les résultats sont indicatifs : ils servent à ouvrir une discussion, pas à remplacer un diagnostic adapté à votre entreprise.
        </p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        <ToolCard
          icon={Calculator}
          eyebrow="Entreprise · estimation indicative"
          title="Combien vous coûtent les tâches manuelles ?"
          description="Estimez le temps mobilisé par les tâches répétitives et identifiez un premier axe d’automatisation."
          href="/outils/calculateur-taches-manuelles"
          label="Estimer maintenant"
          internal
          featured
        />
        {externalTools.map((tool) => <ToolCard key={tool.href} {...tool} />)}
      </div>

      <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
        Les outils externes sont proposés à titre exploratoire. Ne saisissez pas de données confidentielles, de données personnelles ou d’informations clients.
      </div>

      <div className="mt-16 flex flex-col gap-4 border border-border p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="font-semibold">Vous voulez aller au-delà d’une estimation ?</p>
          <p className="mt-1 text-muted-foreground">Je peux analyser votre contexte, vos outils et vos priorités.</p>
        </div>
        <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
          Échanger sur votre situation <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  </main>
);

function ToolCard({ icon: Icon, eyebrow, title, description, href, label, internal = false, featured = false }: {
  icon: typeof Calculator;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  label: string;
  internal?: boolean;
  featured?: boolean;
}) {
  const className = `flex h-full flex-col border p-6 transition-colors hover:border-primary md:p-8 ${featured ? "border-primary/50 bg-primary/5" : "border-border"}`;
  const content = (
    <>
      <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
      <p className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold leading-tight">{title}</h2>
      <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">{label} <ArrowUpRight className="h-4 w-4" /></span>
    </>
  );

  if (internal) return <Link to={href} className={className} onClick={() => trackConversionEvent("tool_click", "tools_hub", href)}>{content}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => trackConversionEvent("tool_click", "tools_hub", href)}>{content}</a>;
}

export default Tools;
