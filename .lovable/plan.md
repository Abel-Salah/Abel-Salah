

# Ajouter la photo d'Abel SALAH dans le hero de la page d'accueil (desktop uniquement)

## Objectif

Integrer la photo portrait d'Abel SALAH a droite du texte hero sur la page d'accueil, visible uniquement sur grand ecran (desktop). Sur mobile, la photo sera masquee pour garder un hero epure.

## Modifications

### 1. Copier l'image dans le projet

Copier `Abel_salah.png` dans `src/assets/abel-salah-hero.png` pour l'importer en tant que module ES6.

### 2. Modifier `src/pages/Index.tsx`

- Importer l'image
- Restructurer la section hero en grille 2 colonnes sur desktop :
  - Colonne gauche (lg:col-span-7) : le contenu actuel (titre, sous-titre, CTA)
  - Colonne droite (lg:col-span-5) : la photo avec une animation d'apparition
- Utiliser `hidden lg:block` sur le conteneur de l'image pour la masquer sur mobile
- Appliquer un leger effet grayscale au hover (coherent avec la page About)

### Details techniques

```text
Hero desktop :
+---------------------------+------------------+
|  Titre H1                 |                  |
|  Sous-titre               |   Photo Abel     |
|  CTA                      |   (hidden mobile)|
+---------------------------+------------------+
```

- Breakpoint : `lg` (1024px) pour afficher l'image
- L'image sera positionnee avec `object-cover` et une hauteur maximale pour rester proportionnelle
- Animation framer-motion : fade-in + leger scale depuis la droite

