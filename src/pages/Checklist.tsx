import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Download, FileCheck2, MessageSquareText, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router";
import SEOHead from "@/components/SEOHead";
import { checklistSupabase } from "@/integrations/supabase/checklistClient";
import { TIDYCAL_BOOKING_URL } from "@/data/homeLocales";
import { trackConversionEvent } from "@/lib/conversionEvents";

const PDF_URL = "/downloads/checklist-audit-site-abel-salah.pdf";

const bullets = [
  { icon: FileCheck2, text: "7 axes d'audit : fond, forme, SEO technique, visibilité IA, conversion, risques, mesure — 55+ points de contrôle cochables." },
  { icon: MessageSquareText, text: "8 prompts prêts à coller dans Claude ou ChatGPT pour auditer votre site élément par élément." },
  { icon: ShieldCheck, text: "La grille d'auto-score pour prioriser ce qui touche vraiment vos ventes." },
];

const Checklist = () => {
  const { search } = useLocation();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [isSending, setIsSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"sent" | "unconfirmed">("unconfirmed");
  const [emailRetryAllowed, setEmailRetryAllowed] = useState(false);
  const inFlight = useRef(false);
  const downloadTracked = useRef(false);

  const requestChecklist = async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setIsSending(true);
    const alreadyRegistered = status === "done";
    if (!alreadyRegistered) setStatus("idle");
    try {
      const source = (new URLSearchParams(search).get("utm_source") ?? "site").slice(0, 100);
      const { data, error } = await checklistSupabase.functions.invoke<{
        ok: boolean;
        emailStatus: "sent" | "unconfirmed";
        emailRetryAllowed: boolean;
      }>("subscribe-checklist", {
        body: { first_name: firstName.trim(), email: email.trim().toLowerCase(), consent, source },
      });
      if (error || !data?.ok || !["sent", "unconfirmed"].includes(data.emailStatus)) {
        if (!alreadyRegistered) setStatus("error");
        return;
      }
      setEmailStatus(data.emailStatus);
      setEmailRetryAllowed(data.emailRetryAllowed === true);
      if (!downloadTracked.current) {
        trackConversionEvent("tool_click", `checklist_download_${source}`, PDF_URL);
        downloadTracked.current = true;
      }
      setStatus("done");
    } catch {
      if (!alreadyRegistered) setStatus("error");
    } finally {
      inFlight.current = false;
      setIsSending(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void requestChecklist();
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <SEOHead
        title="Checklist Gratuite : Auditez Votre Site en 7 Axes — Abel SALAH"
        description="La checklist d'audit de site utilisée en live par Abel SALAH : 55+ points de contrôle et 8 prompts IA prêts à l'emploi (fond, forme, SEO, visibilité IA, conversion, risques, mesure). Téléchargement gratuit."
        canonical="/checklist"
        lang="fr"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Checklist audit", path: "/checklist" },
        ]}
      />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Pitch */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
              Vu en live · 100 % gratuit
            </span>
            <h1 className="heading-display text-[clamp(2.75rem,9vw,8rem)] uppercase leading-[0.84] tracking-tighter">
              Auditez
              <br />
              <span className="heading-serif-accent text-primary">votre site /</span>
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground">
              La checklist que j'utilise quand j'audite un site en direct — avec les prompts
              exacts à donner à Claude ou ChatGPT pour faire le même audit sur le vôtre.
            </p>
            <ul className="mt-10 space-y-5 max-w-xl">
              {bullets.map((bullet) => (
                <li key={bullet.text} className="flex items-start gap-4">
                  <bullet.icon className="mt-1 h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  <span className="text-base leading-relaxed text-foreground">{bullet.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Formulaire / succès */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-premium p-8 lg:col-span-5 lg:sticky lg:top-28"
          >
            {status === "done" ? (
              <div>
                <span className="label-mono text-xs uppercase tracking-[0.2em] text-primary block mb-4">
                  C'est tout bon {firstName ? `, ${firstName.trim()}` : ""} ✓
                </span>
                <h2 className="heading-display text-3xl leading-none mb-4">Votre checklist est prête.</h2>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                  {emailStatus === "sent"
                    ? "Le lien de téléchargement a également été envoyé par e-mail."
                    : "Votre demande est enregistrée. L’envoi par e-mail n’a pas pu être confirmé ; téléchargez le PDF ci-dessous."}
                </p>
                <a
                  href={PDF_URL}
                  download
                  onClick={() => trackConversionEvent("tool_click", "checklist_pdf_direct", PDF_URL)}
                  className="cta-glow inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all hover:gap-4"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  Télécharger le PDF
                </a>
                {emailStatus === "unconfirmed" && emailRetryAllowed && (
                  <button type="button" disabled={isSending} onClick={() => void requestChecklist()}
                    className="mt-4 text-sm underline underline-offset-4 disabled:opacity-60">
                    {isSending ? "Envoi en cours…" : "Réessayer l’envoi par e-mail"}
                  </button>
                )}
                <div className="mt-8 space-y-3 border-t border-border pt-6">
                  <p className="label-mono text-xs uppercase tracking-wider text-muted-foreground">
                    La prochaine étape
                  </p>
                  <a
                    href={TIDYCAL_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackConversionEvent("book_call_click", "checklist_thankyou", TIDYCAL_BOOKING_URL)
                    }
                    className="flex items-center justify-between text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    Audit approfondi de votre activité — appel gratuit de 30 min
                    <ArrowRight className="h-4 w-4 flex-none" aria-hidden="true" />
                  </a>
                  <Link
                    to="/formations"
                    className="flex items-center justify-between text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    Formations & coaching mensuel
                    <ArrowRight className="h-4 w-4 flex-none" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <span className="label-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-6">
                  Recevoir la checklist
                </span>
                <label className="block mb-4">
                  <span className="mb-2 block text-sm font-medium text-foreground">Votre prénom</span>
                  <input
                    type="text"
                    required
                    maxLength={80}
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="Marc"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-hidden transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                </label>
                <label className="block mb-5">
                  <span className="mb-2 block text-sm font-medium text-foreground">Votre email</span>
                  <input
                    type="email"
                    required
                    maxLength={320}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="marc@entreprise.fr"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-hidden transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                </label>
                <label className="mb-6 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    J'accepte de recevoir cette checklist par e-mail.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={isSending}
                  className="cta-glow inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all hover:gap-4 disabled:opacity-60"
                >
                  {isSending ? "Un instant…" : "Recevoir la checklist gratuite"}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
                {status === "error" && (
                  <p className="mt-4 text-sm text-destructive">
                    Une erreur est survenue — réessayez, ou écrivez-moi au 07 57 59 86 10.
                  </p>
                )}
                <p className="label-mono mt-5 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
                  Gratuit · Sans spam · <Check className="inline h-3 w-3" aria-hidden="true" /> RGPD
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Checklist;
