

# Ajout de gradients subtils sur le site

## Modifications prevues

### 1. Section Hero (`src/pages/Index.tsx`)
- Ajouter un gradient radial sombre en arriere-plan : du bleu tres fonce (primary a ~5% opacite) vers le noir, centre en haut a gauche
- Utilise `bg-[radial-gradient(...)]` via une classe inline ou un style CSS

### 2. Section CTA (`src/pages/Index.tsx`)
- Remplacer le fond uni par un degrade vertical subtil allant du fond standard vers une teinte legerement bleutee
- Ajoute de la profondeur et attire l'oeil vers le bouton d'action

### 3. Cartes projets (`src/components/ProjectCard.tsx`)
- Au survol (`group-hover`), ajouter un fond en degrade horizontal subtil (transparent vers bleu a ~5% opacite)
- Transition douce pour un effet premium sans etre intrusif

### 4. Bouton Calendly flottant (`src/components/CalendlyPopup.tsx`)
- Remplacer le `bg-primary` par un degrade lineaire bleu vers bleu clair (`bg-gradient-to-r from-primary to-blue-400`)
- Meme traitement pour le bouton CTA "Reservez un appel" dans Index.tsx

## Details techniques

### Fichiers modifies
- `src/pages/Index.tsx` : gradient radial sur la section hero, gradient sur la section CTA, gradient sur le bouton "Reservez un appel"
- `src/components/ProjectCard.tsx` : gradient au hover sur l'article
- `src/components/CalendlyPopup.tsx` : gradient sur le bouton flottant

### Approche
- Utilisation de classes Tailwind natives (`bg-gradient-to-r`, `from-*`, `to-*`) et de `bg-[radial-gradient(...)]` pour le hero
- Pas de CSS supplementaire, tout reste dans les classes Tailwind
- Les gradients restent tres subtils (opacites basses) pour preserver l'esthetique sombre et minimaliste du site

