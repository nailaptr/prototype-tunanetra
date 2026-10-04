/**
 * Database type definitions.
 *
 * This file is the authoritative TypeScript representation of the DB schema.
 * Update it whenever migrations add/change tables or columns.
 *
 * Tip: once Supabase CLI is set up locally, you can regenerate this with:
 *   pnpm supabase gen types typescript --local > src/lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_settings: {
        Row: {
          user_id: string;
          speech_rate: number;
          font_scale: number;
          high_contrast: boolean;
          auto_speak: boolean;
          platform: string | null;
          screen_reader: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          speech_rate?: number;
          font_scale?: number;
          high_contrast?: boolean;
          auto_speak?: boolean;
          platform?: string | null;
          screen_reader?: string | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          speech_rate?: number;
          font_scale?: number;
          high_contrast?: boolean;
          auto_speak?: boolean;
          platform?: string | null;
          screen_reader?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          user_id: string;
          role: "user" | "assistant";
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          user_id: string;
          role: "user" | "assistant";
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          user_id?: string;
          role?: "user" | "assistant";
          content?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          }
        ];
      };
      usage_events: {
        Row: {
          id: string;
          user_id: string;
          kind: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          kind: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          kind?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
