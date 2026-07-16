import { useQuery } from "@tanstack/react-query";
import {
  getPublishedGeneratedPostBySlug,
  listPublishedGeneratedBlogPosts,
} from "@/services/generatedBlogPosts";

export function useGeneratedBlogPosts(lang = "fr") {
  return useQuery({
    queryKey: ["generated-blog-posts", lang],
    queryFn: () => listPublishedGeneratedBlogPosts(lang),
  });
}

export async function getGeneratedPostBySlug(
  slug: string,
  lang = "fr"
){
  return getPublishedGeneratedPostBySlug(slug, lang);
}
