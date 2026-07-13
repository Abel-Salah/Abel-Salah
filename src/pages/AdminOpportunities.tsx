import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, ExternalLink, RefreshCw, Send, Shield, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";

type Score = {
  score: number;
  relevance: number | null;
  urgency: number | null;
  budget_potential: number | null;
  response_probability: number | null;
  fit_summary: string;
  strengths: string[];
  risks: string[];
  suggested_angle: string | null;
};

type Draft = {
  id: string;
  subject: string | null;
  rationale: string | null;
  message: string;
  linkedin_message: string | null;
  email_message: string | null;
  short_message: string | null;
  application_message: string | null;
  follow_up_plan: Array<{ delay_days: number; message: string }>;
  cv_url: string | null;
  profile_url: string;
  status: string;
};

type Application = {
  id: string;
  status: string;
  applied_at: string | null;
  next_follow_up_at: string | null;
  notes: string | null;
};

type Opportunity = {
  id: string;
  title: string;
  company: string | null;
  url: string;
  description: string | null;
  location: string | null;
  remote: boolean;
  discovered_at: string;
  status: string;
  job_scores: Score[];
  job_outreach_drafts: Draft[];
  job_applications: Application[];
};

const tokenStorageKey = "abel-opportunity-admin-token";

const statusLabels: Record<string, string> = {
  new: "Nouveau",
  scored: "Score",
  drafted: "Brouillon",
  approved: "Valide",
  rejected: "Refuse",
  applied: "Envoye",
  follow_up: "Relance",
  closed: "Clos",
};

const statusOptions = [
  "all",
  "new",
  "scored",
  "drafted",
  "approved",
  "rejected",
  "applied",
  "follow_up",
  "closed",
];

const getStatusTone = (status: string) => {
  if (["approved", "applied", "follow_up"].includes(status)) return "default" as const;
  if (status === "rejected") return "destructive" as const;
  return "secondary" as const;
};

