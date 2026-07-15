import { useQuery } from "@tanstack/react-query";
import {
  getPublishedGeneratedPostBySlug,
  listPublishedGeneratedBlogPosts,
} from "@/services/generatedBlogPosts";

export function useGeneratedBlogPosts() {
  return useQuery({
    queryKey: ["generated-blog-posts"],
    queryFn: listPublishedGeneratedBlogPosts,
  });
}

export async function getGeneratedPostBySlug(
  slug: string
){
  return getPublishedGeneratedPostBySlug(slug);
}
