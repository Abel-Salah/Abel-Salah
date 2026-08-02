type ConversionEventName = "book_call_click" | "offer_cta_click" | "tool_click";

type ConversionEvent = {
  name: ConversionEventName;
  source: string;
  path: string;
  target?: string;
  createdAt: string;
};

const storageKey = "abel-conversion-events";
const maxStoredEvents = 50;

export function trackConversionEvent(
  name: ConversionEventName,
  source: string,
  target?: string
) {
  if (typeof window === "undefined") return;

  const event: ConversionEvent = {
    name,
    source,
    target,
    path: window.location.pathname,
    createdAt: new Date().toISOString(),
  };

  window.dispatchEvent(new CustomEvent("abel:conversion", { detail: event }));

  try {
    const current = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    const events = Array.isArray(current) ? current : [];
    events.push(event);
    window.localStorage.setItem(
      storageKey,
      JSON.stringify(events.slice(-maxStoredEvents))
    );
  } catch {
    // Conversion tracking must never block navigation or booking.
  }
}
