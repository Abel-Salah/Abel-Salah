# Agents nommés

Le registre des agents est alimenté par la migration `20260728090000_create_agent_registry.sql`.

| Agent | Mission | Fréquence cible | Autonomie |
| --- | --- | --- | --- |
| Atlas | Supervision, orchestration, file de tâches et contrôle des blocages | Quotidienne, 07:00 Europe/Paris + relance contrôlée | Actions réversibles, validation requise |
| Nova | Prospection et nouvelles collaborations | Quotidienne, 07:10 Europe/Paris | Préparation, validation requise |
| Cléo | SEO Google | Quotidienne, 07:30 Europe/Paris | Préparation, validation requise |
| Iris | SEO IA et visibilité LLM | Hebdomadaire, lundi 08:00 Europe/Paris | Préparation, validation requise |
| Plume | Contenu SEO | Hebdomadaire, mardi 09:00 Europe/Paris | Préparation, validation requise |

`run-atlas` crée les tâches dans `agent_tasks` et journalise chaque exécution dans `agent_runs`. Atlas est le manager du registre : il prépare le travail, suit les tâches en attente ou bloquées, signale les erreurs et évite les doublons. Il ne remplace pas l'exécution métier de chaque agent et ne prétend pas analyser Search Console ou les moteurs LLM tant que les connecteurs correspondants ne sont pas configurés. Les envois, candidatures et publications restent soumis à validation humaine.

## Boucle de continuité

Chaque tâche suit le cycle `queued → in_progress → pending_review → completed` ou `blocked`. Une tâche en erreur ne doit pas être relancée indéfiniment : Atlas peut effectuer une relance contrôlée, puis la passer en `blocked` avec la cause, la dernière tentative et l'action attendue. Toute sortie doit contenir une preuve, un niveau de confiance, un propriétaire et une prochaine action. Le système privilégie les actions réversibles et s'arrête avant toute publication, candidature, envoi ou modification critique.

Le dépôt contient les fréquences cibles. Leur activation opérationnelle nécessite un cron Supabase/Vercel et les secrets des connecteurs ; sans cela, Atlas reste déclenchable manuellement et ne doit pas être présenté comme autonome en production.
