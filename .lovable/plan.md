

# Migrer le domaine vers abelsalah.fr + optimisation SEO maximale

## Constat actuel

**7 fichiers** utilisent encore `abel-salah.lovable.app` au lieu de `abelsalah.fr`. C'est critique : Google indexe le mauvais domaine, et les signaux SEO sont dilues.

---

## Plan de corrections

### 1. Remplacer le domaine partout

Remplacer `abel-salah.lovable.app` par `abelsalah.fr` dans :

| Fichier | Occurrences |
|---|---|
| `index.html` | canonical, og:url, toutes les URLs JSON-LD (~8 occurrences) |
| `public/sitemap.xml` | Toutes les URLs (10 occurrences) |
| `public/robots.txt` | URL du sitemap |
| `public/llms.txt` | URL du site et contact |
| `src/components/SEOHead.tsx` | Constante `SITE_URL` ligne 11 |
| `src/pages/BlogPost.tsx` | Constante `SITE_URL` ligne 10 |

### 2. Mettre a jour les dates du sitemap

Passer les `lastmod` des pages principales a `2026-02-26` (date du jour) pour signaler du contenu frais a Google.

### 3. Ajouter des signaux SEO manquants pour le top 1

Pour maximiser les chances de positionnement :

- **Ajouter `dateModified` dans le JSON-LD** de `index.html` (signal de fraicheur pour Google)
- **Ajouter `foundingDate: "2024"` sur l'Organisation SKILL & CO** (ancre la credibilite)
- **Ajouter `@id` sur les entites JSON-LD** pour permettre a Google de relier les schemas entre eux (entity linking)
- **Ajouter `potentialAction` SearchAction** sur le WebSite schema (permet l'affichage du sitelinks searchbox dans Google)

## Fichiers modifies

| Fichier | Modification |
|---|---|
| `index.html` | Domaine → abelsalah.fr, enrichir JSON-LD avec @id, dateModified, foundingDate |
| `public/sitemap.xml` | Domaine → abelsalah.fr, dates → 2026-02-26 |
| `public/robots.txt` | Domaine → abelsalah.fr |
| `public/llms.txt` | Domaine → abelsalah.fr |
| `src/components/SEOHead.tsx` | SITE_URL → https://abelsalah.fr |
| `src/pages/BlogPost.tsx` | SITE_URL → https://abelsalah.fr |

