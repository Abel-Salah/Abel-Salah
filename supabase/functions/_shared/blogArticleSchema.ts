import { z } from "https://esm.sh/zod@3.25.76";

const textField = (min: number, max: number) =>
  z.string().trim().min(min).max(max);

export const generatedArticleSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(8)
    .max(90)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: textField(30, 90),
  metaTitle: textField(30, 70),
  metaDescription: textField(90, 180),
  readTime: z.string().trim().regex(/^\d{1,2}\s*min$/),
  tags: z.array(textField(2, 35)).min(3).max(6),
  excerpt: textField(120, 260),
  sections: z
    .array(
      z.object({
        title: textField(8, 100),
        content: z.array(textField(80, 1200)).min(1).max(8),
      })
    )
    .min(4)
    .max(6),
});

export type GeneratedArticle = z.infer<typeof generatedArticleSchema>;

export function validateGeneratedArticle(input: unknown): GeneratedArticle {
  return generatedArticleSchema.parse(input);
}
