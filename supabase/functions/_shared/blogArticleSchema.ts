import { z } from "https://esm.sh/zod@3.25.76";

const textField = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max)
    .refine((value) => !/<\/?[a-z][\s\S]*>/i.test(value), {
      message: "HTML tags are not allowed in generated articles",
    })
    .refine((value) => !/\b(?:javascript|data):/i.test(value), {
      message: "Unsafe URL protocols are not allowed in generated articles",
    });

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

// Keep the model's requested shape aligned with the validator below.
export const articleJsonContract = `Retourne uniquement un objet JSON avec exactement ces proprietes :
{"slug":"slug-ascii-en-minuscules","title":"Titre de l'article","metaTitle":"Titre SEO","metaDescription":"Description SEO","readTime":"5 min","tags":["IA","PME","Methode"],"excerpt":"Resume de l'article","sections":[{"title":"Titre de section","content":["Paragraphe complet."]}]}
Contraintes obligatoires : slug 8-90 caracteres, title 30-90, metaTitle 30-70, metaDescription 90-180, excerpt 120-260 ; readTime au format entier suivi de min ; 3-6 tags de 2-35 caracteres ; 4-6 sections, chacune avec un titre de 8-100 caracteres et 1-8 paragraphes de 80-1200 caracteres chacun. Aucun HTML ni protocole javascript: ou data:.
N'invente aucun client, temoignage, chiffre de performance ou resultat d'Abel SALAH. Les exemples sont explicitement fictifs et les calculs sont presentes comme des hypotheses, jamais comme des resultats observes. Ne presente pas de fonctionnalite, prix, loi ou statistique actuelle comme verifiee sans source fournie.`;

export function validateGeneratedArticle(input: unknown): GeneratedArticle {
  return generatedArticleSchema.parse(input);
}
