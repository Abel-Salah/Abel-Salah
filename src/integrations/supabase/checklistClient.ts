import { createClient } from "@supabase/supabase-js";
import { PUBLIC_CONTENT_URL, PUBLIC_CONTENT_KEY } from "./publicContentConfig";

// Public transactional endpoint only; the leads table is not publicly readable
// or writable. Historical rows remain preserved in the previous backend.
export const checklistSupabase = createClient(PUBLIC_CONTENT_URL, PUBLIC_CONTENT_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});
