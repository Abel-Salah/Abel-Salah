import { createClient } from "@supabase/supabase-js";

/* Collecte checklist historique : endpoint conservé pendant la bascule des
   articles. Ne pas utiliser ce client pour lire le blog. La collecte et ses
   éventuels envois se qualifient séparément avant retrait de l'ancien backend. */
const CONTENT_SUPABASE_URL = "https://mqmynuloecsdsjbgnwzx.supabase.co";
const CONTENT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbXludWxvZWNzZHNqYmdud3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjY0MDIsImV4cCI6MjA4Njk0MjQwMn0.m73ehMXzuZLgY_-HwncEzW9bKkLFnTeKf892CSr5psU";

export const checklistSupabase = createClient(CONTENT_SUPABASE_URL, CONTENT_SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
