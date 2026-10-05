/**
 * proxy.ts — Next.js 16 route protection proxy.
 *
 * Runs on every non-static request.
 * - Refreshes the Supabase session cookie.
 * - Redirects unauthenticated users away from protected routes.
 * - Redirects authenticated users away from auth pages.
 *
 * Only reads session from cookies (optimistic check) — no DB calls here.
 */
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/** Routes only accessible when NOT logged in */
const AUTH_ROUTES = ["/masuk", "/daftar"];

/** Routes that require authentication */
const PROTECTED_PREFIXES = ["/chat", "/pengaturan"];

export default async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );
  const isProtectedRoute = PROTECTED_PREFIXES.some((p) =>
    pathname.startsWith(p)
  );

  // Unauthenticated user tries to access a protected route → send to login
  if (isProtectedRoute && !user) {
    const loginUrl = new URL("/masuk", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user visits login/register → send to dashboard
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static  (static files)
     * - _next/image   (image optimisation)
     * - favicon.ico, sitemap.xml, robots.txt
     * - /api/         (route handlers handle their own auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/).*)",
  ],
};
