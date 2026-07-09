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

## Contradiction connue

Le fichier [public/sitemap.xml](../public/sitemap.xml) contient `/en`, `/es` et les liens `xhtml:link`.

La fonction [supabase/functions/generate-sitemap/index.ts](../supabase/functions/generate-sitemap/index.ts) genere seulement les pages statiques historiques et les articles, sans `/en`, `/es`, ni `xhtml:link`.

Decision a prendre :

- soit le sitemap statique est la source de verite ;
- soit la fonction dynamique est mise a jour et devient la source de verite.

## Blog

Les articles statiques sont dans [src/data/blogPosts.ts](../src/data/blogPosts.ts). Les articles dynamiques viennent de Supabase et sont filtres sur `published = true`.

Le sitemap statique ne peut pas connaitre les articles dynamiques en base. Si les articles generes doivent etre indexables automatiquement, privilegier une generation dynamique fiable ou une etape de build/deploiement qui reconstruit `public/sitemap.xml`.

## Robots

[public/robots.txt](../public/robots.txt) autorise les principaux crawlers et bloque `/styleguide`.

Il expose :

```txt
Sitemap: https://abelsalah.fr/sitemap.xml
AI-Content-Info: https://abelsalah.fr/llms.txt
```

## Donnees structurees

[index.html](../index.html) contient un graphe JSON-LD avec `Service`, `Organization`, `WebSite`, `Blog` et plusieurs ventures. Les pages blog ajoutent un schema `Article` via [src/pages/BlogPost.tsx](../src/pages/BlogPost.tsx).

## Points de controle avant publication

1. Verifier que chaque page publique a un title et une description.
2. Verifier que les canonical correspondent aux routes reelles.
3. Verifier que `/en` et `/es` ont des alternates reciproques.
4. Verifier que `sitemap.xml` liste les pages souhaitees.
5. Verifier que les dates d'articles sont intentionnelles.
6. Verifier que les chiffres business publies sont prouvables ou formules prudemment.
