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
