# Abel SALAH — Site Expert IA

Site vitrine et éditorial d'Abel SALAH, consultant IA pour PME et ETI. Le projet présente les offres, les cas d'usage, l'écosystème de produits et un blog statique/dynamique alimenté par Supabase.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui minimal
- Supabase Edge Functions
- TidyCal pour la prise de rendez-vous

## Installation

Ce dépôt est standardisé sur npm. Ne pas utiliser Bun pour ce projet.

```sh
npm install
npm run dev
```

Scripts utiles :

```sh
npm run lint
npm run build
npm run preview
npm audit
```

## Variables d'environnement

Créer un fichier `.env` local avec :

```sh
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
```

Les clés serveur Supabase et Lovable restent côté Supabase Edge Functions :

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LOVABLE_API_KEY`

Aucun token TidyCal n'est nécessaire pour la version actuelle. Le site utilise l'URL publique :

```txt
https://tidycal.com/skill-lms/abel-rdv
```

## Blog et Supabase

Les articles statiques sont dans `src/data/blogPosts.ts`.

Les articles générés sont lus depuis la table Supabase `generated_blog_posts`. Les Edge Functions `generate-blog-post` et `generate-batch-posts` valident le contenu généré avant insertion, puis publient automatiquement les articles validés.

Important : `generate-batch-posts` est actuellement exposée sans JWT dans `supabase/config.toml`. Pour une mise en production plus stricte, ajouter une protection par JWT ou secret applicatif.

La fonction `generate-sitemap` produit un sitemap XML incluant les pages statiques, les pages offres et les articles publiés.

## Prise de rendez-vous

La prise de rendez-vous utilise TidyCal. Les CTA passent par `BookingCTA`, qui centralise l'URL de réservation et émet des événements internes :

- `book_call_click`
- `offer_cta_click`

Ces événements sont prêts à connecter à Plausible, GA4 ou une autre solution plus tard.

## Qualité

Avant chaque livraison :

```sh
npm run lint
npm run build
npm audit --audit-level=moderate
```

Vérifier aussi manuellement :

- `/`
- `/blog`
- `/contact`
- `/audit-ia`
- `/automatisation-commerciale`
- `/formation-ia`
