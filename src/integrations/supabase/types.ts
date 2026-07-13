export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      generated_blog_posts: {
        Row: {
          article_type: string
          content: Json
          created_at: string
          date: string
          excerpt: string
          id: string
          meta_description: string
          meta_title: string
          published: boolean
          read_time: string
          slug: string
          tags: string[]
          title: string
        }
        Insert: {
          article_type?: string
          content?: Json
          created_at?: string
          date?: string
          excerpt: string
          id?: string
          meta_description: string
          meta_title: string
          published?: boolean
          read_time?: string
          slug: string
          tags?: string[]
          title: string
        }
        Update: {
          article_type?: string
          content?: Json
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          meta_description?: string
          meta_title?: string
          published?: boolean
          read_time?: string
          slug?: string
          tags?: string[]
          title?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          applied_at: string | null
          created_at: string
          draft_id: string | null
          id: string
          next_follow_up_at: string | null
          notes: string | null
          opportunity_id: string
          status: string
          updated_at: string
        }
        Insert: {
          applied_at?: string | null
          created_at?: string
          draft_id?: string | null
          id?: string
          next_follow_up_at?: string | null
          notes?: string | null
          opportunity_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          applied_at?: string | null
          created_at?: string
          draft_id?: string | null
          id?: string
          next_follow_up_at?: string | null
          notes?: string | null
          opportunity_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_draft_id_fkey"
            columns: ["draft_id"]
            isOneToOne: false
            referencedRelation: "job_outreach_drafts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: true
            referencedRelation: "job_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      job_opportunities: {
        Row: {
          company: string | null
          description: string | null
          discovered_at: string
          id: string
          location: string | null
          published_at: string | null
          raw_payload: Json
          remote: boolean
          source_id: string | null
          source_type: string
          status: string
          title: string
          url: string
        }
        Insert: {
          company?: string | null
          description?: string | null
          discovered_at?: string
          id?: string
          location?: string | null
          published_at?: string | null
          raw_payload?: Json
          remote?: boolean
          source_id?: string | null
          source_type?: string
          status?: string
          title: string
          url: string
        }
        Update: {
          company?: string | null
          description?: string | null
          discovered_at?: string
          id?: string
          location?: string | null
          published_at?: string | null
          raw_payload?: Json
          remote?: boolean
          source_id?: string | null
          source_type?: string
          status?: string
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_opportunities_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "job_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      job_outreach_drafts: {
        Row: {
          application_message: string | null
          channel: string
          created_at: string
          cv_url: string | null
          email_message: string | null
          follow_up_plan: Json
          id: string
          linkedin_message: string | null
          message: string
          opportunity_id: string
          profile_url: string
          rationale: string | null
          short_message: string | null
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          application_message?: string | null
          channel?: string
          created_at?: string
          cv_url?: string | null
          email_message?: string | null
          follow_up_plan?: Json
          id?: string
          linkedin_message?: string | null
          message: string
          opportunity_id: string
          profile_url?: string
          rationale?: string | null
          short_message?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          application_message?: string | null
          channel?: string
          created_at?: string
          cv_url?: string | null
          email_message?: string | null
          follow_up_plan?: Json
          id?: string
          linkedin_message?: string | null
          message?: string
          opportunity_id?: string
          profile_url?: string
          rationale?: string | null
          short_message?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_outreach_drafts_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: true
            referencedRelation: "job_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      job_scores: {
        Row: {
          budget_potential: number | null
          created_at: string
          fit_summary: string
          id: string
          opportunity_id: string
          relevance: number | null
          response_probability: number | null
          risks: string[]
          score: number
          strengths: string[]
          suggested_angle: string | null
          urgency: number | null
        }
        Insert: {
          budget_potential?: number | null
          created_at?: string
          fit_summary: string
          id?: string
          opportunity_id: string
          relevance?: number | null
          response_probability?: number | null
          risks?: string[]
          score: number
          strengths?: string[]
          suggested_angle?: string | null
          urgency?: number | null
        }
        Update: {
          budget_potential?: number | null
          created_at?: string
          fit_summary?: string
          id?: string
          opportunity_id?: string
          relevance?: number | null
          response_probability?: number | null
          risks?: string[]
          score?: number
          strengths?: string[]
          suggested_angle?: string | null
          urgency?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_scores_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: true
            referencedRelation: "job_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      job_sources: {
        Row: {
          created_at: string
          daily_limit: number
          enabled: boolean
          exclude_terms: string[]
          id: string
          include_domains: string[]
          metadata: Json
          min_score: number
          name: string
          search_queries: string[]
          source_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          daily_limit?: number
          enabled?: boolean
          exclude_terms?: string[]
          id?: string
          include_domains?: string[]
          metadata?: Json
          min_score?: number
          name: string
          search_queries?: string[]
          source_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          daily_limit?: number
          enabled?: boolean
          exclude_terms?: string[]
          id?: string
          include_domains?: string[]
          metadata?: Json
          min_score?: number
          name?: string
          search_queries?: string[]
          source_type?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
