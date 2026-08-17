import { useQuery } from "@tanstack/react-query";
import {
  getInjectedPostsByLang,
  getPublishedGeneratedPostBySlug,
  listPublishedGeneratedBlogPosts,
} from "@/services/generatedBlogPosts";

export function useGeneratedBlogPosts(lang = "fr") {
  return useQuery({
    queryKey: ["generated-blog-posts", lang],
    queryFn: () => listPublishedGeneratedBlogPosts(lang),
    /* React ne déclenche pas les effects pendant le rendu SSR
       (renderToPipeableStream sans hydratation) : aucun fetch ne part
       réellement au pré-rendu. On le désactive quand même explicitement
       plutôt que de compter sur ce comportement implicite. */
    enabled: !import.meta.env.SSR,
    /* Pré-rendu : les articles injectés par le build servent de données
       initiales pour que la liste soit dans le HTML statique. */
    initialData: import.meta.env.SSR ? getInjectedPostsByLang(lang) : undefined,
  });
}

export async function getGeneratedPostBySlug(
  slug: string,
  lang = "fr"
){
  return getPublishedGeneratedPostBySlug(slug, lang);
}
