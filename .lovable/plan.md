

# Optimisation SEO complete pour "Expert IA Entreprise"

## Diagnostic actuel

Le site a plusieurs problemes SEO majeurs qui freinent le positionnement :

| Element | Statut | Impact |
|---|---|---|
| Meta title/description par page | Manquant (1 seul pour tout le site) | Critique |
| Sitemap XML | Absent | Critique |
| Donnees structurees (JSON-LD) | Absent | Eleve |
| URL canonique | Absente | Eleve |
| Meta og:url | Absent | Moyen |
| Twitter @site | Pointe vers @Lovable | Faible |
| Balises semantiques (article, nav) | Partielles | Moyen |

## Corrections prevues

### 1. Meta tags dynamiques par page (react-helmet-async)

Installer `react-helmet-async` pour gerer les meta tags par page. Chaque page aura son propre title et description optimises pour les mots-cles cibles :

- **Accueil** : "Abel SALAH | Expert IA pour Entreprises en France - Audit, Strategie & Deploiement"
  - Description : "Expert en intelligence artificielle pour les entreprises. Audit IA gratuit, automatisation des processus, strategie data et deploiement de solutions IA sur mesure. 16 ans d'experience, 62 projets realises."
  
- **Realisations** : "Cas d'usage IA en entreprise | Abel SALAH - Expert IA"
  - Description : "Decouvrez comment l'IA a transforme des entreprises : +40% conversion, pipeline x5, cycle de vente -40%. Cas concrets d'implementation IA en ventes, RH et acquisition."

- **A propos** : "Abel SALAH | Consultant IA & Transformation Digitale - 16 ans d'experience"
  - Description : "Ancien directeur commercial (CA 4.8M EUR), aujourd'hui consultant expert en IA pour entreprises. Audit IA, automatisation commerciale, strategie data. PME, ETI, grands groupes."

- **Contact** : "Contactez Abel SALAH | Expert IA pour Entreprises en France"
  - Description : "Prenez rendez-vous avec un expert IA. Audit gratuit, reponse sous 24h. Accompagnement personnalise pour integrer l'intelligence artificielle dans votre entreprise."

### 2. Donnees structurees JSON-LD

Ajouter un schema `Person` + `ProfessionalService` dans `index.html` pour que Google affiche un Knowledge Panel riche :

```json
{
  "@type": "ProfessionalService",
  "name": "Abel SALAH - Expert IA en Entreprise",
  "description": "Consultant expert en intelligence artificielle...",
  "areaServed": "France",
  "knowsAbout": ["Intelligence Artificielle", "IA en entreprise", ...]
}
```

### 3. Sitemap XML

Creer `public/sitemap.xml` listant les 4 pages principales avec les dates de derniere modification et priorites.

### 4. Mettre a jour robots.txt

Ajouter la reference au sitemap dans `robots.txt`.

### 5. Corriger index.html

- Ajouter `og:url` avec l'URL canonique du site
- Ajouter `<link rel="canonical">`
- Corriger `twitter:site` de `@Lovable` vers le bon handle (ou le retirer)
- Ajouter `meta keywords` avec les mots-cles cibles

### 6. Enrichir le contenu semantique des pages

- Ajouter des attributs `aria-label` sur les `<section>` pour mieux decrire le contenu
- S'assurer que les alt text des images contiennent les mots-cles cibles

## Fichiers concernes

| Fichier | Action |
|---|---|
| `package.json` | Ajouter `react-helmet-async` |
| `src/main.tsx` | Wrapper avec `HelmetProvider` |
| `src/components/SEOHead.tsx` | Nouveau composant reutilisable pour les meta tags |
| `src/pages/Index.tsx` | Ajouter `<SEOHead>` avec title/description optimises |
| `src/pages/Work.tsx` | Ajouter `<SEOHead>` |
| `src/pages/About.tsx` | Ajouter `<SEOHead>` |
| `src/pages/Contact.tsx` | Ajouter `<SEOHead>` |
| `index.html` | JSON-LD, canonical, og:url, corriger twitter:site |
| `public/sitemap.xml` | Nouveau fichier |
| `public/robots.txt` | Ajouter reference sitemap |

## Mots-cles cibles

Les meta seront optimises autour de ces requetes :
- "expert IA entreprise"
- "consultant intelligence artificielle France"
- "audit IA entreprise"
- "automatisation IA PME"
- "strategie IA pour entreprises"
- "deploiement IA en entreprise"

## Remarque importante

Le site est une SPA (Single Page Application) rendue cote client. Google sait indexer le JavaScript, mais pour un SEO vraiment optimal a long terme, il faudrait envisager du Server-Side Rendering (SSR) ou du pre-rendering. Cela dit, les optimisations proposees ici auront deja un impact significatif et sont realisables immediatement.

