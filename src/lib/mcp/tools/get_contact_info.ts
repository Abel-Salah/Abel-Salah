import { defineTool } from "@lovable.dev/mcp-js";

const contact = {
  name: "Abel SALAH",
  role: "Consultant & Expert IA pour entreprises",
  website: "https://abelsalah.fr",
  booking: "https://tidycal.com/abelsalah/30min",
  linkedin: "https://www.linkedin.com/in/abel-salah/",
  youtube: "https://www.youtube.com/@abelsalah",
  cv: "https://abelsalah.fr/cv",
  note: "Contact exclusivement via booking Calendly/TidyCal — aucun formulaire public.",
};

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Return public contact and booking links for Abel SALAH (website, booking URL, LinkedIn, YouTube, CV).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
    structuredContent: contact,
  }),
});
