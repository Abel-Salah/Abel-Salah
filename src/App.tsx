import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BookingPopup from "@/components/BookingPopup";
import ScrollGradient from "@/components/ScrollGradient";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const Work = lazy(() => import("./pages/Work"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Styleguide = lazy(() => import("./pages/Styleguide"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Ecosystem = lazy(() => import("./pages/Ecosystem"));
const AuditIa = lazy(() => import("./pages/AuditIa"));
const AutomatisationCommerciale = lazy(() => import("./pages/AutomatisationCommerciale"));
const FormationIa = lazy(() => import("./pages/FormationIa"));

const PageLoader = () => (
  <main className="min-h-screen bg-background pt-24 pb-16">
    <div className="container mx-auto px-4 text-muted-foreground">
      Chargement...
    </div>
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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/ecosystem" element={<Ecosystem />} />
            <Route path="/audit-ia" element={<AuditIa />} />
            <Route path="/automatisation-commerciale" element={<AutomatisationCommerciale />} />
            <Route path="/formation-ia" element={<FormationIa />} />
            <Route path="/styleguide" element={<Styleguide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <BookingPopup />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
