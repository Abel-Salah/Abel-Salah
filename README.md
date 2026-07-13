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
- Supabase pour l'Opportunity Agent semi-automatique
- TidyCal pour la prise de rendez-vous

## Prerequis

- Node.js 22+ recommande
- npm
- Un projet Supabase si les articles generes ou les Edge Functions sont utilises

Le depot est standardise sur npm. Voir [docs/decisions/package-manager.md](docs/decisions/package-manager.md).

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
GOOGLE_SEARCH_API_KEY=
GOOGLE_SEARCH_ENGINE_ID=
ABEL_CV_URL=
OPPORTUNITY_ADMIN_TOKEN=
```

Ne jamais committer de secrets. Utiliser [.env.example](.env.example) comme reference.

## Scripts

```sh
npm run dev        # serveur local
npm run build      # build production
npm run build:dev  # build en mode development
npm run lint       # ESLint
npm run typecheck  # TypeScript sans emission
npm run smoke      # smoke checks routes, SEO, admin et TidyCal
npm run preview    # preview du build
npm run verify     # lint + typecheck + build + SEO smoke + audit moderate
npm audit          # audit dependances
```

Etat observe au dernier audit documentaire :

- `npm run lint` passe sans warning.
- `npm run typecheck` passe.
- `npm run build` passe.
- `npm run smoke` passe.
- `npm audit --audit-level=moderate` passe avec 0 vulnerabilite connue.
- GitHub Actions execute `npm run verify` sur `main` et les pull requests quand le budget Actions GitHub est actif.

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
- `/admin/opportunities` : dashboard prive Opportunity Agent, noindex, protege par token
- `/styleguide` : page interne, bloquee dans `robots.txt`

## Documentation

- [Installation et environnement](docs/setup.md)
- [Architecture technique](docs/architecture.md)
- [Supabase et securite](docs/supabase.md)
- [Opportunity Agent](docs/opportunity-agent.md)
- [SEO, sitemap et LLM](docs/seo.md)
- [Deploiement et rollback](docs/deployment.md)
- [Qualite, tests et maintenance](docs/quality.md)
- [Decisions d'architecture](docs/decisions)

## Points d'attention

- La fonction Supabase `generate-sitemap` est publique et ne fait que lire les articles publies.
- Les fonctions Supabase `generate-blog-post` et `generate-batch-posts` sont configurees avec `verify_jwt = true`.
- Les fonctions Opportunity Agent sont protegees par JWT et ne postulent jamais automatiquement.
- Le blog rend les paragraphes Markdown avec `react-markdown`, `remark-gfm` et `rehype-sanitize`.
- Les articles generes sont valides par schema Zod avant insertion.

## Reservation

URL unique de reservation :

```txt
https://tidycal.com/skill-lms/abel-rdv
```

La constante est centralisee dans [src/data/homeLocales.ts](src/data/homeLocales.ts).
