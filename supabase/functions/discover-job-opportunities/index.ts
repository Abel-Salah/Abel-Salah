import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  clampLimit,
  corsHeaders,
  getRequiredEnv,
  jsonResponse,
} from "../_shared/opportunityAgent.ts";

type JobSource = {
  id: string;
  name: string;
  search_queries: string[];
  include_domains: string[];
  exclude_terms: string[];
  daily_limit: number;
};

type GoogleSearchItem = {
  title?: string;
  link?: string;
  snippet?: string;
  pagemap?: {
    metatags?: Array<Record<string, string>>;
  };
};

const buildQuery = (
  query: string,
  includeDomains: string[],
  excludeTerms: string[]
) => {
  const domains = includeDomains.map((domain) => `site:${domain}`).join(" OR ");
  const excluded = excludeTerms.map((term) => `-"${term}"`).join(" ");

  return [query, domains ? `(${domains})` : "", excluded]
    .filter(Boolean)
    .join(" ");
};

const getPublishedAt = (item: GoogleSearchItem) => {
  const metatags = item.pagemap?.metatags?.[0];
  const candidate =
    metatags?.["article:published_time"] ??
    metatags?.["og:updated_time"] ??
    metatags?.["date"] ??
    null;

  if (!candidate || Number.isNaN(Date.parse(candidate))) {
    return null;
  }

  return new Date(candidate).toISOString();
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const dryRun = Boolean(body.dryRun);
    const requestLimit = clampLimit(body.limit, 20, 50);

    const supabase = createClient(
      getRequiredEnv("SUPABASE_URL"),
      getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY")
    );
    const googleApiKey = getRequiredEnv("GOOGLE_SEARCH_API_KEY");
    const searchEngineId = getRequiredEnv("GOOGLE_SEARCH_ENGINE_ID");

    const { data: sources, error: sourceError } = await supabase
      .from("job_sources")
      .select("id, name, search_queries, include_domains, exclude_terms, daily_limit")
      .eq("enabled", true)
      .eq("source_type", "google_cse");

    if (sourceError) {
      throw sourceError;
    }

    const normalized = [];

    for (const source of (sources ?? []) as JobSource[]) {
      const sourceLimit = Math.min(source.daily_limit, requestLimit);

      for (const query of source.search_queries) {
        if (normalized.length >= sourceLimit) {
          break;
        }

        const searchUrl = new URL("https://www.googleapis.com/customsearch/v1");
        searchUrl.searchParams.set("key", googleApiKey);
        searchUrl.searchParams.set("cx", searchEngineId);
        searchUrl.searchParams.set(
          "q",
          buildQuery(query, source.include_domains, source.exclude_terms)
        );
        searchUrl.searchParams.set("num", String(Math.min(10, sourceLimit)));
        searchUrl.searchParams.set("dateRestrict", "d7");

        const response = await fetch(searchUrl);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Google Custom Search error ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        const items = (result.items ?? []) as GoogleSearchItem[];

        for (const item of items) {
          if (!item.title || !item.link) {
            continue;
          }

          const publishedAt = getPublishedAt(item);

          normalized.push({
            source_id: source.id,
            source_type: "google_cse",
            title: item.title,
            url: item.link,
            description: item.snippet ?? null,
            published_at: publishedAt,
            status: "new",
            raw_payload: { sourceName: source.name, query, item },
          });

          if (normalized.length >= sourceLimit) {
            break;
          }
        }
      }
    }

    if (dryRun || normalized.length === 0) {
      return jsonResponse({
        success: true,
        dryRun,
        discovered: normalized.length,
        inserted: 0,
        opportunities: normalized,
      });
    }

    const { data: inserted, error: insertError } = await supabase
      .from("job_opportunities")
      .upsert(normalized, { onConflict: "url", ignoreDuplicates: true })
      .select("id, title, url, status");

    if (insertError) {
      throw insertError;
    }

    return jsonResponse({
      success: true,
      dryRun: false,
      discovered: normalized.length,
      inserted: inserted?.length ?? 0,
      opportunities: inserted ?? [],
    });
  } catch (error) {
    console.error("discover-job-opportunities error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
});
