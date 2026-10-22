# Webinaire SKILLCO — série test

Configuration du 22 octobre 2026. Inscription : https://tidycal.com/skill-lms/webinaire-ia

- Dates : jeudi 26 novembre 2026, jeudi 17 décembre 2026 et jeudi 21 janvier 2027.
- Horaire : 12 h 30 à 13 h 30, Europe/Paris. Une inscription concerne une seule session.
- Agenda organisateur : Abel SKILLCO, série privée avec Google Meet commun.
- TidyCal : réservation collective gratuite, 50 places par créneau, dates spécifiques uniquement, rappels J-1 et H-1 et confirmation par email.
- Lien vidéo personnalisé : celui de la série Google Agenda. Aucun lien de visio public dans le code du site.
- L'option d'ignorance des conflits externes est activée uniquement sur ce type de réservation : la série réserve déjà ces horaires dans l'agenda organisateur. Ne pas activer cette option sur les rendez-vous individuels.
- Anticipation : 120 jours ; clôture des inscriptions : 15 minutes avant le début.

## Site

Dépôt déployé : `Abel-Salah/Abel-Salah`, projet Cloudflare Pages `abelsalah-site`, domaine `abelsalah.fr`. Le dépôt historique `ABEL-SALAH-SITE` et le projet Lovable ne constituent plus la cible de publication de ce domaine (registre central `PROJECT-RULES/HOSTING.md`, vérifié le 22 octobre 2026). Une PR doit obtenir le check Cloudflare Pages vert et être testée sur sa preview avant merge ; vérifier ensuite `/card` en production.

Le bloc webinaire est placé avant les actions payantes sur `/card`. Le lien conserve une attribution UTM et émet `webinar_signup_click` via le mécanisme existant ; cet événement mesure un clic, pas une inscription confirmée. Aucune collecte de données personnelles supplémentaire sur le site.

Les sessions expirées ne sont plus proposées dans le bloc. Après la dernière clôture, le bouton ouvre le formulaire de newsletter existant pour recevoir les prochaines dates. Pour prolonger la série, ajouter les mêmes dates dans Google Agenda, TidyCal et `src/data/webinars.ts`.

## Validation

`npm run verify` exécute les quatre tests webinaire, lint, typecheck, build, SEO, smoke et audit des dépendances. Tester aussi le lien public TidyCal, le créneau de chaque mois et la réception de confirmation sur une adresse de test appartenant à Abel. Ne jamais utiliser de prospect réel pour ce test.

## Pilotage commercial

Mesurer par session : inscrits, présents, rendez-vous qualifiés, devis et chiffre d'affaires encaissé. Le créneau du jeudi midi est une hypothèse à tester pour l'audience B2B française, pas une promesse de performance.
