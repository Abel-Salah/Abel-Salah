# Reprise du blog — diagnostic du 22 octobre 2026

## État observé

- Frontend : Cloudflare Pages `abelsalah-site`, dépôt `Abel-Salah/Abel-Salah`.
- Backend principal : `pcjhrmwuqyxddyeikely`, organisation ABEL SALAH. Dashboard Healthy ; table `generated_blog_posts` vide, aucune ligne dans `cron.job`. Douze Edge Functions déployées ; secret `GEMINI_API_KEY` présent (valeur non lue).
- Contenu historique : `mqmynuloecsdsjbgnwzx`, accessible par le projet Lovable Abel SALAH. 305 articles publiés ; dernier `created_at` : 2026-09-11 14:00:11 UTC. Les quatre crons appellent cette base et les réponses du 22 octobre indiquent `Missing required environment variable: GEMINI_API_KEY`, malgré HTTP 200 et cron succeeded.
- Le build (`scripts/fetch-generated-posts.mjs`) et le lecteur (`contentClient.ts`) utilisent volontairement cette base historique. `Checklist.tsx` écrit également ses leads via `contentClient` : ne pas modifier globalement ce client sans préserver ce formulaire.
- Test manuel de `generate-batch-posts` dans le dashboard du backend principal : HTTP 200, `generated:0` ; validation Zod rejetée pour champs JSON absents, notamment `metaTitle`, `metaDescription`, `readTime`, `excerpt`, `sections`. Le prompt ne spécifiait pas leur structure.

Ces observations sont un instantané, pas une preuve de restauration ni de migration.

## Correctif proposé

Les deux générateurs demandent maintenant les mêmes noms de champs et limites que leur validateur. Les exemples doivent être explicitement fictifs ; les chiffres commerciaux non étayés ont été retirés du prompt promotionnel. La validation Zod et `published:false` restent en place. Le batch retourne 200 uniquement pour un succès complet, 207 pour un lot partiel et 502 lorsque rien n'a été généré.

Cette correction répare la création de brouillons, pas la publication hebdomadaire. Ne pas mettre simplement `published:true` : la conformité du JSON ne vérifie pas les affirmations du texte.

Validation actualisée le 23 octobre 2026 : `npm run build` complet réussi sur l'arbre incluant `main` b30e7f7, 44 routes vérifiées, smoke de 38 routes et audit npm sans vulnérabilité. `deno check` des deux générateurs avec Deno 2.9.6 réussit après retrait de `ALL_PROXY`/`all_proxy` pour cette commande uniquement ; les proxies HTTP(S) restent actifs et TLS reste vérifié. L'ancien refus réseau venait du proxy SOCKS. Aucun stub ni assouplissement du typage.

La revue indépendante approuve le correctif de création de brouillons. Le passage Ready ouvre la revue du code ; le merge exige les gates du SHA courant. Le déploiement Supabase puis le test d'un brouillon enregistré et invisible publiquement restent obligatoires avant de déclarer le service rétabli. Aucun import d'articles, changement de lecteur, création de cron ou publication automatique n'est attesté par cette validation locale. Les fonctions préexistantes ne contrôlent pas encore un rôle opérateur : ne pas activer d'automatisation durable sur la seule protection `verify_jwt=true`.

## Suite et critères de bascule

1. Déployer les trois fichiers du correctif via le dashboard Supabase, après revue et contrôles. Vérifier le contenu réellement déployé. Aucun changement de secret requis pour ce correctif.
2. Créer un seul brouillon de test ; vérifier qu'il respecte le schéma, qu'il est enregistré et qu'il est invisible via la clé publique. Vérifier aussi qu'un lot sans résultat ne retourne plus HTTP 200.
3. Exporter uniquement les articles déjà publics de la base historique, puis comparer les schémas, contraintes, permissions et policies de destination. Copier les données sans suppression source ni écrasement. Un conflit ID/slug avec contenu différent impose l'arrêt.
4. Comparer IDs, slug/lang, dates et empreintes canoniques de tous les champs métier. Vérifier la lecture anonyme des seuls publiés et l'invisibilité des brouillons. Un simple total de 305 ne suffit pas.
5. Isoler le client d'articles du client de collecte des leads ; basculer lecteur et build ensemble seulement après copie vérifiée. Refaire un delta avant bascule. Contrôler pages, sitemap, RSS et vrai résultat du fetch de build ; ne pas accepter un cache vide de secours comme succès.
6. Définir une publication hebdomadaire des seuls contenus validés avec un appel serveur autorisé, idempotence et résultat métier contrôlé. `verify_jwt=true` seul ne distingue pas une clé anon publique d'un appel opérateur. Ne pas ouvrir le générateur à des appels publics pour contourner l'authentification.
7. Vérifier un article réellement publié sur le domaine, puis le prochain déclenchement et l'alerte en cas d'échec. Une exécution cron succeeded ne prouve pas une publication.

