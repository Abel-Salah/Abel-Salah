# Installation Et Environnement

## Prerequis

- Node.js 22.22+ requis
- npm
- Acces au projet Supabase si les articles generes doivent fonctionner

## Demarrage local

```sh
npm install
cp .env.example .env
npm run dev
```

Le serveur local Vite utilise la configuration de [vite.config.ts](../vite.config.ts), actuellement `host: "::"` et `port: 8080`.

## Variables client

Ces variables sont exposees au navigateur par Vite. Elles doivent commencer par `VITE_`.

```sh
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Elles sont utilisees par [src/integrations/supabase/client.ts](../src/integrations/supabase/client.ts).

## Variables Edge Functions

Ces variables sont cote Supabase Functions uniquement :

```sh
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
GOOGLE_SEARCH_API_KEY=
GOOGLE_SEARCH_ENGINE_ID=
ABEL_CV_URL=
OPPORTUNITY_ADMIN_TOKEN=
```

Ne pas les prefixer par `VITE_` et ne pas les exposer dans le frontend.

## Gestionnaire de paquets

Les commandes documentees utilisent npm. Voir [decisions/package-manager.md](decisions/package-manager.md).

## Commandes utiles

```sh
npm run lint
npm run typecheck
npm run smoke
npm run build
npm run verify
npm run preview
npm audit --audit-level=moderate
```

## Problemes frequents

- Si Supabase ne charge pas les articles generes, verifier `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Si `npm audit` remonte des vulnerabilites, commencer par `npm audit fix`, puis relancer `npm run verify`.
- Le fichier `.env` est local et ignore par Git. Conserver uniquement `.env.example` dans le depot.
