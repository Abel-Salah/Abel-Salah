

# Gradient anime qui suit le scroll utilisateur

## Concept

Un orbe de lumiere bleue subtile (gradient radial) qui se deplace en arriere-plan au fur et a mesure que l'utilisateur scrolle la page. L'effet est purement decoratif, tres discret (opacite ~5-8%), et donne une sensation de profondeur vivante au site.

## Comment ca marche

- Un composant `ScrollGradient` est place dans `App.tsx`, en arriere-plan fixe (`fixed`, `pointer-events-none`, `z-0`)
- Il ecoute le scroll de la page et deplace un orbe radial flou (via `transform: translate`) en fonction de la position du scroll
- L'orbe se deplace verticalement avec le scroll et oscille legerement horizontalement pour un effet organique
- Utilisation de framer-motion pour des transitions fluides (spring)

## Fichiers concernes

### 1. Nouveau fichier : `src/components/ScrollGradient.tsx`
- Composant qui :
  - Ecoute `window.scrollY` via un event listener
  - Calcule la position Y de l'orbe proportionnellement au scroll (de haut en bas de la page)
  - Ajoute un leger decalage X sinusoidal pour un mouvement naturel
  - Affiche un `div` fixe avec un `radial-gradient` bleu a ~5% opacite
  - Taille de l'orbe : environ 600-800px de diametre, tres flou
  - `pointer-events: none` pour ne pas bloquer les interactions

### 2. Modification : `src/App.tsx`
- Importer et ajouter `<ScrollGradient />` juste apres `<ScrollToTop />`

### 3. Modification : `src/pages/Index.tsx`
- Retirer le gradient radial statique du hero (`bg-[radial-gradient(...)]`) puisque le nouveau gradient anime le remplace de facon plus elegante

## Details techniques

- Performance : utilisation de `transform` uniquement (GPU-accelere, pas de repaint)
- Le composant utilise `useEffect` + `requestAnimationFrame` pour ecouter le scroll sans lag
- L'orbe est un simple `div` avec `background: radial-gradient(circle, hsl(225 100% 50% / 0.06), transparent 70%)`
- Position fixe, plein ecran, `z-index: 0`, les contenus restent au-dessus avec `z-index` relatif

