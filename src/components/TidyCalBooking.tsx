import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "@/pages/booking-preparation.css";
import { bookingUrls, bookingEventId, parseBookingConfirmation, type BookingKind } from "@/lib/bookingConfirmation";

const labels = {
  fr: { done: "Votre réservation a été enregistrée. Consultez votre email pour les détails.", open: "Ouvrir le calendrier dans un nouvel onglet" },
  en: { done: "Your booking has been recorded. Check your email for the details.", open: "Open the calendar in a new tab" },
  es: { done: "Tu reserva se ha registrado. Consulta tu correo para ver los detalles.", open: "Abrir el calendario en una nueva pestaña" },
};

export default function TidyCalBooking({ kind, title, locale = "fr", entryUrl }: { kind: BookingKind; title: string; locale?: "fr" | "en" | "es"; entryUrl?: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [completed, setCompleted] = useState(false);
  const urls = bookingUrls(kind, entryUrl);
  useEffect(() => {
    let active = true;
    const receive = async (event: MessageEvent) => {
      const confirmed = parseBookingConfirmation(event, frame.current?.contentWindow, kind);
      if (!confirmed) return;
      setCompleted(true);
      try {
        const eventId = await bookingEventId(confirmed.id);
        if (active) window.dispatchEvent(new CustomEvent("abel:booking-confirmed", { detail: { eventId, kind } }));
      } catch { /* a booking succeeds even when measurement is unavailable */ }
    };
    window.addEventListener("message", receive);
    return () => { active = false; window.removeEventListener("message", receive); };
  }, [kind]);
  return <div className="abel-booking">
    {completed && <p role="status">{labels[locale].done}</p>}
    {completed && <Link className="booking-confirmed-next" to={kind === "call" ? "/confirmation-rdv" : "/confirmation-webinaire"} state={{ confirmedBooking: kind }}>{locale === "en" ? "Prepare for your session" : locale === "es" ? "Prepara tu sesión" : "Préparer ma session"}</Link>}
    <iframe ref={frame} src={urls.embedded} title={title} width="100%" height="700" className="w-full border-0" />
    <p className="text-sm"><a href={urls.external} target="_blank" rel="noreferrer">{labels[locale].open}</a></p>
  </div>;
}
