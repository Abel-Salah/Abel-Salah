

# Optimisations SEO finales

## Corrections a appliquer

### 1. Ajouter `hreflang="fr"` dans SEOHead

Ajouter une balise `<link rel="alternate" hreflang="fr" href={fullCanonical} />` dans `src/components/SEOHead.tsx`. Signal explicite pour Google que le contenu est en francais.

### 2. Retirer `/styleguide` du routeur ou confirmer son exclusion

La page `/styleguide` existe dans le routeur mais n'est pas dans le sitemap. C'est correct si c'est une page interne/dev. Aucune action necessaire si c'est intentionnel.

### 3. Ajouter `lang="fr"` dans le `<html>` de index.html

Le tag `<html lang="fr">` est deja present -- confirme.

## Resume

Le SEO est deja tres bien optimise. La seule correction concrete est l'ajout du `hreflang` dans SEOHead. Le reste est en place.

### Fichier modifie

| Fichier | Modification |
|---|---|
| `src/components/SEOHead.tsx` | Ajouter `<link rel="alternate" hreflang="fr">` |

