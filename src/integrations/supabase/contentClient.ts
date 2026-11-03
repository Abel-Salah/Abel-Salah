import { createClient } from "@supabase/supabase-js";
import { PUBLIC_CONTENT_URL, PUBLIC_CONTENT_KEY } from "./publicContentConfig";

// Lecture des articles publiés dans la base personnelle. La collecte checklist
// reste isolée dans checklistClient.ts ; aucun changement de brouillon ou d'Auth.
export const contentSupabase = createClient(PUBLIC_CONTENT_URL, PUBLIC_CONTENT_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});
