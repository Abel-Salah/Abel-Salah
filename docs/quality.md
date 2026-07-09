# Qualite, Tests Et Maintenance

## Commandes attendues

```sh
npm run lint
npm run build
npm audit --audit-level=moderate
```

## Etat connu

Au dernier controle :

- `npm run lint` passe avec 7 warnings `react-refresh/only-export-components` sur des composants shadcn.
- `npm run build` passe.
- Vite signale un chunk JavaScript superieur a 500 kB.
- `npm audit --audit-level=moderate` signale encore des vulnerabilites dans des dependances ou transitives.

## Tests manuels recommandes

- Home desktop/mobile.
- Switch FR/EN/ES.
- CTA TidyCal depuis la home, contact et footer.
- Blog statique.
- Blog genere Supabase si la base contient des articles publies.
- Page `/ecosystem`.
- `robots.txt`, `sitemap.xml`, `llms.txt`, `ai.txt`.

## Dette technique suivie

- Code splitting par routes pour reduire le chunk principal.
- Nettoyage shadcn apres audit des usages.
- Remplacement de `dangerouslySetInnerHTML` par un rendu Markdown controle.
- Validation Zod des articles generes avant insertion.
- Protection des Edge Functions de generation.
- Choix definitif npm-only et suppression des lockfiles inutiles.

## Suppressions potentielles

Aucune suppression ne doit etre faite sans preuve et validation.

Pour chaque fichier candidat :

1. rechercher les imports directs ;
2. rechercher les usages dynamiques ;
3. verifier les routes et configs ;
4. lancer `npm run lint` et `npm run build` ;
5. verifier manuellement les pages concernees.
