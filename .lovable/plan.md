

# Agrandir l'image hero + Optimisation SEO pour les IA

## 1. Agrandir l'image du hero

Actuellement l'image fait `w-[28%] max-w-[400px]`. On passe a `w-[34%] max-w-[520px]` pour qu'Abel soit plus visible et occupe mieux l'espace a droite.

Fichier : `src/pages/Index.tsx`

## 2. Optimisation pour les IA (ChatGPT, Perplexity, Gemini)

Actuellement le site a deja une bonne base (JSON-LD, sitemap, robots.txt, blog avec contenu riche). Mais il manque plusieurs elements cles pour que les IA recommandent Abel SALAH :

### 2a. Ajouter les bots IA dans robots.txt

Les crawlers des IA (GPTBot pour ChatGPT, PerplexityBot, Google-Extended pour Gemini) doivent etre explicitement autorises :

```
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /
```

### 2b. Creer un fichier llms.txt

C'est un standard emergent que les LLM utilisent pour comprendre rapidement un site. Un fichier `public/llms.txt` decrivant qui est Abel SALAH, ses services et son expertise permettra aux IA de mieux l'identifier.

### 2c. Enrichir le JSON-LD dans index.html

Le schema actuel est correct mais incomplet. Ameliorations :
- Ajouter `sameAs` avec les profils LinkedIn, etc. (si disponibles)
- Ajouter `image` sur le Person schema pour que les IA associent un visage
- Ajouter un schema `FAQPage` avec les questions courantes (augmente la visibilite dans les reponses IA)
- Ajouter `hasCredential` pour les certifications
- Ajouter `workExperience` pour ancrer la credibilite

### 2d. Ajouter des meta semantiques manquantes

- `article:author` sur les pages blog
- `og:locale` = `fr_FR` sur toutes les pages
- Meta `author` sur les pages

### 2e. Corriger l'URL du site

L'URL canonique dans `SEOHead.tsx` pointe vers `abel-sala.lovable.app` (sans le "h"). A verifier si c'est correct. Si le domaine publie est bien `abel-salah.lovable.app`, il faut corriger cette incoherence.

## Fichiers modifies

| Fichier | Modification |
|---|---|
| `src/pages/Index.tsx` | Agrandir l'image : `w-[34%] max-w-[520px]` |
| `public/robots.txt` | Ajouter GPTBot, PerplexityBot, Google-Extended, ChatGPT-User, anthropic-ai |
| `public/llms.txt` | Nouveau fichier decrivant Abel SALAH et ses services pour les LLM |
| `index.html` | Enrichir JSON-LD : sameAs, image, FAQPage schema, og:locale |
| `src/components/SEOHead.tsx` | Ajouter `og:locale`, meta author, verifier URL canonique |

## Impact attendu

Ces optimisations permettront aux IA de :
- Identifier clairement Abel SALAH comme expert IA pour entreprises en France
- Retrouver ses services, son parcours et ses cas d'usage concrets
- Le recommander quand un utilisateur cherche un consultant IA ou un audit IA en France

