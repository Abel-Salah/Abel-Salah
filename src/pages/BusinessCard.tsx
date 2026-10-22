import { ArrowUpRight, BadgeCheck, CalendarDays, Facebook, Linkedin, Mail, Music2, Youtube } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { CARD_BOOKING_URL, CARD_PURCHASES, CARD_TRAINING_FORMATS, getTrainingBookingUrl, type CardTrainingFormat } from "@/data/cardServices";
import CardDialog from "./CardDialog";
import TidyCalBooking from "@/components/TidyCalBooking";
import type { BookingKind } from "@/lib/bookingConfirmation";
import { trackConversionEvent } from "@/lib/conversionEvents";
import { WEBINAR_BOOKING_URL, formatWebinarDate, getUpcomingWebinars } from "@/data/webinars";
import portrait from "@/assets/abel-salah-card-portrait.webp";
import cover from "@/assets/business-card-cover-v2.webp";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type MouseEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import "./business-card.css";
import "./business-card-enhancements.css";
import "./business-card-webinar.css";
import "./business-card-services.css";

const links = [
  { label: "SKILLCO", badge: "Projets IA & formation", href: "https://skillco.fr" },
  { label: "SKILL LMS", badge: "Plateforme de formation", href: "https://skill-lms.fr" },
  { label: "SCALLUP", badge: "Plateforme de prospection", href: "https://scallup.fr" },
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

const tabs = [
  { id: "services", label: "Services" },
  { id: "useful", label: "Liens utiles" },
  { id: "about", label: "Qui suis-je ?" },
  { id: "work", label: "Réalisations" },
] as const;
type CardTab = (typeof tabs)[number]["id"];

const BusinessCard = () => {
  const [upcomingWebinars, setUpcomingWebinars] = useState<string[] | null>(null);
  useEffect(() => {
    // Les dates dépendent de la visite, jamais de la date du pré-rendu statique.
    const refresh = () => setUpcomingWebinars(getUpcomingWebinars());
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const [selectedService, setSelectedService] = useState<CardTrainingFormat | null>(null);
  const [serviceSubmitted, setServiceSubmitted] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activeTab, setActiveTab] = useState<CardTab>("services");
  const [bookingRequest, setBookingRequest] = useState<{ kind: BookingKind; url: string } | null>(null);
  const bookingReturnFocus = useRef<HTMLElement | null>(null);
  const serviceReturnFocus = useRef<HTMLElement | null>(null);
  const openBooking = (event: MouseEvent<HTMLAnchorElement>, kind: BookingKind) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    bookingReturnFocus.current = selectedService ? serviceReturnFocus.current : event.currentTarget;
    setSelectedService(null);
    setBookingRequest({ kind, url: event.currentTarget.href });
  };
  const openNewsletter = () => { setNewsletterOpen(true); setNewsletterStatus("idle"); };
  const openService = (format: CardTrainingFormat, trigger: HTMLButtonElement) => { serviceReturnFocus.current = trigger; setSelectedService(format); setServiceSubmitted(false); };
  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(tabs[next].id);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };
  const submitServiceRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Demande de devis — ${selectedService?.title ?? "Formation IA"}`;
    const body = [`Formation : ${selectedService?.title ?? ""}`, `Format : ${selectedService?.duration ?? ""}`, `Nom : ${data.get("name") ?? ""}`, `Entreprise : ${data.get("company") ?? ""}`, `Email : ${data.get("email") ?? ""}`, `Période souhaitée : ${data.get("period") ?? ""}`, "", `Besoin : ${data.get("need") ?? ""}`].join("\n");
    window.location.href = `mailto:contact@abelsalah.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    trackConversionEvent("offer_cta_click", `business_card_quote_email_${selectedService?.id}`, "mailto:contact@abelsalah.fr");
    setServiceSubmitted(true);
  };

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
      description="Webinaire IA gratuit, audit express, formations IA et suivi avec Abel SALAH, fondateur de SKILLCO. Choisissez votre prochain pas."
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
        <p className="business-card-role">Consultant IA · Audit &amp; formation<br />Fondateur de <a href="https://skillco.fr">SKILLCO</a></p>

        <div className="business-card-socials" aria-label="Réseaux sociaux">
          <a className="social social-facebook" href="https://www.facebook.com/abelsalah" aria-label="Facebook"><Facebook /></a>
          <a className="social social-linkedin" href="https://www.linkedin.com/in/abel-salah/" aria-label="LinkedIn"><Linkedin /></a>
          <a className="social social-youtube" href="https://www.youtube.com/@abelsalah" aria-label="YouTube"><Youtube /></a>
          <a className="social social-tiktok" href="https://www.tiktok.com/@abel.salah?_r=1&_t=ZN-98Y4D0yDha6" aria-label="TikTok"><Music2 /></a>
          <a className="social social-mail" href="mailto:contact@abelsalah.fr" aria-label="Envoyer un email"><Mail /></a>
        </div>

        <section className="business-card-webinar" aria-labelledby="webinar-title">
          <p className="business-card-webinar-kicker"><CalendarDays aria-hidden="true" /> GRATUIT · 1 H EN DIRECT</p>
          <h2 id="webinar-title">Webinaire IA pour votre entreprise</h2>
          {upcomingWebinars === null ? <>
            <p>Consultez le calendrier pour connaître les prochaines dates.</p>
            <a className="business-card-webinar-cta" href={WEBINAR_BOOKING_URL}>Consulter les dates <ArrowUpRight aria-hidden="true" /></a>
          </> : upcomingWebinars.length > 0 ? <>
            <p className="business-card-webinar-date"><span className="card-next-session">Prochaine session : </span><strong>{formatWebinarDate(upcomingWebinars[0])}</strong><br />12 h 30 – 13 h 30 · heure de Paris</p>
            <a className="business-card-webinar-cta" href={WEBINAR_BOOKING_URL} aria-haspopup="dialog" onClick={(event) => { trackConversionEvent("webinar_signup_click", "business_card_webinar", WEBINAR_BOOKING_URL); openBooking(event, "webinar"); }}>Je m’inscris gratuitement <ArrowUpRight aria-hidden="true" /></a>
          </> : <>
            <p>Les prochaines dates seront annoncées prochainement.</p>
            <button type="button" className="business-card-webinar-cta" onClick={openNewsletter}>Recevoir les prochaines dates <ArrowUpRight aria-hidden="true" /></button>
          </>}
        </section>

        <a className="card-booking-link" href={CARD_BOOKING_URL} aria-haspopup="dialog" onClick={(event) => { trackConversionEvent("book_call_click", "business_card_planning", CARD_BOOKING_URL); openBooking(event, "call"); }}><CalendarDays aria-hidden="true" /> Planifier un échange · 30 min <ArrowUpRight aria-hidden="true" /></a>

        <div className="business-card-tabs" role="tablist" aria-label="Informations complémentaires">
          {tabs.map((tab, index) => <button key={tab.id} id={`card-tab-${tab.id}`} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls="card-tab-panel" tabIndex={activeTab === tab.id ? 0 : -1} className={activeTab === tab.id ? "is-active" : ""} onClick={() => setActiveTab(tab.id)} onKeyDown={(event) => handleTabKey(event, index)}>{tab.label}</button>)}
        </div>
        <div id="card-tab-panel" role="tabpanel" aria-labelledby={`card-tab-${activeTab}`} tabIndex={0}>
        {activeTab === "services" && <div className="card-service-groups">
          <section className="card-service-group" aria-labelledby="card-audit-title">
            <p className="card-service-step">01 · Identifier les priorités</p>
            <h2 id="card-audit-title">Audit de votre structure</h2>
            <p>Un audit express de votre entreprise, de votre site et de votre visibilité en ligne.</p>
            <a className="card-service-buy" href={CARD_PURCHASES.audit.href} onClick={() => trackConversionEvent("offer_cta_click", "business_card_audit", CARD_PURCHASES.audit.href)}><span>Commander l’audit express</span><strong>{CARD_PURCHASES.audit.price}</strong><ArrowUpRight aria-hidden="true" /></a>
          </section>
          <section className="card-service-group card-training-group" aria-labelledby="card-training-title">
            <p className="card-service-step">02 · Passer à la pratique</p>
            <h2 id="card-training-title">Formation IA</h2>
            <p>Trois formats selon votre niveau. Programme et tarif sur devis, adaptés à votre équipe.</p>
            <div className="card-training-formats">{CARD_TRAINING_FORMATS.map((format) => <button key={format.id} type="button" className="card-training-format" onClick={(event) => openService(format, event.currentTarget)} aria-haspopup="dialog"><span><strong>{format.title}</strong><small>{format.duration}</small></span><ArrowUpRight aria-hidden="true" /></button>)}</div>
          </section>
          <section className="card-service-group" aria-labelledby="card-followup-title">
            <p className="card-service-step">03 · Ancrer les usages</p>
            <h2 id="card-followup-title">Suivi après formation</h2>
            <p>Un mois de coaching IA pour appliquer vos usages et avancer sur vos questions.</p>
            <a className="card-service-buy" href={CARD_PURCHASES.followup.href} onClick={() => trackConversionEvent("offer_cta_click", "business_card_followup", CARD_PURCHASES.followup.href)}><span>Choisir le suivi · 1 mois</span><strong>{CARD_PURCHASES.followup.price}</strong><ArrowUpRight aria-hidden="true" /></a>
            <small className="card-service-note">Option indépendante · paiement unique, sans abonnement.</small>
          </section>
          <p className="card-checkout-note">Paiement sécurisé par Stripe. Les taxes éventuelles sont précisées avant paiement.</p>
        </div>}
        {activeTab === "useful" && <><a className="business-card-service" href="/checklist?utm_source=carte" onClick={() => trackConversionEvent("tool_click", "business_card_checklist", "/checklist")}><span><strong>Checklist audit — gratuite</strong><small>7 axes et des prompts IA pour commencer.</small></span><ArrowUpRight aria-hidden="true" /></a>{links.map((link) => <a key={link.href} className="business-card-link ecosystem-link" href={link.href} target="_blank" rel="noreferrer" title={link.badge}><span><b>→</b><strong>{link.label === "SKILLCO" ? <>SKILL<span className="brand-accent">CO</span></> : link.label}</strong></span><ArrowUpRight /></a>)}</>}
        {activeTab === "about" && <div className="business-card-tab-panel"><strong>Un parcours commercial devenu digital.</strong><p>Après des études supérieures en commerce et une expérience comme directeur d’Intersport, j’ai choisi de bifurquer vers le digital, l’intelligence artificielle et l’accompagnement des entreprises.</p><p>Aujourd’hui, j’accompagne les entreprises autour de trois pôles d’expertise :</p><ul><li><strong>Audits</strong> pour identifier les priorités et les opportunités.</li><li><strong>Déploiements &amp; optimisations</strong> pour passer aux actions concrètes.</li><li><strong>Formation</strong> pour rendre les équipes autonomes.</li></ul></div>}
        {activeTab === "work" && <div className="business-card-projects">{projects.map(([label, href]) => <a key={href} className="business-card-link ecosystem-link" href={href} target="_blank" rel="noreferrer"><span><b>→</b><strong>{label}</strong></span><ArrowUpRight /></a>)}</div>}

        </div>
        <details className="card-newsletter-details"><summary>Recevoir les conseils IA par email</summary><p>Des conseils pratiques pour avancer entre deux sessions.</p><button type="button" className="business-card-newsletter-button" onClick={openNewsletter}><Mail aria-hidden="true" /> M’inscrire aux conseils IA <ArrowUpRight aria-hidden="true" /></button></details>
      </div>
      {selectedService && <CardDialog titleId="service-request-title" onClose={() => setSelectedService(null)}>
        <p className="business-card-modal-kicker">FORMATION IA · SUR DEVIS</p>
        <h2 id="service-request-title">{selectedService.title}</h2>
        <p className="card-training-duration">{selectedService.duration}</p>
        <p>{selectedService.description}</p>
        <a className="business-card-modal-cta" href={getTrainingBookingUrl(selectedService)} onClick={(event) => { trackConversionEvent("book_call_click", `business_card_formation_${selectedService.id}`, getTrainingBookingUrl(selectedService)); openBooking(event, "call"); }}>Planifier un échange <ArrowUpRight aria-hidden="true" /></a>
        <p className="card-dialog-note">Cet échange sert à cadrer le programme, le tarif et les dates de formation. Il ne réserve pas une session de formation.</p>
        <details className="card-quote-details"><summary>Ou demander un devis par email</summary>
        {serviceSubmitted && <p role="status" className="card-dialog-note">Votre messagerie a été sollicitée. Vérifiez le message puis envoyez-le pour transmettre votre demande. Si elle ne s’ouvre pas, écrivez à <a href="mailto:contact@abelsalah.fr">contact@abelsalah.fr</a>.</p>}<form className="newsletter-form" onSubmit={submitServiceRequest}>
          <label htmlFor="service-name">Nom</label><input id="service-name" name="name" required autoComplete="name" />
          <label htmlFor="service-company">Entreprise</label><input id="service-company" name="company" required autoComplete="organization" />
          <label htmlFor="service-email">Email professionnel</label><input id="service-email" name="email" type="email" required autoComplete="email" />
          <label htmlFor="service-period">Période souhaitée <small>(facultatif)</small></label><input id="service-period" name="period" placeholder="Ex. novembre, à distance" />
          <label htmlFor="service-need">Votre besoin</label><textarea id="service-need" name="need" required rows={3} placeholder="Objectif, outils utilisés, nombre de participants…" />
          <button type="submit">Préparer mon email <ArrowUpRight aria-hidden="true" /></button><small>Votre messagerie s’ouvrira avec le format choisi et vos informations. Vous devrez envoyer l’email pour transmettre la demande.</small>
        </form>
        </details>
      </CardDialog>}
      {bookingRequest && <CardDialog titleId="booking-dialog-title" returnFocus={bookingReturnFocus.current} onClose={() => setBookingRequest(null)}>
        <h2 id="booking-dialog-title">{bookingRequest.kind === "webinar" ? "Inscription au webinaire IA" : "Planifier un échange"}</h2>
        <TidyCalBooking kind={bookingRequest.kind} entryUrl={bookingRequest.url} title={bookingRequest.kind === "webinar" ? "Calendrier du webinaire IA" : "Calendrier des échanges avec Abel SALAH"} />
      </CardDialog>}
      {newsletterOpen && <CardDialog titleId="newsletter-title" onClose={() => setNewsletterOpen(false)}>
          <span className="business-card-modal-check"><Mail /></span>
          <p className="business-card-modal-kicker">CONSEILS IA &amp; BUSINESS</p>
          <h2 id="newsletter-title">Recevez les conseils d’Abel</h2>
          {newsletterStatus === "success" ? <p className="newsletter-success">Inscription confirmée. Un email de bienvenue vient de vous être envoyé.</p> : <form onSubmit={subscribe} className="newsletter-form"><label htmlFor="newsletter-email">Votre adresse email</label><input id="newsletter-email" type="email" required value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} placeholder="vous@entreprise.fr" autoComplete="email" /><button type="submit" disabled={newsletterStatus === "loading"}>{newsletterStatus === "loading" ? "Inscription…" : "Je m’inscris"}</button>{newsletterStatus === "error" && <p className="newsletter-error">L’inscription est momentanément indisponible. Réessayez dans quelques instants.</p>}<small>Conseils pratiques sur l’IA, l’automatisation et la visibilité digitale. Désinscription en un clic.</small></form>}
      </CardDialog>}
    </article>
    <a className="business-card-review" href="mailto:contact@abelsalah.fr?subject=Mon%20retour">Laisser un avis</a>
  </main>;
};

export default BusinessCard;
