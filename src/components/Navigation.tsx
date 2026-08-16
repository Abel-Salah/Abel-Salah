import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ArrowRight, Menu, X, Linkedin, Youtube, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { TIDYCAL_BOOKING_URL } from "@/data/homeLocales";
import { trackConversionEvent } from "@/lib/conversionEvents";

const navLabels = {
  fr: [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Réalisations" },
    { href: "/about", label: "À propos" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  en: [
    { href: "/en/work", label: "Work" },
    { href: "/en/about", label: "About" },
    { href: "/en/blog", label: "Blog" },
    { href: "/en/contact", label: "Contact" },
  ],
  es: [
    { href: "/es/work", label: "Proyectos" },
    { href: "/es/about", label: "Sobre mí" },
    { href: "/es/blog", label: "Blog" },
    { href: "/es/contact", label: "Contacto" },
  ],
} as const;

const languageLinks = [
  { href: "/", label: "FR", locale: "fr" },
  { href: "/en", label: "EN", locale: "en" },
  { href: "/es", label: "ES", locale: "es" },
] as const;

const bookLabels = {
  fr: "Réserver un audit IA",
  en: "Book an AI audit",
  es: "Reservar una auditoría IA",
} as const;

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const locale = location.pathname.startsWith("/en")
    ? "en"
    : location.pathname.startsWith("/es")
      ? "es"
      : "fr";
  const navItems = navLabels[locale];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const isLight = resolvedTheme === "light";

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between rounded-full border border-border bg-card/85 px-5 py-3 shadow-2xl shadow-black/10 backdrop-blur-xl">
          <Link
            to={locale === "fr" ? "/" : `/${locale}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={closeMenu}
            aria-label="Abel SALAH"
          >
            <span className="block h-5 w-5 rounded-tl-full rounded-br-full bg-current" />
          </Link>

          <button type="button" onClick={() => setTheme(isLight ? "dark" : "light")} className="ml-auto mr-3 rounded-full border border-border p-2 text-foreground transition-colors hover:border-primary/50 hover:text-primary md:ml-0" aria-label={isLight ? "Activer le thème sombre" : "Activer le thème clair"} title={isLight ? "Thème sombre" : "Thème clair"}>
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center rounded-full border border-border p-1">
            {languageLinks.map((item) => (
              <Link
                key={item.locale}
                to={item.href}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                  locale === item.locale
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <a
            href={TIDYCAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackConversionEvent("book_call_click", `nav_cta_${locale}`, TIDYCAL_BOOKING_URL)
            }
            className="cta-glow hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
          >
            {bookLabels[locale]}
            <ArrowRight className="h-4 w-4" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden rounded-full border border-border p-2 text-foreground hover:text-primary transition-colors"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="mt-3 rounded-3xl border border-border bg-card/95 px-5 py-6 shadow-2xl backdrop-blur-xl">
              <ul className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "block text-2xl font-medium uppercase tracking-wider transition-colors py-2",
                        location.pathname === item.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <a
                href={TIDYCAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackConversionEvent("book_call_click", `nav_cta_mobile_${locale}`, TIDYCAL_BOOKING_URL);
                  closeMenu();
                }}
                className="cta-glow mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:gap-3"
              >
                {bookLabels[locale]}
                <ArrowRight className="h-4 w-4" />
              </a>
              <div className="mt-6 flex items-center gap-2 border-t border-border pt-6">
                {languageLinks.map((item) => (
                  <Link
                    key={item.locale}
                    to={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors",
                      locale === item.locale
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-6 pt-6 mt-6 border-t border-border">
                <a
                  href="https://www.linkedin.com/in/abel-salah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn d'Abel SALAH"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.youtube.com/@abelsalah"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chaîne YouTube d'Abel SALAH"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
