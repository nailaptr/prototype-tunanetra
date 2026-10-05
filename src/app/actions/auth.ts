"use server";

/**
 * Server Actions for authentication.
 *
 * All Supabase calls are server-side only.
 * API keys never reach the client.
 *
 * Security rules observed:
 * - Generic error messages on login — never reveal if email is registered.
 * - On register, same generic message whether email exists or not.
 * - No password/PIN/OTP requested beyond login flow.
 */
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RegisterSchema, LoginSchema, type AuthFormState } from "@/core/schemas/auth";

// ---------------------------------------------------------------------------
// Register
// ---------------------------------------------------------------------------
export async function register(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = RegisterSchema.safeParse(raw);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    // Return a generic message — do NOT reveal if email is already registered.
    return {
      message:
        "Pendaftaran tidak dapat diselesaikan saat ini. Periksa kembali data Anda atau coba lagi nanti.",
    };
  }

  // Supabase sends a confirmation email by default.
  // Redirect to a confirmation notice page.
  redirect("/daftar/konfirmasi");
}

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------
export async function login(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = LoginSchema.safeParse(raw);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    // Generic message — does NOT distinguish "email not found" from "wrong password".
    return {
      message: "Email atau kata sandi salah. Periksa kembali dan coba lagi.",
    };
  }

  redirect("/chat");
}

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------
export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/masuk");
}
