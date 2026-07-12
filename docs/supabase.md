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

La migration [20260712090000_create_opportunity_agent.sql](../supabase/migrations/20260712090000_create_opportunity_agent.sql) cree aussi les tables privees de l'Opportunity Agent :

- `job_sources`
- `job_opportunities`
- `job_scores`
- `job_outreach_drafts`
- `job_applications`

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

RLS est aussi activee sur les tables Opportunity Agent, sans politique publique. Elles doivent etre manipulees via Edge Functions protegees ou service role.

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
- [supabase/functions/discover-job-opportunities/index.ts](../supabase/functions/discover-job-opportunities/index.ts)
- [supabase/functions/score-job-opportunities/index.ts](../supabase/functions/score-job-opportunities/index.ts)
- [supabase/functions/draft-job-outreach/index.ts](../supabase/functions/draft-job-outreach/index.ts)

Variables requises :

```sh
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
LOVABLE_API_KEY=
GOOGLE_SEARCH_API_KEY=
GOOGLE_SEARCH_ENGINE_ID=
ABEL_CV_URL=
```

`GOOGLE_SEARCH_API_KEY`, `GOOGLE_SEARCH_ENGINE_ID` et `ABEL_CV_URL` concernent uniquement l'Opportunity Agent. Voir [docs/opportunity-agent.md](opportunity-agent.md).

## Configuration JWT

[supabase/config.toml](../supabase/config.toml) contient :

```toml
[functions.generate-sitemap]
verify_jwt = false

[functions.generate-blog-post]
verify_jwt = true

[functions.generate-batch-posts]
verify_jwt = true

[functions.discover-job-opportunities]
verify_jwt = true

[functions.score-job-opportunities]
verify_jwt = true

[functions.draft-job-outreach]
verify_jwt = true
```

Implications :

- `generate-sitemap` peut rester public si elle ne fait que lire des articles publies.
- `generate-blog-post` et `generate-batch-posts` declenchent une generation et une insertion avec service role ; elles doivent rester protegees.
- les fonctions Opportunity Agent doivent rester protegees, car elles lisent/ecrivent des opportunites et brouillons CRM.

## Risques connus

- Les fonctions de generation publient actuellement avec `published: true` apres validation Zod.
- Le contenu genere est structure par schema de tool calling puis valide par [supabase/functions/_shared/blogArticleSchema.ts](../supabase/functions/_shared/blogArticleSchema.ts).
- Le rendu article utilise `react-markdown`, `remark-gfm` et `rehype-sanitize` dans [src/pages/BlogPost.tsx](../src/pages/BlogPost.tsx).
- L'Opportunity Agent ne contient aucun envoi automatique de candidature. Les brouillons restent en `pending_review`.

## Recommandations

1. Documenter tout cron Supabase configure en production.
2. Ajouter une moderation humaine si l'auto-publication IA devient un flux production sensible.
3. Surveiller les erreurs de validation Zod pour ajuster les prompts.
4. Ajouter une interface admin protegee avant de donner acces aux donnees Opportunity Agent hors service role.
