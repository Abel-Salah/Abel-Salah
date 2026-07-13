import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollGradient from "@/components/ScrollGradient";
import Index from "./pages/Index";

const Work = lazy(() => import("./pages/Work"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Styleguide = lazy(() => import("./pages/Styleguide"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Ecosystem = lazy(() => import("./pages/Ecosystem"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminOpportunities = lazy(() => import("./pages/AdminOpportunities"));
const OfferPage = lazy(() => import("./pages/OfferPage"));

const queryClient = new QueryClient();
const routeFallback = (
  <main className="min-h-screen bg-background pt-32 px-4 text-center text-muted-foreground">
    Chargement...
  </main>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollGradient />
        <Navigation />
        <Suspense fallback={routeFallback}>
          <Routes>
            <Route path="/" element={<Index locale="fr" />} />
            <Route path="/en" element={<Index locale="en" />} />
            <Route path="/es" element={<Index locale="es" />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/ecosystem" element={<Ecosystem />} />
            <Route path="/audit-ia" element={<OfferPage slug="audit-ia" />} />
            <Route path="/automatisation-commerciale" element={<OfferPage slug="automatisation-commerciale" />} />
            <Route path="/formation-ia" element={<OfferPage slug="formation-ia" />} />
            <Route path="/en/ai-audit" element={<OfferPage slug="ai-audit" />} />
            <Route path="/en/sales-automation" element={<OfferPage slug="sales-automation" />} />
            <Route path="/en/ai-training" element={<OfferPage slug="ai-training" />} />
            <Route path="/es/auditoria-ia" element={<OfferPage slug="auditoria-ia" />} />
            <Route path="/es/automatizacion-comercial" element={<OfferPage slug="automatizacion-comercial" />} />
            <Route path="/es/formacion-ia" element={<OfferPage slug="formacion-ia" />} />
            <Route path="/styleguide" element={<Styleguide />} />
            <Route path="/admin/opportunities" element={<AdminOpportunities />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
