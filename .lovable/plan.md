

# Audit SEO complet — problemes identifies et corrections

Apres analyse de tous les fichiers, il reste **plusieurs problemes critiques** qui empechent un bon referencement :

---

## Probleme critique : mauvais domaine partout

Le site publie est `abel-salah.lovable.app` mais **5 fichiers** utilisent encore `abel-sala.lovable.app` (sans le "h") :

| Fichier | Probleme |
|---|---|
| `index.html` | canonical, og:url, toutes les URLs JSON-LD |
| `public/sitemap.xml` | Toutes les URLs du sitemap |
| `src/pages/BlogPost.tsx` | `SITE_URL` en dur ligne 10 |
| `public/robots.txt` | URL du sitemap |

Seul `SEOHead.tsx` a ete corrige. **Google indexe les mauvaises URLs.**

## Probleme : liens sociaux du footer generiques

Le footer pointe vers `https://linkedin.com` au lieu de `https://www.linkedin.com/in/abel-salah/`. Les autres liens (Twitter, Medium) pointent vers les pages d'accueil des plateformes.

## Probleme : mots-cles insuffisants

Les meta keywords actuels couvrent "expert IA entreprise" et "consultant IA France" mais manquent les requetes longue traine que tes clients cherchent : "consultant IA", "aide IA entreprises", "accompagnement IA PME", "integration IA", "conseil IA France", "formation IA entreprise", etc.

## Probleme : pas de schema BreadcrumbList

Google utilise les breadcrumbs pour afficher la navigation dans les resultats de recherche. Aucun schema BreadcrumbList n'est present.

---

## Plan de corrections

### 1. Corriger le domaine dans tous les fichiers
- `index.html` : remplacer toutes les occurrences de `abel-sala` par `abel-salah`
- `public/sitemap.xml` : idem sur toutes les URLs
- `src/pages/BlogPost.tsx` : corriger `SITE_URL` ligne 10
- `public/robots.txt` : corriger l'URL du sitemap

### 2. Corriger les liens sociaux du footer
- LinkedIn → `https://www.linkedin.com/in/abel-salah/`
- Retirer Twitter et Medium s'ils n'existent pas (liens morts = mauvais signal SEO)

### 3. Enrichir les meta keywords
Ajouter dans `index.html` : "consultant IA", "aide IA entreprises", "accompagnement IA PME", "integration IA entreprise", "conseil intelligence artificielle", "formation IA entreprise", "transformation digitale IA", "IA pour PME ETI"

### 4. Ajouter BreadcrumbList dans SEOHead.tsx
Schema JSON-LD dynamique sur chaque page pour afficher le fil d'ariane dans Google.

## Fichiers modifies

| Fichier | Modification |
|---|---|
| `index.html` | Corriger domaine + enrichir keywords |
| `public/sitemap.xml` | Corriger toutes les URLs |
| `public/robots.txt` | Corriger URL sitemap |
| `src/pages/BlogPost.tsx` | Corriger SITE_URL |
| `src/components/Footer.tsx` | Corriger lien LinkedIn, retirer liens morts |
| `src/components/SEOHead.tsx` | Ajouter BreadcrumbList schema |

