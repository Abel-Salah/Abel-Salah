
# Generation automatique d'articles de blog avec Lovable AI

## Vue d'ensemble

Mise en place d'un systeme de generation automatique d'articles de blog SEO via une edge function Supabase + Lovable AI Gateway + base de donnees pour stocker les articles generes. Un cron job declenchera la generation selon le calendrier prevu.

## Architecture

```text
+------------------+       +---------------------+       +-------------------+
|  Cron Job        | ----> | Edge Function       | ----> | Lovable AI        |
|  (pg_cron)       |       | generate-blog-post  |       | Gateway (Gemini)  |
+------------------+       +---------------------+       +-------------------+
                                    |
                                    v
                            +-------------------+
                            | Table Supabase    |
                            | blog_posts        |
                            +-------------------+
                                    ^
                                    |
                            +-------------------+
                            | Frontend React    |
                            | Blog.tsx          |
                            +-------------------+
```

## Calendrier de publication

| Frequence | Type d'article | Exemples de sujets |
|---|---|---|
| 2x par jour (lun-ven) | Concret & actionnable | "5 prompts IA pour qualifier vos leads en 10 min", "Automatiser vos relances clients avec l'IA : tuto pas a pas" |
| 2x par semaine (mar, jeu) | Promotion Abel SALAH | "Pourquoi faire appel a Abel SALAH pour votre audit IA", "3 raisons de travailler avec Abel SALAH pour votre strategie IA" |

## Etapes d'implementation

### 1. Activer Lovable Cloud

Prerequis pour la base de donnees et les edge functions.

### 2. Creer la table `generated_blog_posts`

Colonnes :
- `id` (uuid, PK)
- `slug` (text, unique)
- `title` (text)
- `meta_title` (text)
- `meta_description` (text)
- `date` (date)
- `read_time` (text)
- `tags` (text[])
- `excerpt` (text)
- `content` (jsonb) -- tableau de sections {title, content[]}
- `article_type` (text) -- "actionnable" ou "promotion"
- `published` (boolean, default true)
- `created_at` (timestamptz)

RLS : lecture publique (SELECT pour tous), ecriture reservee au service role.

### 3. Creer l'edge function `generate-blog-post`

Cette function :
1. Recoit un parametre `type` ("actionnable" ou "promotion")
2. Recupere les articles existants (titres) pour eviter les doublons
3. Appelle Lovable AI Gateway (google/gemini-3-flash-preview) avec un prompt SEO detaille
4. Utilise le tool calling pour obtenir un JSON structure (slug, title, metaTitle, metaDescription, tags, excerpt, content sections)
5. Insere l'article dans la table `generated_blog_posts`

Prompts differencies selon le type :
- **Actionnable** : "Redige un article de blog SEO hyper concret et actionnable sur l'IA en entreprise. Le lecteur doit pouvoir appliquer les conseils immediatement. Inclus des etapes numerotees, des exemples reels, des chiffres. Mots-cles cibles : expert IA entreprise, automatisation IA, audit IA..."
- **Promotion** : "Redige un article de blog SEO qui met en avant l'expertise d'Abel SALAH, consultant expert IA. Explique pourquoi les entreprises devraient faire appel a lui pour [audit/strategie/deploiement IA]. Inclus ses resultats concrets : 62 projets, 16 ans experience, CA 4.8M..."

### 4. Configurer les cron jobs (pg_cron + pg_net)

- **Articles actionnables** : 2x par jour a 8h et 14h (lun-ven)
- **Articles promotion** : 2x par semaine le mardi et jeudi a 10h

### 5. Modifier le frontend

- **`src/data/blogPosts.ts`** : Garder les 5 articles statiques existants
- **`src/pages/Blog.tsx`** : Charger les articles depuis Supabase + les articles statiques, fusionner et trier par date
- **`src/pages/BlogPost.tsx`** : Chercher d'abord dans les articles statiques, sinon requeter Supabase par slug
- Ajouter un hook `useGeneratedBlogPosts` pour fetcher les articles generes

### 6. Mettre a jour le sitemap

Creer une edge function `sitemap` qui genere dynamiquement le sitemap XML avec tous les articles (statiques + generes).

## Fichiers a creer

| Fichier | Role |
|---|---|
| `supabase/functions/generate-blog-post/index.ts` | Edge function de generation via Lovable AI |
| `supabase/functions/sitemap/index.ts` | Sitemap dynamique |
| `src/hooks/useGeneratedBlogPosts.ts` | Hook React pour charger les articles generes |

## Fichiers a modifier

| Fichier | Modification |
|---|---|
| `src/pages/Blog.tsx` | Fusionner articles statiques + generes |
| `src/pages/BlogPost.tsx` | Fallback vers Supabase si slug non trouve en statique |
| `supabase/config.toml` | Declarer les edge functions |

## Migration SQL (via insert tool, pas migration)

- Creation de la table `generated_blog_posts`
- Activation des extensions `pg_cron` et `pg_net`
- Creation des 3 cron jobs (2x/jour actionnable + 2x/semaine promotion)

## Details techniques

### Prompt de generation (actionnable)

Le prompt systeme inclura :
- Tonalite : professionnel, concret, pas de jargon inutile
- Structure obligatoire : 4-5 sections H2, paragraphes courts, listes numerotees
- Mots-cles SEO a placer naturellement
- Longueur cible : 600-800 mots
- CTA implicite vers Abel SALAH en fin d'article
- Date actuelle pour contextualiser

### Prompt de generation (promotion)

Le prompt systeme inclura :
- Mise en avant d'Abel SALAH comme expert IA
- Chiffres cles : 62 projets, 16 ans experience, +40% conversion, pipeline x5
- Approche : audit gratuit, accompagnement sur mesure, resultats mesurables
- Angle different a chaque article (audit, strategie, deploiement, formation, ROI)
- CTA direct vers la page contact

### Gestion des erreurs

- Rate limiting (429) : le cron reessaiera au prochain cycle
- Credits epuises (402) : log d'erreur, notification possible
- Doublons : verification du slug avant insertion
