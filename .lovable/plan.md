
# Ajustements de l'image hero

## 1. Supprimer l'effet grayscale

Retirer les classes `grayscale hover:grayscale-0` de l'image pour qu'elle s'affiche en couleur en permanence.

## 2. Coller l'image en bas de la section

Modifier le conteneur de l'image pour aligner le bas de l'image avec le bas de la div hero :
- Changer `items-center` en `items-end` sur le conteneur image pour que l'image se cale en bas
- Ajouter `self-end` sur le motion.div de l'image pour s'assurer qu'elle touche le bord inferieur de la grille

## Fichier modifie

| Fichier | Modification |
|---|---|
| `src/pages/Index.tsx` | Retirer `grayscale hover:grayscale-0`, changer alignement vertical en `items-end` |
