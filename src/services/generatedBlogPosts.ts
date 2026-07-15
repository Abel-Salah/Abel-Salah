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

export async function listPublishedGeneratedBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("generated_blog_posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((post) => mapToBlogPost(post as unknown as GeneratedPost));
}

export async function getPublishedGeneratedPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("generated_blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) return null;
  return mapToBlogPost(data as unknown as GeneratedPost);
}
