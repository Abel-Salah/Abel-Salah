import assert from "node:assert/strict";
import { test } from "node:test";
import { createChecklistHandler, CHECKLIST_PDF_URL } from "../supabase/manual-functions/subscribe-checklist/index.ts";

const env = { supabaseUrl: "https://pcjhrmwuqyxddyeikely.supabase.co", serviceRoleKey: "fake-service-key", resendKey: "fake-resend-key", fromEmail: "Abel <newsletter@abelsalah.fr>" };
const input = { first_name: "Ada", email: "client@example.org", consent: true, source: "site" };
const id = "11111111-1111-4111-8111-111111111111";
const makeRequest = (body = input, options = {}) => new Request("https://unit.test/subscribe-checklist", {
  method: "POST", headers: { origin: "https://abelsalah.fr", "content-type": "application/json", "x-forwarded-for": "203.0.113.20", ...options.headers },
  body: JSON.stringify(body), ...options,
});
function harness(options = {}) {
  const calls = [];
  const fetcher = async (url, init) => {
    const body = JSON.parse(init.body); calls.push({ url, init, body });
    if (url.endsWith("/claim_checklist_delivery")) {
      if (options.storageFails) return Response.json({ secret: "never public" }, { status: 500 });
      return Response.json(options.claim ?? { state: "send", id, attempt: body.p_attempt, first_name: '<Ada & "Co">', email: input.email });
    }
    if (url === "https://api.resend.com/emails") {
      if (options.providerThrows) throw new Error("private provider details");
      return Response.json(options.providerBody ?? { id: "message-123" }, { status: options.providerStatus ?? 200 });
    }
    if (url.endsWith("/finish_checklist_delivery")) return Response.json(true, { status: options.finishStatus ?? 200 });
    throw new Error("Unexpected fetch: " + url);
  };
  return { calls, handler: createChecklistHandler(options.env ?? env, fetcher) };
}

test("only approved site origins and methods can request the resource", async () => {
  const h = harness();
  assert.equal((await h.handler(makeRequest(input, { headers: { origin: "https://evil.test", "content-type": "application/json" } }))).status, 403);
  assert.equal((await h.handler(new Request("https://unit.test", { method: "GET", headers: { origin: "https://abelsalah.fr" } }))).status, 405);
  const preflight = await h.handler(new Request("https://unit.test", { method: "OPTIONS", headers: { origin: "https://branch.abelsalah-site.pages.dev" } }));
  assert.equal(preflight.status, 204); assert.equal(preflight.headers.get("access-control-allow-origin"), "https://branch.abelsalah-site.pages.dev");
  assert.equal(h.calls.length, 0);
});

test("JSON, request size, valid fields and explicit consent are required", async () => {
  const h = harness();
  for (const body of [null, [], { ...input, consent: false }, { ...input, consent: "true" }, { ...input, email: "x@example.invalid" }, { ...input, email: "bad" }, { ...input, first_name: " " }, { ...input, first_name: "A\nB" }, { ...input, source: "x".repeat(101) }]) {
    assert.equal((await h.handler(makeRequest(body))).status, 400);
  }
  assert.equal((await h.handler(makeRequest(input, { headers: { origin: "https://abelsalah.fr", "content-type": "text/plain" } }))).status, 415);
  assert.equal((await h.handler(makeRequest("x".repeat(9000)))).status, 413);
  assert.equal(h.calls.length, 0);
});

test("missing credentials and wrong project fail before any database or mail call", async () => {
  for (const override of [{ resendKey: "" }, { serviceRoleKey: "" }, { supabaseUrl: "https://other.supabase.co" }]) {
    const h = harness({ env: { ...env, ...override } });
    assert.equal((await h.handler(makeRequest())).status, 503); assert.equal(h.calls.length, 0);
  }
});

