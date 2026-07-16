import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import {
  blogAlternates,
  blogCanonicalByLocale,
  blogUILocales,
  getStaticPostsByLocale,
} from "@/data/blogLocales";
import { useGeneratedBlogPosts } from "@/hooks/useGeneratedBlogPosts";
import { useMemo } from "react";
import type { PageLocale } from "@/data/workLocales";

const Blog = ({ locale = "fr" }: { locale?: PageLocale }) => {
  const t = blogUILocales[locale];
  const blogBase = blogCanonicalByLocale[locale];
  const { data: generatedPosts = [], isLoading } = useGeneratedBlogPosts(locale);

  const allPosts = useMemo(() => {
    const merged = [...getStaticPostsByLocale(locale), ...generatedPosts];
    merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return merged;
  }, [generatedPosts, locale]);

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDescription}
        canonical={blogBase}
        lang={locale}
        alternates={blogAlternates}
        breadcrumbs={[
          { name: t.breadcrumbHome, path: locale === "fr" ? "/" : `/${locale}` },
          { name: t.breadcrumbSelf, path: blogBase },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="heading-display text-4xl md:text-6xl mb-6">
            {t.titlePre}
            <span className="text-primary">{t.titleHighlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground">{t.intro}</p>
        </motion.div>

        {isLoading && (
          <div className="text-center text-muted-foreground mb-8">{t.loading}</div>
        )}

        <div className="grid gap-8 md:gap-12">
          {allPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`${blogBase}/${post.slug}`} className="block">
                <div className="border border-border rounded-lg p-6 md:p-8 hover:border-primary/50 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
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

                  <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
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
                    <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.readLabel} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Blog;
