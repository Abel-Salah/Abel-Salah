import type { PageLocale } from "@/data/workLocales";

export interface AboutContent {
  seoTitle: string;
  seoDescription: string;
  breadcrumbHome: string;
  breadcrumbSelf: string;
  title: string;
  photoAlt: string;
  location: string;
  statementLine1: string;
  statementHighlight: string;
  paragraph1: string;
  paragraph2: string;
  servicesTitle: string;
  services: string[];
  clientsTitle: string;
  clients: string[];
  recognitionTitle: string;
  certifications: string[];
  findMeTitle: string;
  linkedinSub: string;
  youtubeSub: string;
  cvTitle: string;
  cvSub: string;
  buildingTitle: string;
  buildingPre: string;
  buildingHighlight: string;
  buildingPost: string;
  ecosystemLink: string;
  philosophyTitle: string;
  quoteLine1: string;
  quoteLine2: string;
}

export const aboutAlternates = [
  { hrefLang: "fr", path: "/about" },
  { hrefLang: "en", path: "/en/about" },
  { hrefLang: "es", path: "/es/about" },
];

export const aboutCanonicalByLocale: Record<PageLocale, string> = {
  fr: "/about",
  en: "/en/about",
  es: "/es/about",
};

export const aboutLocales: Record<PageLocale, AboutContent> = {
  fr: {
    seoTitle: "Abel SALAH | Expert IA — 16 Ans, 62 Projets Déployés",
    seoDescription:
      "Ancien directeur commercial, aujourd'hui expert IA. Audit gratuit, automatisation et stratégie data pour PME & ETI. 62 projets déployés avec succès.",
    breadcrumbHome: "Accueil",
    breadcrumbSelf: "À propos",
    title: "À propos",
    photoAlt: "Abel SALAH — Expert IA & Consultant en Entreprise",
    location: "France",
    statementLine1: "Je ne vends pas de la technologie.",
    statementHighlight: "Je crée de la valeur business avec l'IA.",
    paragraph1:
      "Avant de devenir consultant IA, j'ai dirigé des équipes commerciales, géré un CA de 4.8M d'euros, et fondé plusieurs entreprises dans le digital. Cette expérience terrain me permet de comprendre les vrais enjeux des dirigeants — pas seulement la tech, mais le business.",
    paragraph2:
      "Après 16 ans d'expérience dans le développement commercial et la transformation digitale, j'ai compris une chose : l'IA n'est utile que si elle sert une stratégie claire. Le reste, c'est du bruit.",
    servicesTitle: "Services",
    services: [
      "Audit & stratégie IA pour dirigeants",
      "Automatisation des processus commerciaux",
      "Intégration d'outils IA (CRM, vente, marketing)",
      "Accompagnement à la transformation digitale",
      "Stratégie data & acquisition client",
      "Déploiement de solutions IA sur mesure",
    ],
    clientsTitle: "Avec qui je travaille",
    clients: [
      "Dirigeants & CEO",
      "Directeurs commerciaux & marketing",
      "Responsables opérations",
      "DSI & CTO",
      "PME, ETI & grands groupes",
    ],
    recognitionTitle: "Reconnaissance",
    certifications: [
      "Master Commerce International",
      "Certifications Google (Ads, Analytics)",
      "Partenaire HubSpot",
    ],
    findMeTitle: "Retrouvez-moi",
    linkedinSub: "Mon réseau & expertise B2B",
    youtubeSub: "Vidéos & retours d'expérience IA",
    cvTitle: "CV",
    cvSub: "Télécharger mon CV consultant IA",
    buildingTitle: "Ce que je construis",
    buildingPre: "Je ne théorise pas l'IA — ",
    buildingHighlight: "je la construis et je l'opère",
    buildingPost: ". 4 produits live, en production.",
    ecosystemLink: "Voir l'écosystème",
    philosophyTitle: "Philosophie",
    quoteLine1: "\"L'IA mal déployée coûte cher.",
    quoteLine2: "L'IA bien déployée change tout.\"",
  },
  en: {
    seoTitle: "Abel SALAH | AI Expert — 16 Years, 62 Projects Delivered",
    seoDescription:
      "Former sales director, now AI expert. Free audit, automation and data strategy for SMEs and mid-caps. 62 projects successfully delivered.",
    breadcrumbHome: "Home",
    breadcrumbSelf: "About",
    title: "About",
    photoAlt: "Abel SALAH — AI Expert & Business Consultant",
    location: "France",
    statementLine1: "I don't sell technology.",
    statementHighlight: "I create business value with AI.",
    paragraph1:
      "Before becoming an AI consultant, I led sales teams, managed €4.8M in revenue, and founded several digital companies. That hands-on experience means I understand executives' real challenges — not just the tech, but the business.",
    paragraph2:
      "After 16 years in business development and digital transformation, I've learned one thing: AI is only useful when it serves a clear strategy. The rest is noise.",
    servicesTitle: "Services",
    services: [
      "AI audit & strategy for executives",
      "Sales process automation",
      "AI tool integration (CRM, sales, marketing)",
      "Digital transformation support",
      "Data strategy & customer acquisition",
      "Custom AI solution deployment",
    ],
    clientsTitle: "Who I work with",
    clients: [
      "Founders & CEOs",
      "Sales & marketing directors",
      "Operations managers",
      "CIOs & CTOs",
      "SMEs, mid-caps & large groups",
    ],
    recognitionTitle: "Recognition",
    certifications: [
      "Master's in International Business",
      "Google certifications (Ads, Analytics)",
      "HubSpot partner",
    ],
    findMeTitle: "Find me",
    linkedinSub: "My network & B2B expertise",
    youtubeSub: "Videos & AI field experience",
    cvTitle: "Resume",
    cvSub: "View my AI consultant resume",
    buildingTitle: "What I build",
    buildingPre: "I don't theorise about AI — ",
    buildingHighlight: "I build and operate it",
    buildingPost: ". 4 live products, in production.",
    ecosystemLink: "See the ecosystem",
    philosophyTitle: "Philosophy",
    quoteLine1: "\"Poorly deployed AI is expensive.",
    quoteLine2: "Well-deployed AI changes everything.\"",
  },
  es: {
    seoTitle: "Abel SALAH | Experto IA — 16 Años, 62 Proyectos Desplegados",
    seoDescription:
      "Ex director comercial, hoy experto en IA. Auditoría gratuita, automatización y estrategia data para pymes. 62 proyectos desplegados con éxito.",
    breadcrumbHome: "Inicio",
    breadcrumbSelf: "Sobre mí",
    title: "Sobre mí",
    photoAlt: "Abel SALAH — Experto IA y Consultor de Empresas",
    location: "Francia",
    statementLine1: "No vendo tecnología.",
    statementHighlight: "Creo valor de negocio con la IA.",
    paragraph1:
      "Antes de ser consultor IA, dirigí equipos comerciales, gestioné una facturación de 4,8 M€ y fundé varias empresas digitales. Esa experiencia de campo me permite entender los verdaderos retos de los directivos: no solo la tecnología, sino el negocio.",
    paragraph2:
      "Tras 16 años de experiencia en desarrollo comercial y transformación digital, he aprendido una cosa: la IA solo es útil si sirve a una estrategia clara. Lo demás es ruido.",
    servicesTitle: "Servicios",
    services: [
      "Auditoría y estrategia IA para directivos",
      "Automatización de procesos comerciales",
      "Integración de herramientas IA (CRM, ventas, marketing)",
      "Acompañamiento en la transformación digital",
      "Estrategia data y captación de clientes",
      "Despliegue de soluciones IA a medida",
    ],
    clientsTitle: "Con quién trabajo",
    clients: [
      "Fundadores y CEO",
      "Directores comerciales y de marketing",
      "Responsables de operaciones",
      "CIO y CTO",
      "Pymes, medianas empresas y grandes grupos",
    ],
    recognitionTitle: "Reconocimiento",
    certifications: [
      "Máster en Comercio Internacional",
      "Certificaciones Google (Ads, Analytics)",
      "Partner de HubSpot",
    ],
    findMeTitle: "Encuéntrame",
    linkedinSub: "Mi red y experiencia B2B",
    youtubeSub: "Vídeos y experiencias reales con IA",
    cvTitle: "CV",
    cvSub: "Ver mi CV de consultor IA",
    buildingTitle: "Lo que construyo",
    buildingPre: "No teorizo sobre la IA — ",
    buildingHighlight: "la construyo y la opero",
    buildingPost: ". 4 productos live, en producción.",
    ecosystemLink: "Ver el ecosistema",
    philosophyTitle: "Filosofía",
    quoteLine1: "\"La IA mal desplegada sale cara.",
    quoteLine2: "La IA bien desplegada lo cambia todo.\"",
  },
};
