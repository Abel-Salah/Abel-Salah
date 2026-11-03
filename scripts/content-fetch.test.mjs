import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fetchPublishedPosts, cachePublishedPosts } from "./fetch-generated-posts.mjs";
import { PUBLIC_CONTENT_URL, PUBLIC_CONTENT_KEY } from "../src/integrations/supabase/publicContentConfig.ts";

const posts = () => Array.from({ length: 305 }, (_, i) => ({
  slug: `article-${i}`, title: `Article ${i}`, meta_title: `Titre ${i}`,
  meta_description: "Description", date: "2026-11-03", read_time: "5 min",
  tags: ["test"], excerpt: "Extrait", content: [{ title: "Section", content: ["Texte"] }],
  article_type: "actionnable", lang: "fr",
}));
const response = data => async () => ({ ok: true, json: async () => data });

test("build uses the personal public backend and only published articles", async () => {
  const data = posts();
  const result = await fetchPublishedPosts(async (url, options) => {
    assert.equal(new URL(url).origin, PUBLIC_CONTENT_URL);
    assert.equal(new URL(url).searchParams.get("published"), "eq.true");
    assert.equal(options.headers.apikey, PUBLIC_CONTENT_KEY);
    assert.ok(options.signal instanceof AbortSignal);
    return { ok: true, json: async () => data };
  });
  assert.deepEqual(result, data);
});

test("HTTP errors block publication", async () => {
  await assert.rejects(fetchPublishedPosts(async () => ({ ok: false, status: 503 })), /HTTP 503/);
});

test("network errors block publication", async () => {
  await assert.rejects(fetchPublishedPosts(async () => { throw new Error("offline"); }), /offline/);
});

test("empty, incomplete and non-array inventories block publication", async () => {
  for (const data of [[], posts().slice(0, 304), { message: "error" }]) {
    await assert.rejects(fetchPublishedPosts(response(data)), /incomplet/);
  }
});

test("duplicate articles are rejected instead of silently dropped", async () => {
  const data = posts(); data[304] = data[0];
  await assert.rejects(fetchPublishedPosts(response(data)), /dupliqué/);
});

test("invalid structured article bodies and languages are rejected", async () => {
  for (const invalid of [{ content: "bad" }, { content: [{ title: "X", content: [null] }] }, { lang: "unknown" }, { tags: [5] }]) {
    const data = posts(); data[0] = { ...data[0], ...invalid };
    await assert.rejects(fetchPublishedPosts(response(data)), /invalide/);
  }
});

test("potential API truncation blocks publication", async () => {
  const data = Array.from({ length: 1000 }, (_, i) => ({ ...posts()[0], slug: `article-${i}` }));
  await assert.rejects(fetchPublishedPosts(response(data)), /Pagination/);
});

test("a failed fetch preserves the previous cache, success writes the full inventory", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "abel-content-fetch-"));
  const cache = path.join(dir, "cache.json");
  try {
    await writeFile(cache, "previous-cache");
    await assert.rejects(cachePublishedPosts(cache, response([])), /incomplet/);
    assert.equal(await readFile(cache, "utf8"), "previous-cache");
    const data = posts();
    assert.equal(await cachePublishedPosts(cache, response(data)), 305);
    assert.deepEqual(JSON.parse(await readFile(cache, "utf8")), data);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
