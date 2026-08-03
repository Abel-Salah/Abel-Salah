// Redirection client-side : abel-salah.lovable.app → abelsalah.fr
if (window.location.hostname === 'abel-salah.lovable.app') {
  window.location.replace('https://abelsalah.fr' + window.location.pathname);
}

import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="abel-theme">
      <App />
    </ThemeProvider>
  </HelmetProvider>
);
