

# Mise à jour du sitemap + Automatisation de la génération d'articles

## Constat actuel

### Sitemap
Le `sitemap.xml` est **statique** avec seulement 10 URLs hardcodées. Il y a actuellement **30+ articles** en base de données qui ne sont pas référencés dans le sitemap. Google ne les voit pas.

### Génération automatique
**Il n'y a PAS de cron job configuré.** Aucune automatisation n'est en place. Les articles ont été générés manuellement via les edge functions. Il faut mettre en place `pg_cron` + `pg_net` pour déclencher la génération automatiquement.

---

## Plan

### 1. Créer un sitemap dynamique via Edge Function

Remplacer le sitemap statique par une edge function `generate-sitemap` qui :
- Récupère tous les articles publiés depuis la base
- Génère le XML dynamiquement avec les pages statiques + tous les articles blog
- Retourne le XML avec le bon `Content-Type`

Mettre à jour le frontend pour pointer vers cette edge function (ou servir via une route API).

**Alternative plus simple** : créer une edge function `generate-sitemap` et rediriger `/sitemap.xml` vers elle. Mais comme c'est un fichier statique dans `public/`, on peut aussi régénérer le fichier statique via un cron. Pour le SEO, le plus fiable est une **edge function qui sert le XML dynamiquement**.

### 2. Configurer le cron job pour la génération auto d'articles

Activer `pg_cron` et `pg_net`, puis créer 2 tâches cron :
- **2 articles actionnables par jour** (lundi-vendredi, 8h et 14h)
- **2 articles promotionnels par semaine** (mardi et jeudi, 10h)

```sql
-- Article actionnable tous les jours à 8h
SELECT cron.schedule('generate-daily-post-morning', '0 8 * * 1-5', $$ ... $$);

-- Article actionnable tous les jours à 14h  
SELECT cron.schedule('generate-daily-post-afternoon', '0 14 * * 1-5', $$ ... $$);

-- Article promo mardi 10h
SELECT cron.schedule('generate-promo-tuesday', '0 10 * * 2', $$ ... $$);

-- Article promo jeudi 10h
SELECT cron.schedule('generate-promo-thursday', '0 10 * * 4', $$ ... $$);
```

### 3. Mettre à jour le sitemap automatiquement

Ajouter un cron quotidien qui régénère le sitemap, **ou** (plus simple) servir le sitemap dynamiquement via l'edge function.

## Fichiers modifiés/créés

| Fichier | Action |
|---|---|
| `supabase/functions/generate-sitemap/index.ts` | Créer — sitemap XML dynamique |
| `public/sitemap.xml` | Supprimer ou remplacer par une redirection |
| SQL (via insert, pas migration) | Configurer 4 cron jobs |

## Résumé

- Le sitemap deviendra **dynamique** et inclura automatiquement tous les nouveaux articles
- **4 cron jobs** assureront la génération automatique sans intervention : 2 articles/jour en semaine + 2 promos/semaine

