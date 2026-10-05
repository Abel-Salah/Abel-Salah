import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Contact,
  GraduationCap,
  MessageCircle,
  RotateCcw,
  Workflow,
  X,
} from "lucide-react";
import { TIDYCAL_BOOKING_URL } from "@/data/homeLocales";
import { trackConversionEvent } from "@/lib/conversionEvents";

type AgentLocale = "fr" | "en" | "es";

const PHONE_DISPLAY_FR = "07 57 59 86 10";
const PHONE_DISPLAY_INTL = "+33 7 57 59 86 10";
const PHONE_TEL_URL = "tel:+33757598610";
const PHONE_SMS_URL = "sms:+33757598610";

type BranchAction = {
  label: string;
  href: string;
  external?: boolean;
  booking?: boolean;
};

type Branch = {
  id: string;
  icon: typeof Bot;
  label: string;
  reply: string;
  actions: BranchAction[];
};

type AgentCopy = {
  buttonLabel: string;
  panelTitle: string;
  panelSubtitle: string;
  greeting: string;
  cardLabel: string;
  restartLabel: string;
  closeLabel: string;
  branches: Branch[];
};

const agentCopy: Record<AgentLocale, AgentCopy> = {
  fr: {
    buttonLabel: "Besoin d'aide pour choisir ?",
    panelTitle: "Assistant d'Abel",
    panelSubtitle: "Réponse en quelques secondes",
    greeting: "Bonjour 👋 Je suis l'assistant d'Abel. Dites-moi ce qui vous amène :",
    cardLabel: "Ma carte de visite",
    restartLabel: "Autre question",
    closeLabel: "Fermer l'assistant",
    branches: [
      {
        id: "audit",
        icon: BrainCircuit,
        label: "Explorer l'IA pour mon entreprise",
        reply:
          "Le plus efficace : un audit IA. En 30 min, on identifie où l'IA crée de la valeur chez vous.",
        actions: [
          { label: "Réserver un appel", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
          { label: "Découvrir l'audit IA", href: "/audit-ia" },
        ],
      },
      {
        id: "automation",
        icon: Workflow,
        label: "Automatiser mes ventes",
        reply:
          "Prospection, CRM, relances : je transforme les tâches répétitives en workflows fiables.",
        actions: [
          { label: "Voir l'offre automatisation", href: "/automatisation-commerciale" },
          { label: "Réserver un appel", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
        ],
      },
      {
        id: "training",
        icon: GraduationCap,
        label: "Former mes équipes",
        reply:
          "Je forme dirigeants et équipes à un usage utile de l'IA — méthode et adoption, sans gadget.",
        actions: [
          { label: "Voir la formation IA", href: "/formation-ia" },
          { label: "Réserver un appel", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
        ],
      },
      {
        id: "launch",
        icon: GraduationCap,
        label: "Lancer ou développer mon business",
        reply:
          "J'ai des formations pour lancer et développer votre entreprise, plus un coaching mensuel — zéro prérequis.",
        actions: [
          { label: "Voir les formations", href: "/formations" },
          { label: "Réserver un appel", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
        ],
      },
      {
        id: "direct",
        icon: MessageCircle,
        label: "Parler directement à Abel",
        reply: `Le plus direct : appelez-moi ou écrivez-moi au ${PHONE_DISPLAY_FR}.`,
        actions: [
          { label: "M'appeler", href: PHONE_TEL_URL, external: true },
          { label: "Envoyer un SMS", href: PHONE_SMS_URL, external: true },
          { label: "Réserver un appel", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
        ],
      },
    ],
  },
  en: {
    buttonLabel: "Need help choosing?",
    panelTitle: "Abel's assistant",
    panelSubtitle: "Answers in seconds",
    greeting: "Hi 👋 I'm Abel's assistant. Tell me what brings you here:",
    cardLabel: "My business card",
    restartLabel: "Another question",
    closeLabel: "Close the assistant",
    branches: [
      {
        id: "audit",
        icon: BrainCircuit,
        label: "Explore AI for my company",
        reply:
          "The most effective start: an AI audit. In 30 minutes we identify where AI creates value for you.",
        actions: [
          { label: "Book a call", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
          { label: "Discover the AI audit", href: "/en/ai-audit" },
        ],
      },
      {
        id: "automation",
        icon: Workflow,
        label: "Automate my sales",
        reply:
          "Prospecting, CRM, follow-ups: I turn repetitive work into reliable workflows.",
        actions: [
          { label: "See the automation offer", href: "/en/sales-automation" },
          { label: "Book a call", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
        ],
      },
      {
        id: "training",
        icon: GraduationCap,
        label: "Train my teams",
        reply:
          "I train executives and teams to use AI where it matters — method and adoption, no gimmicks.",
        actions: [
          { label: "See the AI training", href: "/en/ai-training" },
          { label: "Book a call", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
        ],
      },
      {
        id: "direct",
        icon: MessageCircle,
        label: "Talk to Abel directly",
        reply: `The most direct way: call or text me at ${PHONE_DISPLAY_INTL}.`,
        actions: [
          { label: "Call me", href: PHONE_TEL_URL, external: true },
          { label: "Send a text", href: PHONE_SMS_URL, external: true },
          { label: "Book a call", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
        ],
      },
    ],
  },
  es: {
    buttonLabel: "¿Necesitas ayuda para elegir?",
    panelTitle: "Asistente de Abel",
    panelSubtitle: "Respuesta en segundos",
    greeting: "Hola 👋 Soy el asistente de Abel. Cuéntame qué te trae por aquí:",
    cardLabel: "Mi tarjeta de visita",
    restartLabel: "Otra pregunta",
    closeLabel: "Cerrar el asistente",
    branches: [
      {
        id: "audit",
        icon: BrainCircuit,
        label: "Explorar la IA para mi empresa",
        reply:
          "Lo más eficaz: una auditoría IA. En 30 minutos identificamos dónde la IA crea valor en tu empresa.",
        actions: [
          { label: "Reservar una llamada", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
          { label: "Descubrir la auditoría IA", href: "/es/auditoria-ia" },
        ],
      },
      {
        id: "automation",
        icon: Workflow,
        label: "Automatizar mis ventas",
        reply:
          "Prospección, CRM, seguimientos: convierto tareas repetitivas en flujos fiables.",
        actions: [
          { label: "Ver la oferta de automatización", href: "/es/automatizacion-comercial" },
          { label: "Reservar una llamada", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
        ],
      },
      {
        id: "training",
        icon: GraduationCap,
        label: "Formar a mis equipos",
        reply:
          "Formo a directivos y equipos para usar la IA con método y adopción real, sin gadgets.",
        actions: [
          { label: "Ver la formación IA", href: "/es/formacion-ia" },
          { label: "Reservar una llamada", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
        ],
      },
      {
        id: "direct",
        icon: MessageCircle,
        label: "Hablar directamente con Abel",
        reply: `Lo más directo: llámame o escríbeme al ${PHONE_DISPLAY_INTL}.`,
        actions: [
          { label: "Llamarme", href: PHONE_TEL_URL, external: true },
          { label: "Enviar un SMS", href: PHONE_SMS_URL, external: true },
          { label: "Reservar una llamada", href: TIDYCAL_BOOKING_URL, external: true, booking: true },
        ],
      },
    ],
  },
};

const localeFromPath = (pathname: string): AgentLocale => {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  return "fr";
};

const ContactAgentWidget = () => {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const copy = agentCopy[locale];
  const [open, setOpen] = useState(false);
  const [branchId, setBranchId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const branch = copy.branches.find((b) => b.id === branchId) ?? null;

  // Fermer au changement de page (les liens internes du panneau naviguent).
  useEffect(() => {
    setOpen(false);
    setBranchId(null);
  }, [pathname]);

  // Toute réouverture repart du menu principal.
  useEffect(() => {
    if (!open) setBranchId(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const trackAction = (action: BranchAction, sourceId: string) => {
    trackConversionEvent(
      action.booking ? "book_call_click" : "offer_cta_click",
      `agent_widget_${sourceId}_${locale}`,
      action.href
    );
  };

  const actionClasses =
    "cta-glow inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:gap-3";
  const secondaryActionClasses =
    "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary";

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={copy.panelTitle}
          tabIndex={-1}
          className="fixed bottom-24 right-4 z-50 flex max-h-[70vh] w-[min(92vw,370px)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[0_24px_64px_rgba(0,0,0,0.35)] outline-none animate-in fade-in slide-in-from-bottom-4 print:hidden sm:right-6"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card/60 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{copy.panelTitle}</p>
                <p className="text-xs text-muted-foreground">{copy.panelSubtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={copy.closeLabel}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-card px-4 py-3 text-sm leading-relaxed text-foreground">
              {copy.greeting}
            </p>

            {branch ? (
              <>
                <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary/15 px-4 py-3 text-sm leading-relaxed text-foreground">
                  {branch.label}
                </p>
                <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-card px-4 py-3 text-sm leading-relaxed text-foreground">
                  {branch.reply}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {branch.actions.map((action, index) =>
                    action.external ? (
                      <a
                        key={action.label}
                        href={action.href}
                        target={action.href.startsWith("http") ? "_blank" : undefined}
                        rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        onClick={() => trackAction(action, branch.id)}
                        className={index === 0 ? actionClasses : secondaryActionClasses}
                      >
                        {action.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link
                        key={action.label}
                        to={action.href}
                        onClick={() => trackAction(action, branch.id)}
                        className={index === 0 ? actionClasses : secondaryActionClasses}
                      >
                        {action.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setBranchId(null)}
                  className="mt-1 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  {copy.restartLabel}
                </button>
              </>
            ) : (
              <div className="flex flex-col items-stretch gap-2 pt-1">
                {copy.branches.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBranchId(item.id)}
                    className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-card"
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border bg-card/60 px-5 py-3">
            <Link
              to="/carte-visite"
              onClick={() =>
                trackConversionEvent("offer_cta_click", `agent_widget_card_${locale}`, "/carte-visite")
              }
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              <Contact className="h-4 w-4 text-primary" aria-hidden="true" />
              {copy.cardLabel}
            </Link>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={copy.buttonLabel}
        className="group fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(37,99,235,0.4)] transition-transform hover:-translate-y-0.5 print:hidden sm:right-6"
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
        <span className="pointer-events-none absolute right-[68px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-[13px] font-bold text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {copy.buttonLabel}
        </span>
      </button>
    </>
  );
};

export default ContactAgentWidget;
