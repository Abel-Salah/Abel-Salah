

# Ajouter les breadcrumbs JSON-LD sur BlogPost.tsx

Le composant `SEOHead` supporte déjà la prop `breadcrumbs`. Il suffit de la passer dans `BlogPost.tsx`.

## Modification

**Fichier : `src/pages/BlogPost.tsx`**

Ajouter la prop `breadcrumbs` au composant `SEOHead` (lignes 42-47) :

```tsx
<SEOHead
  title={post.metaTitle}
  description={post.metaDescription}
  canonical={`/blog/${post.slug}`}
  ogType="article"
  breadcrumbs={[
    { name: "Accueil", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]}
/>
```

Cela génère automatiquement un schema `BreadcrumbList` avec 3 niveaux : Accueil → Blog → Titre de l'article. Google affichera ce fil d'Ariane dans les résultats de recherche.

**1 fichier modifié** : `src/pages/BlogPost.tsx`

