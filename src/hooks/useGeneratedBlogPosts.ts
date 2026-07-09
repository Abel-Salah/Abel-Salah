import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/data/blogPosts";
import type { Tables } from "@/integrations/supabase/types";

interface GeneratedPost {
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
}

type GeneratedBlogPostRow = Tables<"generated_blog_posts">;

function mapToBlogPost(post: GeneratedPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    metaTitle: post.meta_title,
    metaDescription: post.meta_description,
    date: post.date,
    readTime: post.read_time,
    tags: post.tags,
    excerpt: post.excerpt,
    content: post.content,
  };
}

export function useGeneratedBlogPosts() {
  return useQuery({
    queryKey: ["generated-blog-posts"],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from("generated_blog_posts")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: false });

      if (error) throw error;
      return (data || []).map((post: GeneratedBlogPostRow) =>
        mapToBlogPost(post as unknown as GeneratedPost)
      );
    },
  });
}

export async function getGeneratedPostBySlug(
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