const AdminOpportunities = () => {
  const [token, setToken] = useState(
    () => sessionStorage.getItem(tokenStorageKey) ?? ""
  );
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");

  const selected = useMemo(
    () => opportunities.find((opportunity) => opportunity.id === selectedId) ?? opportunities[0],
    [opportunities, selectedId]
  );
  const selectedDraft = selected?.job_outreach_drafts?.[0];
  const selectedScore = selected?.job_scores?.[0];
  const selectedApplication = selected?.job_applications?.[0];

  const callAdmin = useCallback(
    async <T,>(body: Record<string, unknown>) => {
      const { data, error } = await supabase.functions.invoke<T>(
        "manage-opportunities",
        {
          body,
          headers: {
            "x-opportunity-admin-token": token,
          },
        }
      );

      if (error) {
        throw error;
      }

      return data;
    },
    [token]
  );

  const loadOpportunities = useCallback(async () => {
    if (!token) return;
    setLoading(true);

    try {
      sessionStorage.setItem(tokenStorageKey, token);
      const data = await callAdmin<{ opportunities: Opportunity[] }>({
        action: "list",
        status: status === "all" ? undefined : status,
        limit: 80,
      });
      const next = data?.opportunities ?? [];
      setOpportunities(next);
      setSelectedId((current) => current ?? next[0]?.id ?? null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Impossible de charger les opportunites"
      );
    } finally {
      setLoading(false);
    }
  }, [callAdmin, status, token]);

  const clearAdminSession = () => {
    sessionStorage.removeItem(tokenStorageKey);
    setToken("");
    setOpportunities([]);
    setSelectedId(null);
    setDraftText("");
    toast.success("Token oublie pour cette session");
  };

  const updateDraftText = async () => {
    if (!selectedDraft) return;

    await callAdmin({
      action: "update_draft",
      draftId: selectedDraft.id,
      message: draftText,
      linkedinMessage: draftText,
    });
    toast.success("Brouillon mis a jour");
    await loadOpportunities();
  };

  const updateDraftStatus = async (nextStatus: "approved" | "rejected") => {
    if (!selectedDraft) return;

    await callAdmin({
      action: "update_draft_status",
      draftId: selectedDraft.id,
      status: nextStatus,
    });
    toast.success(nextStatus === "approved" ? "Brouillon valide" : "Brouillon refuse");
    await loadOpportunities();
  };

  const markSent = async () => {
    if (!selected || !selectedDraft) return;

    await callAdmin({
      action: "create_or_update_application",
      opportunityId: selected.id,
      draftId: selectedDraft.id,
      status: "sent",
      notes: "Marque envoye depuis le dashboard admin.",
    });
    toast.success("Candidature marquee comme envoyee");
    await loadOpportunities();
  };

  useEffect(() => {
    if (selectedDraft) {
      setDraftText(
        selectedDraft.linkedin_message ??
          selectedDraft.message ??
          selectedDraft.application_message ??
          ""
      );
    } else {
      setDraftText("");
    }
  }, [selectedDraft]);

  useEffect(() => {
    if (token) {
      loadOpportunities();
    }
  }, [loadOpportunities, token]);

  return (
    <>
      <SEOHead
        title="Admin Opportunites | Abel SALAH"
        description="Dashboard prive de validation des opportunites et brouillons."
        canonical="/admin/opportunities"
        noindex
      />

      <main className="min-h-screen bg-background pt-28">
        <section className="border-b border-border/70 px-4 pb-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                <Shield className="h-4 w-4" />
                Espace prive
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Opportunity Agent
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Validation humaine des opportunites, scores IA, brouillons et
                relances. Aucun message n'est envoye automatiquement.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 md:w-[420px]">
              <Input
                type="password"
                placeholder="Token admin"
                value={token}
                onChange={(event) => setToken(event.target.value)}
              />
              <Button onClick={loadOpportunities} disabled={!token || loading}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {loading ? "Chargement..." : "Charger les opportunites"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={clearAdminSession}
                disabled={!token && opportunities.length === 0}
              >
                <X className="mr-2 h-4 w-4" />
                Oublier le token
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[420px_1fr]">
          <aside className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <Button
                  key={option}
                  size="sm"
                  variant={status === option ? "default" : "outline"}
                  onClick={() => setStatus(option)}
                >
                  {option === "all" ? "Tous" : statusLabels[option] ?? option}
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              {opportunities.map((opportunity) => {
                const score = opportunity.job_scores?.[0]?.score;
                const isSelected = selected?.id === opportunity.id;

                return (
                  <button
                    key={opportunity.id}
                    type="button"
                    onClick={() => setSelectedId(opportunity.id)}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Badge variant={getStatusTone(opportunity.status)}>
                        {statusLabels[opportunity.status] ?? opportunity.status}
                      </Badge>
                      {typeof score === "number" && (
                        <span className="text-sm font-semibold">{score}/100</span>
                      )}
                    </div>
                    <h2 className="line-clamp-2 font-medium">{opportunity.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {opportunity.company ?? "Entreprise a qualifier"}
                      {opportunity.location ? ` · ${opportunity.location}` : ""}
                    </p>
                  </button>
                );
              })}

              {!loading && opportunities.length === 0 && (
                <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                  Aucune opportunite chargee pour ce filtre.
                </div>
              )}
            </div>
          </aside>

          {selected ? (
            <article className="space-y-6 rounded-lg border bg-card p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <Badge variant={getStatusTone(selected.status)}>
                    {statusLabels[selected.status] ?? selected.status}
                  </Badge>
                  <h2 className="mt-3 text-2xl font-semibold">{selected.title}</h2>
                  <p className="mt-2 text-muted-foreground">
                    {selected.company ?? "Entreprise a qualifier"}
                    {selected.location ? ` · ${selected.location}` : ""}
                    {selected.remote ? " · Remote" : ""}
                  </p>
                </div>
                <Button asChild variant="outline">
                  <a href={selected.url} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Voir l'offre
                  </a>
                </Button>
              </div>

              {selected.description && (
                <p className="rounded-md bg-muted p-4 text-sm leading-6 text-muted-foreground">
                  {selected.description}
                </p>
              )}

              {selectedScore && (
                <div className="grid gap-3 md:grid-cols-4">
                  {[
                    ["Score", selectedScore.score],
                    ["Pertinence", selectedScore.relevance],
                    ["Urgence", selectedScore.urgency],
                    ["Budget", selectedScore.budget_potential],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-md border p-3">
                      <p className="text-xs uppercase text-muted-foreground">{label}</p>
                      <p className="mt-1 text-2xl font-semibold">{value ?? "-"}</p>
                    </div>
                  ))}
                </div>
              )}

              {selectedScore && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Analyse IA</h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {selectedScore.fit_summary}
                  </p>
                  {selectedScore.suggested_angle && (
                    <p className="text-sm leading-6">
                      <span className="font-medium">Angle : </span>
                      {selectedScore.suggested_angle}
                    </p>
                  )}
                </div>
              )}

              {selectedDraft ? (
                <div className="space-y-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-semibold">Brouillon a valider</h3>
                      <p className="text-sm text-muted-foreground">
                        Statut : {selectedDraft.status}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={updateDraftText} variant="outline">
                        Sauver
                      </Button>
                      <Button onClick={() => updateDraftStatus("approved")}>
                        <Check className="mr-2 h-4 w-4" />
                        Valider
                      </Button>
                      <Button
                        onClick={() => updateDraftStatus("rejected")}
                        variant="destructive"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Refuser
                      </Button>
                      <Button onClick={markSent} variant="secondary">
                        <Send className="mr-2 h-4 w-4" />
                        Marquer envoye
                      </Button>
                    </div>
                  </div>

                  {selectedDraft.rationale && (
                    <p className="rounded-md border p-3 text-sm text-muted-foreground">
                      {selectedDraft.rationale}
                    </p>
                  )}

                  <Input value={selectedDraft.subject ?? ""} readOnly />
                  <Textarea
                    value={draftText}
                    onChange={(event) => setDraftText(event.target.value)}
                    className="min-h-[220px]"
                  />

                  <div className="grid gap-3 md:grid-cols-3">
                    {selectedDraft.follow_up_plan?.map((step) => (
                      <div key={step.delay_days} className="rounded-md border p-3">
                        <p className="text-sm font-medium">Relance J+{step.delay_days}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {step.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-5 text-sm text-muted-foreground">
                  Aucun brouillon genere pour cette opportunite.
                </div>
              )}

              {selectedApplication && (
                <div className="rounded-md bg-muted p-4 text-sm">
                  Suivi : {selectedApplication.status}
                  {selectedApplication.next_follow_up_at
                    ? ` · prochaine relance ${new Date(
                        selectedApplication.next_follow_up_at
                      ).toLocaleDateString("fr-FR")}`
                    : ""}
                </div>
              )}
            </article>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-muted-foreground">
              Entre le token admin puis charge les opportunites.
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default AdminOpportunities;
