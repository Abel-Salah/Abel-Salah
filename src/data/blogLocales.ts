import { blogPosts, type BlogPost } from "@/data/blogPosts";
import { blogPostsEn } from "@/data/blogPostsEn";
import { blogPostsEs } from "@/data/blogPostsEs";
import type { PageLocale } from "@/data/workLocales";

export interface BlogUIContent {
  seoTitle: string;
  seoDescription: string;
  breadcrumbHome: string;
  breadcrumbSelf: string;
  titlePre: string;
  titleHighlight: string;
  intro: string;
  loading: string;
  readLabel: string;
  loadingArticle: string;
  backToBlog: string;
  previousLabel: string;
  nextLabel: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  dateLocale: string;
}

export const blogAlternates = [
  { hrefLang: "fr", path: "/blog" },
  { hrefLang: "en", path: "/en/blog" },
  { hrefLang: "es", path: "/es/blog" },
];

export const blogCanonicalByLocale: Record<PageLocale, string> = {
  fr: "/blog",
  en: "/en/blog",
  es: "/es/blog",
};

/* Correspondance des slugs des articles de fond entre les trois langues
   (les articles générés n'existent qu'en français). */
export const blogSlugAlternates: { fr: string; en: string; es: string }[] = [
  {
    fr: "pourquoi-faire-appel-expert-ia-entreprise",
    en: "why-hire-an-ai-expert-for-your-business",
    es: "por-que-contratar-un-experto-ia-empresa",
  },
  {
    fr: "audit-ia-entreprise-par-ou-commencer",
    en: "business-ai-audit-where-to-start",
    es: "auditoria-ia-empresa-por-donde-empezar",
  },
  {
    fr: "automatisation-ia-pme-guide-pratique",
    en: "ai-automation-for-smes-practical-guide",
    es: "automatizacion-ia-pymes-guia-practica",
  },
  {
    fr: "ia-force-de-vente-cas-concrets",
    en: "ai-for-sales-teams-real-world-cases",
    es: "ia-fuerza-de-ventas-casos-reales",
  },
  {
    fr: "strategie-ia-entreprise-2026",
    en: "business-ai-strategy-2026-priorities",
    es: "estrategia-ia-empresa-2026",
  },
];

export const getStaticPostsByLocale = (locale: PageLocale): BlogPost[] =>
  locale === "en" ? blogPostsEn : locale === "es" ? blogPostsEs : blogPosts;

export const getArticleAlternates = (slug: string, locale: PageLocale) => {
  const entry = blogSlugAlternates.find((alt) => alt[locale] === slug);
  if (!entry) return undefined;
  return [
    { hrefLang: "fr", path: `/blog/${entry.fr}` },
    { hrefLang: "en", path: `/en/blog/${entry.en}` },
    { hrefLang: "es", path: `/es/blog/${entry.es}` },
  ];
};

export const blogUILocales: Record<PageLocale, BlogUIContent> = {
  fr: {
    seoTitle: "Blog IA Entreprise 2026 | Guides Pratiques — Abel SALAH",
    seoDescription:
      "Guides pratiques IA entreprise 2026 : audit, automatisation, stratégie data et cas concrets. Articles par Abel SALAH, expert IA certifié.",
    breadcrumbHome: "Accueil",
    breadcrumbSelf: "Blog",
    titlePre: "Blog ",
    titleHighlight: "IA Entreprise",
    intro:
      "Guides pratiques, cas concrets et analyses stratégiques pour intégrer l'intelligence artificielle dans votre entreprise.",
    loading: "Chargement des articles...",
    readLabel: "Lire",
    loadingArticle: "Chargement de l'article...",
    backToBlog: "Retour au blog",
    previousLabel: "Précédent",
    nextLabel: "Suivant",
    ctaTitle: "Prêt à intégrer l'IA dans votre entreprise ?",
    ctaText:
      "Discutons de vos enjeux et identifions ensemble les meilleures opportunités IA pour votre activité.",
    ctaButton: "Prendre rendez-vous",
    dateLocale: "fr-FR",
  },
  en: {
    seoTitle: "Business AI Blog 2026 | Practical Guides — Abel SALAH",
    seoDescription:
      "Practical business AI guides for 2026: audit, automation, data strategy and real-world cases. Articles by Abel SALAH, certified AI expert.",
    breadcrumbHome: "Home",
    breadcrumbSelf: "Blog",
    titlePre: "Business ",
    titleHighlight: "AI Blog",
    intro:
      "Practical guides, real-world cases and strategic analysis to bring artificial intelligence into your company.",
    loading: "Loading articles...",
    readLabel: "Read",
    loadingArticle: "Loading article...",
    backToBlog: "Back to blog",
    previousLabel: "Previous",
    nextLabel: "Next",
    ctaTitle: "Ready to bring AI into your company?",
    ctaText: "Let's discuss your challenges and identify the best AI opportunities for your business together.",
    ctaButton: "Book a call",
    dateLocale: "en-GB",
  },
  es: {
    seoTitle: "Blog IA Empresa 2026 | Guías Prácticas — Abel SALAH",
    seoDescription:
      "Guías prácticas de IA para empresas 2026: auditoría, automatización, estrategia data y casos reales. Artículos de Abel SALAH, experto IA certificado.",
    breadcrumbHome: "Inicio",
    breadcrumbSelf: "Blog",
    titlePre: "Blog ",
    titleHighlight: "IA Empresa",
    intro:
      "Guías prácticas, casos reales y análisis estratégicos para integrar la inteligencia artificial en tu empresa.",
    loading: "Cargando artículos...",
    readLabel: "Leer",
    loadingArticle: "Cargando el artículo...",
    backToBlog: "Volver al blog",
    previousLabel: "Anterior",
    nextLabel: "Siguiente",
    ctaTitle: "¿Listo para integrar la IA en tu empresa?",
    ctaText: "Hablemos de tus retos e identifiquemos juntos las mejores oportunidades IA para tu actividad.",
    ctaButton: "Reservar una cita",
    dateLocale: "es-ES",
  },
};
