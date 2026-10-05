import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  corsHeaders,
  getRequiredEnv,
  jsonResponse,
  requireAdminToken,
} from "../_shared/opportunityAgent.ts";

type Agent = { id: string; slug: string; name: string };

const task = (agentId: string, taskType: string, title: string, input: Record<string, unknown>) => ({
  agent_id: agentId,
  task_type: taskType,
  title,
  priority: 80,
  status: "queued",
  requires_human_approval: true,
  input,
});

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const unauthorized = requireAdminToken(req);
  if (unauthorized) return unauthorized;

  try {
    const body = await req.json().catch(() => ({}));
    const supabase = createClient(
      getRequiredEnv("SUPABASE_URL"),
      getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY")
    );
    const { data: agents, error: agentError } = await supabase
      .from("agents")
      .select("id, slug, name")
      .eq("enabled", true)
      .in("slug", ["atlas", "nova", "cleo", "iris", "plume"]);
    if (agentError) throw agentError;

    const bySlug = new Map(((agents ?? []) as Agent[]).map((agent) => [agent.slug, agent]));
    const atlas = bySlug.get("atlas");
    if (!atlas) throw new Error("Atlas agent is not registered");

    const { data: run, error: runError } = await supabase
      .from("agent_runs")
      .insert({ agent_id: atlas.id, trigger_type: body.triggerType ?? "manual", input: body })
      .select("id")
      .single();
    if (runError) throw runError;

    const queued = [
      bySlug.get("nova") && task(bySlug.get("nova")!.id, "business_development_scan", "Détecter les opportunités et collaborations du jour", { limit: 20 }),
      bySlug.get("cleo") && task(bySlug.get("cleo")!.id, "google_search_console_audit", "Analyser les performances SEO Google", { requested: true }),
      bySlug.get("iris") && task(bySlug.get("iris")!.id, "llm_visibility_audit", "Auditer la visibilité d’Abel dans les moteurs IA", { requested: true }),
      bySlug.get("plume") && task(bySlug.get("plume")!.id, "content_quality_review", "Préparer les prochaines actions de contenu SEO", { requested: true }),
    ].filter(Boolean).map((item) => ({ ...item, run_id: run.id }));

    const { data: tasks, error: taskError } = await supabase
      .from("agent_tasks")
      .insert(queued)
      .select("id, task_type, title, status");
    if (taskError) throw taskError;

    await supabase.from("agent_runs").update({
      status: "succeeded",
      output: { queuedTasks: tasks ?? [], note: "Tasks queued; external connectors must be configured before automated analysis." },
      finished_at: new Date().toISOString(),
    }).eq("id", run.id);

    return jsonResponse({ success: true, orchestrator: atlas, runId: run.id, tasks });
  } catch (error) {
    console.error("run-atlas error:", error);
    return jsonResponse({ error: error instanceof Error ? error.message : "Unknown error" }, 500);
  }
});