test("one consented request records a claim, sends a fixed escaped email and persists its receipt", async () => {
  const h = harness(); const result = await h.handler(makeRequest({ ...input, email: " CLIENT@EXAMPLE.ORG " }));
  assert.equal(result.status, 200); const data = await result.json(); assert.equal(data.emailStatus, "sent");
  assert.equal(h.calls.length, 3); const [claim, mail, receipt] = h.calls;
  assert.equal(claim.body.p_email, input.email); assert.equal(claim.body.p_consent, true);
  assert.match(claim.body.p_client_key, /^[a-f0-9]{64}$/); assert.ok(!claim.body.p_client_key.includes("203.0.113"));
  assert.deepEqual(mail.body.to, [input.email]); assert.equal(mail.init.headers["Idempotency-Key"], "checklist-v1/" + id);
  assert.ok(mail.body.html.includes("&lt;Ada &amp; &quot;Co&quot;&gt;")); assert.ok(mail.body.html.includes(CHECKLIST_PDF_URL));
  assert.equal(receipt.body.p_message_id, "message-123"); assert.equal(receipt.body.p_attempt, claim.body.p_attempt);
  assert.equal(data.pdfUrl, CHECKLIST_PDF_URL); assert.ok(!JSON.stringify(data).includes(input.email));
  assert.ok(!JSON.stringify(data).includes(env.serviceRoleKey));
});

test("an already-sent request returns the PDF without resending", async () => {
  const h = harness({ claim: { state: "sent" } }); const data = await (await h.handler(makeRequest())).json();
  assert.equal(data.emailStatus, "sent"); assert.equal(h.calls.length, 1);
});

test("busy and stale deliveries never trigger a mail; stale delivery cannot invite blind retry", async () => {
  for (const state of ["busy", "held"]) {
    const h = harness({ claim: { state } }); const data = await (await h.handler(makeRequest())).json();
    assert.equal(data.emailStatus, "unconfirmed"); assert.equal(data.emailRetryAllowed, state === "busy"); assert.equal(h.calls.length, 1);
  }
});

test("rate-limited requests cannot reach the mail provider", async () => {
  const h = harness({ claim: { state: "rate_limited" } }); assert.equal((await h.handler(makeRequest())).status, 429); assert.equal(h.calls.length, 1);
});

test("database failures disclose neither storage details nor credentials", async () => {
  const h = harness({ storageFails: true }); const result = await h.handler(makeRequest()); assert.equal(result.status, 503);
  assert.ok(!(await result.text()).includes("never public")); assert.equal(h.calls.length, 1);
});

test("provider refusal preserves the PDF and records a bounded error code", async () => {
  const h = harness({ providerStatus: 403 }); const data = await (await h.handler(makeRequest())).json();
  assert.equal(data.emailStatus, "unconfirmed"); assert.equal(data.emailRetryAllowed, true);
  assert.equal(h.calls[2].body.p_error_code, "provider_http_403"); assert.equal(h.calls[2].body.p_message_id, null);
});

test("provider timeout and malformed acknowledgments never claim an email was sent", async () => {
  for (const options of [{ providerThrows: true }, { providerBody: {} }]) {
    const h = harness(options); const data = await (await h.handler(makeRequest())).json();
    assert.equal(data.emailStatus, "unconfirmed"); assert.ok(data.pdfUrl); assert.equal(h.calls.length, 3);
  }
});

test("retries keep the exact provider payload and stable idempotency key", async () => {
  const h = harness(); await h.handler(makeRequest()); await h.handler(makeRequest({ ...input, first_name: "Different", source: "another" }));
  const mails = h.calls.filter(x => x.url === "https://api.resend.com/emails"); assert.equal(mails.length, 2);
  assert.deepEqual(mails[0].body, mails[1].body); assert.equal(mails[0].init.headers["Idempotency-Key"], mails[1].init.headers["Idempotency-Key"]);
});

test("an accepted mail is not blindly re-sent when saving the acknowledgment fails", async () => {
  const h = harness({ finishStatus: 500 }); const data = await (await h.handler(makeRequest())).json();
  assert.equal(data.emailStatus, "sent"); assert.equal(h.calls.filter(x => x.url.includes("resend.com")).length, 1);
});
