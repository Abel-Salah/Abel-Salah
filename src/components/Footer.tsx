import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { cvCanonicalByLocale } from "@/data/cvLocales";
import { workCanonicalByLocale } from "@/data/workLocales";
import { aboutCanonicalByLocale } from "@/data/aboutLocales";
import { ecosystemCanonicalByLocale } from "@/data/ecosystemLocales";
import { productsCanonicalByLocale } from "@/data/productsLocales";
import { blogCanonicalByLocale } from "@/data/blogLocales";
import { contactCanonicalByLocale } from "@/data/contactLocales";
import { locationLinks } from "@/data/locationLocales";
import { TIDYCAL_BOOKING_URL } from "@/data/homeLocales";
import { trackConversionEvent } from "@/lib/conversionEvents";
import type { PageLocale } from "@/data/workLocales";

const homeCanonicalByLocale: Record<PageLocale, string> = { fr: "/", en: "/en", es: "/es" };

interface FooterUIContent {
  navHeader: string;
  contactHeader: string;
  socialHeader: string;
  bookCta: string;
  downloadCv: string;
  locationsLabel: string;
  roundCtaLine1: string;
  roundCtaLine2: string;
  copyright: string;
  taglineHighlight: string;
  taglineRest: string;
}

const footerUILocales: Record<PageLocale, FooterUIContent> = {
  fr: {
    navHeader: "Navigation",
    contactHeader: "Me contacter",
    socialHeader: "Suivez-moi",
    bookCta: "Prendre rendez-vous →",
    downloadCv: "Télécharger mon CV",
    locationsLabel: "Zones d'intervention",
    roundCtaLine1: "Parlons-",
    roundCtaLine2: "en",
    copyright: "Tous droits réservés.",
    taglineHighlight: "L'IA au service",
    taglineRest: "de votre entreprise.",
  },
  en: {
    navHeader: "Navigation",
    contactHeader: "Get in touch",
    socialHeader: "Follow me",
    bookCta: "Book a call →",
    downloadCv: "Download my CV",
    locationsLabel: "Service areas",
    roundCtaLine1: "Let's",
    roundCtaLine2: "talk",
    copyright: "All rights reserved.",
    taglineHighlight: "AI in service",
    taglineRest: "of your business.",
  },
  es: {
    navHeader: "Navegación",
    contactHeader: "Contactar",
    socialHeader: "Sígueme",
    bookCta: "Reservar una cita →",
    downloadCv: "Descargar mi CV",
    locationsLabel: "Zonas de intervención",
    roundCtaLine1: "Hable-",
    roundCtaLine2: "mos",
    copyright: "Todos los derechos reservados.",
    taglineHighlight: "La IA al servicio",
    taglineRest: "de tu empresa.",
  },
};

const footerNavLabels: Record<PageLocale, { to: string; label: string }[]> = {
  fr: [
    { to: homeCanonicalByLocale.fr, label: "Accueil" },
    { to: "/card", label: "Carte de visite" },
    { to: "/outils", label: "Outils gratuits" },
    { to: workCanonicalByLocale.fr, label: "Réalisations" },
    { to: aboutCanonicalByLocale.fr, label: "À propos" },
    { to: ecosystemCanonicalByLocale.fr, label: "Écosystème" },
    { to: productsCanonicalByLocale.fr, label: "Produits" },
    { to: blogCanonicalByLocale.fr, label: "Blog" },
    { to: contactCanonicalByLocale.fr, label: "Contact" },
  ],
  en: [
    { to: homeCanonicalByLocale.en, label: "Home" },
    { to: "/card", label: "Digital card" },
    { to: workCanonicalByLocale.en, label: "Work" },
    { to: aboutCanonicalByLocale.en, label: "About" },
    { to: ecosystemCanonicalByLocale.en, label: "Ecosystem" },
    { to: productsCanonicalByLocale.en, label: "Products" },
    { to: blogCanonicalByLocale.en, label: "Blog" },
    { to: contactCanonicalByLocale.en, label: "Contact" },
  ],
  es: [
    { to: homeCanonicalByLocale.es, label: "Inicio" },
    { to: "/card", label: "Tarjeta digital" },
    { to: workCanonicalByLocale.es, label: "Proyectos" },
    { to: aboutCanonicalByLocale.es, label: "Sobre mí" },
    { to: ecosystemCanonicalByLocale.es, label: "Ecosistema" },
    { to: productsCanonicalByLocale.es, label: "Productos" },
    { to: blogCanonicalByLocale.es, label: "Blog" },
    { to: contactCanonicalByLocale.es, label: "Contacto" },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();
  const locale: PageLocale = pathname.startsWith("/en") ? "en" : pathname.startsWith("/es") ? "es" : "fr";

  const navLinks = footerNavLabels[locale];
  const t = footerUILocales[locale];

  const socialLinks = [
    { href: "https://www.linkedin.com/in/abel-salah/", label: "LinkedIn" },
    { href: "https://www.youtube.com/@abelsalah", label: "YouTube" },
  ];

  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Large Name - Hero Style */}
      <div className="relative w-full overflow-hidden py-16 md:py-24">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true }}
          className="heading-display text-[18vw] md:text-[14vw] leading-[0.85] text-center whitespace-nowrap"
        >
          <span className="text-foreground">ABEL</span>
          <span className="text-primary"> SALAH</span>
        </motion.h2>
      </div>

      {/* Footer Content */}
      <div className="relative px-4 md:px-6 py-12 md:py-16 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Navigation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6">
                {t.navHeader}
              </h3>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-block py-1.5 text-foreground hover:text-primary transition-colors text-lg font-medium story-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              viewport={{ once: true }}
              className="md:col-span-4"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6">
                {t.contactHeader}
              </h3>
              <div className="space-y-4">
                <a
                  href={TIDYCAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversionEvent("book_call_click", "footer", TIDYCAL_BOOKING_URL)
                  }
                  className="block w-fit py-1.5 text-primary hover:text-primary/80 transition-colors text-xl font-semibold story-link"
                >
                  {t.bookCta}
                </a>
                <Link
                  to={cvCanonicalByLocale[locale]}
                  className="flex w-fit items-center gap-2 py-1.5 text-foreground hover:text-primary transition-colors text-lg font-medium group"
                >
                  <Download className="w-4 h-4" />
                  {t.downloadCv}
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
                <div className="border-t border-border pt-4 mt-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {t.locationsLabel}
                  </p>
                  <p className="text-muted-foreground">
                    {locale === "es"
                      ? "Base en Montpellier — Francia y España"
                      : locale === "en"
                        ? "Based in Montpellier — France & Spain"
                        : "Basé à Montpellier — France & Espagne"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {locationLinks.map((location, index) => (
                      <span key={location.path}>
                        {index > 0 && " · "}
                        <Link to={location.path} className="hover:text-primary transition-colors">
                          {location.city}
                        </Link>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6">
                {t.socialHeader}
              </h3>
              <ul className="space-y-4">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 py-1.5 text-foreground hover:text-primary transition-colors text-lg font-medium group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              viewport={{ once: true }}
              className="md:col-span-2 flex justify-center md:justify-end"
            >
              <Link
                to={contactCanonicalByLocale[locale]}
                className="inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform group"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-center leading-tight">
                  {t.roundCtaLine1}<br />{t.roundCtaLine2}
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-muted-foreground">
              © {currentYear} Abel SALAH. {t.copyright}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="text-primary">{t.taglineHighlight}</span> {t.taglineRest}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