## Retour arrière

Conserver la base historique, les articles et le routage existants jusqu'à comparaison complète. Le correctif des prompts peut être annulé en restaurant les trois fichiers depuis `53e1f03a618d9397303801097e1ba010b3a07805` ; cela rétablit aussi le défaut de statut HTTP. Aucune migration ni bascule de lecteur n'est incluse dans ce correctif.


## Raccordement des articles — 3 novembre 2026

Les 305 articles déjà publiés ont été copiés dans le backend personnel après
comparaison du schéma et des permissions, sauvegarde/restauration du brouillon,
revue indépendante et accord humain. Une relecture indépendante des quatorze
champs de chaque ligne a confirmé leur égalité ; la destination contient
305 publiés et un brouillon inchangé, invisible au rôle `anon`. Les contenus
historiques restent conservés. Preuves et propriétaire :
[chantier de migration #196](https://github.com/Abel-Salah/PROJECT-RULES/issues/196).

Le code sépare désormais deux connexions publiques sans session :

- `contentClient.ts` lit les articles de `pcjhrmwuqyxddyeikely` ; le lecteur et
  `scripts/fetch-generated-posts.mjs` partagent `publicContentConfig.ts`.
- `checklistClient.ts` conserve la collecte `checklist_leads` sur le backend
  historique. Le formulaire importe ce client explicitement ; le changement
  des articles ne déplace aucun lead et ne modifie pas son consentement.

Le build refuse une erreur réseau/HTTP, moins de 305 articles, un doublon,
une structure invalide ou un résultat potentiellement tronqué. Il ne publie
plus un cache de secours vide ou périmé. `npm run test:content` vérifie ces cas,
et fait partie de `npm run verify`. Aucun changement de cron, fonction Supabase,
secret, policy, publication automatique ou brouillon n'est inclus.

Le gate `npm audit --audit-level=moderate` a aussi imposé deux corrections
transitives : override `@hono/node-server` 2.1.3
([avis éditeur](https://github.com/honojs/node-server/security/advisories/GHSA-rmxm-3fg6-px4f))
et `minimatch` 11.0.1
([avis éditeur](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249)).
Le lockfile est recalculé ; lint, types et build restent obligatoires pour
vérifier la compatibilité de l'outillage avec cette nouvelle version de minimatch.

Avant merge : `npm ci`, `npm run verify`, revue du commit exact, preview Cloudflare
verte et parcours article/checklist ; comparer à nouveau les articles source/cible
et l'empreinte du brouillon immédiatement avant bascule. Après merge, contrôler
le SHA servi sur `abelsalah.fr`, articles, sitemap/RSS et formulaire avec une
adresse technique réservée, puis recouper l'enregistrement et le PDF. Le rendu
de la page de succès ne prouve pas la réception d'un e-mail.

Retour arrière du routage : revert du seul commit de raccordement via une PR
soumise aux mêmes gates et à une preview, puis contrôle de production. Garder les
305 lignes copiées et le brouillon ; aucun rollback SQL ni suppression source.
L'ancien backend ne peut être arrêté tant que la collecte checklist et ses
éventuels traitements ne sont pas migrés et vérifiés séparément.

## Campagnes

Le suivi des visites et le suivi des conversions sont deux validations distinctes. Ne pas déclarer une réservation à partir d'un clic, ni un paiement à partir d'une simple page de retour. Les paiements nécessitent une confirmation Stripe signée avec déduplication ; les réservations une confirmation effective du prestataire. Aucun lancement de campagne n'est inclus dans ce correctif.
