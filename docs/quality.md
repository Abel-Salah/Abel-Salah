# Qualite, Tests Et Maintenance

## Commandes attendues

```sh
npm run lint
npm run build
npm audit --audit-level=moderate
```

## Etat connu

Au dernier controle :

- `npm run lint` passe sans warning.
- `npm run build` passe.
- Le bundle principal est sous le seuil d'avertissement Vite grace au code splitting par routes.
- `npm audit --audit-level=moderate` passe avec 0 vulnerabilite connue.

## Tests manuels recommandes

- Home desktop/mobile.
- Switch FR/EN/ES.
- CTA TidyCal depuis la home, contact et footer.
- Blog statique.
- Blog genere Supabase si la base contient des articles publies.
- Page `/ecosystem`.
- `robots.txt`, `sitemap.xml`, `llms.txt`, `ai.txt`.

## Dette technique suivie

- Nettoyage shadcn apres audit des usages.
- Moderation humaine optionnelle des articles IA avant publication production.

## Suppressions potentielles

Aucune suppression ne doit etre faite sans preuve et validation.

Pour chaque fichier candidat :

1. rechercher les imports directs ;
2. rechercher les usages dynamiques ;
3. verifier les routes et configs ;
4. lancer `npm run lint` et `npm run build` ;
5. verifier manuellement les pages concernees.
