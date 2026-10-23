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

// Validate the prompt example at module load so it cannot drift below the contract.
const articleJsonExample = generatedArticleSchema.parse({
  slug: "exemple-fictif-organiser-un-premier-atelier-ia",
  title: "Exemple fictif : organiser un premier atelier IA",
  metaTitle: "Exemple fictif : préparer un atelier IA en équipe",
  metaDescription: "Cet exemple fictif montre comment préparer un atelier IA, choisir un cas pratique et vérifier les résultats avant une utilisation professionnelle.",
  readTime: "5 min",
  tags: ["IA", "Atelier", "Méthode"],
  excerpt: "Dans cet exemple entièrement fictif, une équipe prépare un atelier IA autour d'une tâche simple. Elle définit son objectif, utilise des données inventées et relit les résultats avant de décider de la suite.",
  sections: [
    { title: "Définir un objectif concret", content: ["Dans ce scénario fictif, l'équipe souhaite apprendre à structurer un compte rendu. Elle choisit une tâche limitée et décrit le résultat attendu avant de sélectionner un outil."] },
    { title: "Préparer des données inventées", content: ["L'atelier utilise uniquement une réunion et des personnages inventés pour cet exercice. Aucun nom de client, document confidentiel ou donnée personnelle réelle n'est nécessaire."] },
    { title: "Comparer et relire les résultats", content: ["Les participants comparent la proposition avec les informations de départ. Ils recherchent les oublis, les affirmations ajoutées et les formulations ambiguës, sans supposer que le résultat est correct."] },
    { title: "Décider d'une prochaine étape", content: ["À la fin de cet exercice fictif, l'équipe note les vérifications utiles et les limites rencontrées. Aucun gain financier ou de temps n'est présenté comme mesuré ; un essai encadré reste nécessaire."] },
  ],
});

// Keep the model's requested shape aligned with the validator above.
export const articleJsonContract = `Retourne uniquement un objet JSON avec exactement ces proprietes :
${JSON.stringify(articleJsonExample)}
Contraintes obligatoires : slug 8-90 caracteres, title 30-90, metaTitle 30-70, metaDescription 90-180, excerpt 120-260 ; readTime au format entier suivi de min ; 3-6 tags de 2-35 caracteres ; 4-6 sections, chacune avec un titre de 8-100 caracteres et 1-8 paragraphes de 80-1200 caracteres chacun. Aucun HTML ni protocole javascript: ou data:.
N'invente aucun client, temoignage, chiffre de performance ou resultat d'Abel SALAH. Les exemples sont explicitement fictifs et les calculs sont presentes comme des hypotheses, jamais comme des resultats observes. Ne presente pas de fonctionnalite, prix, loi ou statistique actuelle comme verifiee sans source fournie.`;

export function validateGeneratedArticle(input: unknown): GeneratedArticle {
  return generatedArticleSchema.parse(input);
}
