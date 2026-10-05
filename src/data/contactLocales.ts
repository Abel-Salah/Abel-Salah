import type { PageLocale } from "@/data/workLocales";

export interface ContactContent {
  seoTitle: string;
  seoDescription: string;
  breadcrumbHome: string;
  breadcrumbSelf: string;
  title: string;
  eyebrow: string;
  intro: string;
  iframeTitle: string;
  responseTimeTitle: string;
  responseTimeValue: string;
  howTitle: string;
  howSteps: string[];
  notReadyTitle: string;
  notReadyLine: string;
  notReadyHighlight: string;
  followTitle: string;
}

export const contactAlternates = [
  { hrefLang: "fr", path: "/contact" },
  { hrefLang: "en", path: "/en/contact" },
  { hrefLang: "es", path: "/es/contact" },
];

export const contactCanonicalByLocale: Record<PageLocale, string> = {
  fr: "/contact",
  en: "/en/contact",
  es: "/es/contact",
};

export const contactLocales: Record<PageLocale, ContactContent> = {
  fr: {
    seoTitle: "Prendre RDV Expert IA | Audit Gratuit — Abel SALAH",
    seoDescription:
      "Réservez votre audit IA gratuit avec Abel SALAH. Réponse sous 24h, accompagnement personnalisé pour PME et ETI. Prenez rendez-vous en ligne.",
    breadcrumbHome: "Accueil",
    breadcrumbSelf: "Contact",
    title: "Contact",
    eyebrow: "Parlons-en",
    intro: "Un projet en tête ? Réservez un créneau directement dans mon agenda.",
    iframeTitle: "TidyCal - Prendre RDV avec Abel SALAH",
    responseTimeTitle: "Temps de réponse",
    responseTimeValue: "Sous 24 heures",
    howTitle: "Comment ça se passe",
    howSteps: ["• Choisissez un créneau", "• Appel découverte de 30 min", "• Proposition sous 48h"],
    notReadyTitle: "Pas encore prêt ?",
    notReadyLine: "Pas de souci. Réservez quand même.",
    notReadyHighlight: "Discutons simplement.",
    followTitle: "Suivez-moi",
  },
  en: {
    seoTitle: "Book an AI Expert | Free Audit — Abel SALAH",
    seoDescription:
      "Book your free AI audit with Abel SALAH. Response within 24h, personalised support for SMEs and mid-caps. Schedule online.",
    breadcrumbHome: "Home",
    breadcrumbSelf: "Contact",
    title: "Contact",
    eyebrow: "Let's talk",
    intro: "Have a project in mind? Book a slot directly in my calendar.",
    iframeTitle: "TidyCal - Book a call with Abel SALAH",
    responseTimeTitle: "Response time",
    responseTimeValue: "Within 24 hours",
    howTitle: "How it works",
    howSteps: ["• Pick a slot", "• 30-min discovery call", "• Proposal within 48h"],
    notReadyTitle: "Not ready yet?",
    notReadyLine: "No problem. Book anyway.",
    notReadyHighlight: "Let's just talk.",
    followTitle: "Follow me",
  },
  es: {
    seoTitle: "Reservar Cita Experto IA | Auditoría Gratuita — Abel SALAH",
    seoDescription:
      "Reserve su auditoría IA gratuita con Abel SALAH. Respuesta en 24 h, acompañamiento personalizado para pymes. Reserve su cita online.",
    breadcrumbHome: "Inicio",
    breadcrumbSelf: "Contacto",
    title: "Contacto",
    eyebrow: "Hablemos",
    intro: "¿Tienes un proyecto en mente? Reserva un hueco directamente en mi agenda.",
    iframeTitle: "TidyCal - Reservar cita con Abel SALAH",
    responseTimeTitle: "Tiempo de respuesta",
    responseTimeValue: "En menos de 24 horas",
    howTitle: "Cómo funciona",
    howSteps: ["• Elige un hueco", "• Llamada de descubrimiento de 30 min", "• Propuesta en 48 h"],
    notReadyTitle: "¿Aún no estás listo?",
    notReadyLine: "No pasa nada. Reserva igualmente.",
    notReadyHighlight: "Simplemente hablemos.",
    followTitle: "Sígueme",
  },
};
