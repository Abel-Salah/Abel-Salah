import { Link, useLocation } from "react-router";
import { Check, CheckCircle2, Mail, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { bookingPreparation } from "@/data/bookingPreparation";
import "./booking-preparation.css";

export default function BookingPreparation({ webinar = false, locale = "fr" }: { webinar?: boolean; locale?: "fr" | "en" | "es" }) {
  const location = useLocation();
  const confirmed = location.state?.confirmedBooking === (webinar ? "webinar" : "call");
  const t = bookingPreparation[locale];
  const session = webinar ? t.webinar : t.call;
  return <main className="booking-preparation">
    <SEOHead title={session.title} description={t.description} canonical={session.path} lang={locale} noindex />
    <article className="booking-preparation-card">
      {confirmed && <div className="booking-confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ left: `${5 + i * 5}%`, animationDelay: `${i % 5 * 0.07}s`, backgroundColor: ["#2459dd", "#79b8ff", "#f5ca70"][i % 3] }} />)}</div>}
      <Link to={t.backPath} className="booking-preparation-brand">Abel SALAH</Link>
      <CheckCircle2 className="booking-preparation-check" aria-hidden="true" />
      <p className="booking-preparation-kicker">{session.kicker}</p>
      <h1>{confirmed ? session.confirmed : session.heading}</h1>
      <p className="booking-preparation-intro">{session.intro}</p>
      <aside className="booking-preparation-email"><Mail aria-hidden="true" /><p><strong>{t.emailTitle}</strong><br />{t.email}</p></aside>
      <h2>{t.prepare}</h2>
      <div className="booking-preparation-list">{session.items.map(([title, detail]) => <label key={title}><input type="checkbox" /><span><strong>{title}</strong><span>{detail}</span></span><Check aria-hidden="true" /></label>)}</div>
      <p className="booking-preparation-note">{t.note}</p>
      <Link to={t.backPath} className="booking-preparation-back">{t.back} <ArrowRight aria-hidden="true" /></Link>
      <p className="booking-preparation-help">{t.help} <a href="mailto:contact@abelsalah.fr">contact@abelsalah.fr</a></p>
    </article>
  </main>;
}
