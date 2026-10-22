import { Link, useLocation } from "react-router";
import { Check, CheckCircle2, Mail, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import "./booking-preparation.css";

export default function BookingPreparation({ webinar = false }: { webinar?: boolean }) {
  const location = useLocation();
  const confirmed = location.state?.confirmedBooking === (webinar ? "webinar" : "call");
  const items = webinar ? [
    ["Choisissez un cas concret", "Une tâche répétitive, un document ou une difficulté sur laquelle vous aimeriez utiliser l’IA."],
    ["Notez votre question prioritaire", "Ce que vous aimeriez comprendre ou réussir à faire après la session."],
    ["Préparez votre connexion", "Privilégiez un ordinateur, testez le son et ouvrez le lien Google Meet reçu par email quelques minutes avant."],
  ] : [
    ["Présentez votre activité", "Votre entreprise, votre rôle et les outils que vous utilisez déjà. L’adresse de votre site peut suffire."],
    ["Choisissez votre principal blocage", "Une tâche chronophage ou un problème précis. Un exemple concret nous aidera davantage qu’une longue présentation."],
    ["Définissez le résultat attendu", "Gagner du temps, mieux vendre ou rendre votre équipe autonome : quelle priorité souhaitez-vous faire avancer ?"],
  ];
  const path = webinar ? "/confirmation-webinaire" : "/confirmation-rdv";
  return <main className="booking-preparation">
    <SEOHead title={webinar ? "Préparer votre webinaire IA — Abel SALAH" : "Préparer votre échange IA — Abel SALAH"} description="Les prochaines étapes pour profiter de votre session avec Abel SALAH." canonical={path} noindex />
    <article className="booking-preparation-card">
      {confirmed && <div className="booking-confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ left: `${5 + i * 5}%`, animationDelay: `${i % 5 * 0.07}s`, backgroundColor: ["#2459dd", "#79b8ff", "#f5ca70"][i % 3] }} />)}</div>}
      <Link to="/card" className="booking-preparation-brand">Abel SALAH</Link>
      <CheckCircle2 className="booking-preparation-check" aria-hidden="true" />
      <p className="booking-preparation-kicker">{webinar ? "WEBINAIRE IA · 1 H EN DIRECT" : "ÉCHANGE PERSONNALISÉ · 30 MIN"}</p>
      <h1>{confirmed ? (webinar ? "Vous êtes inscrit au webinaire !" : "Votre rendez-vous est réservé !") : (webinar ? "Préparez votre webinaire IA" : "Préparez notre échange")}</h1>
      <p className="booking-preparation-intro">{webinar ? "Un cas concret et une question suffisent pour profiter pleinement de la session." : "Trois éléments simples pour un échange utile, centré sur vos priorités."}</p>
      <aside className="booking-preparation-email"><Mail aria-hidden="true" /><p><strong>Votre email de confirmation fait référence.</strong><br />Vous y trouverez la date, l’heure, le lien de visioconférence et les informations pour modifier votre réservation. Si vous venez de réserver, vérifiez aussi vos courriers indésirables.</p></aside>
      <h2>À préparer en 5 minutes</h2>
      <div className="booking-preparation-list">{items.map(([title, detail]) => <label key={title}><input type="checkbox" /><span><strong>{title}</strong><span>{detail}</span></span><Check aria-hidden="true" /></label>)}</div>
      <p className="booking-preparation-note">Vos cases cochées restent sur cette page : rien n’est envoyé. Aucun document confidentiel ni donnée personnelle de vos clients n’est nécessaire.</p>
      <Link to="/card" className="booking-preparation-back">Retour à ma page <ArrowRight aria-hidden="true" /></Link>
      <p className="booking-preparation-help">Pas de confirmation ou une question ? <a href="mailto:contact@abelsalah.fr">contact@abelsalah.fr</a></p>
    </article>
  </main>;
}
