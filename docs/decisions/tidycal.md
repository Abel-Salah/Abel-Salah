# Decision: Reservation TidyCal

## Statut

Actif.

## Decision

Utiliser TidyCal comme URL unique de reservation :

```txt
https://tidycal.com/skill-lms/abel-rdv
```

## Implementation actuelle

La constante `TIDYCAL_BOOKING_URL` est definie dans [src/data/homeLocales.ts](../../src/data/homeLocales.ts).

Elle est utilisee par :

- [src/pages/Index.tsx](../../src/pages/Index.tsx)
- [src/pages/Contact.tsx](../../src/pages/Contact.tsx)
- [src/components/CalendlyPopup.tsx](../../src/components/CalendlyPopup.tsx)

## Dette connue

Le composant `CalendlyPopup.tsx` a un nom historique qui ne correspond plus au fournisseur actuel. Le renommer en `BookingPopup.tsx` dans un lot technique separe pour eviter un diff inutile dans les changements documentaires.

## API future

Aucun token TidyCal n'est requis aujourd'hui. Si une integration API est ajoutee plus tard, elle devra etre faite cote serveur uniquement.
