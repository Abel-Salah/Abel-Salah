# Agents nommés

Le registre des agents est alimenté par la migration `20260728090000_create_agent_registry.sql`.

| Agent | Mission | Fréquence cible | Autonomie |
| --- | --- | --- | --- |
| Atlas | Orchestration et file de tâches | Quotidienne, 07:00 Europe/Paris | Actions réversibles, validation requise |
| Nova | Prospection et nouvelles collaborations | Quotidienne, 07:10 Europe/Paris | Préparation, validation requise |
| Cléo | SEO Google | Quotidienne, 07:30 Europe/Paris | Préparation, validation requise |
| Iris | SEO IA et visibilité LLM | Hebdomadaire, lundi 08:00 Europe/Paris | Préparation, validation requise |
| Plume | Contenu SEO | Hebdomadaire, mardi 09:00 Europe/Paris | Préparation, validation requise |

`run-atlas` crée les tâches dans `agent_tasks` et journalise chaque exécution dans `agent_runs`. Cette fonction ne prétend pas analyser Search Console ou les moteurs LLM tant que les connecteurs correspondants ne sont pas configurés. Les envois, candidatures et publications restent soumis à validation humaine.

Le dépôt contient les fréquences cibles, mais leur activation opérationnelle nécessite encore un cron Supabase/Vercel et les secrets des connecteurs.
