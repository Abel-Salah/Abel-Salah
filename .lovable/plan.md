
# Ajouter LinkedIn + SKILL & CO dans le SEO

## 1. Ajouter le profil LinkedIn dans le JSON-LD

Dans `index.html`, ajouter `sameAs` sur le schema `Person` d'Abel SALAH avec l'URL LinkedIn :
```
"sameAs": ["https://www.linkedin.com/in/abel-salah/"]
```
C'est un signal fort pour les IA : ca relie l'identite web d'Abel a un profil professionnel verifie.

## 2. Ajouter SKILL & CO comme organisation fondee

Toujours dans le JSON-LD, enrichir le profil d'Abel avec son entreprise SKILL & CO et ses 3 branches :
- **SKILL & CO** : Projets IA et E-Learning sur mesure
- **SKILL & LMS** : Plateforme LMS Qualiopi
- **SKILL & CRM** : Developpement commercial par IA

On ajoutera un schema `Organization` pour SKILL & CO avec Abel comme fondateur, et on mettra a jour `worksFor` pour pointer vers cette organisation.

## 3. Mettre a jour llms.txt

Ajouter une section sur SKILL & CO dans `public/llms.txt` pour que les LLM comprennent qu'Abel est aussi fondateur de cette entreprise, pas seulement consultant independant.

## Fichiers modifies

| Fichier | Modification |
|---|---|
| `index.html` | Ajouter `sameAs` LinkedIn, schema `Organization` SKILL & CO, enrichir `worksFor` |
| `public/llms.txt` | Ajouter section SKILL & CO avec les 3 branches |

## Detail technique

Dans le JSON-LD `index.html` :
- `Person.sameAs` = `["https://www.linkedin.com/in/abel-salah/"]`
- `Person.worksFor` devient un `Organization` detaille avec `name: "SKILL & CO"`, `description`, et les sous-services
- Ajout d'un schema `Organization` dans le `@graph` pour SKILL & CO avec `founder` pointant vers Abel
- Les 3 branches (CO, LMS, CRM) seront listees dans `hasOfferCatalog`
