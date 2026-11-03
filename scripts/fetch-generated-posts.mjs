/* Le build lit le même backend public que le navigateur. Une erreur réseau ou
   un inventaire incomplet bloque le build : aucun cache de secours vide/périmé. */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  PUBLIC_CONTENT_URL,
  PUBLIC_CONTENT_KEY,
  MIN_MIGRATED_PUBLIC_POSTS,
} from "../src/integrations/supabase/publicContentConfig.ts";

const select = "slug,title,meta_title,meta_description,date,read_time,tags,excerpt,content,article_type,lang";

export async function fetchPublishedPosts(fetchImpl = fetch) {
  const url = `${PUBLIC_CONTENT_URL}/rest/v1/generated_blog_posts?select=${select}&published=eq.true&order=date.desc&limit=2000`;
  const response = await fetchImpl(url, {
    headers: { apikey: PUBLIC_CONTENT_KEY },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`Articles publiés : HTTP ${response.status}`);
  const posts = await response.json();
  if (!Array.isArray(posts) || posts.length < MIN_MIGRATED_PUBLIC_POSTS) {
    throw new Error(`Inventaire des articles incomplet : au moins ${MIN_MIGRATED_PUBLIC_POSTS} attendus`);
  }
  // Refuser la troncature de l'API, plutôt que publier un sous-ensemble silencieux.
  if (posts.length >= 1000) throw new Error("Pagination des articles requise avant publication");
  const seen = new Set();
  for (const post of posts) {
    if (!post || typeof post.slug !== "string" || !post.slug || typeof post.lang !== "string" ||
        !["fr", "en", "es"].includes(post.lang) || typeof post.title !== "string" || !post.title || typeof post.meta_title !== "string" ||
        typeof post.meta_description !== "string" || typeof post.date !== "string" ||
        typeof post.read_time !== "string" || typeof post.excerpt !== "string" ||
        !Array.isArray(post.tags) || !post.tags.every(tag => typeof tag === "string") || !Array.isArray(post.content) ||
        !post.content.every(section => section && typeof section.title === "string" &&
          Array.isArray(section.content) && section.content.every(value => typeof value === "string"))) {
      throw new Error("Article publié invalide : publication interrompue");
    }
    const key = `${post.lang}:${post.slug}`;
    if (seen.has(key)) throw new Error(`Article publié dupliqué : ${key}`);
    seen.add(key);
  }
  return posts;
}

export async function cachePublishedPosts(cachePath, fetchImpl = fetch) {
  const posts = await fetchPublishedPosts(fetchImpl);
  await writeFile(cachePath, JSON.stringify(posts));
  return posts.length;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const count = await cachePublishedPosts(path.resolve("scripts/.generated-posts-cache.json"));
    console.log(`Fetched ${count} published generated posts from the personal backend into cache.`);
  } catch (error) {
    console.error(`Build interrompu : ${error.message}`);
    process.exitCode = 1;
  }
}
