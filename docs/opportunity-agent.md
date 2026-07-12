# Opportunity Agent

## Objectif

L'Opportunity Agent aide Abel SALAH a detecter des missions pertinentes, les scorer et preparer des brouillons de prise de contact. Il ne postule pas automatiquement et n'envoie aucun message sans validation humaine.

Le flux est volontairement semi-automatique pour proteger la reputation d'Abel, eviter le spam et respecter les conditions des plateformes.

## Architecture

Tables Supabase privees :

- `job_sources` : sources et requetes de recherche.
- `job_opportunities` : opportunites detectees.
- `job_scores` : score IA et diagnostic de fit.
- `job_outreach_drafts` : messages prepares en `pending_review`.
- `job_applications` : suivi CRM apres validation humaine.

Edge Functions protegees par JWT :

- `discover-job-opportunities` : interroge Google Programmable Search / Custom Search JSON API.
- `score-job-opportunities` : score les opportunites via IA.
- `draft-job-outreach` : prepare des brouillons personnalises, sans envoi.

## Variables

```sh
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
LOVABLE_API_KEY=
GOOGLE_SEARCH_API_KEY=
GOOGLE_SEARCH_ENGINE_ID=
ABEL_CV_URL=
```

`ABEL_CV_URL` est optionnelle mais recommandee si un CV public doit etre propose dans les brouillons.

## Configuration Google Search

1. Creer un moteur Google Programmable Search.
2. Limiter les sites autorises si possible : `welcometothejungle.com`, `linkedin.com/jobs`, `indeed.com`, `malt.fr`, `free-work.com`, `lesjeudis.com`.
3. Creer une cle API Google Custom Search JSON API.
4. Ajouter `GOOGLE_SEARCH_API_KEY` et `GOOGLE_SEARCH_ENGINE_ID` dans les secrets Supabase.
5. Ajuster les requetes dans `job_sources.search_queries`.

Cette approche utilise l'API Google. Elle ne scrape pas LinkedIn, Indeed ou Welcome to the Jungle.

## Workflow quotidien recommande

1. Lancer `discover-job-opportunities` une fois par jour, limite 10 a 20 resultats.
2. Lancer `score-job-opportunities`.
3. Lancer `draft-job-outreach` seulement pour les scores eleves.
4. Relire les brouillons `pending_review`.
5. Envoyer manuellement uniquement les messages vraiment pertinents.
6. Mettre a jour `job_applications` avec le statut, les notes et le prochain follow-up.

Exemple d'appel manuel :

```sh
curl -X POST "$SUPABASE_URL/functions/v1/discover-job-opportunities" \
  -H "Authorization: Bearer $SUPABASE_ANON_OR_USER_JWT" \
  -H "Content-Type: application/json" \
  -d '{"limit": 20}'
```

## Regles anti-spam

- Maximum 10 a 20 nouvelles opportunites analysees par jour au depart.
- Aucun envoi automatique.
- Un brouillon doit rester en `pending_review` tant qu'Abel ne l'a pas relu.
- Ne jamais inventer de relation, de reference client ou de disponibilite.
- Prioriser les missions ou l'expertise IA, automatisation commerciale, audit IA ou formation IA est clairement utile.
- Ignorer stages, alternances, postes junior, annonces sans lien business ou annonces trop generalistes.
- Adapter chaque message avec un angle specifique a l'entreprise ou a l'offre.

## Evolutions possibles

- Ajouter une page admin `/admin/opportunities` protegee.
- Ajouter un cron Supabase ou Vercel Cron qui declenche seulement `discover` et `score`, jamais l'envoi.
- Brancher des API partenaires si elles sont disponibles et autorisees.
- Ajouter une integration CRM dediee pour relances et pipeline.
- Ajouter un connecteur email uniquement pour preparer des brouillons, pas pour envoyer sans validation.

## Limites actuelles

- Pas d'integration LinkedIn, Indeed, Welcome to the Jungle ou Malt directe.
- Pas de candidature automatique.
- Pas de cron configure dans le depot.
- Pas d'interface admin encore livree.
