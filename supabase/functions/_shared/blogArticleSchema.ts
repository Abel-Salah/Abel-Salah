import { z } from "https://esm.sh/zod@3.25.76";

export const generatedArticleSchema = z.object({
  slug: z
    .string()
    .min(8)
    .max(90)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(20).max(90),
  metaTitle: z.string().min(20).max(70),
  metaDescription: z.string().min(80).max(180),
  readTime: z.string().min(3).max(20),
  tags: z.array(z.string().min(2).max(40)).min(2).max(6),
  excerpt: z.string().min(80).max(260),
  sections: z
    .array(
      z.object({
        title: z.string().min(8).max(100),
        content: z.array(z.string().min(20).max(1500)).min(1).max(8),
      })
    )
    .min(3)
    .max(6),
});

export type GeneratedArticle = z.infer<typeof generatedArticleSchema>;

export function parseGeneratedArticle(raw: unknown): GeneratedArticle {
  return generatedArticleSchema.parse(raw);
}
