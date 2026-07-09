import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import { getPostBySlug, getAdjacentPosts } from "@/data/blogPosts";
import { getGeneratedPostBySlug } from "@/hooks/useGeneratedBlogPosts";

const SITE_URL = "https://abelsalah.fr";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  // Try static first
  const staticPost = slug ? getPostBySlug(slug) : undefined;
  const adjacent = slug ? getAdjacentPosts(slug) : { previous: null, next: null };

  // If not static, try generated
  const { data: generatedPost, isLoading } = useQuery({
    queryKey: ["generated-post", slug],
    queryFn: () => getGeneratedPostBySlug(slug!),
    enabled: !staticPost && !!slug,
  });

  const post = staticPost || generatedPost;

  if (isLoading && !staticPost) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          Chargement de l'article...
        </div>
      </main>
    );
  }

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
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
            mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
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
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("fr-FR", {
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
                <p
                  key={j}
                  className="text-muted-foreground leading-relaxed mb-4 last:mb-0"
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(
                      /\*\*(.*?)\*\*/g,
                      "<strong class='text-foreground'>$1</strong>"
                    ),
                  }}
                />
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
          <h3 className="text-xl font-bold mb-3">
            Prêt à intégrer l'IA dans votre entreprise ?
          </h3>
          <p className="text-muted-foreground mb-6">
            Discutons de vos enjeux et identifions ensemble les meilleures
            opportunités IA pour votre activité.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Prendre rendez-vous
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Adjacent navigation (only for static posts) */}
        {staticPost && (
          <nav className="mt-12 pt-8 border-t border-border flex justify-between gap-4">
            {adjacent.previous ? (
              <Link
                to={`/blog/${adjacent.previous.slug}`}
                className="group flex-1 text-left"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Précédent
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
                to={`/blog/${adjacent.next.slug}`}
                className="group flex-1 text-right"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Suivant
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
