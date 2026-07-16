import { useQuery } from "@tanstack/react-query";
import {
  getPublishedGeneratedPostBySlug,
  listPublishedGeneratedBlogPosts,
} from "@/services/generatedBlogPosts";

export function useGeneratedBlogPosts(enabled = true) {
  return useQuery({
    queryKey: ["generated-blog-posts"],
    queryFn: listPublishedGeneratedBlogPosts,
    enabled,
  });
}

export async function getGeneratedPostBySlug(
  slug: string
){
  return getPublishedGeneratedPostBySlug(slug);
}
