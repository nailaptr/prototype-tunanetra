/**
 * Zod schemas for authentication forms.
 *
 * Lives in src/core — framework-agnostic, no React/Next imports.
 * Reused by both Server Actions (server) and unit tests.
 *
 * Security rule: error messages must NOT reveal whether an email is
 * already registered (no "email taken" messages).
 */
import { z } from "zod";

// ---------------------------------------------------------------------------
// Register schema
// ---------------------------------------------------------------------------
export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email wajib diisi.")
      .email("Format email tidak valid."),
    password: z
      .string()
      .min(8, "Kata sandi minimal 8 karakter.")
      .max(128, "Kata sandi terlalu panjang.")
      .regex(/[a-zA-Z]/, "Kata sandi harus mengandung huruf.")
      .regex(/[0-9]/, "Kata sandi harus mengandung angka."),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;

// ---------------------------------------------------------------------------
// Login schema
// ---------------------------------------------------------------------------
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi.")
    .email("Format email tidak valid."),
  password: z.string().min(1, "Kata sandi wajib diisi."),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// ---------------------------------------------------------------------------
// Form state types (returned by Server Actions, consumed by useActionState)
// ---------------------------------------------------------------------------
export type AuthFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      /** Generic message not tied to a specific field */
      message?: string;
      /** Discriminates success from error state */
      success?: boolean;
    }
  | undefined;
