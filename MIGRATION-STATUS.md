# Migration vers Supabase personnel — État

Projet cible : **pcjhrmwuqyxddyeikely**
https://supabase.com/dashboard/project/pcjhrmwuqyxddyeikely

## ✅ Fait automatiquement

1. **`.env` frontend** → pointe vers `pcjhrmwuqyxddyeikely.supabase.co`.
2. **`supabase/config.toml`** → `project_id = "pcjhrmwuqyxddyeikely"`.
3. **GitHub Action** `.github/workflows/deploy-supabase.yml` créée :
   déploie les 9 Edge Functions vers le projet cible à chaque push sur `main`
   (déclenchable aussi manuellement via *Actions → Deploy Supabase Edge Functions → Run workflow*).
4. **Schéma SQL** : déjà appliqué par toi (confirmé "Success").

## 🔑 Ce qu'il te reste à faire (une seule fois, ~5 min)

### 1. Ajouter 3 secrets GitHub

Repo → Settings → Secrets and variables → Actions → *New repository secret* :

| Secret | Valeur |
|---|---|
| `SUPABASE_ACCESS_TOKEN` | Génère-le sur https://supabase.com/dashboard/account/tokens |
| `SUPABASE_PROJECT_REF` | `pcjhrmwuqyxddyeikely` |
| `SUPABASE_DB_PASSWORD` | Le mot de passe DB (facultatif, seulement si tu veux `db push`) |

### 2. Ajouter les secrets côté Supabase

Dashboard Supabase → *Project Settings → Edge Functions → Secrets* :

| Secret | Utilisé par | Notes |
|---|---|---|
| `LOVABLE_API_KEY` | 5 fonctions IA | Récupérable dans Lovable ; expirera une fois Cloud désactivé |
| `GOOGLE_SEARCH_API_KEY` | Opportunity Agent | Google Custom Search |
| `GOOGLE_SEARCH_ENGINE_ID` | Opportunity Agent | |
| `ABEL_CV_URL` | draft-job-outreach | URL publique du CV |
| `OPPORTUNITY_ADMIN_TOKEN` | manage-opportunities, run-opportunity-daily | Token admin |

`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` sont injectés automatiquement.

### 3. Lancer le déploiement

Une fois les secrets GitHub ajoutés :
- Soit tu fais un `git push` sur `main`
- Soit *Actions → Deploy Supabase Edge Functions → Run workflow*

## ⚠️ Bloqué / à savoir

- **Je ne peux pas déployer depuis Lovable** : mes outils Supabase pointent sur le projet Cloud managé (`mqmynuloecsdsjbgnwzx`), pas sur le tien. C'est pour ça que la GitHub Action est la seule voie automatique sans CLI locale.
- **`LOVABLE_API_KEY`** : les fonctions IA appellent `https://ai.gateway.lovable.dev`. Tant que Lovable Cloud reste connecté à ce projet Lovable, la clé reste valide. Si tu désactives complètement Cloud côté workspace, ces fonctions cesseront de générer du contenu → il faudra alors basculer sur un provider direct (Gemini/OpenAI). Ça peut être fait en une passe, dis-le quand tu es prêt.
- **`.env` peut être réécrit par Lovable Cloud** tant que Cloud reste actif sur ce projet. Les vraies valeurs de production sont celles injectées au build par la connexion Supabase.
- **Cron jobs** (`pg_cron`) : la migration ne les recrée pas. Il faudra relancer les 4 jobs de génération dans le SQL editor Supabase une fois les fonctions déployées.

## Action minimale restante

1. Ajouter les 3 secrets GitHub.
2. Ajouter les 5 secrets Supabase.
3. Lancer le workflow.
