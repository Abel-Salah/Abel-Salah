/* Notifie IndexNow (Bing, Seznam, Yandex…) des URLs du sitemap après un
   déploiement. Usage : node scripts/ping-indexnow.mjs */
import { readFile } from "node:fs/promises";

const KEY = "c2a9e4f81b5d47a3b6e0d9c7f2a8514e";
const HOST = "abelsalah.fr";

const sitemap = await readFile("dist/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).slice(0, 10000);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});
console.log(`IndexNow: ${urls.length} URLs soumises — HTTP ${response.status}`);
