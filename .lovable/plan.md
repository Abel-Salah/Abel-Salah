

# Ajustements du hero : couleur, image et mise en page

## 1. Changer la couleur primaire en #0F1CFE

La couleur actuelle est `225 100% 50%` (HSL). La nouvelle couleur `#0F1CFE` correspond a `237 99% 53%` en HSL. Modification dans `src/index.css` de la variable `--primary` et `--accent` et `--ring` ainsi que les variables sidebar associees.

## 2. Afficher l'image en entier (sans decoupe)

Actuellement l'image utilise `object-cover` avec `max-h-[600px]`, ce qui la decoupe. Remplacement par `object-contain` et suppression de la hauteur maximale pour que l'image s'affiche integralement.

## 3. Pousser l'image plus a droite, laisser plus de place au texte

Changer la repartition de la grille : passer le texte de `lg:col-span-7` a `lg:col-span-8` et l'image de `lg:col-span-5` a `lg:col-span-4`. Supprimer aussi le padding et le cadre decoratif (border offset) qui prennent de la place inutilement.

## Fichiers modifies

| Fichier | Modification |
|---|---|
| `src/index.css` | Variable `--primary`, `--accent`, `--ring`, `--sidebar-primary`, `--sidebar-ring` : `237 99% 53%` |
| `src/pages/Index.tsx` | Grille 8/4, `object-contain`, suppression `max-h` et cadre decoratif |

