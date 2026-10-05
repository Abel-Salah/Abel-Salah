# Règle de continuité du projet

Toute tâche demandant de corriger, finaliser, tester, déployer ou rendre une fonctionnalité opérationnelle doit être poursuivie jusqu'à un état vérifié : analyser l'existant, identifier les dépendances, implémenter, tester, corriger les erreurs, vérifier le déploiement et indiquer clairement ce qui reste bloqué.

Le travail ne doit pas s'arrêter pour demander une confirmation intermédiaire lorsqu'une décision réversible et conforme au périmètre est possible. Les demandes de validation sont réservées aux actions irréversibles ou sensibles : publication de preuves non vérifiées, envoi de candidature ou message, suppression de données ou d'URL, migration de domaine, modification de secrets, paiement et mise en production d'une automatisation externe.

À chaque boucle :

1. lire les instructions et vérifier Git, l'environnement et la cible ;
2. classer le risque et commencer par le parcours business ou le bug bloquant ;
3. faire la modification minimale et traçable ;
4. exécuter lint, build et tests ciblés ;
5. tester le parcours réel après rechargement ;
6. corriger les régressions découvertes ;
7. commiter et pousser uniquement lorsque les contrôles passent ;
8. déclarer les limites restantes avec une preuve, jamais comme « parfait » sans vérification.

Les agents travaillent dans cette boucle. Atlas supervise l'état, les erreurs, les tâches bloquées et les validations humaines ; il ne contourne jamais les garde-fous de sécurité et ne publie ni candidature, ni preuve commerciale, ni contenu sensible sans validation.
