export const CONSENT_KEY = "abel-marketing-consent-v1";
export const CONSENT_DURATION = 180 * 24 * 60 * 60 * 1000;
export function parseConsent(raw: string | null, now = Date.now()): boolean | null {
  try {
    const value = JSON.parse(raw ?? "null");
    return value && typeof value.accepted === "boolean" && Number.isFinite(value.at)
      && value.at <= now && now - value.at < CONSENT_DURATION ? value.accepted : null;
  } catch { return null; }
}
