# Carte : parcours réseaux sociaux → webinaire ou service

État des lieux et modification du 22 octobre 2026, dépôt de production `Abel-Salah/Abel-Salah`, Cloudflare Pages `abelsalah-site`.

## État des lieux vérifié

1. **Entrée `/card`** : webinaire, plusieurs dates et explications, deux gros boutons, un déclencheur d’offres puis les mêmes offres dans Services. La hiérarchie répète les choix. Les quatre onglets et les liens sociaux sont fonctionnels.
2. **Achat** : la fenêtre d’offres affiche audit 29 €, audit + visio 49 €, coaching 299 €. Lecture du compte Stripe SKILLCO : les produits associés sont un audit entreprise à 29 €, un échange de 30 minutes à 49 € et un coaching IA d’un mois à 299 €. Le paiement à 49 € ne prouve pas l’inclusion d’un audit ; son lien est limité à une utilisation. Aucune modification Stripe dans cette intervention.
3. **Formation** : un seul choix général « Formation IA pour entreprises ». Le formulaire ouvre un `mailto:` ; il ne transmet pas une demande côté serveur. La page `/formations` présente aussi des packs de programmes business (199/799/1499 €), distincts des ateliers IA pour équipes. Ces tarifs ne sont pas réutilisés pour les nouveaux formats.

## Parcours retenu

- Webinaire compact : prochaine date et inscription gratuite. Les autres dates et informations restent dans TidyCal. Pré-rendu neutre, calcul des dates côté navigateur conservé.
- Planifier un échange : TidyCal existant « Appel stratégique IA avec Abel Salah — 30 min », sans engagement. Ce rendez-vous ne réserve pas une journée de formation.
- Onglet Services : trois groupes, audit / formation / suivi. Les autres onglets sont conservés.
- Audit : achat direct du produit existant à 29 €, explicitement express.
- Formation : initiation 3 h 30, intermédiaire 7 h, complète 21 h (3 journées). Programme et prix sur devis ; aucun tarif ni checkout nouveau inventé. Chaque fiche permet de planifier un échange ou de préparer un email mentionnant le format choisi.
- Suivi : coaching IA d’un mois à 299 €, option distincte et paiement unique (prix Stripe non récurrent). Aucun volume d’heures ou support illimité promis.
- Checklist déplacée vers Liens utiles ; newsletter repliée. Le doublon YouTube reste uniquement dans les liens sociaux. L’échange payant à 49 € n’est plus présenté sur cette carte.
- Prix de base Stripe conservés ; taxes éventuelles annoncées avant paiement. Aucun achat réel réalisé pour tester.

## Accessibilité et contrôles

Les onglets utilisent les rôles tab/tabpanel, un focus unique et les touches fléchées/Home/End. Les fiches et la newsletter utilisent un dialogue natif pour le focus modal et Échap. Aucune nouvelle dépendance.

`npm run verify` couvre lint, types, build, 4 tests webinaire, pré-rendu, SEO, smoke et audit de dépendances. Les invariants du build couvrent les trois niveaux et les deux vrais liens d’achat sur `/card` et `/carte-visite`, ainsi que l’absence d’un bundle audit + visio non confirmé.

Validation navigateur : à consigner après preview, puis contrôle du domaine public après merge. Le test du devis s’arrête avant l’ouverture d’un email réel ; préparation n’est pas envoi. Les contrôles visuels ne constituent pas une certification d’accessibilité complète.

## Mesure commerciale

Les clics webinaire, achats et prise de rendez-vous utilisent les événements existants. Ils ne prouvent ni une inscription ni un paiement abouti. Comparer ensuite inscriptions, présents, rendez-vous, achats et CA encaissé ; aucune hausse de conversion ou de revenu n’est garantie par cette refonte.
