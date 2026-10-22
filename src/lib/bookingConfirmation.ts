import { CONSENT_DURATION, parseConsent } from "./trackingConsent.ts";

export type BookingKind = "call" | "webinar";

// IDs read from the public TidyCal booking pages on 23 October 2026.
export const BOOKING_TYPES = {
  call: { id: "1984399", url: "https://tidycal.com/skill-lms/abel-rdv" },
  webinar: { id: "2132022", url: "https://tidycal.com/skill-lms/webinaire-ia" },
} as const;

export function bookingUrls(kind: BookingKind, entryUrl?: string): { embedded: string; external: string } {
  const target = new URL(BOOKING_TYPES[kind].url);
  try {
    const entry = new URL(entryUrl ?? target.href);
    if (entry.origin === target.origin && entry.pathname === target.pathname) {
      for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
        const value = entry.searchParams.get(key);
        if (value) target.searchParams.set(key, value.slice(0, 200));
      }
    }
  } catch { /* keep the known booking URL */ }
  const external = target.href;
  target.searchParams.set("embed", "1");
  return { embedded: target.href, external };
}

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

function identifier(value: unknown): string | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  if (typeof value === "number" && !Number.isSafeInteger(value)) return null;
  const id = String(value);
  return /^[1-9]\d{0,15}$/.test(id) ? id : null;
}

export function parseBookingConfirmation(
  event: { origin: string; source: unknown; data: unknown },
  expectedFrame: unknown,
  kind: BookingKind,
): { id: string; kind: BookingKind } | null {
  if (!expectedFrame || event.source !== expectedFrame || event.origin !== "https://tidycal.com") return null;
  const message = record(event.data);
  const booking = record(record(message?.data)?.booking);
  if (message?.event !== "bookingComplete" || !booking) return null;
  const id = identifier(booking.id);
  if (!id || identifier(booking.booking_type_id) !== BOOKING_TYPES[kind].id) return null;
  if (booking.cancelled_at || booking.canceled_at || booking.requires_approval === true) return null;
  if (booking.status !== undefined && !["confirmed", "approved"].includes(String(booking.status))) return null;
  if (typeof booking.starts_at !== "string" || typeof booking.ends_at !== "string") return null;
  const starts = Date.parse(booking.starts_at);
  const ends = Date.parse(booking.ends_at);
  if (!Number.isFinite(starts) || !Number.isFinite(ends) || ends <= starts) return null;
  // Deliberately discard names, emails, meeting links and intake answers.
  return { id, kind };
}

export async function bookingEventId(id: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`abel:tidycal:${id}`));
  return `abel_booking_${Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("")}`;
}

export function marketingBookingEvent(value: unknown): { eventId: string; kind: BookingKind; name: "Schedule" | "CompleteRegistration" } | null {
  const detail = record(value);
  if (!detail || typeof detail.eventId !== "string" || !/^abel_booking_[a-f0-9]{64}$/.test(detail.eventId)) return null;
  if (detail.kind !== "call" && detail.kind !== "webinar") return null;
  return { eventId: detail.eventId, kind: detail.kind, name: detail.kind === "call" ? "Schedule" : "CompleteRegistration" };
}

const sentForVisit = new Map<string, number>();
const sentKey = "abel-confirmed-bookings-v1";
export function bookingConsentAllowed(persisted: string | null, visit: string | null, refused: boolean, now = Date.now()): boolean {
  return !refused && (parseConsent(persisted, now) ?? parseConsent(visit, now)) === true;
}

export function claimBookingEvent(id: string, storage: Pick<Storage, "getItem" | "setItem"> | null, now = Date.now()): boolean {
  if (!/^abel_booking_[a-f0-9]{64}$/.test(id)) return false;
  for (const [key, at] of sentForVisit) if (at > now || now - at >= CONSENT_DURATION) sentForVisit.delete(key);
  if (sentForVisit.has(id)) return false;
  let stored: { id: string; at: number }[] = [];
  try {
    const value: unknown = JSON.parse(storage?.getItem(sentKey) ?? "[]");
    if (Array.isArray(value)) stored = value.filter((entry): entry is { id: string; at: number } => {
      const item = record(entry);
      return !!item && typeof item.id === "string" && /^abel_booking_[a-f0-9]{64}$/.test(item.id)
        && typeof item.at === "number" && Number.isFinite(item.at) && item.at <= now && now - item.at < CONSENT_DURATION;
    }).slice(-100);
  } catch { /* bounded in-memory fallback */ }
  if (stored.some(entry => entry.id === id)) return false;
  sentForVisit.set(id, now);
  if (sentForVisit.size > 100) sentForVisit.delete(sentForVisit.keys().next().value!);
  try { storage?.setItem(sentKey, JSON.stringify([...stored, { id, at: now }].slice(-100))); } catch { /* tracking never blocks a booking */ }
  return true;
}
