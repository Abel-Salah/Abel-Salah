# Decision: Gestionnaire De Paquets

## Statut

Propose, a valider.

## Contexte

Le depot contient :

- `package-lock.json`
- `bun.lock`
- `bun.lockb`

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
- Supprimer `bun.lock` et `bun.lockb` dans un lot separe, apres validation humaine.

## Verification avant suppression

1. Confirmer que Lovable ou l'hebergeur n'utilise pas Bun implicitement.
2. Lancer `npm install`.
3. Lancer `npm run lint`.
4. Lancer `npm run build`.
5. Verifier le deploiement.
