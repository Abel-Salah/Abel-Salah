# Deploiement Et Rollback

## Build production

```sh
npm run lint
npm run build
```

Le build produit le dossier `dist`.

## Preview locale

```sh
npm run preview
```

## Hebergement

Le README Lovable initial indiquait un deploiement via Lovable, mais le depot ne contient pas de configuration Vercel, Netlify, Docker ou GitHub Actions.

Source de verite actuelle a confirmer humainement :

- Lovable peut publier le projet depuis GitHub.
- Le domaine public attendu est `https://abelsalah.fr`.

## Checklist avant mise en production

1. `git status --short` propre ou changements volontairement stages.
2. `npm run lint`.
3. `npm run build`.
4. `npm audit --audit-level=moderate`.
5. Verification manuelle des routes principales :
   - `/`
   - `/en`
   - `/es`
   - `/work`
   - `/about`
   - `/contact`
   - `/blog`
   - `/ecosystem`
6. Verification du lien TidyCal.
7. Verification de `robots.txt`, `sitemap.xml`, `llms.txt` et `ai.txt`.

## Rollback

Rollback Git simple :

```sh
git log --oneline
git revert <commit_sha>
npm run lint
npm run build
git push origin main
```

Ne pas utiliser `git reset --hard` sur un environnement partage sans validation explicite.

## Supabase

Les migrations doivent etre traitees separement du deploiement frontend. Avant toute modification :

1. relire les politiques RLS ;
2. tester sur un environnement non-production ;
3. verifier les Edge Functions dependantes ;
4. documenter la procedure de rollback SQL.
