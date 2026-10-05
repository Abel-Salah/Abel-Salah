import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_blog_post",
  title: "Get blog post",
  description:
    "Fetch the full content of a published blog post on abelsalah.fr by slug (returns title, meta, sections and public URL).",
  inputSchema: {
    slug: z.string().min(1).describe("Slug of the blog post (from list_blog_posts)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }) => {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY!;
    const url = `${supabaseUrl}/rest/v1/generated_blog_posts?select=slug,title,meta_title,meta_description,date,read_time,tags,excerpt,content&published=eq.true&slug=eq.${encodeURIComponent(
      slug,
    )}&limit=1`;
    const res = await fetch(url, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    });
    if (!res.ok) {
      return {
        content: [{ type: "text", text: `Failed to fetch post: ${res.status}` }],
        isError: true,
      };
    }
    const rows = (await res.json()) as Array<Record<string, unknown>>;
    const post = rows[0];
    if (!post) {
      return {
        content: [{ type: "text", text: `No published post found for slug "${slug}".` }],
        isError: true,
      };
    }
    const withUrl = { ...post, url: `https://abelsalah.fr/blog/${slug}` };
    return {
      content: [{ type: "text", text: JSON.stringify(withUrl, null, 2) }],
      structuredContent: { post: withUrl },
    };
  },
});
