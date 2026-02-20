
# 3 ajustements : image hero, email footer, page contact

## 1. Coller l'image au bas de la section hero

Actuellement l'image flotte au milieu. Pour la coller au bord inferieur de la section :
- Ajouter `relative` sur la section hero et `overflow-hidden`
- Positionner le conteneur image avec `absolute bottom-0 right-0` au lieu du flux grille, pour qu'il touche exactement le bas de la section
- Garder `hidden lg:block` pour le responsive

## 2. Retirer l'email du footer

Dans `src/components/Footer.tsx`, supprimer le lien `mailto:contact@abelsalah.com` de la section "Me contacter". Garder uniquement "France" ou remplacer la section par un lien vers la page contact / le Calendly.

## 3. Remplacer le formulaire contact par Calendly

Le formulaire actuel dans `src/components/ContactForm.tsx` ne fait rien (simulation). Remplacement par :
- Une iframe Calendly integree directement dans la page contact (comme le popup existant mais en version inline)
- Suppression du composant `ContactForm.tsx` devenu inutile
- Sur la page `Contact.tsx`, afficher l'iframe Calendly a la place du formulaire avec un texte d'accroche

## Fichiers modifies

| Fichier | Modification |
|---|---|
| `src/pages/Index.tsx` | Repositionner l'image en `absolute bottom-0 right-0` pour la coller au bas |
| `src/components/Footer.tsx` | Retirer l'adresse email, remplacer par un bouton Calendly |
| `src/pages/Contact.tsx` | Remplacer le formulaire par une iframe Calendly inline |
| `src/components/ContactForm.tsx` | Suppression du fichier (plus utilise) |
