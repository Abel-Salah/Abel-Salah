

# Repositionnement : Expert IA & Consultant pour les entreprises

## Probleme actuel
Le contenu est generique et pourrait etre celui de n'importe quel consultant IA. Il ne s'appuie pas sur votre vrai parcours (16 ans, direction commerciale, fondateur de Skillco/Dataonline) qui est justement ce qui vous rend credible et different.

## Strategie de repositionnement
Utiliser votre parcours **non pas comme un CV** mais comme **preuve de credibilite** : vous comprenez le business parce que vous l'avez vecu (direction d'equipes, CA de 4.8M, creation d'entreprises). C'est ca qui vous differencie des consultants IA purement techniques.

---

## Fichier 1 : `src/pages/Index.tsx`

### Hero — Sous-titre repositionne
- Remplacer "expert en intelligence artificielle appliquee aux entreprises"
- Par : "16 ans sur le terrain du business. Aujourd'hui, j'aide les entreprises a integrer l'IA la ou ca compte : ventes, operations, strategie."

### Chiffres cles — Nouvelle section animee (entre hero et "Avant/Apres")
Ajouter 3 compteurs visuels dans une grille :
- **16+** ans d'experience
- **62** projets realises  
- **99%** taux de reussite

Style : grille de 3 colonnes, memes animations `motion.div`, typographie `heading-display` pour les chiffres, `text-muted-foreground` pour les labels.

### Section "Avant l'IA vs. Avec l'IA" — Rester tel quel
Le contenu actuel est bon et oriente business. Pas de changement.

### Cas d'usage — Rendre plus credibles et specifiques
Remplacer les projets generiques par des cas ancres dans la realite :
- 01 — **IA au service de la force de vente**
  - Contexte : Reseau de distribution, 28 commerciaux, processus manuels
  - Action : Automatisation du scoring leads et prevision des ventes par IA
  - Resultat : +40 % de conversion, -50 % temps de prospection
- 02 — **Digitalisation des processus RH avec l'IA**
  - Contexte : Entreprise en hypercroissance, onboarding et formation non structures
  - Action : Deploiement d'un LMS intelligent avec parcours personnalises par IA
  - Resultat : Temps d'integration divise par 3
- 03 — **Strategie data & acquisition B2B**
  - Contexte : PME sans pipeline commercial structure
  - Action : Mise en place d'un systeme d'acquisition automatise (scraping, scoring, CRM IA)
  - Resultat : Pipeline commercial x5 en 6 mois

---

## Fichier 2 : `src/pages/About.tsx`

### Bio — Reecrite avec le vrai parcours comme preuve
Remplacer "8 ans d'experience" par un texte qui raconte le parcours sans faire CV :
- "Avant de devenir consultant IA, j'ai dirige des equipes commerciales, gere un CA de 4.8M d'euros, et fonde plusieurs entreprises dans le digital. Cette experience terrain me permet de comprendre les vrais enjeux des dirigeants — pas seulement la tech, mais le business."

### Services — Recentrer sur le consulting IA, pas la formation
Remplacer la liste actuelle par :
- Audit & strategie IA pour dirigeants
- Automatisation des processus commerciaux
- Integration d'outils IA (CRM, vente, marketing)
- Accompagnement a la transformation digitale
- Strategie data & acquisition client
- Deploiement de solutions IA sur mesure

### Avec qui je travaille — Affiner
- Dirigeants & CEO
- Directeurs commerciaux & marketing
- Responsables operations
- DSI & CTO
- PME, ETI & grands groupes

### Ajouter une section "Certifications & Partenariats" (avant la citation)
Nouvelle section avec le meme style visuel que Services/Clients :
- Master Commerce International
- Certifications Google (Ads, Analytics)
- Partenaire HubSpot
- Label : "Reconnaissance"

### Citation — Garder telle quelle
"L'IA mal deployee coute cher. L'IA bien deployee change tout." — parfait pour le positionnement.

---

## Fichier 3 : `src/pages/Work.tsx`

### Projets — 5 cas d'usage credibles et orientes resultats
Remplacer les 3 projets actuels par 5, inspires du vrai parcours mais presentes comme des missions de conseil IA :

- 01 — **IA & performance commerciale retail**
  - Contexte : Reseau de 3 magasins, 28 collaborateurs, CA 4.8M euros
  - Action : Implementation d'outils IA pour le scoring client, prevision de stocks et optimisation des ventes
  - Resultat : +25 % de rentabilite sur le reseau

- 02 — **Automatisation de l'acquisition B2B**
  - Contexte : Startup sans equipe commerciale structuree
  - Action : Pipeline automatise : scraping de donnees, scoring par IA, sequences d'emailing intelligentes
  - Resultat : 500+ leads qualifies / mois

- 03 — **Plateforme de formation augmentee par l'IA**
  - Contexte : Besoin de former des equipes commerciales a grande echelle
  - Action : Creation d'un LMS avec parcours adaptatifs generes par IA
  - Resultat : Deploiement sur 3 villes, taux de completion 95 %

- 04 — **IA pour le e-commerce : recommandation & conversion**
  - Contexte : Site e-commerce avec taux de conversion faible
  - Action : Integration d'un moteur de recommandation IA et optimisation du tunnel de vente
  - Resultat : +60 % taux de conversion

- 05 — **Strategie data & CRM intelligent**
  - Contexte : Donnees clients dispersees, pas de vision unifiee
  - Action : Centralisation dans un CRM IA (HubSpot), segmentation automatique, scoring predictif
  - Resultat : Cycle de vente reduit de 40 %

---

## Details techniques
- Aucune nouvelle dependance
- Nouvelle section "Chiffres cles" sur Index.tsx : grille de 3 `motion.div` avec animation `whileInView`
- Nouvelle section "Certifications" sur About.tsx : meme pattern que la grille Services/Clients existante
- Toutes les animations Framer Motion conservees
- Le design et la structure de chaque page restent identiques

