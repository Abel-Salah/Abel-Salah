import { motion } from "framer-motion";
import CopyReveal from "@/components/CopyReveal";
import { Button } from "@/components/ui/button";

const Styleguide = () => {
  const colors = [
    { name: "Background", variable: "--background", class: "bg-background" },
    { name: "Foreground", variable: "--foreground", class: "bg-foreground" },
    { name: "Primary (Royal Blue)", variable: "--primary", class: "bg-primary" },
    { name: "Secondary", variable: "--secondary", class: "bg-secondary" },
    { name: "Muted", variable: "--muted", class: "bg-muted" },
    { name: "Border", variable: "--border", class: "bg-border" },
  ];

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="heading-display text-[clamp(3rem,10vw,10rem)] leading-[0.85] mb-8">
            Styleguide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            The visual system behind the words. Brutalist, bold, and built for impact.
          </p>
        </motion.div>

        {/* Colors */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
            Color Palette
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="space-y-3">
                <div
                  className={`aspect-square ${color.class} border border-border`}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{color.name}</p>
                  <p className="text-xs text-muted-foreground">{color.variable}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Typography */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-32 border-t border-border pt-20"
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
            Typography
          </span>
          
          <div className="space-y-12">
            <div>
              <p className="text-xs text-muted-foreground mb-4">Archivo Black — Display</p>
              <h2 className="heading-display text-6xl md:text-8xl">
                Headlines that hit.
              </h2>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground mb-4">Inter — Body</p>
              <p className="text-xl max-w-2xl">
                Body text is set in Inter, a clean grotesque that stays readable 
                at any size. It complements the bold headlines without competing 
                for attention.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Headline Styles */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-32 border-t border-border pt-20"
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
            Headline Hierarchy
          </span>
          
          <div className="space-y-8">
            <div className="border-b border-border pb-8">
              <span className="text-xs text-muted-foreground">H1 — Hero</span>
              <h1 className="heading-display text-[clamp(3rem,10vw,10rem)] leading-[0.85]">
                Massive Impact
              </h1>
            </div>
            
            <div className="border-b border-border pb-8">
              <span className="text-xs text-muted-foreground">H2 — Section</span>
              <h2 className="heading-display text-5xl md:text-7xl">
                Section Headers
              </h2>
            </div>
            
            <div className="border-b border-border pb-8">
              <span className="text-xs text-muted-foreground">H3 — Subsection</span>
              <h3 className="heading-display text-3xl md:text-5xl">
                Subsection Title
              </h3>
            </div>
            
            <div className="border-b border-border pb-8">
              <span className="text-xs text-muted-foreground">H4 — Component</span>
              <h4 className="heading-display text-2xl md:text-3xl">
                Component Label
              </h4>
            </div>
          </div>
        </motion.section>

        {/* Interactive Components */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-32 border-t border-border pt-20"
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
            Interactive Elements
          </span>
          
          <div className="space-y-16">
            {/* Copy Reveal */}
            <div>
              <p className="text-xs text-muted-foreground mb-6">Copy Reveal — Hover to transform</p>
              <div className="space-y-4">
                <CopyReveal
                  before="We provide solutions"
                  after="Cut your workload in half. Guaranteed."
                  className="text-2xl"
                />
                <CopyReveal
                  before="Industry-leading platform"
                  after="Used by 10,000+ teams. Yours next."
                  className="text-2xl"
                />
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs text-muted-foreground mb-6">Link Style — Underline on hover</p>
              <a href="#" className="story-link text-2xl text-foreground">
                Hover to see the effect
              </a>
            </div>

            {/* Buttons */}
            <div>
              <p className="text-xs text-muted-foreground mb-6">Button Styles</p>
              <div className="flex flex-wrap gap-4">
                <Button className="h-14 px-8 text-lg uppercase tracking-wider">
                  Primary Action
                </Button>
                <Button variant="outline" className="h-14 px-8 text-lg uppercase tracking-wider">
                  Secondary
                </Button>
                <Button variant="ghost" className="h-14 px-8 text-lg uppercase tracking-wider">
                  Ghost
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Brand Voice */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20"
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-8">
            Brand Voice
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="heading-display text-2xl text-primary">Direct</h4>
              <p className="text-muted-foreground">
                No fluff. No filler. Every word earns its place.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="heading-display text-2xl text-primary">Confident</h4>
              <p className="text-muted-foreground">
                Assert. Don't apologize. The work speaks for itself.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="heading-display text-2xl text-primary">Strategic</h4>
              <p className="text-muted-foreground">
                Every choice has purpose. Aesthetics serve function.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Styleguide;
