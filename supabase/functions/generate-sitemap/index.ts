import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const STATIC_PAGES = [
  { loc: "/", priority: "1.0", changefreq: "monthly" },
  { loc: "/en", priority: "0.9", changefreq: "monthly" },
  { loc: "/es", priority: "0.9", changefreq: "monthly" },
  { loc: "/work", priority: "0.8", changefreq: "monthly" },
  { loc: "/about", priority: "0.7", changefreq: "monthly" },
  { loc: "/contact", priority: "0.8", changefreq: "monthly" },
  { loc: "/blog", priority: "0.8", changefreq: "daily" },
  { loc: "/ecosystem", priority: "0.8", changefreq: "monthly" },
  { loc: "/audit-ia", priority: "0.9", changefreq: "monthly" },
  { loc: "/automatisation-commerciale", priority: "0.9", changefreq: "monthly" },
  { loc: "/formation-ia", priority: "0.9", changefreq: "monthly" },
  { loc: "/en/ai-audit", priority: "0.8", changefreq: "monthly" },
  { loc: "/en/sales-automation", priority: "0.8", changefreq: "monthly" },
  { loc: "/en/ai-training", priority: "0.8", changefreq: "monthly" },
  { loc: "/es/auditoria-ia", priority: "0.8", changefreq: "monthly" },
  { loc: "/es/automatizacion-comercial", priority: "0.8", changefreq: "monthly" },
  { loc: "/es/formacion-ia", priority: "0.8", changefreq: "monthly" },
];

const DOMAIN = "https://abelsalah.fr";
const HOME_ALTERNATES = [
  { hreflang: "fr", href: `${DOMAIN}/` },
  { hreflang: "en", href: `${DOMAIN}/en` },
  { hreflang: "es", href: `${DOMAIN}/es` },
  { hreflang: "x-default", href: `${DOMAIN}/` },
];
const OFFER_ALTERNATES: Record<string, { hreflang: string; href: string }[]> = {
  "/audit-ia": [
    { hreflang: "fr", href: `${DOMAIN}/audit-ia` },
    { hreflang: "en", href: `${DOMAIN}/en/ai-audit` },
    { hreflang: "es", href: `${DOMAIN}/es/auditoria-ia` },
    { hreflang: "x-default", href: `${DOMAIN}/audit-ia` },
  ],
  "/en/ai-audit": [
    { hreflang: "fr", href: `${DOMAIN}/audit-ia` },
    { hreflang: "en", href: `${DOMAIN}/en/ai-audit` },
    { hreflang: "es", href: `${DOMAIN}/es/auditoria-ia` },
    { hreflang: "x-default", href: `${DOMAIN}/audit-ia` },
  ],
  "/es/auditoria-ia": [
    { hreflang: "fr", href: `${DOMAIN}/audit-ia` },
    { hreflang: "en", href: `${DOMAIN}/en/ai-audit` },
    { hreflang: "es", href: `${DOMAIN}/es/auditoria-ia` },
    { hreflang: "x-default", href: `${DOMAIN}/audit-ia` },
  ],
  "/automatisation-commerciale": [
    { hreflang: "fr", href: `${DOMAIN}/automatisation-commerciale` },
    { hreflang: "en", href: `${DOMAIN}/en/sales-automation` },
    { hreflang: "es", href: `${DOMAIN}/es/automatizacion-comercial` },
    { hreflang: "x-default", href: `${DOMAIN}/automatisation-commerciale` },
  ],
  "/en/sales-automation": [
    { hreflang: "fr", href: `${DOMAIN}/automatisation-commerciale` },
    { hreflang: "en", href: `${DOMAIN}/en/sales-automation` },
    { hreflang: "es", href: `${DOMAIN}/es/automatizacion-comercial` },
    { hreflang: "x-default", href: `${DOMAIN}/automatisation-commerciale` },
  ],
  "/es/automatizacion-comercial": [
    { hreflang: "fr", href: `${DOMAIN}/automatisation-commerciale` },
    { hreflang: "en", href: `${DOMAIN}/en/sales-automation` },
    { hreflang: "es", href: `${DOMAIN}/es/automatizacion-comercial` },
    { hreflang: "x-default", href: `${DOMAIN}/automatisation-commerciale` },
  ],
  "/formation-ia": [
    { hreflang: "fr", href: `${DOMAIN}/formation-ia` },
    { hreflang: "en", href: `${DOMAIN}/en/ai-training` },
    { hreflang: "es", href: `${DOMAIN}/es/formacion-ia` },
    { hreflang: "x-default", href: `${DOMAIN}/formation-ia` },
  ],
  "/en/ai-training": [
    { hreflang: "fr", href: `${DOMAIN}/formation-ia` },
    { hreflang: "en", href: `${DOMAIN}/en/ai-training` },
    { hreflang: "es", href: `${DOMAIN}/es/formacion-ia` },
    { hreflang: "x-default", href: `${DOMAIN}/formation-ia` },
  ],
  "/es/formacion-ia": [
    { hreflang: "fr", href: `${DOMAIN}/formation-ia` },
    { hreflang: "en", href: `${DOMAIN}/en/ai-training` },
    { hreflang: "es", href: `${DOMAIN}/es/formacion-ia` },
    { hreflang: "x-default", href: `${DOMAIN}/formation-ia` },
  ],
};

function alternateLinksFor(loc: string): string {
  const alternates = ["/", "/en", "/es"].includes(loc)
    ? HOME_ALTERNATES
    : OFFER_ALTERNATES[loc];

  if (!alternates) return "";

  return alternates.map(
    (alternate) =>
      `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`
  ).join("\n") + "\n";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: posts, error } = await supabase
      .from("generated_blog_posts")
      .select("slug, date")
      .eq("published", true)
      .order("date", { ascending: false });

    if (error) throw error;

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    for (const page of STATIC_PAGES) {
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}${page.loc}</loc>\n`;
      xml += alternateLinksFor(page.loc);
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Static blog posts (hardcoded slugs from blogPosts.ts)
    const staticBlogSlugs = [
      "pourquoi-faire-appel-expert-ia-entreprise",
      "audit-ia-entreprise-par-ou-commencer",
      "automatisation-ia-pme-guide-pratique",
      "ia-force-de-vente-cas-concrets",
      "strategie-ia-entreprise-2026",
    ];

    for (const slug of staticBlogSlugs) {
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}/blog/${slug}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic blog posts from database
    for (const post of posts || []) {
      if (staticBlogSlugs.includes(post.slug)) continue;
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${post.date}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
