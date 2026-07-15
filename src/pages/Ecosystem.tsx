import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { ecosystemAlternates, ecosystemCanonicalByLocale, ecosystemLocales } from "@/data/ecosystemLocales";
import { productsCanonicalByLocale } from "@/data/productsLocales";
import { contactCanonicalByLocale } from "@/data/contactLocales";
import { ventures } from "@/data/ventures";
import type { PageLocale } from "@/data/workLocales";
import airtableIcon from "@/assets/stack/airtable.svg";
import claudeIcon from "@/assets/stack/claude.svg";
import elevenlabsIcon from "@/assets/stack/elevenlabs.svg";
import githubcopilotIcon from "@/assets/stack/githubcopilot.svg";
import googlegeminiIcon from "@/assets/stack/googlegemini.svg";
import hubspotIcon from "@/assets/stack/hubspot.svg";
import langchainIcon from "@/assets/stack/langchain.svg";
import makeIcon from "@/assets/stack/make.svg";
import n8nIcon from "@/assets/stack/n8n.svg";
import notionIcon from "@/assets/stack/notion.svg";
import openaiIcon from "@/assets/stack/openai.svg";
import perplexityIcon from "@/assets/stack/perplexity.svg";
import supabaseIcon from "@/assets/stack/supabase.svg";
import zapierIcon from "@/assets/stack/zapier.svg";

const toolGroups: { name: string; icon?: string }[][] = [
  [
    { name: "Claude / Anthropic", icon: claudeIcon },
    { name: "ChatGPT / API OpenAI", icon: openaiIcon },
    { name: "Gemini", icon: googlegeminiIcon },
    { name: "Mistral AI" },
    { name: "Perplexity", icon: perplexityIcon },
    { name: "Midjourney" },
    { name: "ElevenLabs", icon: elevenlabsIcon },
  ],
  [
    { name: "Make", icon: makeIcon },
    { name: "n8n", icon: n8nIcon },
    { name: "Zapier", icon: zapierIcon },
  ],
  [
    { name: "HubSpot", icon: hubspotIcon },
    { name: "Supabase", icon: supabaseIcon },
    { name: "Airtable", icon: airtableIcon },
    { name: "Notion", icon: notionIcon },
  ],
  [
    { name: "LangChain / RAG", icon: langchainIcon },
    { name: "Cursor" },
    { name: "GitHub Copilot", icon: githubcopilotIcon },
  ],
];

const Ecosystem = ({ locale = "fr" }: { locale?: PageLocale }) => {
  const t = ecosystemLocales[locale];

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDescription}
        canonical={ecosystemCanonicalByLocale[locale]}
        lang={locale}
        alternates={ecosystemAlternates}
        breadcrumbs={[
          { name: t.breadcrumbHome, path: locale === "fr" ? "/" : `/${locale}` },
          { name: t.breadcrumbSelf, path: ecosystemCanonicalByLocale[locale] },
        ]}
      />

      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-8">
            {t.eyebrow}
          </span>
          <h1 className="heading-display text-[clamp(3rem,10vw,10rem)] leading-[0.85] mb-12">
            {t.title}
          </h1>
          <p className="text-2xl md:text-3xl text-foreground max-w-3xl leading-relaxed">
            {t.statementLine1}
            <br />
            <span className="text-primary">{t.statementHighlight}</span>
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mt-8 leading-relaxed">{t.intro}</p>
        </motion.div>

        {/* Tool groups */}
        <div>
          {t.toolGroups.map((group, groupIndex) => (
            <motion.section
              key={group.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: groupIndex * 0.05 }}
              viewport={{ once: true }}
              className="border-t border-border py-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                  <span className="heading-display text-3xl md:text-4xl text-muted-foreground/40 block mb-4">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl md:text-3xl text-foreground mb-3">{group.label}</h2>
                  <p className="text-base text-muted-foreground leading-relaxed">{group.desc}</p>
                </div>
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap gap-4">
                    {toolGroups[groupIndex].map((tool) => (
                      <div
                        key={tool.name}
                        className="flex items-center gap-3 border border-border hover:border-primary transition-colors px-6 py-4 text-lg text-foreground"
                      >
                        {tool.icon && <img src={tool.icon} alt="" width={22} height={22} loading="lazy" />}
                        {tool.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Expertises */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20 mt-4"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-12">
            {t.expertiseTitle}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.expertises.map((expertise) => (
              <div key={expertise.name} className="border-t border-border pt-6">
                <h3 className="text-2xl text-foreground mb-3">{expertise.name}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{expertise.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Produits construits avec cette stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20 mt-20"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-8">
            {t.productsTitle}
          </span>
          <p className="text-2xl md:text-3xl text-foreground leading-snug mb-12 max-w-3xl">
            {t.productsText}
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {ventures.map((v) => (
              <li key={v.domain} className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{v.number}</p>
                <p className="text-lg md:text-xl text-foreground font-medium leading-tight">{v.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{v.domain}</p>
              </li>
            ))}
          </ul>
          <Link
            to={productsCanonicalByLocale[locale]}
            className="inline-flex items-center gap-2 text-lg text-foreground hover:text-primary transition-colors group story-link"
          >
            {t.productsLink}
            <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border pt-20 mt-20 text-center"
        >
          <p className="text-xl text-muted-foreground mb-4">{t.ctaLine}</p>
          <Link
            to={contactCanonicalByLocale[locale]}
            className="heading-display text-4xl md:text-5xl inline-block hover:text-primary transition-colors"
          >
            {t.ctaLink} <span className="text-primary">→</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default Ecosystem;
