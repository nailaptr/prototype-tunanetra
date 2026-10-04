/**
 * Environment variable validation using Zod.
 *
 * Server-side variables are validated at startup; the build will fail
 * if any required variable is missing or malformed.
 *
 * IMPORTANT: Never expose SUPABASE_SERVICE_ROLE_KEY or AI API keys
 * to the client bundle. All secrets live here (server-side only).
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Server-side schema — only available in Node.js / Route Handlers / Server
// Components.  Never add NEXT_PUBLIC_ prefixes to secrets.
// ---------------------------------------------------------------------------
const serverSchema = z.object({
  /** Supabase project URL (safe to read server-side; also used as NEXT_PUBLIC) */
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),

  /** Supabase anon key (public by design — safe in client bundle) */
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),

  /** Google Gemini API key — NEVER expose to client */
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required").optional(),

  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

// ---------------------------------------------------------------------------
// Client-side schema — only NEXT_PUBLIC_ variables, validated separately
// so this module is importable from both server and client without leaking.
// ---------------------------------------------------------------------------
const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

function validateEnv() {
  // Skip validation in test environments where env may be stubbed
  if (process.env.NODE_ENV === "test") {
    return process.env as unknown as z.infer<typeof serverSchema>;
  }

  const result = serverSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    console.error(result.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables. See console for details.");
  }
  return result.data;
}

/**
 * Validated server-side environment.
 * Import this instead of process.env directly.
 */
export const env = validateEnv();

/**
 * Validated client-side environment (NEXT_PUBLIC_ only).
 * Safe to import in client components.
 */
export function getClientEnv() {
  const result = clientSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  if (!result.success) {
    throw new Error(
      "Missing NEXT_PUBLIC_ environment variables. Check .env.local."
    );
  }
  return result.data;
}
