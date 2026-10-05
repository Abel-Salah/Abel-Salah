import { createClient } from "@supabase/supabase-js";

/* Client dédié au CONTENU (articles générés) — lecture seule via la clé
   publique anon. Les articles sont générés par le pipeline Lovable dans le
   projet `mqmynuloecsdsjbgnwzx` ; le reste du site (newsletter, fonctions)
   vit sur le projet principal (voir client.ts). Ne pas fusionner les deux :
   le cron d'articles écrit ici, les abonnés newsletter vivent là-bas. */
const CONTENT_SUPABASE_URL = "https://mqmynuloecsdsjbgnwzx.supabase.co";
const CONTENT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbXludWxvZWNzZHNqYmdud3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjY0MDIsImV4cCI6MjA4Njk0MjQwMn0.m73ehMXzuZLgY_-HwncEzW9bKkLFnTeKf892CSr5psU";

export const contentSupabase = createClient(CONTENT_SUPABASE_URL, CONTENT_SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
