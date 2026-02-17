

# Coins arrondis sur tous les boutons

## Modification

Le site utilise `--radius: 0px` dans les variables CSS, ce qui donne des coins droits partout. Pour arrondir legerement uniquement les boutons sans affecter les autres elements :

### Fichier : `src/index.css`
- Changer `--radius: 0px` en `--radius: 8px` pour appliquer un arrondi leger global (boutons, cards, dialogs, inputs)

Cela affectera tous les composants Shadcn/ui qui utilisent `rounded-md` ou `rounded-lg` (boutons, dialog, popover, etc.), ce qui donnera un rendu plus doux et moderne sur l'ensemble du site.

