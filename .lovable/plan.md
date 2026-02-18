

# Retirer les gradients des boutons + Ameliorations du site

## 1. Retirer le gradient des boutons

Remplacer `bg-gradient-to-r from-primary to-blue-400` par un simple `bg-primary` sur les deux boutons :

- **`src/components/CalendlyPopup.tsx`** (ligne 33) : retirer le gradient, utiliser `bg-primary`
- **`src/pages/Index.tsx`** (ligne 223) : retirer le gradient du bouton "Reservez un appel", utiliser `bg-primary`

## 2. Ameliorations detectees apres revue du site

### A. Cartes projets cassees sur mobile (PRIORITAIRE)

Sur mobile (390px), les `ProjectCard` utilisent une grille `grid-cols-12` + `grid-cols-3` sans adaptation responsive. Le resultat : le texte se chevauche, les colonnes sont illisibles (visible sur la capture mobile). 

**Correction** : rendre les cartes responsives avec des colonnes empilees sur mobile.

- `src/components/ProjectCard.tsx` : changer `grid-cols-12` en `grid-cols-1 md:grid-cols-12` et `grid-cols-3` en `grid-cols-1 md:grid-cols-3`, ajuster le `col-span`

### B. Bouton "Prendre RDV" qui chevauche le contenu sur mobile

Le bouton flottant en bas a droite (`fixed bottom-6 right-6`) recouvre du texte sur mobile, notamment sur les cartes projets et le footer.

**Correction** : ajouter un `mb-20` ou `pb-20` sur le contenu en bas de page, ou reduire la taille du bouton sur mobile.

- `src/components/CalendlyPopup.tsx` : ajouter des classes responsives pour reduire la taille sur mobile (`text-xs px-3 py-2 md:text-sm md:px-5 md:py-3`)

### C. Photo "A propos" : bordure bleue decorative derriere la photo

La bordure `border-2 border-primary translate-x-4 translate-y-4` est coupee sur mobile car le parent a `overflow-hidden` implicite. 

**Correction** : ajouter un `overflow-visible` explicite et un padding sur le conteneur de la photo pour que la bordure decorative soit visible.

### D. Espacement du footer sur mobile

Le footer avec le grand "ABEL SALAH" est bien, mais le bouton rond "Parlons-en" pourrait etre mieux centre sur mobile.

**Correction mineure** : centrer le bouton rond du footer sur mobile avec `flex justify-center md:justify-end`.

## Details techniques

### Fichiers modifies

| Fichier | Modification |
|---|---|
| `src/components/CalendlyPopup.tsx` | Retirer gradient, reduire taille mobile |
| `src/pages/Index.tsx` | Retirer gradient du bouton CTA |
| `src/components/ProjectCard.tsx` | Grille responsive (mobile-first) |

### Priorite

1. Retirer les gradients (demande utilisateur)
2. Corriger les cartes projets sur mobile (bug visuel majeur)
3. Ajuster le bouton flottant sur mobile
4. Corrections mineures (photo, footer)

