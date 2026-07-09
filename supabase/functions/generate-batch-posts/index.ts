import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  parseGeneratedArticle,
  type GeneratedArticle,
} from "../_shared/blogArticleSchema.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DEFAULT_TOPICS = [
  "Comment automatiser sa prospection commerciale avec l'IA en 2026",
  "Quel ROI attendre d'un projet IA en PME : chiffres et méthode",
  "Les 5 erreurs à éviter lors du déploiement de l'IA en entreprise",
  "Comment choisir le bon outil IA pour son service commercial",
  "IA et formation des équipes : guide pratique pour les managers",
];

async function generateArticle(
  topic: string,
  existingTitles: string,
  lovableApiKey: string,
  today: string
): Promise<GeneratedArticle> {
  const systemPrompt = `Tu es un redacteur SEO expert. Redige un article de blog SEO en francais, hyper concret et actionnable sur le sujet suivant : "${topic}".

Le lecteur doit pouvoir appliquer les conseils immediatement. Inclus des etapes numerotees, des exemples reels, des chiffres concrets.

Regles :
- 4-5 sections H2
- Paragraphes courts, listes numerotees
- 600-800 mots
- Tonalite professionnelle, concrete, pas de jargon inutile
- Mots-cles SEO longue traine lies au sujet
- CTA implicite vers Abel SALAH en fin d'article (mentionner qu'un expert peut accompagner)
- Date de publication : ${today}
- NE PAS reprendre un titre deja utilise. Titres existants : ${existingTitles}`;

  const response = await fetch(
    "https://ai.gateway.lovable.dev/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Genere un article de blog actionnable sur : "${topic}". Utilise l'outil generate_blog_post pour retourner l'article structure.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_blog_post",
              description: "Genere un article de blog SEO structure.",
              parameters: {
                type: "object",
                properties: {
                  slug: { type: "string", description: "URL slug en kebab-case, sans accents, 4-8 mots" },
                  title: { type: "string", description: "Titre accrocheur, 50-70 caracteres" },
                  metaTitle: { type: "string", description: "Meta title SEO < 60 chars" },
                  metaDescription: { type: "string", description: "Meta description SEO < 160 chars" },
                  readTime: { type: "string", description: "Temps de lecture. Ex: '6 min'" },
                  tags: { type: "array", items: { type: "string" }, description: "3-5 tags SEO" },
                  excerpt: { type: "string", description: "Resume 150-200 caracteres" },
                  sections: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        content: { type: "array", items: { type: "string" } },
                      },
                      required: ["title", "content"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["slug", "title", "metaTitle", "metaDescription", "readTime", "tags", "excerpt", "sections"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_blog_post" } },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI Gateway error ${response.status}: ${errorText}`);
  }

  const aiResult = await response.json();
  const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];

  if (!toolCall?.function?.arguments) {
    throw new Error("AI did not return structured data");
  }

  return parseGeneratedArticle(JSON.parse(toolCall.function.arguments));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topics = DEFAULT_TOPICS } = await req.json().catch(() => ({}));

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const today = new Date().toISOString().split("T")[0];

    // Get existing titles
    const { data: existingPosts } = await supabase
      .from("generated_blog_posts")
      .select("title, slug")
      .order("created_at", { ascending: false })
      .limit(100);

    let existingTitles = (existingPosts || [])
      .map((post: { title: string }) => post.title)
      .join(", ");
    const existingSlugs = new Set(
      (existingPosts || []).map((post: { slug: string }) => post.slug)
    );

    const results: { topic: string; success: boolean; title?: string; error?: string }[] = [];

    for (const topic of topics) {
      try {
        console.log(`Generating article for: ${topic}`);
        const article = await generateArticle(topic, existingTitles, lovableApiKey, today);

        // Deduplicate slug
        if (existingSlugs.has(article.slug)) {
          article.slug = `${article.slug}-${Date.now().toString(36)}`;
        }

        const { error: insertError } = await supabase
          .from("generated_blog_posts")
          .insert({
            slug: article.slug,
            title: article.title,
            meta_title: article.metaTitle,
            meta_description: article.metaDescription,
            date: today,
            read_time: article.readTime,
            tags: article.tags,
            excerpt: article.excerpt,
            content: article.sections,
            article_type: "actionnable",
            published: true,
          });

        if (insertError) throw new Error(insertError.message);

        existingTitles += `, ${article.title}`;
        existingSlugs.add(article.slug);
        results.push({ topic, success: true, title: article.title });
        console.log(`✅ Generated: ${article.title}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        console.error(`❌ Failed for "${topic}":`, msg);
        results.push({ topic, success: false, error: msg });
      }
    }

    const successCount = results.filter((r) => r.success).length;
    console.log(`Batch complete: ${successCount}/${topics.length} articles generated`);

    return new Response(
      JSON.stringify({ success: true, generated: successCount, total: topics.length, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Batch error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
