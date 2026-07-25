const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, mcp-session-id",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};

const tools = [
  {
    name: "list_blog_posts",
    title: "List blog posts",
    description: "List published blog articles from abelsalah.fr with title, slug, date, excerpt and tags.",
    inputSchema: { type: "object", properties: { limit: { type: "integer", minimum: 1, maximum: 100 }, tag: { type: "string" } } }
  },
  {
    name: "get_blog_post",
    title: "Get blog post",
    description: "Fetch a published blog post on abelsalah.fr by slug.",
    inputSchema: { type: "object", required: ["slug"], properties: { slug: { type: "string" } } }
  },
  {
    name: "list_ventures",
    title: "List ventures",
    description: "List Abel SALAH's products and ventures.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "list_offers",
    title: "List consulting offers",
    description: "List Abel SALAH's consulting offers.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_contact_info",
    title: "Get contact info",
    description: "Return public contact and booking links for Abel SALAH.",
    inputSchema: { type: "object", properties: {} }
  }
];

const ventures = [
  { name: "SCALLUP", url: "https://scallup.fr", tagline: "L'agent IA qui prospecte, relance et vend.", pitch: "Plateforme SaaS où un agent IA exécute les actions commerciales en pilote automatique.", metrics: ["500+ PME utilisatrices", "4.9/5 note moyenne", "Finançable OPCO"] },
  { name: "SKILL LMS", url: "https://skill-lms.fr", tagline: "Le LMS Qualiopi nouvelle génération.", pitch: "Plateforme tout-en-un pour organismes de formation.", metrics: ["Conformité Qualiopi native", "Tout-en-un", "Relances & pilotage IA"] },
  { name: "FORMATEURS.PRO", url: "https://formateurs.pro", tagline: "Le plus grand annuaire de formateurs certifiés de France.", pitch: "Annuaire construit à partir de sources officielles.", metrics: ["50 000+ formateurs référencés", "9 000+ certifiés Qualiopi", "98 % profils vérifiés"] },
  { name: "IMMO MONTPELLIER", url: "https://immomontpellier.com", tagline: "Le premier chasseur IA immobilier de Montpellier.", pitch: "L'IA scanne 8 sources en continu.", metrics: ["8 sources scannées", "< 1h alerte", "Chasseur local"] }
];

const offers = [
  { slug: "audit-ia", title: "Audit IA pour PME & ETI", url: "https://abelsalah.fr/audit-ia", summary: "Diagnostic des processus, priorisation ROI et roadmap 30/60/90 jours." },
  { slug: "automatisation-commerciale", title: "Automatisation commerciale par l'IA", url: "https://abelsalah.fr/automatisation-commerciale", summary: "Agents IA et workflows pour prospection, qualification et relances." },
  { slug: "formation-ia", title: "Formation IA pour équipes et dirigeants", url: "https://abelsalah.fr/formation-ia", summary: "Formation opérationnelle, coaching dirigeants et routines d'adoption." }
];

const contact = {
  name: "Abel SALAH",
  role: "Consultant & Expert IA pour entreprises",
  website: "https://abelsalah.fr",
  booking: "https://tidycal.com/abelsalah/30min",
  linkedin: "https://www.linkedin.com/in/abel-salah/",
  youtube: "https://www.youtube.com/@abelsalah",
  cv: "https://abelsalah.fr/cv"
};

function result(id, value) {
  return { jsonrpc: "2.0", id, result: value };
}
function error(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}
function textResult(value) {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }], structuredContent: value };
}
async function callTool(name, args) {
  if (name === "list_ventures") return textResult({ ventures });
  if (name === "list_offers") return textResult({ offers });
  if (name === "get_contact_info") return textResult(contact);
  const base = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
  if (name === "list_blog_posts") {
    const limit = Math.min(Math.max(Number(args?.limit ?? 20), 1), 100);
    const url = base + "/rest/v1/generated_blog_posts?select=slug,title,date,excerpt,tags,read_time&published=eq.true&order=date.desc&limit=" + limit;
    const res = await fetch(url, { headers: { apikey: key, Authorization: "Bearer " + key } });
    if (!res.ok) throw new Error("Failed to fetch posts: " + res.status);
    let rows = await res.json();
    if (args?.tag) {
      const tag = String(args.tag).toLowerCase();
      rows = rows.filter((r) => (r.tags ?? []).some((x) => String(x).toLowerCase().includes(tag)));
    }
    return textResult({ posts: rows.map((r) => ({ ...r, url: "https://abelsalah.fr/blog/" + r.slug })) });
  }
  if (name === "get_blog_post") {
    const slug = String(args?.slug ?? "");
    if (!slug) throw new Error("slug is required");
    const url = base + "/rest/v1/generated_blog_posts?select=slug,title,meta_title,meta_description,date,read_time,tags,excerpt,content&published=eq.true&slug=eq." + encodeURIComponent(slug) + "&limit=1";
    const res = await fetch(url, { headers: { apikey: key, Authorization: "Bearer " + key } });
    if (!res.ok) throw new Error("Failed to fetch post: " + res.status);
    const rows = await res.json();
    if (!rows[0]) throw new Error("No published post found for slug " + slug);
    return textResult({ post: { ...rows[0], url: "https://abelsalah.fr/blog/" + slug } });
  }
  throw new Error("Unknown tool: " + name);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method === "GET") return new Response(JSON.stringify({ name: "abel-salah-mcp", version: "0.1.0" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  try {
    const body = await req.json();
    if (body.method === "notifications/initialized" || body.method?.startsWith("notifications/")) return new Response(null, { status: 202, headers: corsHeaders });
    if (body.method === "initialize") {
      return new Response(JSON.stringify(result(body.id, { protocolVersion: "2024-11-05", capabilities: { tools: {} }, serverInfo: { name: "abel-salah-mcp", version: "0.1.0" } })), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (body.method === "tools/list") {
      return new Response(JSON.stringify(result(body.id, { tools })), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (body.method === "tools/call") {
      try { return new Response(JSON.stringify(result(body.id, await callTool(body.params?.name, body.params?.arguments ?? {}))), { headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
      catch (e) { return new Response(JSON.stringify(result(body.id, { content: [{ type: "text", text: String(e.message ?? e) }], isError: true })), { headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
    }
    return new Response(JSON.stringify(error(body.id, -32601, "Method not found")), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify(error(null, -32700, "Invalid JSON")), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
