import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type = "actionnable" } = await req.json().catch(() => ({}));

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get existing titles to avoid duplicates
    const { data: existingPosts } = await supabase
      .from("generated_blog_posts")
      .select("title, slug")
      .order("created_at", { ascending: false })
      .limit(50);

    const existingTitles = (existingPosts || []).map((p: any) => p.title).join(", ");

    const today = new Date().toISOString().split("T")[0];

    const systemPrompt =
      type === "promotion"
        ? `Tu es un redacteur SEO expert. Redige un article de blog SEO en francais qui met en avant l'expertise d'Abel SALAH, consultant expert IA.

Contexte sur Abel SALAH :
- 16 ans d'experience en strategie digitale et IA
- 62 projets IA deployes avec succes
- Resultats concrets : +40% de taux de conversion, pipeline commercial x5, CA accompagne de 4.8M€
- Approche : audit gratuit, accompagnement sur mesure, resultats mesurables
- Specialites : audit IA, strategie data, automatisation des processus, deploiement IA, formation equipes

Choisis un angle unique parmi : audit IA, strategie IA, deploiement IA, formation IA, ROI de l'IA, accompagnement IA, transformation digitale.

Regles :
- 4-5 sections H2
- Paragraphes courts, listes numerotees quand pertinent
- 600-800 mots
- Tonalite professionnelle, concrete, pas de jargon inutile
- Mots-cles SEO : expert IA entreprise, consultant IA, audit IA, automatisation IA, Abel SALAH
- CTA direct vers la page contact en fin d'article
- Date de publication : ${today}
- NE PAS reprendre un titre deja utilise. Titres existants : ${existingTitles}`
        : `Tu es un redacteur SEO expert. Redige un article de blog SEO en francais, hyper concret et actionnable sur l'IA en entreprise.

Le lecteur doit pouvoir appliquer les conseils immediatement. Inclus des etapes numerotees, des exemples reels, des chiffres concrets.

Regles :
- 4-5 sections H2
- Paragraphes courts, listes numerotees
- 600-800 mots
- Tonalite professionnelle, concrete, pas de jargon inutile
- Mots-cles SEO : expert IA entreprise, automatisation IA, audit IA, intelligence artificielle PME, deploiement IA
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
              content: `Genere un nouvel article de blog ${type === "promotion" ? "promotionnel sur Abel SALAH" : "actionnable sur l'IA en entreprise"}. Utilise l'outil generate_blog_post pour retourner l'article structure.`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "generate_blog_post",
                description:
                  "Genere un article de blog SEO structure avec tous les champs necessaires.",
                parameters: {
                  type: "object",
                  properties: {
                    slug: {
                      type: "string",
                      description:
                        "URL slug en kebab-case, sans accents, 4-8 mots. Ex: automatiser-prospection-ia-guide",
                    },
                    title: {
                      type: "string",
                      description: "Titre accrocheur, 50-70 caracteres",
                    },
                    metaTitle: {
                      type: "string",
                      description:
                        "Meta title SEO < 60 chars, incluant 'Abel SALAH' ou 'Expert IA'",
                    },
                    metaDescription: {
                      type: "string",
                      description: "Meta description SEO < 160 chars",
                    },
                    readTime: {
                      type: "string",
                      description: "Temps de lecture estime. Ex: '6 min'",
                    },
                    tags: {
                      type: "array",
                      items: { type: "string" },
                      description: "3-5 tags SEO pertinents",
                    },
                    excerpt: {
                      type: "string",
                      description:
                        "Resume accrocheur de 1-2 phrases, 150-200 caracteres",
                    },
                    sections: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          content: {
                            type: "array",
                            items: { type: "string" },
                            description:
                              "Paragraphes de la section. Utiliser **gras** pour les mots importants.",
                          },
                        },
                        required: ["title", "content"],
                        additionalProperties: false,
                      },
                      description: "4-5 sections H2 de l'article",
                    },
                  },
                  required: [
                    "slug",
                    "title",
                    "metaTitle",
                    "metaDescription",
                    "readTime",
                    "tags",
                    "excerpt",
                    "sections",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "generate_blog_post" },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: `AI Gateway error: ${response.status}` }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(aiResult));
      return new Response(
        JSON.stringify({ error: "AI did not return structured data" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const article = JSON.parse(toolCall.function.arguments);

    // Check for duplicate slug
    const { data: existingSlug } = await supabase
      .from("generated_blog_posts")
      .select("id")
      .eq("slug", article.slug)
      .maybeSingle();

    if (existingSlug) {
      article.slug = `${article.slug}-${Date.now().toString(36)}`;
    }

    // Insert into database
    const { data: inserted, error: insertError } = await supabase
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
        article_type: type,
        published: true,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Article generated: ${article.title} (${type})`);

    return new Response(JSON.stringify({ success: true, post: inserted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
