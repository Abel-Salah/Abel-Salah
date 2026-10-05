import { useParams, Link, Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import SEOHead from "@/components/SEOHead";
import {
  blogCanonicalByLocale,
  blogUILocales,
  getArticleAlternates,
  getStaticPostsByLocale,
} from "@/data/blogLocales";
import { contactCanonicalByLocale } from "@/data/contactLocales";
import { getGeneratedPostBySlug } from "@/hooks/useGeneratedBlogPosts";
import { getInjectedPostBySlug } from "@/services/generatedBlogPosts";
import type { PageLocale } from "@/data/workLocales";

const SITE_URL = "https://abelsalah.fr";

const BlogPost = ({ locale = "fr" }: { locale?: PageLocale }) => {
  const { slug } = useParams<{ slug: string }>();
  const t = blogUILocales[locale];
  const blogBase = blogCanonicalByLocale[locale];
  const staticPosts = getStaticPostsByLocale(locale);

  // Article de fond dans la langue courante
  const staticPost = slug ? staticPosts.find((post) => post.slug === slug) : undefined;
  const staticIndex = slug ? staticPosts.findIndex((post) => post.slug === slug) : -1;
  const adjacent = {
    previous: staticIndex > 0 ? staticPosts[staticIndex - 1] : null,
    next: staticIndex >= 0 && staticIndex < staticPosts.length - 1 ? staticPosts[staticIndex + 1] : null,
  };

  // Sinon, article généré dans la langue courante
  const { data: generatedPost, isLoading } = useQuery({
    queryKey: ["generated-post", locale, slug],
    queryFn: () => getGeneratedPostBySlug(slug!, locale),
    // !staticPost suffit déjà en pratique (seuls des articles statiques sont
    // pré-rendus) ; !SSR documente explicitement l'intention pour le SSR.
    enabled: !staticPost && !!slug && !import.meta.env.SSR,
    initialData: import.meta.env.SSR && slug ? getInjectedPostBySlug(slug, locale) : undefined,
  });

  const post = staticPost || generatedPost;

  if (isLoading && !staticPost) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          {t.loadingArticle}
        </div>
      </main>
    );
  }

  if (!post) return <Navigate to={blogBase} replace />;

  const articleAlternates = staticPost ? getArticleAlternates(post.slug, locale) : undefined;

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={`${blogBase}/${post.slug}`}
        ogType="article"
        lang={locale}
        alternates={articleAlternates}
        breadcrumbs={[
          { name: t.breadcrumbHome, path: locale === "fr" ? "/" : `/${locale}` },
          { name: t.breadcrumbSelf, path: blogBase },
          { name: post.title, path: `${blogBase}/${post.slug}` },
        ]}
      />
      <Helmet>
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Abel SALAH" />
        {post.tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.date,
            dateModified: post.date,
            image: [
              "https://storage.googleapis.com/gpt-engineer-file-uploads/yFKPGRyIVtelP0DcFywODGT5Ywu2/social-images/social-1771719056921-ABEL_SALAH.webp",
            ],
            author: {
              "@type": "Person",
              name: "Abel SALAH",
              url: `${SITE_URL}/about`,
            },
            publisher: {
              "@type": "Organization",
              name: "Abel SALAH - Expert IA",
              url: SITE_URL,
              logo: {
                "@type": "ImageObject",
                url: "https://storage.googleapis.com/gpt-engineer-file-uploads/yFKPGRyIVtelP0DcFywODGT5Ywu2/social-images/social-1771719056921-ABEL_SALAH.webp",
              },
            },
            mainEntityOfPage: `${SITE_URL}${blogBase}/${post.slug}`,
          })}
        </script>
      </Helmet>

      <article className="container mx-auto px-4 md:px-6 max-w-3xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            to={blogBase}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToBlog}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="label-mono flex flex-wrap items-center gap-4 mb-4 text-xs uppercase tracking-wider text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString(t.dateLocale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="heading-display text-3xl md:text-5xl mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-10"
        >
          {post.content.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                {section.title}
              </h2>
              {section.content.map((paragraph, j) => (
                <ReactMarkdown
                  key={j}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSanitize]}
                  components={{
                    p: ({ children }) => (
                      <p className="text-[17px] md:text-lg leading-[1.75] text-muted-foreground mb-4 last:mb-0">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">
                        {children}
                      </strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-4 list-decimal space-y-2 pl-6 text-muted-foreground">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-[17px] md:text-lg leading-[1.75]">{children}</li>
                    ),
                  }}
                >
                  {paragraph}
                </ReactMarkdown>
              ))}
            </section>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 p-8 rounded-lg border border-primary/30 bg-primary/5 text-center"
        >
          <h3 className="text-xl font-bold mb-3">{t.ctaTitle}</h3>
          <p className="text-muted-foreground mb-6">{t.ctaText}</p>
          <Link
            to={contactCanonicalByLocale[locale]}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {t.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Adjacent navigation (only for static posts) */}
        {staticPost && (
          <nav className="mt-12 pt-8 border-t border-border flex justify-between gap-4">
            {adjacent.previous ? (
              <Link
                to={`${blogBase}/${adjacent.previous.slug}`}
                className="group flex-1 text-left"
              >
                <span className="label-mono text-xs text-muted-foreground uppercase tracking-wider">
                  {t.previousLabel}
                </span>
                <p className="text-sm font-medium group-hover:text-primary transition-colors mt-1">
                  {adjacent.previous.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {adjacent.next ? (
              <Link
                to={`${blogBase}/${adjacent.next.slug}`}
                className="group flex-1 text-right"
              >
                <span className="label-mono text-xs text-muted-foreground uppercase tracking-wider">
                  {t.nextLabel}
                </span>
                <p className="text-sm font-medium group-hover:text-primary transition-colors mt-1">
                  {adjacent.next.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </article>
    </main>
  );
};

export default BlogPost;
