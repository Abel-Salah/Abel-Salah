

# Générer 5 articles de blog SEO longue traîne

## Approche

L'edge function `generate-blog-post` existe déjà et fonctionne. Il suffit de créer une nouvelle edge function `generate-batch-posts` qui appelle la fonction existante 5 fois en séquence avec des thématiques longue traîne spécifiques.

Alternativement, plus simple : créer une edge function `generate-batch-posts` qui génère 5 articles en séquence directement, en passant des sujets longue traîne précis dans le prompt.

## Sujets longue traîne ciblés

1. "Comment automatiser sa prospection commerciale avec l'IA en 2026"
2. "Quel ROI attendre d'un projet IA en PME : chiffres et méthode"
3. "Les 5 erreurs à éviter lors du déploiement de l'IA en entreprise"
4. "Comment choisir le bon outil IA pour son service commercial"
5. "IA et formation des équipes : guide pratique pour les managers"

## Plan technique

### 1. Créer `supabase/functions/generate-batch-posts/index.ts`

- Accepte un paramètre `topics` (array de sujets) ou utilise les 5 sujets par défaut
- Boucle séquentielle sur chaque sujet : appelle le AI Gateway avec un prompt incluant le sujet spécifique
- Insère chaque article dans `generated_blog_posts`
- Retourne le nombre d'articles générés

### 2. Mettre à jour `supabase/config.toml`

- Ajouter la configuration pour la nouvelle fonction avec `verify_jwt = false`

### 3. Appeler la fonction

- Après déploiement, invoquer la fonction pour générer les 5 articles

## Fichiers modifiés

| Fichier | Action |
|---|---|
| `supabase/functions/generate-batch-posts/index.ts` | Créer |
| `supabase/config.toml` | Ajouter config fonction |

