# Decision: Gestionnaire De Paquets

## Statut

Actif.

## Contexte

Le depot contient :

- `package-lock.json`

Les scripts documentes dans [package.json](../../package.json) sont executes via npm :

```sh
npm run dev
npm run lint
npm run build
npm run preview
```

## Decision recommandee

Standardiser sur npm pour ce projet.

## Implications

- Conserver `package-lock.json`.
- Documenter uniquement les commandes npm.
- Ne pas ajouter de lockfile Bun, pnpm ou Yarn.

## Verification avant suppression

1. Lancer `npm install`.
2. Lancer `npm run lint`.
3. Lancer `npm run build`.
4. Verifier le deploiement.

## Application Cloudflare — 3 novembre 2026

La preview du commit `6b169e9` échouait avant le build : Cloudflare détectait
`bun.lock` et lançait `bun install --frozen-lockfile`, refusé car les overrides
ne correspondaient plus à ce verrou historique. Le journal du déploiement
`1707b0b8-cd66-4cb2-b6cf-427b716d02f6` l'atteste. Le fichier Bun obsolète est retiré
de la branche, récupérable dans Git et conservé en copie privée vérifiée.
Cloudflare doit désormais installer depuis `package-lock.json`, comme le gate
local `npm ci` puis `npm run verify`. Aucune commande Bun n'est utilisée par
les scripts ou workflows actuels du projet. Une preview réussie et une recette
navigateur restent exigées avant merge ; ne pas désactiver le verrouillage npm.
