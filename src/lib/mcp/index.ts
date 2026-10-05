import { defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list_blog_posts";
import getBlogPost from "./tools/get_blog_post";
import listVentures from "./tools/list_ventures";
import listOffers from "./tools/list_offers";
import getContactInfo from "./tools/get_contact_info";

export default defineMcp({
  name: "abel-salah-mcp",
  title: "Abel SALAH — Consultant IA",
  version: "0.1.0",
  instructions:
    "Public MCP server for abelsalah.fr. Use these tools to read Abel SALAH's blog articles (French, AI for business), consulting offers (AI audit, sales automation, AI training), ventures (SCALLUP, SKILL LMS, FORMATEURS.PRO, IMMO MONTPELLIER), and booking/contact links. All data is public — no authentication.",
  tools: [listBlogPosts, getBlogPost, listVentures, listOffers, getContactInfo],
});
