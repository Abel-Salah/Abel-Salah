# Qualite, Tests Et Maintenance

## Commandes attendues

```sh
npm run lint
npm run typecheck
npm run smoke
npm run verify:dist
npm run build
npm audit --audit-level=moderate
npm run verify
```

`npm run verify` regroupe les controles minimums attendus avant un push ou une pull request : lint, typecheck, build, verification SEO statique, verification du build genere, smoke checks et audit npm.

## Etat connu

Au dernier controle :

- `npm run lint` passe sans warning.
- `npm run typecheck` passe.
- `npm run build` passe.
- `npm run verify:dist` verifie le rendu `dist` genere : routes publiques, canonical, hreflang, Open Graph, Twitter Card, sitemap, redirects, TidyCal et evenements de conversion.
- `npm run smoke` verifie les invariants critiques : routes publiques, TidyCal, blog Markdown sanitize, admin noindex/robots, JWT Supabase et absence d'envoi automatique d'email.
- Le bundle principal est sous le seuil d'avertissement Vite grace au code splitting par routes.
- `npm audit --audit-level=moderate` passe avec 0 vulnerabilite connue.

## Conversion

Les clics principaux de reservation emettent des evenements internes via [src/lib/conversionEvents.ts](../src/lib/conversionEvents.ts) :

- `book_call_click` pour les CTA TidyCal ;
- `offer_cta_click` pour les CTA des pages offres.

La v1 stocke les 50 derniers evenements dans `localStorage` et emet un `CustomEvent` navigateur `abel:conversion`. Aucun outil tiers n'est charge par defaut.

## GitHub

- La CI GitHub Actions execute `npm run verify` sur `main` et sur les pull requests.
- Dependabot surveille les dependances npm et GitHub Actions chaque lundi matin.
- Le template de pull request rappelle les controles SEO, Supabase et secrets.
- `CODEOWNERS` assigne les zones sensibles a `@Abel-Salah`.
- [SECURITY.md](../SECURITY.md) documente le signalement prive et les regles de secrets.
- Si GitHub Actions retourne `The job was not started because an Actions budget is preventing further use`, le code peut etre sain mais le budget Actions doit etre debloque cote GitHub avant d'obtenir un run vert.
- La branche `main` doit etre protegee cote GitHub avant de considerer la CI comme bloquante.

## Tests manuels recommandes

- Home desktop/mobile.
- Switch FR/EN/ES.
- CTA TidyCal depuis la home, contact et footer.
- Blog statique.
- Blog genere Supabase si la base contient des articles publies.
- Page `/ecosystem`.
- `robots.txt`, `sitemap.xml`, `llms.txt`, `ai.txt`.
- Fonctions Opportunity Agent en dry run avec secrets de test si configurees.
- Fonction `run-opportunity-daily` : verifier qu'elle orchestre discovery/scoring/drafts sans envoyer de message.
- Verification qu'aucun brouillon Opportunity Agent ne passe en `sent` sans action humaine.
- Dashboard `/admin/opportunities` : token requis, liste, validation, refus, modification de brouillon, marquage envoye.

## Dette technique suivie

- Nettoyage shadcn apres audit des usages.
- Moderation humaine optionnelle des articles IA avant publication production.
- Cron quotidien a configurer cote hebergement seulement apres validation du volume et des sources.

## Images

Les assets hero et ventures lourds sont servis en WebP. `sharp` est disponible en devDependency pour regenerer des variantes optimisees si de nouvelles images sont ajoutees.

## Suppressions potentielles

Aucune suppression ne doit etre faite sans preuve et validation.

Pour chaque fichier candidat :

1. rechercher les imports directs ;
2. rechercher les usages dynamiques ;
3. verifier les routes et configs ;
4. lancer `npm run verify` ;
5. verifier manuellement les pages concernees.
