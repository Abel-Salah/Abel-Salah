# Abel SALAH

Site vitrine d'Abel SALAH, consultant IA pour entreprises. Le projet presente les offres, les realisations, l'ecosysteme de produits, le blog IA et les pages d'accueil localisees en francais, anglais et espagnol.

## Stack

- Vite
- React 18
- TypeScript
- React Router
- Tailwind CSS
- shadcn/ui
- Framer Motion
- TanStack Query
- Supabase pour les articles de blog generes
- TidyCal pour la prise de rendez-vous

## Prerequis

- Node.js 20+ recommande
- npm
- Un projet Supabase si les articles generes ou les Edge Functions sont utilises

Le depot contient actuellement `package-lock.json`, `bun.lock` et `bun.lockb`. Les scripts documentes et valides utilisent npm. Voir [docs/decisions/package-manager.md](docs/decisions/package-manager.md).

## Installation

```sh
npm install
cp .env.example .env
npm run dev
```

Le serveur Vite ecoute par defaut sur le port configure dans [vite.config.ts](vite.config.ts), actuellement `8080`.

## Variables d'environnement

Variables client Vite :

```sh
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Variables Edge Functions Supabase :

```sh
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
LOVABLE_API_KEY=
```

Ne jamais committer de secrets. Utiliser [.env.example](.env.example) comme reference.

## Scripts

```sh
npm run dev        # serveur local
npm run build      # build production
npm run build:dev  # build en mode development
npm run lint       # ESLint
npm run preview    # preview du build
npm audit          # audit dependances
```

Etat observe au dernier audit documentaire :

- `npm run lint` passe avec des warnings Fast Refresh sur certains composants shadcn.
- `npm run build` passe, avec un avertissement Vite sur un chunk JavaScript > 500 kB.
- `npm audit --audit-level=moderate` remonte encore des vulnerabilites corrigeables par `npm audit fix`.

## Routes publiques

- `/` : accueil francais
- `/en` : accueil anglais
- `/es` : accueil espagnol
- `/work` : realisations
- `/about` : a propos
- `/contact` : prise de rendez-vous TidyCal
- `/blog` : liste des articles
- `/blog/:slug` : detail article statique ou genere
- `/ecosystem` : produits et preuves d'execution
- `/styleguide` : page interne, bloquee dans `robots.txt`

## Documentation

- [Installation et environnement](docs/setup.md)
- [Architecture technique](docs/architecture.md)
- [Supabase et securite](docs/supabase.md)
- [SEO, sitemap et LLM](docs/seo.md)
- [Deploiement et rollback](docs/deployment.md)
- [Qualite, tests et maintenance](docs/quality.md)
- [Decisions d'architecture](docs/decisions)

## Points d'attention

- Les fonctions Supabase `generate-sitemap` et `generate-batch-posts` sont configurees avec `verify_jwt = false`.
- `generate-blog-post` n'est pas liste dans [supabase/config.toml](supabase/config.toml), donc son statut JWT depend de la configuration Supabase par defaut ou distante.
- Le sitemap statique [public/sitemap.xml](public/sitemap.xml) inclut `/en` et `/es`, mais la fonction [supabase/functions/generate-sitemap/index.ts](supabase/functions/generate-sitemap/index.ts) ne genere pas encore ces alternates.
- Le blog rend encore certains paragraphes via `dangerouslySetInnerHTML` dans [src/pages/BlogPost.tsx](src/pages/BlogPost.tsx). A securiser avant d'ouvrir davantage la generation de contenu.

## Reservation

URL unique de reservation :

```txt
https://tidycal.com/skill-lms/abel-rdv
```

La constante est centralisee dans [src/data/homeLocales.ts](src/data/homeLocales.ts).
