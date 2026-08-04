import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Download, Gauge, LoaderCircle, Palette, Search, Target, Users } from "lucide-react";
import { Link } from "react-router";
import SEOHead from "@/components/SEOHead";
import { trackConversionEvent } from "@/lib/conversionEvents";
import { supabase } from "@/integrations/supabase/client";

const criteria = [
  { key: "experience", label: "Expérience utilisateur", question: "Un visiteur comprend-il quoi faire en moins de 10 secondes ?", icon: Users },
  { key: "design", label: "Design & confiance", question: "Le site paraît-il actuel, lisible et professionnel sur mobile ?", icon: Palette },
  { key: "content", label: "Qualité du contenu", question: "Les offres, preuves et bénéfices sont-ils concrets ?", icon: CheckCircle2 },
  { key: "visibility", label: "Visibilité", question: "Le site répond-il aux recherches de vos clients ?", icon: Search },
  { key: "conversion", label: "Conversion", question: "Les appels à l’action et le contact sont-ils évidents ?", icon: Target },
  { key: "credibility", label: "Crédibilité", question: "Les preuves et signaux de confiance rassurent-ils un prospect ?", icon: CheckCircle2 },
] as const;

type Scores = Record<(typeof criteria)[number]["key"], number>;
const initialScores: Scores = { experience: 3, design: 3, content: 3, visibility: 2, conversion: 2, credibility: 3 };

type AuditCriterion = { key: string; label: string; score: number; evidence: string[]; recommendations: string[] };
type AuditReport = { overall: number; criteria: AuditCriterion[]; priorities: string[]; limitations: string[]; screenshot?: string | null };

const normalizePublicUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return new URL(withProtocol);
};

