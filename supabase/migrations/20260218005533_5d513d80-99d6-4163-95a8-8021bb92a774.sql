
-- Create table for generated blog posts
CREATE TABLE public.generated_blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  read_time TEXT NOT NULL DEFAULT '5 min',
  tags TEXT[] NOT NULL DEFAULT '{}',
  excerpt TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '[]',
  article_type TEXT NOT NULL DEFAULT 'actionnable',
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.generated_blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can read published blog posts"
  ON public.generated_blog_posts
  FOR SELECT
  USING (published = true);
