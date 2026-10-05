# Codebase Memory — usage local

`codebase-memory-mcp` est un outil d’aide au développement local. Il construit un index structurel du dépôt pour accélérer l’exploration du code, l’analyse d’impact et la compréhension des dépendances.

## Périmètre et garde-fous

- L’outil n’est pas une dépendance du site et ne doit jamais être embarqué dans `dist`, le frontend ou une Edge Function.
- L’index généré reste local dans `.codebase-memory/` et n’est pas versionné.
- `AGENTS.md` reste la source d’autorité pour les règles métier, la sécurité, les preuves commerciales et les validations humaines.
- L’index ne remplace pas `lint`, `typecheck`, `build`, les tests, le smoke test ou la vérification en production.
- Ne jamais indexer de secrets : `.env`, clés API, tokens, exports clients ou fichiers contenant des données sensibles. Les secrets restent hors du dépôt et hors de l’index.
- Une réponse issue du graphe est un signal de navigation technique, pas une preuve qu’une fonctionnalité fonctionne ou qu’un résultat commercial est vrai.

## Installation locale

L’installation est volontairement séparée du produit. La procédure officielle fournit un binaire local vérifié par checksum. Avant une première installation, inspecter le script distant puis l’exécuter depuis le terminal :

```bash
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh \
  -o /tmp/codebase-memory-install.sh
less /tmp/codebase-memory-install.sh
bash /tmp/codebase-memory-install.sh
```

Après installation, redémarrer Codex puis demander : `Index this project`.

Pour une installation sans modification automatique des configurations d’agents :

```bash
bash /tmp/codebase-memory-install.sh --skip-config
```

## Boucle de travail du projet

1. Lire `AGENTS.md` et vérifier Git, la branche et la cible de déploiement.
2. Actualiser ou interroger l’index après une grosse modification, un rebase ou un changement d’architecture.
3. Utiliser le graphe pour retrouver les consommateurs, routes, appels et risques de régression.
4. Modifier le minimum nécessaire avec une source identifiable.
5. Exécuter `npm run lint`, `npm run typecheck`, `npm run build`, `npm run verify:dist` et `npm run smoke`.
6. Tester le parcours réel après rechargement complet.
7. Relire les changements et ne commiter que les sources, tests et documentation — jamais l’index local.

## Limites connues

L’outil améliore la mémoire technique du dépôt ; il ne planifie pas seul les actions SEO, ne valide pas les affirmations, ne déploie pas Supabase et ne remplace pas une revue humaine. Les changements externes (secrets, paiement, publication, suppression d’URL ou migration) restent soumis aux garde-fous du projet.
