# Publicité Abel SALAH — configuration du 22 octobre 2026

- Compte publicitaire TikTok Abel SALAH : `7699558432881328180`, administré dans le Business Center SKILLCO, sans fusion des comptes publicitaires.
- Pixel dédié : `DBD5HNRC77U4SEFNH7E0`.
- Compte GTM Abel SALAH / conteneur abelsalah.fr : `GTM-WJS9SGGV`.
- Le composant MarketingConsent n'est monté que côté client ; aucune requête GTM/TikTok avant acceptation. Refus et acceptation accessibles au même niveau. Accord valable 180 jours et choix persistant conservé 180 jours, modifiable par Cookies. Par précaution, le refus peut rester actif dans une session restée ouverte au-delà de cette durée, jusqu’à fermeture de l’onglet ou nouveau choix explicite. Ce garde-fou ne prolonge jamais un accord et ne réactive jamais le suivi automatiquement.
- Le pixel est installé directement par le composant après consentement : ne pas ajouter une seconde balise TikTok dans GTM.
- Aucune correspondance avancée automatique ni postback amélioré n'est activé dans le pixel.
- Cette première livraison mesure les visites après consentement. Elle ne prétend pas mesurer un achat ni une réservation finalisée. Les événements de clic existants restent locaux.
- Restent à connecter et tester : réservation TidyCal réellement confirmée (embed bookingComplete ou webhook), paiement Stripe réellement payé (webhook signé / vérification serveur), déduplication et attribution consentie. Ne pas déclencher Purchase/Schedule sur un clic ou sur l'accès à une URL de remerciement.
- Aucun lancement ni budget de campagne n'est autorisé par cette configuration.
