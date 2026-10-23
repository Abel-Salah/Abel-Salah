import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CONSENT_KEY, parseConsent } from "@/lib/trackingConsent";
import { bookingConsentAllowed, claimBookingEvent, marketingBookingEvent } from "@/lib/bookingConfirmation";

const GTM = "GTM-WJS9SGGV";
const PIXEL = "DBD5HNRC77U4SEFNH7E0";
let refusalForVisit = false;
let consentForVisit: string | null = null;

// Both integrations are deliberately loaded only after affirmative consent.
// No Purchase/Schedule event is inferred from a click or a return URL.
function loadMarketing() {
  if (document.getElementById("abel-marketing-loader")) return;
  const script = document.createElement("script");
  script.id = "abel-marketing-loader";
  script.textContent = `window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
    var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtm.js?id=${GTM}';document.head.appendChild(g);
    !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src=r+'?sdkid='+e+'&lib='+t;d.head.appendChild(s)};ttq.load('${PIXEL}');ttq.page();w.addEventListener('abel:page',function(){ttq.page()})}(window,document,'ttq');`;
  document.head.appendChild(script);
}

export default function MarketingConsent() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    function confirmedBooking(event: Event) {
      const booking = marketingBookingEvent((event as CustomEvent<unknown>).detail);
      if (!booking || refusalForVisit || location.pathname.startsWith("/admin") || new URLSearchParams(location.search).get("marketing") === "off") return;
      let persisted: string | null = null;
      try {
        if (sessionStorage.getItem("abel-marketing-refused") === "yes") return;
        persisted = localStorage.getItem(CONSENT_KEY);
      } catch { /* use the affirmative visit choice only */ }
      if (!bookingConsentAllowed(persisted, consentForVisit, refusalForVisit) || !document.getElementById("abel-marketing-loader")) return;
      const marketing = window as unknown as {
        ttq?: { track: (name: string, properties: Record<string, string>, options: { event_id: string }) => void };
        dataLayer?: Record<string, string>[];
      };
      if (typeof marketing.ttq?.track !== "function") return;
      let storage: Storage | null = null;
      try { storage = localStorage; } catch { /* memory deduplication remains available */ }
      if (!claimBookingEvent(booking.eventId, storage)) return;
      try {
        marketing.ttq.track(booking.name, { content_name: booking.kind === "call" ? "Echange Abel SALAH" : "Webinaire IA Abel SALAH" }, { event_id: booking.eventId });
        marketing.dataLayer?.push({ event: "abel_booking_confirmed", booking_kind: booking.kind, event_id: booking.eventId });
      } catch { /* SDK failures must not affect a successful booking */ }
    }
    window.addEventListener("abel:booking-confirmed", confirmedBooking);
    return () => window.removeEventListener("abel:booking-confirmed", confirmedBooking);
  }, []);
  useEffect(() => {
    function syncConsent(event: StorageEvent) {
      if (event.key !== CONSENT_KEY && event.key !== null) return;
      if (parseConsent(event.newValue) !== true) {
        refusalForVisit = true;
        consentForVisit = JSON.stringify({ accepted: false, at: Date.now() });
        if (document.getElementById("abel-marketing-loader")) location.reload();
        setVisible(false);
      } else {
        refusalForVisit = false;
        consentForVisit = event.newValue;
        const url = new URL(location.href);
        if (url.searchParams.has("marketing")) {
          url.searchParams.delete("marketing");
          history.replaceState(history.state, "", url.href);
        }
        try { sessionStorage.setItem("abel-marketing-refused", "no"); } catch { /* memory fallback */ }
        if (!location.pathname.startsWith("/admin")) loadMarketing();
        setVisible(false);
      }
    }
    function checkExpiry() {
      let consent: boolean | null = null;
      try { consent = parseConsent(localStorage.getItem(CONSENT_KEY)); } catch { /* visit fallback */ }
      if (consent === null) consent = parseConsent(consentForVisit);
      if (consent !== true && document.getElementById("abel-marketing-loader")) location.reload();
    }
    window.addEventListener("storage", syncConsent);
    const timer = window.setInterval(checkExpiry, 60_000);
    return () => {
      window.removeEventListener("storage", syncConsent);
      window.clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    let consent: boolean | null = null;
    try { consent = parseConsent(localStorage.getItem(CONSENT_KEY)); } catch { /* fail closed */ }
    if (new URLSearchParams(location.search).get("marketing") === "off") refusalForVisit = true;
    try { if (sessionStorage.getItem("abel-marketing-refused") === "yes") refusalForVisit = true; } catch { /* memory fallback */ }
    if (consent === null) consent = parseConsent(consentForVisit);
    if (refusalForVisit) consent = false;
    if (pathname.startsWith("/admin")) {
      if (document.getElementById("abel-marketing-loader")) location.reload();
      return;
    }
    if (consent === true) {
      if (document.getElementById("abel-marketing-loader")) window.dispatchEvent(new Event("abel:page"));
      else loadMarketing();
    }
    if (consent !== true && document.getElementById("abel-marketing-loader")) {
      location.reload();
      return;
    }
    setVisible(consent === null);
  }, [pathname]);
  function choose(accepted: boolean) {
    refusalForVisit = !accepted;
    consentForVisit = JSON.stringify({ accepted, at: Date.now() });
    try { sessionStorage.setItem("abel-marketing-refused", accepted ? "no" : "yes"); } catch { /* memory and URL fallback */ }
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ accepted, at: Date.now() })); } catch { /* choice applies to this visit */ }
    // Reload also stops already-loaded third-party code when consent is withdrawn.
    if (!accepted && document.getElementById("abel-marketing-loader")) {
      const url = new URL(location.href);
      url.searchParams.set("marketing", "off");
      location.replace(url.href);
      return;
    }
    if (accepted && !pathname.startsWith("/admin")) {
      const url = new URL(location.href);
      if (url.searchParams.has("marketing")) {
        url.searchParams.delete("marketing");
        history.replaceState(history.state, "", url.href);
      }
      loadMarketing();
    }
    setVisible(false);
  }
  return <>
    <button type="button" className="fixed bottom-2 left-2 z-40 rounded border border-border bg-background px-3 py-2 text-xs" onClick={() => setVisible(true)}>Cookies</button>
    {visible && <section aria-label="Préférences de cookies publicitaires" className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border bg-background p-5 shadow-xl">
      <div className="mx-auto max-w-3xl">
        <p className="font-semibold">Mesure publicitaire</p>
        <p className="my-3 text-sm text-muted-foreground">Avec votre accord, Google Tag Manager et le pixel TikTok nous aident à mesurer les visites et les résultats de nos campagnes. Vous pouvez refuser et continuer à utiliser le site, puis modifier votre choix avec le bouton Cookies.</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="rounded border border-border px-4 py-2" onClick={() => choose(false)}>Tout refuser</button>
          <button type="button" className="rounded border border-border px-4 py-2" onClick={() => choose(true)}>Tout accepter</button>
        </div>
      </div>
    </section>}
  </>;
}
