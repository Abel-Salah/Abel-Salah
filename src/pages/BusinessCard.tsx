import { ArrowUpRight, BadgeCheck, Check, Download, Facebook, Linkedin, Mail, Music2, PhoneCall, X, Youtube } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { STRIPE_PAYMENT_LINKS } from "@/data/stripePaymentLinks";
import { trackConversionEvent } from "@/lib/conversionEvents";
import portrait from "@/assets/abel-salah-card-portrait.png";
import cover from "@/assets/business-card-cover-v2.png";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import "./business-card.css";
import "./business-card-enhancements.css";

const links = [
  { label: "SKILLCO", badge: "Projets IA & formation", href: "https://skillco.fr" },
  { label: "SKILL LMS", badge: "Plateforme de formation", href: "https://skill-lms.fr" },
  { label: "SCALL’UP", badge: "Plateforme de prospection", href: "https://scallup.fr" },
];

const projects = [
  ["ImmoMontpellier.com", "https://immomontpellier.com"],
  ["Formateurs.pro", "https://formateurs.pro"],
  ["EnfantsProteges.fr", "https://enfantsproteges.fr"],
  ["Goodlifeai.fr", "https://goodlifeai.fr"],
  ["Encheres.pro", "https://encheres.pro"],
  ["Locango.fr", "https://locango.fr"],
  ["Solenza.eu", "https://solenza.eu"],
  ["DermoAnalyse.fr", "https://dermoanalyse.fr"],
  ["Algerstay.fr", "https://algerstay.fr"],
] as const;

const offers = [
  { id: "audit", label: "AUDIT ENTREPRISE", price: "29 €", description: "Analyse de votre entreprise, de votre site et de votre visibilité Google avec des axes d’amélioration concrets.", href: STRIPE_PAYMENT_LINKS.audit, cta: "Payer l’audit" },
  { id: "visio", label: "AUDIT + VISIO 30 MIN", price: "49 €", description: "L’audit écrit, puis 30 minutes d’échange en visioconférence pour répondre à vos questions.", href: STRIPE_PAYMENT_LINKS.exchange, cta: "Payer l’échange" },
  { id: "coaching", label: "COACHING 1 MOIS", price: "299 €", description: "Un suivi concret pendant un mois pour mettre en place les actions et obtenir des réponses au fil de votre progression.", href: STRIPE_PAYMENT_LINKS.coaching, cta: "Payer le coaching" },
];

const serviceLinks = [
  ["Corrections & optimisation du site", "Améliorer un site existant", "/contact"],
  ["Déploiement IA & automatisations", "Passer de l’idée à un système concret", "/contact"],
  ["Formation IA pour entreprises", "Faire monter les équipes en autonomie", "/contact"],
] as const;

