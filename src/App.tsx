import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Services from "@/pages/Services";
import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollGradient from "@/components/ScrollGradient";
import Index from "./pages/Index";
import BusinessCard from "./pages/BusinessCard";
import ContactAgentWidget from "@/components/ContactAgentWidget";
import ManualWorkCalculator from "./pages/ManualWorkCalculator";
import Tools from "./pages/Tools";
import SiteScore from "./pages/SiteScore";

const Work = lazy(() => import("./pages/Work"));
const Formations = lazy(() => import("./pages/Formations"));
const Checklist = lazy(() => import("./pages/Checklist"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Styleguide = lazy(() => import("./pages/Styleguide"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Ecosystem = lazy(() => import("./pages/Ecosystem"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminOpportunities = lazy(() => import("./pages/AdminOpportunities"));
const OfferPage = lazy(() => import("./pages/OfferPage"));
const CV = lazy(() => import("./pages/CV"));
const Products = lazy(() => import("./pages/Products"));
const Location = lazy(() => import("./pages/Location"));

const queryClient = new QueryClient();
const routeFallback = (
  <main className="min-h-screen bg-background pt-32 px-4 text-center text-muted-foreground">
    Chargement...
  </main>
);

/* Tout sauf le routeur : le client l'enveloppe dans BrowserRouter,
   le pré-rendu au build (src/entry-prerender.tsx) dans StaticRouter. */
export const AppShell = () => {
  const location = useLocation();
  const isBusinessCard = location.pathname === "/carte-visite" || location.pathname === "/card";

  return <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <ScrollGradient />
      {!isBusinessCard && <ContactAgentWidget />}
      {!isBusinessCard && <Navigation />}
      <Suspense fallback={routeFallback}>
        <Routes>
            <Route path="/" element={<Index locale="fr" />} />
            <Route path="/carte-visite" element={<BusinessCard />} />
            <Route path="/card" element={<BusinessCard />} />
            <Route path="/outils/calculateur-taches-manuelles" element={<ManualWorkCalculator />} />
            <Route path="/outils" element={<Tools />} />
            <Route path="/outils/score-site" element={<SiteScore />} />
            <Route path="/en" element={<Index locale="en" />} />
            <Route path="/es" element={<Index locale="es" />} />
            <Route path="/work" element={<Work locale="fr" />} />
            <Route path="/en/work" element={<Work locale="en" />} />
            <Route path="/es/work" element={<Work locale="es" />} />
            <Route path="/about" element={<About locale="fr" />} />
            <Route path="/en/about" element={<About locale="en" />} />
            <Route path="/es/about" element={<About locale="es" />} />
            <Route path="/contact" element={<Contact locale="fr" />} />
            <Route path="/services" element={<Services />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/en/contact" element={<Contact locale="en" />} />
            <Route path="/es/contact" element={<Contact locale="es" />} />
            <Route path="/blog" element={<Blog locale="fr" />} />
            <Route path="/en/blog" element={<Blog locale="en" />} />
            <Route path="/es/blog" element={<Blog locale="es" />} />
            <Route path="/blog/:slug" element={<BlogPost locale="fr" />} />
            <Route path="/en/blog/:slug" element={<BlogPost locale="en" />} />
            <Route path="/es/blog/:slug" element={<BlogPost locale="es" />} />
            <Route path="/ecosystem" element={<Ecosystem locale="fr" />} />
            <Route path="/produits" element={<Products locale="fr" />} />
            <Route path="/en/products" element={<Products locale="en" />} />
            <Route path="/es/productos" element={<Products locale="es" />} />
            <Route path="/en/ecosystem" element={<Ecosystem locale="en" />} />
            <Route path="/es/ecosystem" element={<Ecosystem locale="es" />} />
            <Route path="/cv" element={<CV locale="fr" />} />
            <Route path="/en/cv" element={<CV locale="en" />} />
            <Route path="/es/cv" element={<CV locale="es" />} />
            <Route path="/audit-ia" element={<OfferPage slug="audit-ia" />} />
            <Route path="/automatisation-commerciale" element={<OfferPage slug="automatisation-commerciale" />} />
            <Route path="/formation-ia" element={<OfferPage slug="formation-ia" />} />
            <Route path="/en/ai-audit" element={<OfferPage slug="ai-audit" />} />
            <Route path="/en/sales-automation" element={<OfferPage slug="sales-automation" />} />
            <Route path="/en/ai-training" element={<OfferPage slug="ai-training" />} />
            <Route path="/es/auditoria-ia" element={<OfferPage slug="auditoria-ia" />} />
            <Route path="/es/automatizacion-comercial" element={<OfferPage slug="automatizacion-comercial" />} />
            <Route path="/es/formacion-ia" element={<OfferPage slug="formacion-ia" />} />
            <Route path="/expert-ia-montpellier" element={<Location slug="expert-ia-montpellier" />} />
            <Route path="/expert-ia-paris" element={<Location slug="expert-ia-paris" />} />
            <Route path="/expert-ia-marseille" element={<Location slug="expert-ia-marseille" />} />
            <Route path="/es/experto-ia-malaga" element={<Location slug="experto-ia-malaga" />} />
            <Route path="/es/experto-ia-barcelona" element={<Location slug="experto-ia-barcelona" />} />
            <Route path="/styleguide" element={<Styleguide />} />
            <Route path="/admin/opportunities" element={<AdminOpportunities />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Suspense>
      <Footer />
    </TooltipProvider>
  </QueryClientProvider>;
};

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
