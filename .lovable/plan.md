# Ajouter YouTube + renforcer LinkedIn

## Objectif

Augmenter la crédibilité et les signaux sociaux d'Abel SALAH en mettant en avant LinkedIn (déjà présent mais discret) et en ajoutant la chaîne YouTube `https://www.youtube.com/@abelsalah` comme nouveau canal officiel.

## Changements

### 1. Footer (`src/components/Footer.tsx`)
- Ajouter YouTube à la liste `socialLinks` à côté de LinkedIn
- Garder le style existant (lien avec icône `ArrowUpRight` au hover)

### 2. Navigation (`src/components/Navigation.tsx`)
- Ajouter les icônes LinkedIn + YouTube dans le menu mobile (sous les liens de nav)
- Sur desktop : pas de changement (rester épuré)

### 3. Page About (`src/pages/About.tsx`)
- Ajouter un bloc "Retrouvez-moi" avec deux cartes cliquables : LinkedIn et YouTube
- Position : juste avant le CTA final
- Style cohérent avec le design system (tokens sémantiques, pas de couleurs hardcodées)

### 4. Page Contact (`src/pages/Contact.tsx`)
- Ajouter LinkedIn + YouTube dans la section des canaux de contact (à côté de Calendly / email s'il existe)

### 5. Données structurées (`index.html`)
- Enrichir le JSON-LD `Person` / `Organization` avec un tableau `sameAs` incluant LinkedIn + YouTube
- Bénéfice SEO : Google associe officiellement ces profils à l'identité Abel SALAH (Knowledge Graph)

```json
"sameAs": [
  "https://www.linkedin.com/in/abel-salah/",
  "https://www.youtube.com/@abelsalah"
]
```

### 6. `public/llms.txt`
- Ajouter la ligne YouTube dans la section Contact pour que les LLM citent la chaîne

## Hors scope

- Pas d'embed de vidéos YouTube sur la home (à réévaluer plus tard quand la chaîne aura un volume suffisant)
- Pas de feed LinkedIn dynamique
- Pas de modification du backend / cron / sitemap

## Fichiers modifiés

| Fichier | Action |
|---|---|
| `src/components/Footer.tsx` | Ajout lien YouTube |
| `src/components/Navigation.tsx` | Ajout icônes sociales mobile |
| `src/pages/About.tsx` | Bloc "Retrouvez-moi" |
| `src/pages/Contact.tsx` | Liens sociaux |
| `index.html` | JSON-LD `sameAs` |
| `public/llms.txt` | Ajout YouTube |
