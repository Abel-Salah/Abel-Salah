/* Récupère les articles générés publiés (base contenu Lovable) et les met en
   cache pour le build : pré-rendu des pages articles, sitemap et flux RSS.
   Tolérant aux pannes : si le fetch échoue, un cache existant est conservé
   (le build reste reproductible hors ligne), sinon le cache est vidé. */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_URL = "https://mqmynuloecsdsjbgnwzx.supabase.co/rest/v1/generated_blog_posts";
const CONTENT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbXludWxvZWNzZHNqYmdud3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjY0MDIsImV4cCI6MjA4Njk0MjQwMn0.m73ehMXzuZLgY_-HwncEzW9bKkLFnTeKf892CSr5psU";

const cachePath = path.resolve("scripts/.generated-posts-cache.json");
const select =
  "slug,title,meta_title,meta_description,date,read_time,tags,excerpt,content,article_type,lang";

try {
  const response = await fetch(
    `${CONTENT_URL}?select=${select}&published=eq.true&order=date.desc&limit=2000`,
    { headers: { apikey: CONTENT_ANON_KEY } }
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const posts = await response.json();
  if (!Array.isArray(posts)) throw new Error("réponse inattendue");

  /* Dédoublonne par (slug, lang) — le pipeline de génération peut produire des
     slugs proches mais un doublon strict casserait le pré-rendu. */
  const seen = new Set();
  const unique = posts.filter((post) => {
    const key = `${post.lang ?? "fr"}:${post.slug}`;
    if (seen.has(key) || !post.slug) return false;
    seen.add(key);
    return true;
  });

  await writeFile(cachePath, JSON.stringify(unique));
  console.log(`Fetched ${unique.length} published generated posts into cache.`);
} catch (error) {
  const hasCache = await readFile(cachePath, "utf8").then(
    () => true,
    () => false
  );
  if (hasCache) {
    console.warn(`Fetch des articles générés impossible (${error.message}) — cache existant conservé.`);
  } else {
    await writeFile(cachePath, "[]");
    console.warn(`Fetch des articles générés impossible (${error.message}) — cache vide, articles non pré-rendus.`);
  }
}
