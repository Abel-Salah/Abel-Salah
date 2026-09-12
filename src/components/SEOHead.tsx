import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  lang?: "fr" | "en" | "es";
  alternates?: { hrefLang: string; path: string }[];
  breadcrumbs?: { name: string; path: string }[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const SITE_URL = "https://abelsalah.fr";
const OG_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/yFKPGRyIVtelP0DcFywODGT5Ywu2/social-images/social-1771719056921-ABEL_SALAH.webp";

const SEOHead = ({
  title,
  description,
  canonical,
  ogType = "website",
  lang = "fr",
  alternates,
  breadcrumbs,
  jsonLd,
  noindex = false,
}: SEOHeadProps) => {
  const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const ogLocale = lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "fr_FR";
  /* x-default = version FR (premier alternate) quand la page a des variantes
     de langue ; sinon la page elle-même (pas de version alternative à
     préférer), cohérent avec le hreflang="self" émis juste en dessous. */
  const xDefaultHref = alternates?.length
    ? `${SITE_URL}${alternates[0].path === "/" ? "" : alternates[0].path}`
    : fullCanonical;

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${SITE_URL}${crumb.path}`
    }))
  } : null;

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Abel SALAH" />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={fullCanonical} />
      {alternates ? (
        alternates.map((alternate) => (
          <link
            key={alternate.hrefLang}
            rel="alternate"
            hrefLang={alternate.hrefLang}
            href={`${SITE_URL}${alternate.path}`}
          />
        ))
      ) : (
        <link rel="alternate" hrefLang={lang} href={fullCanonical} />
      )}
      <link rel="alternate" hrefLang="x-default" href={xDefaultHref} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Abel SALAH — Consultant IA & AI Transformation Lead" />
      <meta property="og:locale" content={ogLocale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content="Abel SALAH — Consultant IA & AI Transformation Lead" />

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
