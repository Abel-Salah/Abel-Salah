import { Printer } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { cvAlternates, cvCanonicalByLocale, cvLocales, type CVLocale } from "@/data/cvLocales";
import airtableIcon from "@/assets/cv/icons/airtable.svg";
import claudeIcon from "@/assets/cv/icons/claude.svg";
import elevenlabsIcon from "@/assets/cv/icons/elevenlabs.svg";
import githubcopilotIcon from "@/assets/cv/icons/githubcopilot.svg";
import googlegeminiIcon from "@/assets/cv/icons/googlegemini.svg";
import hubspotIcon from "@/assets/cv/icons/hubspot.svg";
import langchainIcon from "@/assets/cv/icons/langchain.svg";
import makeIcon from "@/assets/cv/icons/make.svg";
import n8nIcon from "@/assets/cv/icons/n8n.svg";
import notionIcon from "@/assets/cv/icons/notion.svg";
import openaiIcon from "@/assets/cv/icons/openai.svg";
import perplexityIcon from "@/assets/cv/icons/perplexity.svg";
import supabaseIcon from "@/assets/cv/icons/supabase.svg";
import zapierIcon from "@/assets/cv/icons/zapier.svg";
import qrAbelsalah from "@/assets/cv/qr-abelsalah.svg";
import "./cv.css";

const photoAbel = "/lovable-uploads/c01cf145-c272-4f46-ae5d-c1aebfcf3888.webp";

