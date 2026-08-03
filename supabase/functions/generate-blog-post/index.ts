import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  type GeneratedArticle,
  validateGeneratedArticle,
} from "../_shared/blogArticleSchema.ts";
import { callGeminiJson } from "../_shared/gemini.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type ExistingPost = {
  title: string;
  slug: string;
};

const SUPPORTED_LANGS = ["fr", "en", "es"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

const LANG_CONFIG: Record<Lang, { label: string; keywords: string; promoKeywords: string }> = {
  fr: {
    label: "francais",
    keywords: "expert IA entreprise, automatisation IA, audit IA, intelligence artificielle PME, deploiement IA",
    promoKeywords: "expert IA entreprise, consultant IA, audit IA, automatisation IA, Abel SALAH",
  },
  en: {
    label: "anglais (English)",
    keywords: "business AI expert, AI automation, AI audit, artificial intelligence for SMEs, AI deployment",
    promoKeywords: "business AI expert, AI consultant, AI audit, AI automation, Abel SALAH",
  },
  es: {
    label: "espagnol (espanol de Espana)",
    keywords: "experto IA empresa, automatizacion IA, auditoria IA, inteligencia artificial pymes, despliegue IA",
    promoKeywords: "experto IA empresa, consultor IA, auditoria IA, automatizacion IA, Abel SALAH",
  },
};

function validateLang(input: unknown): Lang {
  const lang = typeof input === "string" ? input : "fr";
  if (!SUPPORTED_LANGS.includes(lang as Lang)) {
    throw new Error(`lang must be one of: ${SUPPORTED_LANGS.join(", ")}`);
  }
  return lang as Lang;
}

const normalizeTitle = (title: string) =>
  title.trim().toLocaleLowerCase("fr-FR").replace(/\s+/g, " ");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const type = body.type ?? "actionnable";
    const lang = validateLang(body.lang);
    const langConfig = LANG_CONFIG[lang];

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get existing titles to avoid duplicates
    const { data: existingPosts } = await supabase
      .from("generated_blog_posts")
      .select("title, slug")
      .eq("lang", lang)
      .order("created_at", { ascending: false })
      .limit(50);

    const knownPosts = (existingPosts || []) as ExistingPost[];
    const existingTitles = knownPosts.map((post) => post.title).join(", ");

    const today = new Date().toISOString().split("T")[0];

    const systemPrompt =
      type === "promotion"
        ? `Tu es un redacteur SEO expert. Redige un article de blog SEO integralement en ${langConfig.label} (titre, slug, tags, meta et contenu inclus) qui met en avant l'expertise d'Abel SALAH, consultant expert IA.

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
- Mots-cles SEO : ${langConfig.promoKeywords}
- CTA direct vers la page contact en fin d'article
- Date de publication : ${today}
- NE PAS reprendre un titre deja utilise. Titres existants : ${existingTitles}`
        : `Tu es un redacteur SEO expert. Redige un article de blog SEO integralement en ${langConfig.label} (titre, slug, tags, meta et contenu inclus), hyper concret et actionnable sur l'IA en entreprise.

Le lecteur doit pouvoir appliquer les conseils immediatement. Inclus des etapes numerotees, des exemples reels, des chiffres concrets.

Regles :
- 4-5 sections H2
- Paragraphes courts, listes numerotees
- 600-800 mots
- Tonalite professionnelle, concrete, pas de jargon inutile
- Mots-cles SEO : ${langConfig.keywords}
- CTA implicite vers Abel SALAH en fin d'article (mentionner qu'un expert peut accompagner)
- Date de publication : ${today}
- NE PAS reprendre un titre deja utilise. Titres existants : ${existingTitles}`;

    const article = validateGeneratedArticle(await callGeminiJson<GeneratedArticle>(
      systemPrompt,
      `Genere un nouvel article de blog ${type === "promotion" ? "promotionnel sur Abel SALAH" : "actionnable sur l'IA en entreprise"}. Retourne uniquement le JSON structure de l'article.`,
    ));

    if (knownPosts.some((post) => normalizeTitle(post.title) === normalizeTitle(article.title))) {
      return new Response(
        JSON.stringify({ error: `Duplicate generated title refused: ${article.title}` }),
        {
          status: 409,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

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
        lang,
        // Generated content must be reviewed before it becomes public.
        published: false,
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

    console.log(`Article generated: ${article.title} (${type}, ${lang})`);

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
