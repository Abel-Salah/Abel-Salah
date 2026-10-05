import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Le plugin Lovable synchronise des fichiers Supabase ; il ne doit pas
  // s'exécuter pendant un build de production, où ces fonctions sont
  // versionnées et gérées par le projet.
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "development" && mcpPlugin(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // manualChunks est incompatible avec le build SSR (bundle unique pour le pré-rendu)
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              react: ["react", "react-dom", "react-router"],
              motion: ["framer-motion"],
              ui: ["@radix-ui/react-slot", "@radix-ui/react-toast", "@radix-ui/react-tooltip"],
              supabase: ["@supabase/supabase-js"],
              markdown: ["react-markdown", "remark-gfm", "rehype-sanitize"],
            },
          },
    },
  },
}));
