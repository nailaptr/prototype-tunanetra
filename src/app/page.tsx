import { redirect } from "next/navigation";

/**
 * Root page — redirects to the login page.
 * The proxy handles auth-aware redirects after login.
 */
export default function RootPage() {
  redirect("/masuk");
}
