# Deploiement Et Rollback

## Build production

```sh
npm run verify
```

`npm run verify` lance lint, typecheck, build, verification SEO statique, smoke checks et audit npm. Le build produit le dossier `dist`.

## Preview locale

```sh
npm run preview
```

## Hebergement

Source de verite actuelle :

- Lovable peut publier le projet depuis GitHub.
- [vercel.json](../vercel.json) et [public/_redirects](../public/_redirects) documentent les rewrites statiques utiles aux hebergeurs compatibles.
- GitHub Actions execute `npm run verify` quand le budget Actions du compte est actif.
- Le domaine public attendu est `https://abelsalah.fr`.

## Checklist avant mise en production

1. `git status --short` propre ou changements volontairement stages.
2. `npm run verify`.
3. CI GitHub verte si le budget Actions est actif.
4. Branche `main` protegee avant de rendre les checks obligatoires.
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
npm run verify
git push origin main
```

Ne pas utiliser `git reset --hard` sur un environnement partage sans validation explicite.

## Supabase

Les migrations doivent etre traitees separement du deploiement frontend. Avant toute modification :

1. relire les politiques RLS ;
2. tester sur un environnement non-production ;
3. verifier les Edge Functions dependantes ;
4. documenter la procedure de rollback SQL.