const BusinessCard = () => {
  const [selectedOffer, setSelectedOffer] = useState<(typeof offers)[number] | null>(null);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activeTab, setActiveTab] = useState<"services" | "useful" | "about" | "work">("services");
  const openOffer = () => setSelectedOffer(offers[0]);
  const openNewsletter = () => { setNewsletterOpen(true); setNewsletterStatus("idle"); };

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus("loading");
    try {
      const { error } = await supabase.functions.invoke("subscribe-newsletter", { body: { email: newsletterEmail } });
      setNewsletterStatus(error ? "error" : "success");
    } catch {
      setNewsletterStatus("error");
    }
  };

  return <main className="business-card-page">
    <SEOHead
      title="Abel SALAH — Consultant IA et fondateur de SKILLCO"
      description="La carte de visite professionnelle d’Abel SALAH, consultant IA et fondateur de SKILLCO."
      canonical="/card"
      lang="fr"
    />
    <article className="business-card">
      <div className="business-card-banner" aria-hidden="true" style={{ backgroundImage: `url(${cover})` }} />
      <div className="business-card-avatar-wrap">
        <img src={portrait} alt="Abel SALAH" className="business-card-avatar" />
      </div>

      <div className="business-card-content">
        <h1>Abel SALAH <BadgeCheck className="verified-badge" aria-label="Profil vérifié" /></h1>
        <p className="business-card-role">Consultant en entreprise<br />et fondateur de <a href="https://skillco.fr">SKILLCO</a></p>

        <div className="business-card-socials" aria-label="Réseaux sociaux">
          <a className="social social-facebook" href="https://www.facebook.com/abelsalah" aria-label="Facebook"><Facebook /></a>
          <a className="social social-linkedin" href="https://www.linkedin.com/in/abel-salah/" aria-label="LinkedIn"><Linkedin /></a>
          <a className="social social-youtube" href="https://www.youtube.com/@abelsalah" aria-label="YouTube"><Youtube /></a>
          <a className="social social-tiktok" href="https://www.tiktok.com/@abel.salah?_r=1&_t=ZN-98Y4D0yDha6" aria-label="TikTok"><Music2 /></a>
          <a className="social social-mail" href="mailto:contact@abelsalah.fr" aria-label="Envoyer un email"><Mail /></a>
        </div>

        <div className="business-card-actions">
          <a className="business-card-button business-card-button-primary" href={STRIPE_PAYMENT_LINKS.exchange} target="_blank" rel="noreferrer" onClick={() => trackConversionEvent("offer_cta_click", "business_card_exchange", STRIPE_PAYMENT_LINKS.exchange)}><PhoneCall /> Échange 30 min — 49 €</a>
          <a className="business-card-button business-card-button-youtube" href="https://www.youtube.com/@abelsalah" target="_blank" rel="noreferrer"><Download /> YouTube</a>
        </div>

        <p className="business-card-section-label">Choisir un accompagnement</p>
        <button type="button" className="business-card-link business-card-offer business-card-offer-trigger" onPointerDown={openOffer} onPointerUp={openOffer} onTouchStart={openOffer} onTouchEnd={openOffer} onClick={openOffer}>
          <span><strong>Audit &amp; accompagnement</strong><small>3 options disponibles</small></span><ArrowUpRight />
        </button>
        <div className="business-card-tabs" role="tablist" aria-label="Informations complémentaires">
          <button type="button" role="tab" aria-selected={activeTab === "services"} className={activeTab === "services" ? "is-active" : ""} onPointerDown={() => setActiveTab("services")} onTouchStart={() => setActiveTab("services")} onClick={() => setActiveTab("services")}>Services</button>
          <button type="button" role="tab" aria-selected={activeTab === "useful"} className={activeTab === "useful" ? "is-active" : ""} onPointerDown={() => setActiveTab("useful")} onTouchStart={() => setActiveTab("useful")} onClick={() => setActiveTab("useful")}>Liens utiles</button>
          <button type="button" role="tab" aria-selected={activeTab === "about"} className={activeTab === "about" ? "is-active" : ""} onPointerDown={() => setActiveTab("about")} onTouchStart={() => setActiveTab("about")} onClick={() => setActiveTab("about")}>Qui suis-je ?</button>
          <button type="button" role="tab" aria-selected={activeTab === "work"} className={activeTab === "work" ? "is-active" : ""} onPointerDown={() => setActiveTab("work")} onTouchStart={() => setActiveTab("work")} onClick={() => setActiveTab("work")}>Réalisations</button>
        </div>
        {activeTab === "services" && <div className="business-card-services">{offers.map((offer) => <a key={offer.id} className="business-card-service" href={offer.href} target="_blank" rel="noreferrer"><span><strong>{offer.label}</strong><small>{offer.price} · {offer.description}</small></span><ArrowUpRight /></a>)}{serviceLinks.map(([label, description, href]) => <a key={label} className="business-card-service" href={href}><span><strong>{label}</strong><small>{description}</small></span><ArrowUpRight /></a>)}</div>}
        {activeTab === "useful" && links.map((link) => <a key={link.href} className="business-card-link ecosystem-link" href={link.href} target="_blank" rel="noreferrer" title={link.badge}><span><b>→</b><strong>{link.label === "SKILLCO" ? <>SKILL<span className="brand-accent">CO</span></> : link.label}</strong></span><ArrowUpRight /></a>)}
        {activeTab === "about" && <div className="business-card-tab-panel"><strong>Un parcours commercial devenu digital.</strong><p>Après des études supérieures en commerce et une expérience comme directeur d’Intersport, j’ai choisi de bifurquer vers le digital, l’intelligence artificielle et l’accompagnement des entreprises.</p><p>Aujourd’hui, j’accompagne les entreprises autour de trois pôles d’expertise :</p><ul><li><strong>Audits</strong> pour identifier les priorités et les opportunités.</li><li><strong>Déploiements &amp; optimisations</strong> pour passer aux actions concrètes.</li><li><strong>Formation</strong> pour rendre les équipes autonomes.</li></ul></div>}
        {activeTab === "work" && <div className="business-card-projects">{projects.map(([label, href]) => <a key={href} className="business-card-link ecosystem-link" href={href} target="_blank" rel="noreferrer"><span><b>→</b><strong>{label}</strong></span><ArrowUpRight /></a>)}</div>}

        <h2>Développez votre expertise commerciale !</h2>
        <p className="business-card-newsletter">Abonnez-vous à notre newsletter et recevez<br />des conseils exclusifs et des stratégies<br />efficaces</p>
        <button type="button" className="business-card-newsletter-button" onPointerUp={openNewsletter} onClick={openNewsletter}><Mail /> Recevoir les conseils IA <ArrowUpRight /></button>
      </div>
      {selectedOffer && <div className="business-card-modal-backdrop" role="presentation" onClick={() => setSelectedOffer(null)}>
        <section className="business-card-modal" role="dialog" aria-modal="true" aria-labelledby="offer-title" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="business-card-modal-close" aria-label="Fermer" onClick={() => setSelectedOffer(null)}><X /></button>
          <span className="business-card-modal-check"><Check /></span>
          <p className="business-card-modal-kicker">ACCOMPAGNEMENT ABEL SALAH</p>
          <h2 id="offer-title">Choisissez votre solution</h2>
          <div className="business-card-modal-offers">{offers.map((offer) => <div className="business-card-modal-offer" key={offer.id}><div><strong>{offer.label}</strong><b>{offer.price}</b><p>{offer.description}</p></div><a className="business-card-modal-cta" href={offer.href} target={offer.href.startsWith("http") ? "_blank" : undefined} rel={offer.href.startsWith("http") ? "noreferrer" : undefined} onClick={() => trackConversionEvent("offer_cta_click", `business_card_${offer.id}`, offer.href)}>{offer.cta} <ArrowUpRight /></a></div>)}</div>
          <p className="business-card-modal-note">Après paiement, vous recevrez les prochaines instructions par email.</p>
        </section>
      </div>}
      {newsletterOpen && <div className="business-card-modal-backdrop" role="presentation" onClick={() => setNewsletterOpen(false)}>
        <section className="business-card-modal newsletter-modal" role="dialog" aria-modal="true" aria-labelledby="newsletter-title" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="business-card-modal-close" aria-label="Fermer" onClick={() => setNewsletterOpen(false)}><X /></button>
          <span className="business-card-modal-check"><Mail /></span>
          <p className="business-card-modal-kicker">CONSEILS IA &amp; BUSINESS</p>
          <h2 id="newsletter-title">Recevez les conseils d’Abel</h2>
          {newsletterStatus === "success" ? <p className="newsletter-success">Inscription confirmée. Un email de bienvenue vient de vous être envoyé.</p> : <form onSubmit={subscribe} className="newsletter-form"><label htmlFor="newsletter-email">Votre adresse email</label><input id="newsletter-email" type="email" required value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} placeholder="vous@entreprise.fr" autoComplete="email" /><button type="submit" disabled={newsletterStatus === "loading"}>{newsletterStatus === "loading" ? "Inscription…" : "Je m’inscris"}</button>{newsletterStatus === "error" && <p className="newsletter-error">L’inscription est momentanément indisponible. Réessayez dans quelques instants.</p>}<small>Conseils pratiques sur l’IA, l’automatisation et la visibilité digitale. Désinscription en un clic.</small></form>}
        </section>
      </div>}
    </article>
    <a className="business-card-review" href="mailto:contact@abelsalah.fr?subject=Mon%20retour">Laisser un avis</a>
  </main>;
};

export default BusinessCard;
