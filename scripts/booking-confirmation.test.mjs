import assert from "node:assert/strict";
import test from "node:test";
import { BOOKING_TYPES, bookingUrls, parseBookingConfirmation, bookingEventId, marketingBookingEvent, bookingConsentAllowed, claimBookingEvent } from "../src/lib/bookingConfirmation.ts";
import { CONSENT_DURATION } from "../src/lib/trackingConsent.ts";

const frame = {};
const booking = { id: 12345, booking_type_id: BOOKING_TYPES.call.id, starts_at: "2026-11-26T11:30:00Z", ends_at: "2026-11-26T12:30:00Z", email: "private@example.com", name: "Private person" };
const message = (overrides = {}, source = frame, origin = "https://tidycal.com") => ({ origin, source, data: { event: "bookingComplete", data: { booking: { ...booking, ...overrides } } } });

test("preserves campaign attribution only on the exact allowlisted booking URL", () => {
  const urls = bookingUrls("call", `${BOOKING_TYPES.call.url}?utm_content=card_formation_complete&email=private%40example.com`);
  assert.equal(new URL(urls.embedded).searchParams.get("embed"), "1");
  assert.equal(new URL(urls.embedded).searchParams.get("utm_content"), "card_formation_complete");
  assert.equal(new URL(urls.external).searchParams.has("embed"), false);
  assert.equal(new URL(urls.embedded).searchParams.has("email"), false);
  for (const entry of ["https://evil.example/?utm_content=wrong", `${BOOKING_TYPES.webinar.url}?utm_content=wrong`, "invalid"]) assert.equal(new URL(bookingUrls("call", entry).embedded).searchParams.has("utm_content"), false);
});

test("accepts completed bookings only from the exact TidyCal iframe and strips personal fields", () => {
  assert.deepEqual(parseBookingConfirmation(message(), frame, "call"), { id: "12345", kind: "call" });
  for (const event of [message({}, {}, "https://tidycal.com"), message({}, frame, "https://evil.example"), message({}, frame, "https://tidycal.com.evil.example"), message({}, null)]) assert.equal(parseBookingConfirmation(event, frame, "call"), null);
  assert.equal(parseBookingConfirmation(message(), null, "call"), null);
});

test("rejects another booking type, webinar/call mixups, pending and cancelled bookings", () => {
  for (const patch of [{ booking_type_id: "999" }, { booking_type_id: BOOKING_TYPES.webinar.id }, { status: "pending" }, { status: "cancelled" }, { requires_approval: true }, { cancelled_at: "2026-10-23" }]) assert.equal(parseBookingConfirmation(message(patch), frame, "call"), null);
  assert.deepEqual(parseBookingConfirmation(message({ booking_type_id: BOOKING_TYPES.webinar.id }), frame, "webinar"), { id: "12345", kind: "webinar" });
});

test("rejects malformed payloads, unsafe IDs and invalid dates", () => {
  for (const data of [null, "bookingComplete", [], {}, { event: "bookingComplete", data: {} }, { event: "bookingStarted", data: { booking } }]) assert.equal(parseBookingConfirmation({ origin: "https://tidycal.com", source: frame, data }, frame, "call"), null);
  for (const patch of [{ id: "" }, { id: -1 }, { id: 1.5 }, { id: Number.MAX_SAFE_INTEGER + 1 }, { id: "person@example.com" }, { starts_at: "invalid" }, { ends_at: booking.starts_at }]) assert.equal(parseBookingConfirmation(message(patch), frame, "call"), null);
});

test("event IDs are stable hashes, and webinar registration differs from appointment scheduling", async () => {
  const id = await bookingEventId("12345");
  assert.match(id, /^abel_booking_[a-f0-9]{64}$/);
  assert.equal(id, await bookingEventId("12345"));
  assert.notEqual(id, await bookingEventId("12346"));
  assert.equal(marketingBookingEvent({ eventId: id, kind: "webinar" }).name, "CompleteRegistration");
  assert.equal(marketingBookingEvent({ eventId: id, kind: "call" }).name, "Schedule");
  for (const value of [{ eventId: "12345", kind: "call" }, { eventId: id, kind: "purchase" }, null]) assert.equal(marketingBookingEvent(value), null);
});

test("refusal wins over an accepted visit; missing/expired/future consent cannot send conversions", () => {
  const now = CONSENT_DURATION * 2;
  const choice = (accepted, at = now) => JSON.stringify({ accepted, at });
  assert.equal(bookingConsentAllowed(choice(true), null, false, now), true);
  assert.equal(bookingConsentAllowed(null, choice(true), false, now), true);
  assert.equal(bookingConsentAllowed(choice(false), choice(true), false, now), false);
  assert.equal(bookingConsentAllowed(choice(true), choice(true), true, now), false);
  for (const raw of [null, "{", choice(true, 0), choice(true, now + 1)]) assert.equal(bookingConsentAllowed(raw, null, false, now), false);
});

test("deduplicates replays even when storage throws, and bounds persisted state", async () => {
  const first = await bookingEventId("20001");
  const broken = { getItem() { throw Error("blocked"); }, setItem() { throw Error("blocked"); } };
  assert.equal(claimBookingEvent(first, broken), true);
  assert.equal(claimBookingEvent(first, broken), false);
  const second = await bookingEventId("20002");
  assert.equal(claimBookingEvent(second, { getItem: () => JSON.stringify([{ id: second, at: Date.now() }]), setItem: () => {} }), false);
  assert.equal(claimBookingEvent("not-an-event-id", null), false);
  let stored = "[]";
  const storage = { getItem: () => stored, setItem: (_key, value) => { stored = value; } };
  for (let index = 30000; index < 30105; index++) claimBookingEvent(await bookingEventId(String(index)), storage);
  assert.equal(JSON.parse(stored).length, 100);
});

test("deduplication discards expired, future and malformed persistent records", async () => {
  const id = await bookingEventId("90001");
  let stored = JSON.stringify([{ id, at: 0 }, { id, at: CONSENT_DURATION * 3 }, "bad"]);
  const storage = { getItem: () => stored, setItem: (_key, value) => { stored = value; } };
  assert.equal(claimBookingEvent(id, storage, CONSENT_DURATION * 2), true);
  assert.deepEqual(JSON.parse(stored), [{ id, at: CONSENT_DURATION * 2 }]);
  assert.equal(claimBookingEvent(id, storage, CONSENT_DURATION * 2 + 1), false);
});
