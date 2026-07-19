/* Pages locales « Expert IA + ville » : contenu différencié par ville
   (Google traite les pages villes dupliquées comme des doorway pages —
   chaque entrée doit rester réellement spécifique). */

export type LocationLang = "fr" | "es";

export interface LocationContent {
  slug: string;
  path: string;
  lang: LocationLang;
  city: string;
  country: string;
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  titlePre: string;
  titleHighlight: string;
  intro: string[];
  servicesTitle: string;
  services: { title: string; text: string; to: string; linkLabel: string }[];
  localTitle: string;
  local: string[];
  sectorsTitle: string;
  sectors: string[];
  termsTitle: string;
  terms: { label: string; value: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  ctaContactLabel: string;
  breadcrumbHome: string;
  otherCitiesTitle: string;
}

export const locations: LocationContent[] = [
  {
    slug: "expert-ia-montpellier",
    path: "/expert-ia-montpellier",
    lang: "fr",
    city: "Montpellier",
    country: "FR",
    seoTitle: "Expert IA à Montpellier | Audit, Automatisation, Formation — Abel SALAH",
    seoDescription:
      "Consultant IA basé à Montpellier : audit IA, automatisation des processus et formation des équipes, sur place dans vos locaux. Audit découverte gratuit.",
    kicker: "Expert IA — Montpellier",
    titlePre: "Expert IA à ",
    titleHighlight: "Montpellier",
    intro: [
      "Je suis basé à Montpellier : c'est mon port d'attache et le terrain le plus simple pour travailler ensemble. Rendez-vous en personne sous quelques jours, ateliers dans vos locaux, suivi de proximité sans frais de déplacement.",
      "J'accompagne les PME, ETI et dirigeants de l'Hérault dans l'intégration concrète de l'IA : identifier les bons cas d'usage, automatiser les processus qui coûtent du temps, former les équipes pour que l'adoption tienne dans la durée.",
    ],
    servicesTitle: "Ce que je fais sur place",
    services: [
      {
        title: "Audit IA",
        text: "Une immersion dans vos processus, dans vos locaux : diagnostic, priorisation ROI et feuille de route 30/60/90 jours.",
        to: "/audit-ia",
        linkLabel: "Découvrir l'audit IA",
      },
      {
        title: "Automatisation commerciale",
        text: "Prospection, scoring de leads, CRM : des automatisations construites avec vos équipes commerciales, en atelier.",
        to: "/automatisation-commerciale",
        linkLabel: "Découvrir l'automatisation",
      },
      {
        title: "Formation IA",
        text: "Ateliers pratiques par métier, dans vos bureaux : prompting utile, cas d'usage réels, routines d'adoption.",
        to: "/formation-ia",
        linkLabel: "Découvrir la formation",
      },
    ],
    localTitle: "Un ancrage montpelliérain réel",
    local: [
      "Montpellier est l'un des écosystèmes tech les plus dynamiques de France : French Tech, éditeurs SaaS, santé et medtech, tourisme, immobilier. C'est ici que je conçois et opère mes propres produits IA — dont Immo Montpellier, premier chasseur immobilier IA de la ville.",
      "Travailler avec un expert IA local, c'est des boucles courtes : un point dans vos locaux plutôt qu'une visio de plus, des ateliers réguliers avec vos équipes, et un interlocuteur qui connaît le tissu économique de la métropole.",
    ],
    sectorsTitle: "Secteurs accompagnés dans la région",
    sectors: ["SaaS & éditeurs", "Santé & medtech", "Formation", "Immobilier", "Tourisme", "Services B2B"],
    termsTitle: "Modalités",
    terms: [
      { label: "Présence", value: "Sur place à Montpellier et dans l'Hérault, sans frais de déplacement" },
      { label: "Formats", value: "Audit, ateliers en équipe, accompagnement mensuel, formation" },
      { label: "Langues", value: "Français, espagnol, anglais" },
      { label: "Premier rendez-vous", value: "Audit découverte gratuit de 30 minutes, en personne ou en visio" },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Intervenez-vous directement dans nos locaux à Montpellier ?",
        a: "Oui, c'est même le format que je recommande : les audits et les ateliers sont plus efficaces sur place, au contact des équipes et des processus réels. Étant basé à Montpellier, je me déplace dans toute la métropole et l'Hérault sans frais.",
      },
      {
        q: "Quels types d'entreprises accompagnez-vous à Montpellier ?",
        a: "Principalement des PME, ETI et scale-ups : éditeurs SaaS, organismes de formation, acteurs de la santé, de l'immobilier et des services B2B. Le point commun : des processus métier où l'IA peut créer un gain mesurable.",
      },
      {
        q: "Comment démarre une collaboration ?",
        a: "Par un audit découverte gratuit de 30 minutes. On identifie ensemble 2-3 cas d'usage prioritaires, puis je vous propose une feuille de route avec un périmètre, un calendrier et des indicateurs de succès.",
      },
    ],
    ctaTitle: "Parlons de votre projet IA autour d'un café à Montpellier",
    ctaText: "Réservez un créneau : audit découverte gratuit, en personne ou en visio.",
    ctaButton: "Réserver un créneau",
    ctaContactLabel: "Ou passez par la page contact",
    breadcrumbHome: "Accueil",
    otherCitiesTitle: "J'interviens aussi à",
  },
  {
    slug: "expert-ia-paris",
    path: "/expert-ia-paris",
    lang: "fr",
    city: "Paris",
    country: "FR",
    seoTitle: "Expert IA à Paris | Audit, Automatisation, Formation — Abel SALAH",
    seoDescription:
      "Consultant IA intervenant régulièrement à Paris : audit IA, automatisation et formation pour grands comptes, scale-ups et PME. Formats denses sur 1 à 2 jours sur site.",
    kicker: "Expert IA — Paris",
    titlePre: "Expert IA à ",
    titleHighlight: "Paris",
    intro: [
      "J'interviens régulièrement à Paris pour des grands comptes, des scale-ups et des PME en croissance. Le format qui fonctionne : des séquences denses de un à deux jours sur site — audit flash, ateliers direction, formation d'équipes — puis un suivi à distance resserré.",
      "Paris concentre les sièges et les directions : c'est là que se décident les feuilles de route IA. Mon rôle est d'apporter un regard opérationnel — pas un rapport de plus, mais des cas d'usage priorisés, chiffrés, et un plan que vos équipes peuvent exécuter.",
    ],
    servicesTitle: "Ce que je fais sur site à Paris",
    services: [
      {
        title: "Audit IA",
        text: "Un ou deux jours d'immersion au siège : entretiens métiers, diagnostic des processus, restitution en comité de direction.",
        to: "/audit-ia",
        linkLabel: "Découvrir l'audit IA",
      },
      {
        title: "Automatisation commerciale",
        text: "Cadrage sur site avec la direction commerciale, puis déploiement des automatisations en sprints à distance.",
        to: "/automatisation-commerciale",
        linkLabel: "Découvrir l'automatisation",
      },
      {
        title: "Formation IA",
        text: "Séminaires direction et ateliers métiers dans vos bureaux : acculturation, prompting, cas d'usage par département.",
        to: "/formation-ia",
        linkLabel: "Découvrir la formation",
      },
    ],
    localTitle: "L'expérience des organisations parisiennes",
    local: [
      "J'ai accompagné des organisations nationales dont les décisions se prennent à Paris — dont Docaposte (groupe La Poste), Maisons du Monde ou L'École Française — sur des sujets d'automatisation, de copilotes IA et de formation d'équipes.",
      "Le format « expert externe basé en région » est un avantage à Paris : des interventions sur site concentrées et préparées, une exécution à distance efficace entre deux déplacements, et un coût de mission maîtrisé par rapport aux cabinets parisiens.",
    ],
    sectorsTitle: "Profils accompagnés à Paris",
    sectors: ["Grands comptes", "Scale-ups", "Directions commerciales", "Directions formation", "ESN & conseil", "Retail"],
    termsTitle: "Modalités",
    terms: [
      { label: "Présence", value: "Déplacements réguliers à Paris, interventions de 1 à 2 jours sur site" },
      { label: "Formats", value: "Audit flash, séminaire direction, formation intra, accompagnement mensuel" },
      { label: "Langues", value: "Français, espagnol, anglais" },
      { label: "Premier rendez-vous", value: "Audit découverte gratuit de 30 minutes en visio" },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Vous déplacez-vous à Paris pour une mission ?",
        a: "Oui, j'interviens régulièrement à Paris. Les missions s'organisent en séquences sur site de un à deux jours — audit, ateliers, restitutions — complétées par un suivi à distance. Ce format concentre l'impact et limite les coûts.",
      },
      {
        q: "Travaillez-vous avec des grands comptes ?",
        a: "Oui. J'ai notamment accompagné Docaposte et Maisons du Monde. Pour les grands comptes, je travaille en général avec une direction métier sur un périmètre précis, avec des indicateurs définis dès le cadrage.",
      },
      {
        q: "Quel est le délai pour démarrer ?",
        a: "L'audit découverte se planifie sous quelques jours en visio. Pour une intervention sur site à Paris, comptez généralement une à trois semaines selon l'agenda.",
      },
    ],
    ctaTitle: "Un projet IA à Paris ?",
    ctaText: "Réservez un créneau : audit découverte gratuit de 30 minutes, puis planifions l'intervention sur site.",
    ctaButton: "Réserver un créneau",
    ctaContactLabel: "Ou passez par la page contact",
    breadcrumbHome: "Accueil",
    otherCitiesTitle: "J'interviens aussi à",
  },
  {
    slug: "expert-ia-marseille",
    path: "/expert-ia-marseille",
    lang: "fr",
    city: "Marseille",
    country: "FR",
    seoTitle: "Expert IA à Marseille | Audit, Automatisation, Formation — Abel SALAH",
    seoDescription:
      "Consultant IA à Marseille et en région Sud : audit IA, automatisation et formation. Référence locale : le standard IA de la Ville de Marseille, 300 demandes par jour.",
    kicker: "Expert IA — Marseille",
    titlePre: "Expert IA à ",
    titleHighlight: "Marseille",
    intro: [
      "Marseille est à moins de deux heures de ma base montpelliéraine : j'y interviens facilement, à la journée ou à la demi-journée, pour des audits, des ateliers et des formations dans vos locaux.",
      "C'est aussi une ville où mon travail tourne déjà en production : j'ai conçu pour la Ville de Marseille un standard IA qui oriente automatiquement les usagers vers les bons services — environ 300 demandes traitées par jour.",
    ],
    servicesTitle: "Ce que je fais sur place",
    services: [
      {
        title: "Audit IA",
        text: "Diagnostic de vos processus dans vos locaux marseillais, priorisation ROI et feuille de route 30/60/90 jours.",
        to: "/audit-ia",
        linkLabel: "Découvrir l'audit IA",
      },
      {
        title: "Automatisation commerciale",
        text: "Prospection, relances, CRM : des automatisations cadrées en atelier avec vos équipes, déployées en sprints.",
        to: "/automatisation-commerciale",
        linkLabel: "Découvrir l'automatisation",
      },
      {
        title: "Formation IA",
        text: "Ateliers pratiques par métier pour vos équipes marseillaises : cas d'usage réels, prompting, adoption terrain.",
        to: "/formation-ia",
        linkLabel: "Découvrir la formation",
      },
    ],
    localTitle: "Une référence qui tourne à Marseille",
    local: [
      "Le standard IA déployé pour la Ville de Marseille est l'un de mes projets les plus parlants : un agent IA métier qui comprend la demande d'un usager et l'oriente vers le bon service, automatiquement, avec un gain net de réactivité. C'est le genre de résultat concret que je vise pour chaque mission.",
      "Au-delà du secteur public, la région Aix-Marseille regorge de PME et d'ETI — logistique, maritime, services, santé — où les mêmes mécaniques s'appliquent : automatiser l'accueil des demandes, la qualification commerciale et les tâches répétitives.",
    ],
    sectorsTitle: "Secteurs accompagnés en région Sud",
    sectors: ["Secteur public", "Logistique & maritime", "Services B2B", "Santé", "Formation", "Commerce"],
    termsTitle: "Modalités",
    terms: [
      { label: "Présence", value: "Interventions à la journée ou demi-journée à Marseille et Aix-en-Provence" },
      { label: "Formats", value: "Audit, ateliers en équipe, accompagnement mensuel, formation" },
      { label: "Langues", value: "Français, espagnol, anglais" },
      { label: "Premier rendez-vous", value: "Audit découverte gratuit de 30 minutes, en visio ou sur place" },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Quelle référence avez-vous à Marseille ?",
        a: "J'ai conçu le standard IA de la Ville de Marseille : un agent qui oriente automatiquement les usagers vers les bons services, avec environ 300 demandes traitées par jour. Le projet illustre bien ma méthode : un cas d'usage précis, un déploiement mesuré, un gain observable.",
      },
      {
        q: "Vous déplacez-vous facilement à Marseille ?",
        a: "Oui. Basé à Montpellier, je suis à Marseille en moins de deux heures : les interventions sur site à la journée ou à la demi-journée s'organisent simplement, sans coût de déplacement dissuasif.",
      },
      {
        q: "Accompagnez-vous les acteurs publics ?",
        a: "Oui, le projet mené pour la Ville de Marseille en est l'exemple. Les collectivités ont des gisements d'automatisation importants : accueil des demandes, orientation, traitement de documents — avec des contraintes de souveraineté que je prends en compte.",
      },
    ],
    ctaTitle: "Un projet IA à Marseille ou en région Sud ?",
    ctaText: "Réservez un créneau : audit découverte gratuit, puis planifions une intervention sur place.",
    ctaButton: "Réserver un créneau",
    ctaContactLabel: "Ou passez par la page contact",
    breadcrumbHome: "Accueil",
    otherCitiesTitle: "J'interviens aussi à",
  },
  {
    slug: "experto-ia-malaga",
    path: "/es/experto-ia-malaga",
    lang: "es",
    city: "Málaga",
    country: "ES",
    seoTitle: "Experto en IA en Málaga | Auditoría, Automatización, Formación — Abel SALAH",
    seoDescription:
      "Consultor de IA en Málaga: auditoría IA, automatización de procesos y formación de equipos, directamente en español. Eje Francia–España, auditoría inicial gratuita.",
    kicker: "Experto IA — Málaga",
    titlePre: "Experto en IA en ",
    titleHighlight: "Málaga",
    intro: [
      "Trabajo entre Francia y España, y Málaga es una de mis bases naturales: intervengo presencialmente con regularidad y acompaño a las empresas andaluzas directamente en español, sin intermediarios ni traducciones.",
      "Ayudo a pymes y empresas en crecimiento a integrar la IA donde realmente aporta valor: identificar los casos de uso adecuados, automatizar los procesos que consumen tiempo y formar a los equipos para que la adopción sea duradera.",
    ],
    servicesTitle: "Qué hago in situ",
    services: [
      {
        title: "Auditoría IA",
        text: "Inmersión en tus procesos, en tus oficinas: diagnóstico, priorización por ROI y hoja de ruta 30/60/90 días.",
        to: "/es/auditoria-ia",
        linkLabel: "Descubrir la auditoría IA",
      },
      {
        title: "Automatización comercial",
        text: "Prospección, scoring de leads, CRM: automatizaciones construidas en taller con tu equipo comercial.",
        to: "/es/automatizacion-comercial",
        linkLabel: "Descubrir la automatización",
      },
      {
        title: "Formación IA",
        text: "Talleres prácticos por área, en tus oficinas: prompting útil, casos de uso reales, rutinas de adopción.",
        to: "/es/formacion-ia",
        linkLabel: "Descubrir la formación",
      },
    ],
    localTitle: "Málaga, hub tecnológico del sur de Europa",
    local: [
      "Entre el Málaga TechPark, la llegada de centros tecnológicos internacionales y un tejido de pymes muy dinámico, Málaga se ha convertido en uno de los polos tech más activos de España. Es un terreno ideal para proyectos de IA aplicada: turismo, inmobiliario, servicios, comercio.",
      "Mi propuesta para las empresas malagueñas: la experiencia de más de 60 proyectos de IA en Francia — automatización comercial, copilotos IA, formación — aplicada en español y adaptada a la realidad local, con presencia regular in situ.",
    ],
    sectorsTitle: "Sectores acompañados en Andalucía",
    sectors: ["Turismo & hostelería", "Inmobiliario", "Servicios B2B", "Comercio", "Formación", "Tech & SaaS"],
    termsTitle: "Modalidades",
    terms: [
      { label: "Presencia", value: "Intervenciones presenciales regulares en Málaga y provincia" },
      { label: "Formatos", value: "Auditoría, talleres de equipo, acompañamiento mensual, formación" },
      { label: "Idiomas", value: "Español (bilingüe), francés, inglés" },
      { label: "Primera cita", value: "Auditoría inicial gratuita de 30 minutos, presencial o por videollamada" },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Trabajas directamente en español?",
        a: "Sí, soy bilingüe: las auditorías, los talleres y la formación se hacen íntegramente en español, sin intermediarios. También puedo trabajar en francés o inglés si tu equipo es internacional.",
      },
      {
        q: "¿Intervienes presencialmente en Málaga?",
        a: "Sí, intervengo con regularidad en Málaga y su provincia. El formato habitual: sesiones presenciales para la auditoría y los talleres, y seguimiento a distancia entre visitas.",
      },
      {
        q: "¿Qué tipo de empresas acompañas en España?",
        a: "Principalmente pymes y empresas en crecimiento de turismo, inmobiliario, comercio y servicios: negocios con procesos comerciales y administrativos donde la IA genera ganancias medibles de tiempo y conversión.",
      },
    ],
    ctaTitle: "¿Un proyecto de IA en Málaga?",
    ctaText: "Reserva un hueco: auditoría inicial gratuita de 30 minutos, en español.",
    ctaButton: "Reservar una cita",
    ctaContactLabel: "O pasa por la página de contacto",
    breadcrumbHome: "Inicio",
    otherCitiesTitle: "También intervengo en",
  },
  {
    slug: "experto-ia-barcelona",
    path: "/es/experto-ia-barcelona",
    lang: "es",
    city: "Barcelona",
    country: "ES",
    seoTitle: "Experto en IA en Barcelona | Auditoría, Automatización, Formación — Abel SALAH",
    seoDescription:
      "Consultor de IA en Barcelona: auditoría IA, automatización comercial y formación de equipos en español, francés o inglés. Auditoría inicial gratuita para pymes y scale-ups.",
    kicker: "Experto IA — Barcelona",
    titlePre: "Experto en IA en ",
    titleHighlight: "Barcelona",
    intro: [
      "Barcelona es el primer ecosistema startup de España y una de las capitales tech del sur de Europa. Intervengo allí para pymes, scale-ups y equipos internacionales, en español, francés o inglés según tu equipo.",
      "Mi enfoque: nada de presentaciones teóricas. Una auditoría de tus procesos, dos o tres casos de uso priorizados por ROI, y un despliegue acompañado con formación de los equipos para que la IA se quede.",
    ],
    servicesTitle: "Qué hago in situ",
    services: [
      {
        title: "Auditoría IA",
        text: "Uno o dos días de inmersión en tus oficinas: entrevistas por área, diagnóstico y hoja de ruta accionable.",
        to: "/es/auditoria-ia",
        linkLabel: "Descubrir la auditoría IA",
      },
      {
        title: "Automatización comercial",
        text: "Prospección, scoring, CRM: cadencia de sprints con tu equipo comercial, con validación humana en cada paso.",
        to: "/es/automatizacion-comercial",
        linkLabel: "Descubrir la automatización",
      },
      {
        title: "Formación IA",
        text: "Talleres por departamento, del comité de dirección a los equipos operativos, en español, francés o inglés.",
        to: "/es/formacion-ia",
        linkLabel: "Descubrir la formación",
      },
    ],
    localTitle: "Un perfil pensado para el ecosistema barcelonés",
    local: [
      "Barcelona combina startups, scale-ups internacionales y pymes industriales y de servicios. Es exactamente el tipo de tejido donde he trabajado en Francia: más de 60 proyectos de IA entregados, de la automatización comercial a los copilotos IA y la formación de equipos.",
      "Para los equipos internacionales de Barcelona, trabajo indistintamente en español, francés o inglés — un mismo interlocutor para la dirección local y la matriz extranjera, en el eje Francia–España.",
    ],
    sectorsTitle: "Perfiles acompañados en Barcelona",
    sectors: ["Startups & scale-ups", "SaaS & tech", "Industria & logística", "Servicios B2B", "Comercio", "Formación"],
    termsTitle: "Modalidades",
    terms: [
      { label: "Presencia", value: "Desplazamientos regulares a Barcelona, sesiones de 1 a 2 días in situ" },
      { label: "Formatos", value: "Auditoría, talleres, acompañamiento mensual, formación intra" },
      { label: "Idiomas", value: "Español (bilingüe), francés, inglés" },
      { label: "Primera cita", value: "Auditoría inicial gratuita de 30 minutos por videollamada" },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Trabajas con equipos internacionales en Barcelona?",
        a: "Sí, es uno de mis puntos fuertes: trabajo indistintamente en español, francés e inglés. Puedo formar a un equipo local en español y presentar los resultados a una dirección francesa o internacional sin fricción.",
      },
      {
        q: "¿Cómo se organiza una misión en Barcelona?",
        a: "En sesiones presenciales de uno o dos días — auditoría, talleres, restituciones — completadas con seguimiento a distancia. La primera cita es una auditoría inicial gratuita de 30 minutos por videollamada.",
      },
      {
        q: "¿Qué resultados puedo esperar?",
        a: "Depende del punto de partida: los proyectos que acompaño apuntan a ganancias medibles de tiempo y conversión, con indicadores definidos desde el inicio. Los casos publicados en la web sirven de referencia, no de promesa.",
      },
    ],
    ctaTitle: "¿Un proyecto de IA en Barcelona?",
    ctaText: "Reserva un hueco: auditoría inicial gratuita de 30 minutos, en el idioma de tu equipo.",
    ctaButton: "Reservar una cita",
    ctaContactLabel: "O pasa por la página de contacto",
    breadcrumbHome: "Inicio",
    otherCitiesTitle: "También intervengo en",
  },
];

export const locationBySlug: Record<string, LocationContent> = Object.fromEntries(
  locations.map((location) => [location.slug, location])
);

export const locationLinks = locations.map(({ path, city }) => ({ path, city }));
