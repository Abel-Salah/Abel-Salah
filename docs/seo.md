# SEO, Sitemap Et LLM

## Sources SEO

- [src/components/SEOHead.tsx](../src/components/SEOHead.tsx) : meta tags par page React.
- [index.html](../index.html) : meta tags initiaux et JSON-LD global.
- [public/sitemap.xml](../public/sitemap.xml) : sitemap statique servi publiquement.
- [supabase/functions/generate-sitemap/index.ts](../supabase/functions/generate-sitemap/index.ts) : sitemap dynamique potentiel.
- [public/robots.txt](../public/robots.txt) : directives robots et lien sitemap.
- [public/llms.txt](../public/llms.txt) : contexte lisible par assistants IA.
- [public/ai.txt](../public/ai.txt) : resume court pour moteurs/agents IA.

## Internationalisation

Pages localisees actuelles :

- `https://abelsalah.fr/`
- `https://abelsalah.fr/en`
- `https://abelsalah.fr/es`

Le composant `SEOHead` sait emettre `canonical`, `og:locale` et `hreflang`. Le sitemap statique contient aussi les alternates FR/EN/ES pour la home.

## Sitemap

Le fichier [public/sitemap.xml](../public/sitemap.xml) sert de copie statique publique.

La fonction [supabase/functions/generate-sitemap/index.ts](../supabase/functions/generate-sitemap/index.ts) genere les pages statiques, les variantes `/en` et `/es`, les liens `xhtml:link` de la home et les articles dynamiques publies depuis Supabase.

Source de verite recommandee :

- utiliser la fonction dynamique en production si les articles generes Supabase doivent etre indexes automatiquement ;
- conserver `public/sitemap.xml` comme fallback statique.

## Blog

Les articles statiques sont dans [src/data/blogPosts.ts](../src/data/blogPosts.ts). Les articles dynamiques viennent de Supabase et sont filtres sur `published = true`.

Le sitemap statique ne peut pas connaitre les articles dynamiques en base. La fonction dynamique couvre ce cas.

## Robots

[public/robots.txt](../public/robots.txt) autorise les principaux crawlers et bloque `/styleguide` ainsi que `/admin/`.

Il expose :

```txt
Sitemap: https://abelsalah.fr/sitemap.xml
AI-Content-Info: https://abelsalah.fr/llms.txt
```

## Donnees structurees

[index.html](../index.html) contient un graphe JSON-LD avec `Service`, `Organization`, `WebSite`, `Blog` et plusieurs ventures. Les pages blog ajoutent un schema `Article` via [src/pages/BlogPost.tsx](../src/pages/BlogPost.tsx).

Les pages statiques generees par [scripts/generate-static-route-heads.mjs](../scripts/generate-static-route-heads.mjs) ajoutent un schema `SiteNavigationElement` pour clarifier les liens principaux et favoriser la comprehension des sitelinks. Les pages offres ajoutent aussi un schema `Service` avec une `ReserveAction` vers TidyCal. [scripts/verify-built-output.mjs](../scripts/verify-built-output.mjs) verifie ces schemas dans le dossier `dist`.

## Points de controle avant publication

1. Verifier que chaque page publique a un title et une description.
2. Verifier que les canonical correspondent aux routes reelles.
3. Verifier que `/en` et `/es` ont des alternates reciproques.
4. Verifier que `sitemap.xml` liste les pages souhaitees.
5. Verifier que les dates d'articles sont intentionnelles.
6. Verifier que les chiffres business publies sont prouvables ou formules prudemment.
