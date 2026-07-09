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

[functions.generate-batch-posts]
verify_jwt = false
```

Implications :

- `generate-sitemap` peut rester public si elle ne fait que lire des articles publies.
- `generate-batch-posts` declenche une generation et une insertion avec service role ; la laisser publique est un risque.
- `generate-blog-post` n'est pas declare dans ce fichier. Son statut JWT doit etre verifie dans la configuration Supabase distante.

## Risques connus

- Les fonctions de generation publient actuellement avec `published: true`.
- Le contenu genere est structure par schema de tool calling, mais il n'y a pas encore de validation Zod partagee dans le depot.
- Le rendu article utilise encore `dangerouslySetInnerHTML` dans [src/pages/BlogPost.tsx](../src/pages/BlogPost.tsx) pour le gras Markdown simplifie.

## Recommandations

1. Proteger `generate-batch-posts` et `generate-blog-post` par JWT, secret serveur, ou autre controle explicite.
2. Ajouter une validation stricte du contenu genere avant insertion.
3. Remplacer le rendu HTML ad hoc par un rendu Markdown controle.
4. Documenter tout cron Supabase configure en production.
