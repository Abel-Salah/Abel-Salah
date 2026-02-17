

# Ajout d'un popup "Prendre RDV" avec Calendly

## Ce qui sera fait

Un bouton flottant "Prendre RDV" visible sur toutes les pages, qui ouvre un popup (dialog) contenant le widget Calendly integre. Le bouton CTA de la page d'accueil ("Reservez un appel") ouvrira aussi ce popup au lieu de naviguer vers /contact.

## Modifications

### 1. Nouveau composant : `src/components/CalendlyPopup.tsx`
- Un composant global avec un bouton flottant fixe en bas a droite (style moderne, couleur primary)
- Au clic, ouvre un Dialog (Radix) contenant une iframe Calendly pointant vers `https://calendly.com/abel_salah/rdv-abel`
- Le bouton affiche une icone calendrier + "Prendre RDV"
- L'iframe occupe la quasi-totalite du dialog (largeur ~600px, hauteur ~700px)
- Animation d'entree avec framer-motion

### 2. Modification : `src/App.tsx`
- Importer et ajouter `<CalendlyPopup />` dans le layout global (visible sur toutes les pages)

### 3. Modification : `src/pages/Index.tsx`
- Le bouton CTA "Reservez un appel" (section finale) : au lieu d'un `<Link to="/contact">`, utiliser un bouton qui ouvre le meme popup Calendly
- On exposera une fonction d'ouverture via un state global simple (ou un event custom)

### 4. Approche technique pour le partage d'etat
- Le composant `CalendlyPopup` gerera son propre state `isOpen`
- On exposera une fonction globale `window.__openCalendly` pour permettre au CTA de l'ouvrir depuis n'importe ou (simple et efficace sans contexte React supplementaire)
- Alternative plus propre : un petit hook/context si prefere, mais pour un seul bouton c'est superflu

## Rendu attendu
- Bouton flottant discret en bas a droite sur toutes les pages
- Popup elegant avec l'iframe Calendly integree
- Le CTA "Reservez un appel" sur la homepage ouvre directement le popup
- Coherent avec le design actuel (couleurs, typo, animations)

