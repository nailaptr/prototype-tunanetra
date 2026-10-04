/**
 * Supabase server client.
 *
 * Use this in Server Components, Route Handlers, and Server Actions.
 * It reads/writes cookies via Next.js `cookies()` from `next/headers`.
 *
 * ADR-001 / Constitution rule 8: API keys are server-side only.
 */
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // `setAll` may be called from Server Components where cookies
            // are read-only.  Route Handlers can set cookies correctly.
          }
        },
      },
    }
  );
}
