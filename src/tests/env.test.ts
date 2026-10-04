/**
 * Smoke test: env validation utility
 *
 * Verifies that the Zod schema accepts valid env values and rejects missing ones.
 * Uses the test stub from setup.ts (NODE_ENV=test bypasses real validation).
 */

import { describe, it, expect } from "vitest";
import { z } from "zod";

// Minimal inline schema (mirrors env.ts server schema) so we can unit-test it
// without importing Next.js runtime in a pure Node environment.
const schema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

describe("env schema", () => {
  it("accepts valid environment variables", () => {
    const result = schema.safeParse({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key-123",
      NODE_ENV: "test",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a missing SUPABASE_URL", () => {
    const result = schema.safeParse({
      NEXT_PUBLIC_SUPABASE_URL: undefined,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key-123",
      NODE_ENV: "test",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed URL", () => {
    const result = schema.safeParse({
      NEXT_PUBLIC_SUPABASE_URL: "not-a-url",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key-123",
      NODE_ENV: "test",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty SUPABASE_ANON_KEY", () => {
    const result = schema.safeParse({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
      NODE_ENV: "test",
    });
    expect(result.success).toBe(false);
  });

  it("defaults NODE_ENV to development when omitted", () => {
    const result = schema.safeParse({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "key",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.NODE_ENV).toBe("development");
    }
  });
});
