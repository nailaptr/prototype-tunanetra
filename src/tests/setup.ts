/**
 * Global test setup for Vitest.
 *
 * Vitest already sets NODE_ENV="test" before this file runs, so we only
 * need to stub the Supabase env vars to satisfy Zod validation.
 * No real network calls are made in unit tests.
 */
process.env["NEXT_PUBLIC_SUPABASE_URL"] = "https://test.supabase.co";
process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] = "test-anon-key";
