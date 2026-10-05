const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Méthode non autorisée" }, 405);

  try {
    const { email } = await request.json();
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail) || normalizedEmail.length > 320) {
      return json({ error: "Adresse email invalide" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("NEWSLETTER_FROM_EMAIL") ?? "Abel SALAH <newsletter@abelsalah.fr>";
    if (!supabaseUrl || !serviceRoleKey || !resendKey) {
      return json({ error: "Newsletter non configurée : secret d’envoi manquant" }, 503);
    }

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, {
      method: "POST",
      headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ email: normalizedEmail, status: "subscribed" }),
    });
    if (!insertResponse.ok && insertResponse.status !== 409) return json({ error: "Inscription impossible" }, 500);

    const welcomeResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail,
        to: [normalizedEmail],
        subject: "Bienvenue dans les conseils IA d’Abel SALAH",
        html: "<p>Bonjour,</p><p>Merci pour votre inscription. Vous recevrez prochainement des conseils concrets sur l’IA, l’automatisation et la visibilité digitale.</p><p>À bientôt,<br>Abel SALAH</p>",
      }),
    });
    if (!welcomeResponse.ok) return json({ error: "Inscription enregistrée, mais email de bienvenue non envoyé" }, 502);

    return json({ ok: true });
  } catch {
    return json({ error: "Requête invalide" }, 400);
  }
});
