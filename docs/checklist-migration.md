# Checklist : collecte privée et e-mail transactionnel

## Périmètre

La checklist utilise le projet personnel `pcjhrmwuqyxddyeikely`. Les articles et
leur brouillon ne sont pas modifiés. Les lignes historiques sont sauvegardées puis
copiées avec leurs sept champs et identifiants, sans écrasement et sans déclencher
d’envoi. Leur source reste conservée. Une nouvelle demande explicite consentie
peut ensuite recevoir un seul e-mail contenant le lien PDF fixe.

## Source et déploiement bornés

- Migration additive : `supabase/migrations/20261103094001_checklist_collection_and_delivery.sql`.
- Fonction autonome : `supabase/manual-functions/subscribe-checklist/index.ts`.
- Nom distant : `subscribe-checklist`, uniquement sur le projet personnel.
- Le workflow historique redéploie toutes les fonctions de `supabase/functions/`
  quand cet arbre ou `supabase/config.toml` change. Le présent handler reste dans
  l’arbre manuel pour ne pas modifier les générateurs ou autres services lors de
  cette migration. Ce workflow et config.toml ne changent pas.
- Après revue et répétition transactionnelle avec `ROLLBACK`, appliquer la
  migration et la copie sélectionnée via SQL Editor. Conserver le reçu manuel et
  le SHA du fichier ; ne pas prétendre que l’historique CLI est synchronisé et ne
  pas lancer un `db push` global pour enregistrer rétroactivement cette étape.
- Déployer seulement ce fichier via l’éditeur de la fonction dans le dashboard,
  puis vérifier le code effectivement enregistré. Le contrôle JWT historique du
  gateway doit être désactivé pour ce seul endpoint public à clé publishable ;
  validation, origines permises, quotas et consentement sont gérés dans le handler.
  Ne pas modifier la configuration des fonctions existantes.

Le runtime réutilise les secrets du projet `RESEND_API_KEY` et
`NEWSLETTER_FROM_EMAIL`, ainsi que les variables Supabase serveur natives. Ne pas
lire, exporter ou versionner leurs valeurs. Aucun secret dans le navigateur.
L’absence de configuration ou une mauvaise cible échoue avant collecte/envoi.

## Accès et limites

Les deux nouvelles tables ont RLS activé, sans droit de lecture/écriture pour
`anon` ou `authenticated`. Le seul client serveur service_role peut lire, insérer
et mettre à jour ; pas de droit DELETE ajouté. Les RPC sont SECURITY INVOKER et
leur EXECUTE est réservé à service_role. Le formulaire appelle la fonction ; il
n’insère plus directement dans la table publique historique.

Une demande valide réserve atomiquement l’envoi. Une réservation active bloque
les doubles clics concurrents ; un envoi déjà enregistré n’est pas répété. Le nom
conservé et une clé `checklist-v1/<id>` rendent la requête fournisseur identique
sur les reprises. Resend conserve ses clés pendant24h ; une incertitude de plus
de23h est retenue pour réconciliation humaine, sans renvoi automatique. Quotas
atomiques100 demandes/jour au total et5 tentatives/heure par adresse e-mail
normalisée et hachée avec un secret serveur ; aucune IP lue ou stockée. Les
en-têtes de proxy ne servent pas à identifier une personne : aucun risque de
quota partagé par tous les visiteurs derrière le même proxy. Une adresse et une
origine déclarées ne sont pas une authentification ; le plafond global borne
aussi les demandes utilisant des adresses distinctes.

L’e-mail contient uniquement la checklist demandée, pas d’inscription newsletter
ni de campagne. Le consentement est explicite. Le PDF reste disponible si l’envoi
ne peut pas être confirmé et le texte ne promet pas une livraison non attestée.
Une acceptation du fournisseur n’est pas à elle seule une preuve de réception.

## Validation et bascule

1. Sauvegarder/restaurer la collecte historique et contrôler la destination.
2. Répéter migration/copie/RPC/permissions/quota dans une transaction annulée.
3. `node --test scripts/checklist-delivery.test.mjs`, `deno check --no-config
   supabase/manual-functions/subscribe-checklist/index.ts`, puis `npm ci` et
   `npm run verify` complets dans le worktree dédié, sous admission bornée.
4. Revue indépendante et revue humaine Supabase avant application persistante.
5. Appliquer les objets de checklist et les seules lignes historiques sélectionnées,
   contrôler égalité, absence d’accès public et invariant du brouillon.
6. Déployer le seul handler, tester deux requêtes simultanées vers la boîte
   propriétaire autorisée, recouper message fournisseur, statut enregistré et
   réception réelle dans la boîte. Tester un doublon et les erreurs sans campagne.
7. Preview Cloudflare et parcours formulaire/PDF, gates/revues/base du commit,
   fusion standard puis SHA servi et parcours sur le domaine public.
8. Comparer un dernier delta source/cible ; garder l’ancien backend et ses données
   jusqu’à observation et qualification complète de ses autres dépendances.

## Retour arrière

Revert du seul raccordement frontend par PR soumise aux mêmes gates. Conserver
les tables nouvelles, les contacts copiés et les historiques d’envoi : aucun
DROP/DELETE de compensation. Ne pas réactiver aveuglément un envoi dont l’état
fournisseur est incertain ; réconcilier son identifiant avant reprise.
