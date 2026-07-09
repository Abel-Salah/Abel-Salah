# Architecture Technique

## Vue d'ensemble

Le projet est une application React statique construite avec Vite. Le routage est gere cote client par React Router dans [src/App.tsx](../src/App.tsx).

## Routes

| Route | Composant | Role |
|---|---|---|
| `/` | `Index` | Accueil francais |
| `/en` | `Index` | Accueil anglais |
| `/es` | `Index` | Accueil espagnol |
| `/work` | `Work` | Realisations |
| `/about` | `About` | Profil et parcours |
| `/contact` | `Contact` | Prise de rendez-vous |
| `/blog` | `Blog` | Liste des articles |
| `/blog/:slug` | `BlogPost` | Article statique ou genere |
| `/ecosystem` | `Ecosystem` | Produits et preuves d'execution |
| `/styleguide` | `Styleguide` | Page interne de design |

## Dossiers principaux

- `src/pages` : pages routees.
- `src/components` : composants applicatifs.
- `src/components/ui` : composants shadcn/ui. Plusieurs composants peuvent etre inutilises ; ne pas supprimer sans audit dedie.
- `src/data` : contenus structures statiques.
- `src/hooks` : hooks React, dont le chargement des articles Supabase.
- `src/integrations/supabase` : client et types Supabase generes.
- `supabase/functions` : Edge Functions.
- `supabase/migrations` : schema SQL et politiques RLS.
- `public` : assets publics, robots, sitemap, fichiers LLM.

## Contenu localise

La home FR/EN/ES est pilotee par [src/data/homeLocales.ts](../src/data/homeLocales.ts). Les routes `/en` et `/es` reutilisent le composant `Index` avec une prop `locale`.

## Blog

Le blog combine deux sources :

- articles statiques dans [src/data/blogPosts.ts](../src/data/blogPosts.ts) ;
- articles generes dans la table Supabase `generated_blog_posts`, charges via [src/hooks/useGeneratedBlogPosts.ts](../src/hooks/useGeneratedBlogPosts.ts).

`BlogPost` tente d'abord de trouver un article statique, puis interroge Supabase si aucun article statique ne correspond au slug.

## SEO

Le composant [src/components/SEOHead.tsx](../src/components/SEOHead.tsx) centralise les titres, descriptions, canonical, alternates et breadcrumbs JSON-LD pour les pages React.

Le fichier [index.html](../index.html) contient aussi des meta tags et JSON-LD globaux. Il faut maintenir la coherence entre `index.html`, `SEOHead`, `public/sitemap.xml`, `public/llms.txt` et `public/ai.txt`.

## Reservation

L'URL TidyCal est centralisee dans `TIDYCAL_BOOKING_URL` dans [src/data/homeLocales.ts](../src/data/homeLocales.ts). Le nom historique [src/components/CalendlyPopup.tsx](../src/components/CalendlyPopup.tsx) est obsolescent : le composant utilise TidyCal, mais devrait etre renomme dans un lot technique separe.
