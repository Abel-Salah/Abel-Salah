export type ConversionEventName = "book_call_click" | "offer_cta_click";

interface ConversionEventPayload {
  source: string;
  offer?: string;
}

export function trackConversionEvent(
  name: ConversionEventName,
  payload: ConversionEventPayload
) {
  window.dispatchEvent(
    new CustomEvent("abel:conversion", {
      detail: { name, ...payload, timestamp: new Date().toISOString() },
    })
  );
}
