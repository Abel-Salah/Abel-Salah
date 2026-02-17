import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/work", label: "Work" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://linkedin.com", label: "LinkedIn" },
    { href: "https://twitter.com", label: "Twitter" },
    { href: "https://medium.com", label: "Medium" },
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
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="heading-display text-[18vw] md:text-[14vw] leading-[0.85] text-center whitespace-nowrap"
        >
          <span className="text-foreground">LIAM</span>
          <span className="text-primary"> FLETCHER</span>
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
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6">
                Navigation
              </h3>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-foreground hover:text-primary transition-colors text-lg font-medium story-link"
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
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-4"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <a 
                  href="mailto:hello@liamfletcher.com" 
                  className="text-foreground hover:text-primary transition-colors text-lg font-medium story-link inline-block"
                >
                  hello@liamfletcher.com
                </a>
                <p className="text-muted-foreground">Melbourne, Australia</p>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-3"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6">
                Connect
              </h3>
              <ul className="space-y-4">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors text-lg font-medium group"
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
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-2 flex md:justify-end"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform group"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-center leading-tight">
                  Start a<br />Project
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-muted-foreground">
              © {currentYear} Liam Fletcher. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="text-primary">Strategic copywriting</span> that converts.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
