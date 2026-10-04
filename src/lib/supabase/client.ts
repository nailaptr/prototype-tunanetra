/**
 * Supabase browser client.
 *
 * Use this in Client Components.  It relies on @supabase/ssr which
 * manages cookies via the browser's document.cookie.
 */
"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getClientEnv } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

export function createClient() {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } =
    getClientEnv();

  return createBrowserClient<Database>(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
