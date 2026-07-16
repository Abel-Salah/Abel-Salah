import type { BlogPost } from "@/data/blogPosts";
import { supabase } from "@/integrations/supabase/client";

type GeneratedPost = {
  id: string;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  date: string;
  read_time: string;
  tags: string[];
  excerpt: string;
  content: { title: string; content: string[] }[];
  article_type: string;
  lang: string;
};

const mapToBlogPost = (post: GeneratedPost): BlogPost => ({
  slug: post.slug,
  title: post.title,
  metaTitle: post.meta_title,
  metaDescription: post.meta_description,
  date: post.date,
  readTime: post.read_time,
  tags: post.tags,
  excerpt: post.excerpt,
  content: post.content,
});

export async function listPublishedGeneratedBlogPosts(lang = "fr"): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("generated_blog_posts")
    .select("*")
    .eq("published", true)
    .eq("lang", lang)
    .order("date", { ascending: false });

  if (error) {
    // Colonne lang absente (migration pas encore appliquée) : les articles
    // existants sont tous en français.
    if (lang !== "fr") return [];
    const fallback = await supabase
      .from("generated_blog_posts")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: false });
    if (fallback.error) throw fallback.error;
    return (fallback.data ?? []).map((post) => mapToBlogPost(post as unknown as GeneratedPost));
  }
  return (data ?? []).map((post) => mapToBlogPost(post as unknown as GeneratedPost));
}

export async function getPublishedGeneratedPostBySlug(
  slug: string,
  lang = "fr"
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("generated_blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("lang", lang)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    // Colonne lang absente (migration pas encore appliquée) : les articles
    // existants sont tous en français.
    if (lang !== "fr") return null;
    const fallback = await supabase
      .from("generated_blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (fallback.error || !fallback.data) return null;
    return mapToBlogPost(fallback.data as unknown as GeneratedPost);
  }
  if (!data) return null;
  return mapToBlogPost(data as unknown as GeneratedPost);
}
