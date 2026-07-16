ALTER TABLE public.generated_blog_posts
  ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'fr';

ALTER TABLE public.generated_blog_posts
  DROP CONSTRAINT IF EXISTS generated_blog_posts_lang_check;

ALTER TABLE public.generated_blog_posts
  ADD CONSTRAINT generated_blog_posts_lang_check CHECK (lang IN ('fr', 'en', 'es'));

CREATE INDEX IF NOT EXISTS idx_generated_blog_posts_lang_published_date
  ON public.generated_blog_posts (lang, published, date DESC);
