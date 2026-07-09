import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  noindex?: boolean;
  breadcrumbs?: { name: string; path: string }[];
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = "https://abelsalah.fr";
const OG_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/390e6aa2-6998-4951-8b6c-23a48e10b181";

const SEOHead = ({
  title,
  description,
  canonical,
  ogType = "website",
  noindex = false,
  breadcrumbs,
  schema,
}: SEOHeadProps) => {
  const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

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
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Abel SALAH" />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullCanonical} />
      <link rel="alternate" hrefLang="fr" href={fullCanonical} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {schemas.map((schemaItem, index) => (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(schemaItem)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
