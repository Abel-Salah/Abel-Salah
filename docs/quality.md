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
4. lancer `npm run lint` et `npm run build` ;
5. verifier manuellement les pages concernees.
