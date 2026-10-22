import { STRIPE_PAYMENT_LINKS } from "./stripePaymentLinks";
import { TIDYCAL_BOOKING_URL } from "./homeLocales";

export const CARD_BOOKING_URL = `${TIDYCAL_BOOKING_URL}?utm_source=abelsalah&utm_medium=website&utm_campaign=accompagnement_ia&utm_content=card`;

export const CARD_PURCHASES = {
  audit: { label: "Audit express de votre structure", price: "29 €", href: STRIPE_PAYMENT_LINKS.audit },
  followup: { label: "Coaching IA — 1 mois", price: "299 €", href: STRIPE_PAYMENT_LINKS.coaching },
} as const;

export const CARD_TRAINING_FORMATS = [
  { id: "initiation", title: "Formation initiation", duration: "½ journée · 3 h 30", description: "Découvrir les outils et réussir vos premiers cas d’usage." },
  { id: "intermediaire", title: "Formation intermédiaire", duration: "1 journée · 7 h", description: "Structurer vos méthodes et pratiquer sur vos tâches métier." },
  { id: "complete", title: "Formation complète", duration: "3 journées · 21 h", description: "Approfondir les usages et construire vos propres workflows." },
] as const;

export type CardTrainingFormat = (typeof CARD_TRAINING_FORMATS)[number];

export function getTrainingBookingUrl(format: CardTrainingFormat) {
  return `${CARD_BOOKING_URL}_formation_${format.id}`;
}
