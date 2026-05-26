# Page /ecosystem — Preuves d'exécution

## Angle narratif

**"Je ne théorise pas l'IA. Je la construis."**

Tes ventures ne sont pas un portfolio multi-services — ce sont les **terrains de preuve** qui légitiment ton expertise IA. Chaque produit illustre une capacité que tu apportes ensuite aux clients de conseil.

Cadrage en haut de page (intro courte) : "Avant de déployer l'IA chez vous, je l'ai déployée chez moi. Voici les 4 produits que je construis et opère."

## Contenu — 4 ventures analysées

### 1. SCALLUP (`scallup.fr`)
- **Tagline** : Agent IA commercial en pilote automatique
- **Pitch** : Prospection, relances, appels, marketing, SEO, devis et pilotage — exécutés par un agent IA. 500+ PME utilisatrices, noté 4.9/5, finançable OPCO.
- **Preuve apportée** : capacité à concevoir et opérer un produit SaaS IA B2B à l'échelle.

### 2. SKILL LMS (`skill-lms.fr`)
- **Tagline** : LMS Qualiopi nouvelle génération
- **Pitch** : Plateforme tout-en-un pour organismes de formation — création de parcours, suivi apprenants, automatisation Qualiopi (conventions, convocations, preuves d'audit), pilotage IA.
- **Preuve apportée** : maîtrise des plateformes complexes métier + conformité réglementaire (Qualiopi).

### 3. FORMATEURS.PRO (`formateurs.pro`)
- **Tagline** : Le plus grand annuaire de formateurs certifiés de France
- **Pitch** : 50 000+ formateurs référencés, 9 000+ Qualiopi, construit à partir de sources officielles (Pappers, INFOGREFFE, data.gouv.fr, France Compétences). Réseau désormais connecté à SKILL LMS.
- **Preuve apportée** : data engineering, SEO programmatique, écosystèmes connectés.

### 4. IMMO MONTPELLIER (`immomontpellier.com`)
- **Tagline** : Premier chasseur immobilier IA de Montpellier
- **Pitch** : IA qui scanne 8 sources (SeLoger, Leboncoin, Bien'ici, PAP…) en continu, alertes <1h, chasseur humain qui négocie. 250+ acquéreurs accompagnés.
- **Preuve apportée** : application verticale de l'IA (scraping + scoring + matching) sur un secteur traditionnel.

## Implémentation technique

### Fichiers à créer
- `src/pages/Ecosystem.tsx` — page principale
- `src/data/ventures.ts` — données structurées (titre, url, tagline, pitch, "preuve", screenshot)
- 4 screenshots dans `src/assets/ventures/` :
  - `scallup.jpg`, `formateurs-pro.jpg`, `immo-montpellier.jpg` (capturés avec `code--fetch_website`)
  - `skill-lms.jpg` (le site charge avec un loader long — recapture avec `waitFor` plus long, ou fallback : carte typographique sans visuel)

### Fichiers à modifier
| Fichier | Modification |
|---|---|
| `src/App.tsx` | Ajouter route `/ecosystem` |
| `src/components/Footer.tsx` | Ajouter "Écosystème" dans la liste Navigation du footer |
| `src/pages/About.tsx` | Bloc teaser "Ce que je construis" juste après "Retrouvez-moi" — liste les 4 noms + CTA "Voir l'écosystème →" |
| `supabase/functions/generate-sitemap/index.ts` | Ajouter `/ecosystem` dans les URLs statiques |
| `index.html` | Enrichir JSON-LD : ajouter chaque venture comme `Organization` ou `WebSite` rattachée à Abel via `founder` |

### Design de la page
- Cohérent avec `/work` (typographie display, grille 12 colonnes, fond bg-background, tokens sémantiques)
- Header : titre `Écosystème` + intro narrative cadrante (~2 phrases sur "preuves d'exécution")
- Liste des 4 ventures en pleine largeur, alternance image / texte (zigzag), avec :
  - Numéro `01-04`
  - Nom + URL externe (icône `ArrowUpRight`)
  - Tagline en grand
  - Pitch (3-4 lignes)
  - Label "Ce que ça prouve" en accent primaire
  - Screenshot du site (lazy loading)
- CTA bas de page : "Un projet IA en tête ? Parlons-en" → `/contact`

### SEO
- `<SEOHead>` avec : title `Écosystème — Les produits IA d'Abel SALAH`, description orientée "preuves d'exécution + 4 produits SaaS", canonical `/ecosystem`, breadcrumbs.
- Ajout dans le sitemap dynamique.

## Hors scope
- Pas de lien dans la navigation principale (choix utilisateur : footer + teaser About uniquement)
- Pas de page détail par venture (lien direct vers les sites externes)
- Pas de logos custom (screenshots des sites suffisent)
- Pas de modification du JSON-LD si tu préfères garder simple (à confirmer si besoin)

## Résultat attendu
Un visiteur qui doute de ta crédibilité technique IA arrive sur `/ecosystem` depuis le footer ou About et voit **4 produits live, en production, qui tournent**. Tu passes de "consultant IA" à "opérateur IA qui consulte aussi".
