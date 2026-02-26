

# Validation JSON-LD + Redirection 301

## 1. Tester le JSON-LD

Je ne peux pas soumettre directement au Rich Results Test de Google depuis l'editeur, mais je peux **valider la structure du JSON-LD** presente dans `index.html` :

**Resultat de l'audit du JSON-LD actuel** : le schema est correctement structure avec 4 entites dans le `@graph` :
- `ProfessionalService` avec `@id`, `dateModified`, `founder`, `serviceType`
- `Organization` (SKILL & CO) avec `foundingDate`, `hasOfferCatalog`
- `WebSite` avec `potentialAction` SearchAction
- `Blog` avec `author`

Les `@id` sont coherents et permettent le entity linking. **Le JSON-LD est valide.**

Pour tester toi-meme : va sur [Google Rich Results Test](https://search.google.com/test/rich-results) et entre `https://abelsalah.fr`.

## 2. Ajouter la redirection vers abelsalah.fr

Lovable ne permet pas de configurer des redirections 301 au niveau serveur. La solution est d'ajouter une **redirection client-side** dans `src/main.tsx` qui detecte si le visiteur arrive sur `abel-salah.lovable.app` et le redirige immediatement vers `abelsalah.fr`.

Ce n'est pas un vrai 301 HTTP, mais ca couvre le cas ou quelqu'un accede a l'ancien domaine. Pour le SEO, le `canonical` pointe deja vers `abelsalah.fr`, ce qui dit a Google quelle URL est la bonne.

### Fichier modifie

| Fichier | Modification |
|---|---|
| `src/main.tsx` | Ajouter un check de redirection vers abelsalah.fr si hostname = abel-salah.lovable.app |

### Code ajoute dans `src/main.tsx`

Avant le `createRoot`, ajouter :
```typescript
if (window.location.hostname === 'abel-salah.lovable.app') {
  window.location.replace('https://abelsalah.fr' + window.location.pathname);
}
```

`window.location.replace` simule une redirection (pas d'entree dans l'historique du navigateur).

