# Prompt Codex — Migration Lovable Cloud → Supabase perso

Copie-colle tout ce qui suit à Codex (ou un agent shell) en étant dans le dossier racine du projet Lovable.

---

## Contexte

Je migre un projet React/Vite depuis Lovable Cloud vers mon propre projet Supabase.
- **Nouveau projet Supabase ref** : `pcjhrmwuqyxddyeikely`
- **URL** : `https://pcjhrmwuqyxddyeikely.supabase.co`
- **Anon key** : déjà dans `.env` (`VITE_SUPABASE_PUBLISHABLE_KEY`)
- Le schéma SQL a déjà été exécuté dans le SQL Editor du nouveau projet.
- Un autre projet est déjà lié via `supabase link` sur ma machine — il faut d'abord unlink.

## Ce que tu dois faire

### 1. Pré-requis à vérifier
```bash
supabase --version   # doit exister; sinon: brew install supabase/tap/supabase
supabase projects list   # doit demander login si besoin: supabase login
```

### 2. Délier le projet actuel et lier le nouveau
```bash
# Voir le projet actuellement lié (fichier supabase/.temp/project-ref)
cat supabase/.temp/project-ref 2>/dev/null || true

# Unlink puis link vers le nouveau projet
supabase unlink || true
supabase link --project-ref pcjhrmwuqyxddyeikely
```
Il te demandera le **database password** du nouveau projet (à récupérer dans Supabase Dashboard → Project Settings → Database → Reset password si oublié).

### 3. Configurer les secrets nécessaires
Les Edge Functions ont besoin de clés IA. Choisis **Gemini** (recommandé, généreux free tier) OU **OpenAI**.

```bash
# Option A — Gemini (Google AI Studio: https://aistudio.google.com/apikey)
supabase secrets set GEMINI_API_KEY=xxxxx

# Option B — OpenAI
supabase secrets set OPENAI_API_KEY=sk-xxxxx
```

⚠️ **Important** : le code des fonctions utilise actuellement `LOVABLE_API_KEY` via le Lovable AI Gateway. Il faut adapter les fonctions IA (`generate-blog-post`, `generate-batch-posts`, `discover-job-opportunities`, `score-job-opportunities`, `draft-job-outreach`) pour appeler directement Gemini ou OpenAI. Cherche `LOVABLE_API_KEY` et `ai.gateway.lovable.dev` dans `supabase/functions/**` et remplace par un appel direct au provider choisi (endpoint `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent` ou `https://api.openai.com/v1/chat/completions`).

### 4. Déployer toutes les Edge Functions
```bash
for fn in generate-sitemap generate-blog-post generate-batch-posts mcp \
          discover-job-opportunities score-job-opportunities draft-job-outreach \
          manage-opportunities run-opportunity-daily; do
  echo "▶ Deploying $fn"
  supabase functions deploy "$fn" --project-ref pcjhrmwuqyxddyeikely
done
```

Le `verify_jwt` par fonction est déjà défini dans `supabase/config.toml` — la CLI le respecte.

### 5. Recréer les cron jobs (pg_cron)
Ouvre le SQL Editor du nouveau projet Supabase et exécute :

```sql
-- Extensions
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Remplace <ANON_KEY> par la valeur de VITE_SUPABASE_PUBLISHABLE_KEY du .env
-- 2 articles actionnables par jour (Lun-Ven 9h et 15h UTC)
select cron.schedule(
  'blog-actionable-morning', '0 9 * * 1-5',
  $$ select net.http_post(
      url:='https://pcjhrmwuqyxddyeikely.supabase.co/functions/v1/generate-batch-posts',
      headers:='{"Content-Type":"application/json","Authorization":"Bearer <ANON_KEY>"}'::jsonb,
      body:='{"mode":"auto","type":"actionnable","count":1}'::jsonb
  ); $$
);
select cron.schedule(
  'blog-actionable-afternoon', '0 15 * * 1-5',
  $$ select net.http_post(
      url:='https://pcjhrmwuqyxddyeikely.supabase.co/functions/v1/generate-batch-posts',
      headers:='{"Content-Type":"application/json","Authorization":"Bearer <ANON_KEY>"}'::jsonb,
      body:='{"mode":"auto","type":"actionnable","count":1}'::jsonb
  ); $$
);
-- 2 promotionnels par semaine (Mar 10h + Jeu 10h UTC)
select cron.schedule(
  'blog-promo-tuesday', '0 10 * * 2',
  $$ select net.http_post(
      url:='https://pcjhrmwuqyxddyeikely.supabase.co/functions/v1/generate-batch-posts',
      headers:='{"Content-Type":"application/json","Authorization":"Bearer <ANON_KEY>"}'::jsonb,
      body:='{"mode":"auto","type":"promotionnel","count":1}'::jsonb
  ); $$
);
select cron.schedule(
  'blog-promo-thursday', '0 10 * * 4',
  $$ select net.http_post(
      url:='https://pcjhrmwuqyxddyeikely.supabase.co/functions/v1/generate-batch-posts',
      headers:='{"Content-Type":"application/json","Authorization":"Bearer <ANON_KEY>"}'::jsonb,
      body:='{"mode":"auto","type":"promotionnel","count":1}'::jsonb
  ); $$
);
```

Vérifier : `select * from cron.job;`

### 6. Migrer les données du blog depuis Lovable Cloud
L'ancien Lovable Cloud n'est plus accessible en direct depuis le CLI. Deux options :

**A. Via l'agent Lovable** (dans le chat, avant que la connexion Cloud soit coupée) : demander un dump JSON de `generated_blog_posts`.

**B. Réexporter manuellement** :
- Depuis le nouveau projet, une fois les cron jobs actifs, les articles se régénèrent automatiquement.
- Sinon, insérer un JSON existant :
```bash
# blog-posts.json = tableau d'objets exportés
psql "$SUPABASE_DB_URL" -c "\copy generated_blog_posts FROM 'blog-posts.csv' CSV HEADER"
```

### 7. Vérifications finales
```bash
# 1. Build local
bun install && bun run build

# 2. Test sitemap
curl -s https://pcjhrmwuqyxddyeikely.supabase.co/functions/v1/generate-sitemap | head -30

# 3. Test MCP
curl -s -X POST https://pcjhrmwuqyxddyeikely.supabase.co/functions/v1/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# 4. Lancer un batch de test
curl -X POST https://pcjhrmwuqyxddyeikely.supabase.co/functions/v1/generate-batch-posts \
  -H "Authorization: Bearer <ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"mode":"manual","subjects":["Test migration"]}'
```

### 8. Nettoyage
- Supprimer `LOVABLE_API_KEY` de tout code résiduel.
- Retirer les fichiers Lovable Cloud spécifiques si présents.
- Republier le site (Vercel/Netlify/Lovable Publish) pour propager le nouveau `.env`.

## Livrables attendus
1. `supabase functions list` retourne les 9 fonctions déployées.
2. `select jobname from cron.job` retourne les 4 jobs.
3. `https://abelsalah.fr/sitemap.xml` répond avec les articles.
4. Build production passe sans erreur.

---
Fin du prompt.
