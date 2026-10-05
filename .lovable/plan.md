
## Point important à comprendre d'abord

Lovable Cloud **est** techniquement un projet Supabase, mais il est hébergé dans l'organisation Supabase de Lovable, pas dans la tienne. Il n'existe **pas** de bouton "transférer ce projet Supabase vers mon compte" — ni côté Lovable, ni côté Supabase. Le projet `mqmynuloecsdsjbgnwzx` ne peut donc pas apparaître dans ton espace Supabase par simple lien.

Le seul chemin possible est une **recréation à l'identique** dans un projet Supabase que tu contrôles, puis bascule du code, puis débranchement de Cloud.

Autre point critique (extrait de la doc Lovable) :
> **Débrancher Lovable Cloud est irréversible et supprime définitivement toutes les données Cloud (base, storage, functions).**

Donc l'ordre des étapes est vital : on ne débranche Cloud qu'**après** avoir tout basculé et vérifié.

---

## Ce que tu fais toi (je ne peux pas le faire à ta place)

1. **Créer un nouveau projet dans ton espace Supabase** (region : Europe recommandée, `eu-west-3` Paris idéalement pour la latence).
2. Récupérer dans ton dashboard Supabase → Settings → API :
   - Project URL (`https://xxxxx.supabase.co`)
   - Project ID (ref)
   - `anon` public key
   - `service_role` key (secret)
3. Récupérer dans Settings → Database → le mot de passe DB.
4. **Exporter les données** du Cloud actuel : Cloud → Advanced settings → Export data. Tu récupères un dump des tables (`generated_blog_posts`, `job_sources`, `job_opportunities`, `job_scores`, `job_outreach_drafts`, `job_applications`).
5. Me redonner ici : Project URL + Project ID + anon key. **Jamais** le service_role ni le password DB en chat — ils seront saisis via le formulaire sécurisé de secrets.

## Ce que je fais ensuite côté code

6. **Rejouer le schéma** sur ton Supabase : je te fournis un unique fichier SQL consolidé regroupant les 3 migrations existantes (`generated_blog_posts` + RLS + policy publique, tables Opportunity Agent + RLS, extensions `pg_cron`/`pg_net`). Tu l'exécutes dans SQL Editor de ton dashboard.
7. **Importer les données exportées** via le SQL Editor ou l'interface Table Editor.
8. **Mettre à jour le code** pour pointer vers ton projet :
   - `.env` : `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`.
   - `supabase/config.toml` : nouveau `project_id`.
   - `src/integrations/supabase/types.ts` : régénéré depuis ton projet.
   - Vérifier que `src/integrations/supabase/client.ts` (auto-généré) est cohérent.
9. **Redéployer les 9 Edge Functions** (`generate-blog-post`, `generate-batch-posts`, `generate-sitemap`, `mcp`, `discover-job-opportunities`, `score-job-opportunities`, `draft-job-outreach`, `manage-opportunities`, `run-opportunity-daily`) via le CLI Supabase — je te donne la commande exacte : `supabase functions deploy --project-ref <ton-ref>`. Tu dois installer le CLI Supabase et te login (`supabase login`) une fois.
10. **Reconfigurer les secrets** dans ton dashboard Supabase → Edge Functions → Secrets :
    - `LOVABLE_API_KEY` (⚠️ voir avertissement ci-dessous)
    - `GOOGLE_SEARCH_API_KEY`, `GOOGLE_SEARCH_ENGINE_ID`
    - `ABEL_CV_URL`
    - `OPPORTUNITY_ADMIN_TOKEN`
    - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (auto-injectés par Supabase)
11. **Recréer les 4 cron jobs `pg_cron`** dans ton SQL Editor (2 articles/jour, 2 promos/semaine, plus les jobs Opportunity Agent).

## Vérification avant coupure

12. Site fonctionne en local (`npm run dev`) contre ton Supabase, articles s'affichent, MCP répond, Edge Functions logs OK dans ton dashboard.
13. Republier le site. Tester `/blog`, `/admin/opportunities`, `sitemap.xml` en prod.

## Coupure finale

14. **Seulement après validation complète**, tu vas dans Cloud → Advanced → Disconnect. **Toutes les données Cloud sont supprimées à ce moment-là.** Ton site continue de tourner sur ton Supabase.

---

## ⚠️ Avertissements importants (à valider avant de démarrer)

- **`LOVABLE_API_KEY`** : cette clé est fournie automatiquement par Lovable Cloud pour accéder au Lovable AI Gateway (utilisé par les fonctions de génération d'articles et MCP). **Une fois Cloud débranché, cette clé n'existera plus.** Tu as deux options :
  - **A** : Remplacer par un compte direct Google Gemini / OpenAI (nouvelle clé API que tu paies directement, adaptation du code des Edge Functions `generate-blog-post` et `generate-batch-posts` pour utiliser l'API native au lieu du gateway Lovable).
  - **B** : Garder Lovable Cloud actif juste pour la clé (contradictoire avec ton objectif).
  - Il faudra choisir A. Je te le préciserai au moment venu.
- **Connecteur Google Search Console** : actuellement passé par un connecteur Lovable géré. Après débranchement, il faudra une clé API Google native ou refaire l'OAuth toi-même.
- **Le domaine `abelsalah.fr`** et l'hébergement du site restent chez Lovable — seule la partie backend bascule. Le site continue à être publié depuis Lovable.
- **Aucune régression fonctionnelle attendue** si les étapes 6-13 sont respectées, mais on avance prudemment.

## Estimation

- Étape 1-5 (toi) : ~30 min
- Étape 6-11 (moi + toi pour CLI) : ~1-2 h
- Étape 12-13 (vérif) : 30 min
- Étape 14 (coupure) : 1 min

---

## Ma proposition pour démarrer

Quand tu approuves ce plan, on procède comme suit :
1. Tu crées le projet Supabase et me redonnes URL + ref + anon key.
2. Je te livre le fichier SQL consolidé à exécuter dans ton SQL Editor.
3. Tu exportes les données Cloud et les importes.
4. On enchaîne code + Edge Functions + cron + tests.
5. Seulement après tous les feux verts, on débranche Cloud.

Confirme que tu veux bien partir sur cette approche (recréation dans ton Supabase puis coupure Cloud), sachant qu'il n'y a pas de transfert direct possible.
