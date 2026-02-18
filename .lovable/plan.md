
# Ajouter un blog SEO "Expert IA Entreprise"

## Vue d'ensemble

Creation d'une section blog statique (sans base de donnees) avec des articles optimises pour le referencement sur les requetes liees a "expert IA entreprise". Les articles sont stockes en dur dans un fichier de donnees TypeScript, ce qui reste simple et performant pour un site vitrine.

## Architecture

Le blog comprendra :
- Une page listing `/blog` avec tous les articles
- Des pages article individuelles `/blog/:slug`
- 5 articles pre-rediges optimises SEO
- Integration dans la navigation et le footer
- Sitemap et donnees structurees mises a jour

## Articles prevus

| # | Slug | Titre optimise | Mot-cle cible |
|---|---|---|---|
| 1 | `pourquoi-faire-appel-expert-ia-entreprise` | Pourquoi faire appel a un expert IA en entreprise ? | expert IA entreprise |
| 2 | `audit-ia-entreprise-par-ou-commencer` | Audit IA en entreprise : par ou commencer ? | audit IA entreprise |
| 3 | `automatisation-ia-pme-guide-pratique` | Automatisation IA pour PME : guide pratique | automatisation IA PME |
| 4 | `ia-force-de-vente-cas-concrets` | L'IA au service de la force de vente : cas concrets | IA force de vente |
| 5 | `strategie-ia-entreprise-2026` | Strategie IA en entreprise : les priorites 2026 | strategie IA entreprise |

Chaque article aura ~600-800 mots de contenu riche avec des sous-titres H2/H3 bien structures, un CTA vers la page contact, et des meta tags dedies.

## Fichiers a creer

| Fichier | Role |
|---|---|
| `src/data/blogPosts.ts` | Donnees des articles (titre, slug, contenu, date, description SEO, tags) |
| `src/pages/Blog.tsx` | Page listing des articles |
| `src/pages/BlogPost.tsx` | Page article individuel |

## Fichiers a modifier

| Fichier | Modification |
|---|---|
| `src/App.tsx` | Ajouter les routes `/blog` et `/blog/:slug` |
| `src/components/Navigation.tsx` | Ajouter "Blog" dans le menu |
| `src/components/Footer.tsx` | Ajouter "Blog" dans les liens de navigation |
| `src/components/SEOHead.tsx` | Ajouter support pour `ogType="article"` et les meta `article:published_time` |
| `public/sitemap.xml` | Ajouter `/blog` et les 5 URLs d'articles |
| `index.html` | Ajouter un schema JSON-LD `Blog` |

## Details techniques

### Structure des donnees (`blogPosts.ts`)

Chaque article contient :
- `slug` : URL-friendly
- `title` : titre H1 optimise
- `metaTitle` : titre pour la balise `<title>` (avec "Abel SALAH - Expert IA")
- `metaDescription` : description SEO (~155 caracteres)
- `date` : date de publication
- `readTime` : temps de lecture estime
- `tags` : categories (ex: "Strategie IA", "PME")
- `excerpt` : extrait pour la page listing
- `content` : contenu complet en sections structurees (titre + paragraphes)

### Page listing (`Blog.tsx`)

- Grille d'articles avec titre, date, extrait et tags
- Animations framer-motion coherentes avec le reste du site
- Style minimaliste (fond sombre, typographie existante)
- SEOHead avec title "Blog IA Entreprise | Abel SALAH - Expert IA"

### Page article (`BlogPost.tsx`)

- Rendu du contenu avec titres H2/H3 et paragraphes
- Navigation (article precedent/suivant)
- CTA en bas d'article vers `/contact`
- SEOHead avec `ogType="article"` et meta specifiques
- Schema JSON-LD `Article` par article (dans le composant via Helmet)

### Navigation

Ajout de "Blog" comme 5e element dans `navItems` (entre "A propos" et "Contact") dans Navigation.tsx et Footer.tsx.
