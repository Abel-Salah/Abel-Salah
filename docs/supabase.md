# Supabase Et Securite

## Projet

Le projet Supabase localement reference est declare dans [supabase/config.toml](../supabase/config.toml) :

```toml
project_id = "mqmynuloecsdsjbgnwzx"
```

## Table

La migration [20260218005533_5d513d80-99d6-4163-95a8-8021bb92a774.sql](../supabase/migrations/20260218005533_5d513d80-99d6-4163-95a8-8021bb92a774.sql) cree la table `public.generated_blog_posts`.

Colonnes principales :

- `id`
- `slug`
- `title`
- `meta_title`
- `meta_description`
- `date`
- `read_time`
- `tags`
- `excerpt`
- `content`
- `article_type`
- `published`
- `created_at`

## RLS

RLS est activee sur `generated_blog_posts`.

Politique presente :

```sql
CREATE POLICY "Anyone can read published blog posts"
  ON public.generated_blog_posts
  FOR SELECT
  USING (published = true);
```

Cette politique autorise uniquement la lecture publique des articles publies. Les insertions sont realisees par Edge Functions avec `SUPABASE_SERVICE_ROLE_KEY`.

## Extensions

La migration [20260308230854_a32e7e4b-a202-4f7c-af23-44579200546a.sql](../supabase/migrations/20260308230854_a32e7e4b-a202-4f7c-af23-44579200546a.sql) active :

- `pg_cron`
- `pg_net`

Aucun job cron n'est documente dans le depot. Verifier la configuration distante Supabase avant de conclure qu'aucune planification n'existe.

## Edge Functions

Fonctions presentes :

- [supabase/functions/generate-blog-post/index.ts](../supabase/functions/generate-blog-post/index.ts)
- [supabase/functions/generate-batch-posts/index.ts](../supabase/functions/generate-batch-posts/index.ts)
- [supabase/functions/generate-sitemap/index.ts](../supabase/functions/generate-sitemap/index.ts)

Variables requises :

```sh
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
LOVABLE_API_KEY=
```

## Configuration JWT

[supabase/config.toml](../supabase/config.toml) contient :

```toml
[functions.generate-sitemap]
verify_jwt = false

[functions.generate-blog-post]
verify_jwt = true

[functions.generate-batch-posts]
verify_jwt = true
```

Implications :

- `generate-sitemap` peut rester public si elle ne fait que lire des articles publies.
- `generate-blog-post` et `generate-batch-posts` declenchent une generation et une insertion avec service role ; elles doivent rester protegees.

## Risques connus

- Les fonctions de generation publient actuellement avec `published: true` apres validation Zod.
- Le contenu genere est structure par schema de tool calling puis valide par [supabase/functions/_shared/blogArticleSchema.ts](../supabase/functions/_shared/blogArticleSchema.ts).
- Le rendu article utilise `react-markdown`, `remark-gfm` et `rehype-sanitize` dans [src/pages/BlogPost.tsx](../src/pages/BlogPost.tsx).

## Recommandations

1. Documenter tout cron Supabase configure en production.
2. Ajouter une moderation humaine si l'auto-publication IA devient un flux production sensible.
3. Surveiller les erreurs de validation Zod pour ajuster les prompts.
