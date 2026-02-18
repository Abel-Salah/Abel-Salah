import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <SEOHead
        title="Blog IA Entreprise | Abel SALAH - Expert IA"
        description="Articles et guides pratiques sur l'intelligence artificielle en entreprise. Audit IA, automatisation, stratégie data et cas concrets par Abel SALAH, expert IA."
        canonical="/blog"
      />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="heading-display text-4xl md:text-6xl mb-6">
            Blog <span className="text-primary">IA Entreprise</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Guides pratiques, cas concrets et analyses stratégiques pour intégrer
            l'intelligence artificielle dans votre entreprise.
          </p>
        </motion.div>

        <div className="grid gap-8 md:gap-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="border border-border rounded-lg p-6 md:p-8 hover:border-primary/50 transition-colors">
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
                      Lire <ArrowRight className="w-4 h-4" />
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
