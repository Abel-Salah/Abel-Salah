import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description:
    "List published blog articles from abelsalah.fr with title, slug, date, excerpt and tags. Covers AI strategy, sales automation, AI training and consulting insights (French).",
  inputSchema: {
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .describe("Maximum number of posts to return (default 20)."),
    tag: z
      .string()
      .optional()
      .describe("Optional case-insensitive tag filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, tag }) => {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY!;
    const max = limit ?? 20;
    const url = `${supabaseUrl}/rest/v1/generated_blog_posts?select=slug,title,date,excerpt,tags,read_time&published=eq.true&order=date.desc&limit=${max}`;
    const res = await fetch(url, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    });
    if (!res.ok) {
      return {
        content: [{ type: "text", text: `Failed to fetch posts: ${res.status}` }],
        isError: true,
      };
    }
    let rows = (await res.json()) as Array<{
      slug: string;
      title: string;
      date: string;
      excerpt: string;
      tags: string[];
      read_time: string;
    }>;
    if (tag) {
      const t = tag.toLowerCase();
      rows = rows.filter((r) => (r.tags ?? []).some((x) => x.toLowerCase().includes(t)));
    }
    const posts = rows.map((r) => ({
      ...r,
      url: `https://abelsalah.fr/blog/${r.slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(posts, null, 2) }],
      structuredContent: { posts },
    };
  },
});
