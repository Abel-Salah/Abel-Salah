# Checklist Release Sans GitHub Actions

GitHub Actions n'est pas utilise comme gate automatique tant que le budget Actions n'est pas disponible. La qualite est donc verifiee localement avant push, puis par controle public apres publication.

## Avant Push

```sh
git status --short
npm run verify
```

`npm run verify` doit passer integralement :

- lint ;
- typecheck ;
- build ;
- verification SEO statique ;
- verification du build `dist` ;
- smoke checks ;
- audit npm niveau moderate.

Ne pas pousser si une commande echoue.

## Push

```sh
git push origin main
```

GitHub Actions peut etre lance manuellement plus tard avec `workflow_dispatch`, mais il ne doit pas etre considere comme obligatoire tant que le budget Actions est indisponible.

## Controle Public Apres Publication

Verifier les routes :

- `/`
- `/en`
- `/es`
- `/audit-ia`
- `/automatisation-commerciale`
- `/formation-ia`
- `/blog`
- `/contact`
- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- `/ai.txt`

Verifier aussi :

- les CTA ouvrent TidyCal ;
- le selecteur de langue FR/EN/ES est visible ;
- les pages offres ont un titre et une canonical propres ;
- `/admin/opportunities` reste noindex et hors navigation ;
- aucun lien Calendly n'est revenu.

## Si Une Regression Est Detectee

1. Identifier le commit avec `git log --oneline`.
2. Revert non destructif :

```sh
git revert <commit_sha>
npm run verify
git push origin main
```

Ne pas utiliser `git reset --hard` sur ce depot partage sans demande explicite.
