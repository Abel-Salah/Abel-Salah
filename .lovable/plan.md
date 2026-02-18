

# Uniformiser les arrondis sur tous les boutons

## Probleme

Deux boutons du site n'utilisent pas le composant `<Button>` de shadcn/ui et sont styles manuellement sans classe d'arrondi (`rounded-md` ou `rounded-lg`). Ils ont donc des coins carres, ce qui cree une inconsistance visuelle.

### Boutons concernes

1. **"Reservez un appel"** dans `src/pages/Index.tsx` (ligne 221) -- `<button>` avec classes inline, pas de `rounded-*`
2. **"Prendre RDV"** (bouton flottant) dans `src/components/CalendlyPopup.tsx` (ligne 28) -- `<motion.button>` avec classes inline, pas de `rounded-*`

## Solution

Ajouter `rounded-lg` aux deux boutons pour qu'ils aient le meme arrondi que le reste de l'interface (cohérent avec `--radius: 8px`).

### Modifications

- **`src/pages/Index.tsx`** ligne 223 : ajouter `rounded-lg` dans les classes du bouton "Reservez un appel"
- **`src/components/CalendlyPopup.tsx`** ligne 33 : ajouter `rounded-lg` dans les classes du bouton "Prendre RDV"

Deux lignes modifiees, zero nouveau fichier.

