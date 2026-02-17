
# Personnalisation du site pour Abel SALAH — Expert IA en entreprise

## Vue d'ensemble
Transformer le portfolio actuel (copywriter australien) en site vitrine pour Abel SALAH, expert en IA pour les entreprises en France. Le design, les animations et la structure restent identiques. Seul le contenu textuel est mis a jour et traduit en francais.

## Fichiers a modifier

### 1. `index.html` — Meta-donnees
- Titre : "Abel SALAH — Expert IA en Entreprise"
- Description et balises Open Graph en francais

### 2. `src/components/Navigation.tsx` — Barre de navigation
- "LIAM FLETCHER" devient "ABEL SALAH"
- Labels traduits : Accueil, Realisations, A propos, Contact
- Suppression du lien Styleguide (non pertinent)

### 3. `src/pages/Index.tsx` — Page d'accueil
- Titre hero : "L'IA ne remplace pas votre entreprise. **Elle l'accelere.**"
- Sous-titre : "Je suis Abel SALAH — expert en intelligence artificielle appliquee aux entreprises. J'aide les dirigeants et les equipes a exploiter pleinement le potentiel de l'IA."
- Section "Generic vs. Strategic" devient "Avant l'IA vs. Avec l'IA" avec des exemples concrets :
  - "On fait tout manuellement" -> "Automatisez 80% des taches repetitives avec l'IA"
  - "L'IA, c'est trop complexe pour nous" -> "Un plan d'action clair, des resultats en 3 mois"
  - "On ne sait pas par ou commencer" -> "Audit IA gratuit. Priorisez ce qui compte vraiment."
- Section projets avec des cas d'usage IA en entreprise (ex. automatisation RH, service client IA, optimisation supply chain)
- CTA : "Pret a passer a l'action ?" / "Reservez un appel"

### 4. `src/pages/Work.tsx` — Page Realisations
- Titre : "Realisations"
- Projets adaptes au domaine IA :
  - 01 — Automatisation du service client (chatbot IA, -60% tickets support)
  - 02 — Optimisation des processus RH (tri CV automatise, 5x plus rapide)
  - 03 — Prevision des ventes par IA (modele predictif, +35% precision)
- Labels ProjectCard traduits : Contexte, Action, Resultat
- CTA bas de page : "Envie d'un cas d'usage similaire ? Creons le votre."

### 5. `src/pages/About.tsx` — Page A propos
- Titre : "A propos"
- Bio adaptee : expert IA, base en France, 8+ ans d'experience dans la transformation digitale et l'IA
- Phrase d'accroche : "Je ne vends pas de la technologie. **Je cree de la valeur business avec l'IA.**"
- Services : Audit IA, Strategie d'implementation, Formation des equipes, Automatisation des processus, Conseil en data & IA, Accompagnement au changement
- "Who I work with" -> "Avec qui je travaille" : Dirigeants & CEO, Directeurs de la transformation, Equipes produit, DSI & CTO, PME & grands groupes
- Citation : "L'IA mal deployee coute cher. **L'IA bien deployee change tout.**"
- Localisation : "France"

### 6. `src/pages/Contact.tsx` — Page Contact
- Titre et texte traduits en francais
- Labels : Temps de reponse ("Sous 24 heures"), Quoi inclure, "Pas encore pret ?"
- Texte adapte au conseil IA

### 7. `src/components/ContactForm.tsx` — Formulaire
- Labels : Nom, Email, Message
- Placeholders en francais : "Votre nom", "votre@email.com", "Parlez-moi de votre projet..."
- Bouton : "Envoyer le message" / "Envoi en cours..."
- Toast de confirmation en francais

### 8. `src/components/Footer.tsx` — Pied de page
- "LIAM FLETCHER" -> "ABEL SALAH"
- Email : placeholder a adapter (ex. contact@abelsalah.com)
- Localisation : "France"
- Navigation et liens sociaux traduits
- Copyright : "Abel SALAH. Tous droits reserves."
- Tagline : "L'IA au service de votre entreprise."
- Bouton CTA : "Parlons-en"

### 9. `src/components/ProjectCard.tsx` — Labels des cartes
- "Context" -> "Contexte"
- "Action" -> "Action" (identique)
- "Result" -> "Resultat"

### 10. `src/components/CopyReveal.tsx` — Indicateur
- "hover" -> "survolez"

## Details techniques
- Aucune dependance supplementaire requise
- La photo portrait existante sera conservee (remplacable plus tard par la photo d'Abel)
- La route `/styleguide` sera retiree du menu mais le fichier reste accessible
- Toutes les animations Framer Motion restent inchangees
- Le composant `CopyReveal` garde le meme comportement (avant/apres au survol)
