

# Remplacement de la police de titres : Archivo Black vers Plus Jakarta Sans

## Pourquoi Plus Jakarta Sans ?
Plus Jakarta Sans est disponible sur Google Fonts, moderne, geometrique et lisible. Elle offre des graisses allant de 200 a 800, ce qui permet d'utiliser **ExtraBold (800)** pour les titres — un rendu impactant sans l'aspect rigide d'Archivo Black. Cabinet Grotesk n'est pas sur Google Fonts (payante), donc Plus Jakarta Sans est le meilleur choix.

## Modifications

### Fichier unique : `src/index.css`

1. **Import Google Fonts** (ligne 1) : remplacer `Archivo+Black` par `Plus+Jakarta+Sans:wght@700;800`
2. **Titres h1-h6** (ligne 51) : remplacer `'Archivo Black'` par `'Plus Jakarta Sans'` avec `font-weight: 800`
3. **Classe `.heading-display`** (ligne 62) : meme remplacement, `font-weight: 800`

## Resultat attendu
- Titres plus modernes, plus "tech/startup"
- Meilleure coherence visuelle avec Inter pour le corps de texte
- Aucun impact sur la structure ou les animations