const toolGroups: { name: string; icon?: string }[][] = [
  [
    { name: "ChatGPT / API OpenAI", icon: openaiIcon },
    { name: "Claude / Anthropic", icon: claudeIcon },
    { name: "ElevenLabs", icon: elevenlabsIcon },
    { name: "Midjourney" },
    { name: "Gemini", icon: googlegeminiIcon },
    { name: "Mistral AI" },
    { name: "Perplexity", icon: perplexityIcon },
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

const CV = ({ locale = "fr" }: { locale?: CVLocale }) => {
  const t = cvLocales[locale];

  return (
    <main className="cv-page">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDescription}
        canonical={cvCanonicalByLocale[locale]}
        ogType="profile"
        lang={locale}
        alternates={cvAlternates}
      />

      <div className="cv-toolbar">
        <button type="button" className="cv-print-button" onClick={() => window.print()}>
          <Printer size={15} aria-hidden="true" />
          {t.printLabel}
        </button>
      </div>

      {/* Page 1 */}
      <article className="cv-sheet" aria-label={t.page1Aria}>
        <div className="cv-header">
          <div className="cv-header-main">
            <div className="cv-kicker">{t.kicker}</div>
            <div className="cv-name">Abel Salah</div>
            <div className="cv-tagline">
              {t.taglineLine1}
              <br />
              {t.taglineLine2}
            </div>
          </div>
          <div className="cv-photo">
            <img src={photoAbel} alt="Abel Salah" width={104} height={104} />
          </div>
          <div className="cv-qr">
            <img src={qrAbelsalah} alt="QR abelsalah.fr" width={70} height={70} />
            <a href="https://abelsalah.fr">abelsalah.fr</a>
          </div>
        </div>

        <div className="cv-contact">
          <a href="tel:+33652858955">06 52 85 89 55</a>
          <a href="mailto:abel@skillco.fr">abel@skillco.fr</a>
          <a href="https://abelsalah.fr">abelsalah.fr</a>
          <a href="https://www.linkedin.com/in/abelsalah">LinkedIn · @AbelSalah</a>
          <a href="https://www.youtube.com/@Abelsalah">YouTube · @Abelsalah</a>
          <span>{t.location}</span>
        </div>

        <div className="cv-body">
          <div className="cv-main">
            <section className="cv-profile">
              <div className="cv-section-title">
                <span>{t.profileTitle}</span>
              </div>
              <p>{t.profileText}</p>
            </section>

            <section className="cv-experience">
              <div className="cv-section-title">
                <span>{t.experienceTitle}</span>
              </div>

              {t.experiences.map((xp) => (
                <div className="cv-xp" key={xp.role}>
                  <div className="cv-xp-head">
                    <div className="cv-xp-role">
                      {xp.role}
                      {xp.link && <a href={xp.link.url}>{xp.link.label}</a>}
                    </div>
                    <div className="cv-xp-dates">{xp.dates}</div>
                  </div>
                  <div className="cv-xp-sub">{xp.sub}</div>
                  <ul>
                    {xp.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>

          <aside className="cv-sidebar">
            <section className="cv-skills">
              <div className="cv-kicker">{t.skillsTitle}</div>
              {t.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="cv-skill-name">{skill.name}</div>
                  <div className="cv-skill-desc">{skill.desc}</div>
                </div>
              ))}
            </section>

            <section className="cv-side-section">
              <div className="cv-section-title">
                <span>{t.languagesTitle}</span>
              </div>
              <div className="cv-langs">
                {t.languages.map((lang) => (
                  <div className="cv-lang-row" key={lang.name}>
                    <span>{lang.name}</span>
                    <span>{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-side-section">
              <div className="cv-section-title">
                <span>{t.referencesTitle}</span>
              </div>
              <div className="cv-side-list">
                {t.references.map((ref) => (
                  <div key={ref.name}>
                    <div className="cv-side-item-title">{ref.name}</div>
                    <div className="cv-side-item-sub">{ref.sub}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-side-section">
              <div className="cv-section-title">
                <span>{t.educationTitle}</span>
              </div>
              <div className="cv-side-list">
                {t.education.map((edu) => (
                  <div key={edu.name}>
                    <div className="cv-side-item-title">{edu.name}</div>
                    <div className="cv-side-item-sub">{edu.sub}</div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <div className="cv-sheet-footer">
          <span>{t.footerLeft}</span>
          <span>{t.page1Label}</span>
        </div>
      </article>

      {/* Page 2 */}
      <article className="cv-sheet cv-sheet--p2" aria-label={t.page2Aria}>
        <div className="cv-header-compact">
          <div className="cv-name-sm">Abel Salah</div>
          <div className="cv-kicker">{t.kicker}</div>
        </div>

        <section>
          <div className="cv-section-title">
            <span>{t.highlightsTitle}</span>
          </div>
          <div className="cv-highlights">
            {t.highlights.map((item) => (
              <div className="cv-highlight" key={item.title}>
                <div className="cv-highlight-figure">
                  {item.figure}
                  <span>{item.figureSuffix}</span>
                </div>
                <div className="cv-highlight-title">{item.title}</div>
                <div className="cv-highlight-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="cv-section-title">
            <span>{t.toolsTitle}</span>
          </div>
          <div className="cv-tools-intro">{t.toolsIntro}</div>
          <div className="cv-tool-groups">
            {toolGroups.map((tools, index) => (
              <div key={t.toolGroupLabels[index]}>
                <div className="cv-tool-group-label">{t.toolGroupLabels[index]}</div>
                <div className="cv-chips">
                  {tools.map((tool) => (
                    <span key={tool.name} className="cv-chip">
                      {tool.icon && <img src={tool.icon} alt="" width={14} height={14} />}
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="cv-section-title">
            <span>{t.clientsTitle}</span>
          </div>
          <div className="cv-chips cv-clients">
            {t.clients.map((client) => (
              <span key={client} className="cv-client-chip">
                {client}
              </span>
            ))}
          </div>
        </section>

        <section>
          <div className="cv-section-title">
            <span>{t.availabilityTitle}</span>
          </div>
          <p className="cv-paragraph">{t.availabilityText}</p>
        </section>

        <section>
          <div className="cv-section-title">
            <span>{t.interestsTitle}</span>
          </div>
          <p className="cv-paragraph cv-paragraph--muted">{t.interestsText}</p>
        </section>

        <div className="cv-sheet-footer">
          <span>
            <a href="mailto:abel@skillco.fr">abel@skillco.fr</a> · <a href="https://abelsalah.fr">abelsalah.fr</a>
          </span>
          <span>{t.page2Label}</span>
        </div>
      </article>
    </main>
  );
};

export default CV;