const SiteScore = () => {
  const [url, setUrl] = useState("");
  const [scanState, setScanState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [loadingStep, setLoadingStep] = useState(0);
  const [scannedHost, setScannedHost] = useState("");
  const [scanMessage, setScanMessage] = useState("");
  const [scanReport, setScanReport] = useState<AuditReport | null>(null);
  const [scores, setScores] = useState<Scores>(initialScores);
  const total = useMemo(() => Object.values(scores).reduce((sum, value) => sum + value, 0), [scores]);
  const percentage = Math.round((total / (criteria.length * 5)) * 100);
  const level = percentage < 50 ? "Priorités à clarifier" : percentage < 75 ? "Base intéressante" : "Base solide à optimiser";

  const scanSite = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let target: URL;
    try {
      const normalized = normalizePublicUrl(url);
      if (!normalized) throw new Error();
      target = normalized;
      setScannedHost(target.hostname);
      if (!['http:', 'https:'].includes(target.protocol) || target.username || target.password || target.hostname === 'localhost' || target.hostname.endsWith('.local')) throw new Error();
    } catch {
      setScanState("error");
      setScanMessage("Saisissez une URL publique valide, par exemple https://votre-site.fr.");
      return;
    }

    setScanState("loading");
    setLoadingStep(1);
    setScanMessage("");
    try {
      const stepTimer = window.setInterval(() => setLoadingStep((step) => Math.min(step + 1, 3)), 3500);
      const { data, error } = await supabase.functions.invoke("score-site", { body: { url: target.toString() } });
      window.clearInterval(stepTimer);
      if (error) throw new Error(error.message || "L’analyse est temporairement indisponible.");
      if (!data?.success || !data.audit?.criteria) throw new Error(data?.error || "Le rapport reçu est incomplet.");
      setScanReport({ ...data.audit, screenshot: data.screenshot ?? null });
      setLoadingStep(3);
      setScores((current) => data.audit.criteria.reduce((next: Scores, criterion: AuditCriterion) => ({ ...next, [criterion.key]: Math.max(1, Math.min(5, Math.round(criterion.score / 2))) }), current));
      setScanState("success");
    } catch (error) {
      setLoadingStep(0);
      setScanState("error");
      const message = error instanceof Error ? error.message : "";
      setScanMessage(message.includes("FIRECRAWL_NOT_CONFIGURED")
        ? "L’audit automatique est en cours de configuration. Le service n’est pas encore activé côté serveur."
        : message.includes("FIRECRAWL_RATE_LIMIT") || message.includes("429")
        ? "Le service d’audit a atteint sa limite temporaire. Réessayez plus tard."
        : "Impossible d’analyser cette URL pour le moment. Vérifiez qu’elle est publique et accessible.");
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-32 text-foreground md:px-8">
      <SEOHead title="Score express de votre site | Abel SALAH" description="Évaluez rapidement l’expérience, le design, le contenu et la capacité de conversion de votre site." canonical="/outils/score-site" lang="fr" breadcrumbs={[{ name: "Outils gratuits", path: "/outils" }, { name: "Score express du site", path: "/outils/score-site" }]} />
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.28em] text-primary">Outil gratuit · 2 minutes</p>
          <h1 className="heading-display text-5xl leading-[0.9] md:text-8xl">Quel est le vrai potentiel de votre site ?</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">Notez votre site sur cinq critères. Vous obtiendrez un repère pour identifier les chantiers qui peuvent améliorer la compréhension, la confiance et les demandes entrantes.</p>
        </div>

        <form onSubmit={scanSite} className="mt-10 max-w-3xl rounded-2xl border border-primary/25 bg-primary/5 p-6">
          <label htmlFor="site-url" className="block text-sm font-semibold">Obtenir un scan automatique de votre site</label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input id="site-url" type="text" inputMode="url" autoComplete="url" placeholder="votre-site.fr" value={url} onChange={(event) => setUrl(event.target.value)} className="min-h-12 flex-1 rounded-xl border border-border bg-background px-4 text-foreground outline-none ring-primary focus:ring-2" required />
            <button type="submit" disabled={scanState === "loading"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-60">{scanState === "loading" ? <><LoaderCircle className="h-5 w-5 animate-spin" /> Analyse en cours…</> : <>Analyser le site<ArrowRight className="h-5 w-5" /></>}</button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Entrez simplement votre domaine, avec ou sans https://. L’audit automatique analyse le contenu, la structure, le SEO, la conversion et la crédibilité. Aucun mot de passe n’est demandé.</p>
          {scanMessage && <p role="alert" className="mt-3 text-sm text-destructive">{scanMessage}</p>}
          {scanState === "loading" && <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4" aria-live="polite"><div className="mb-3 flex items-center justify-between text-sm font-semibold"><span>Analyse de {scannedHost || "votre site"}</span><span className="text-primary">{loadingStep}/3</span></div><div className="h-2 overflow-hidden rounded-full bg-primary/10"><div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${Math.max(12, loadingStep * 33.33)}%` }} /></div><div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3"><span className={loadingStep >= 1 ? "font-semibold text-primary" : ""}>01 · Récupération du site</span><span className={loadingStep >= 2 ? "font-semibold text-primary" : ""}>02 · Analyse IA</span><span className={loadingStep >= 3 ? "font-semibold text-primary" : ""}>03 · Rapport final</span></div></div>}
          {scanReport && <div className="mt-6 rounded-2xl border border-border bg-background p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Rapport automatique</p><p className="mt-1 text-2xl font-bold text-primary">{scanReport.overall * 10}/100</p></div><button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold"><Download className="h-4 w-4" /> Télécharger / imprimer en PDF</button></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{scanReport.criteria.map((criterion) => <div key={criterion.key} className="rounded-xl border border-border p-3"><div className="flex items-center justify-between gap-3"><p className="font-semibold">{criterion.label}</p><strong className="text-primary">{criterion.score}/10</strong></div><p className="mt-2 text-sm text-muted-foreground">{criterion.evidence?.[0] ?? "Aucun élément vérifiable détecté."}</p></div>)}</div></div>}
        </form>

        {scanReport && <section className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] print:block"><div className="space-y-6"><div className="rounded-2xl border border-border p-6"><h2 className="text-2xl font-bold">Ce qu’il faut corriger en priorité</h2><ol className="mt-5 space-y-3">{scanReport.priorities.map((priority, index) => <li key={`${priority}-${index}`} className="flex gap-3"><span className="font-bold text-primary">{index + 1}.</span><span>{priority}</span></li>)}</ol></div><div className="rounded-2xl border border-border p-6"><h2 className="text-2xl font-bold">Plan d’action détaillé</h2><div className="mt-5 space-y-6">{scanReport.criteria.map((criterion) => <article key={criterion.key}><h3 className="font-bold">{criterion.label} · {criterion.score}/10</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{criterion.recommendations.map((recommendation, index) => <li key={`${recommendation}-${index}`}>{recommendation}</li>)}</ul></article>)}</div></div>{scanReport.limitations.length > 0 && <p className="text-sm text-muted-foreground"><strong>Limites :</strong> {scanReport.limitations.join(" ")}</p>}</div>{scanReport.screenshot && <figure className="rounded-2xl border border-border p-4"><figcaption className="mb-3 text-sm font-semibold">Capture de la page analysée</figcaption><img src={scanReport.screenshot} alt="Capture du site analysé" className="w-full rounded-xl border border-border" /></figure>}</section>}

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
