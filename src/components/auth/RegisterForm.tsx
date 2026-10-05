"use client";

/**
 * RegisterForm — accessible sign-up form.
 *
 * Accessibility requirements met:
 * - Every input has an associated <label> via htmlFor/id.
 * - Errors linked to inputs via aria-describedby.
 * - aria-invalid="true" on invalid inputs.
 * - Live region announces submission errors to screen readers.
 * - Submit button shows loading state and is disabled while pending.
 * - Form action is a Server Action (no JS required for basic submit).
 */
import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import type { AuthFormState } from "@/core/schemas/auth";

export default function RegisterForm() {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    register,
    undefined
  );

  return (
    <form action={action} noValidate aria-label="Formulir pendaftaran">
      {/* Generic error live region */}
      {state?.message && (
        <div
          role="alert"
          aria-live="assertive"
          id="form-error"
          className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200"
        >
          {state.message}
        </div>
      )}

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="register-email" className="block text-sm font-medium mb-1">
          Alamat email
          <span aria-hidden="true" className="text-red-600 ml-1">*</span>
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={!!state?.errors?.email}
          aria-describedby={
            state?.errors?.email ? "register-email-error" : undefined
          }
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            state?.errors?.email
              ? "border-red-500 bg-red-50"
              : "border-gray-300"
          }`}
        />
        {state?.errors?.email && (
          <p
            id="register-email-error"
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label htmlFor="register-password" className="block text-sm font-medium mb-1">
          Kata sandi
          <span aria-hidden="true" className="text-red-600 ml-1">*</span>
        </label>
        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          aria-required="true"
          aria-invalid={!!state?.errors?.password}
          aria-describedby={[
            "register-password-hint",
            state?.errors?.password ? "register-password-error" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            state?.errors?.password
              ? "border-red-500 bg-red-50"
              : "border-gray-300"
          }`}
        />
        <p id="register-password-hint" className="mt-1 text-xs text-gray-500">
          Minimal 8 karakter, mengandung huruf dan angka.
        </p>
        {state?.errors?.password && (
          <p
            id="register-password-error"
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {state.errors.password[0]}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-6">
        <label
          htmlFor="register-confirm-password"
          className="block text-sm font-medium mb-1"
        >
          Konfirmasi kata sandi
          <span aria-hidden="true" className="text-red-600 ml-1">*</span>
        </label>
        <input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          aria-required="true"
          aria-invalid={!!state?.errors?.confirmPassword}
          aria-describedby={
            state?.errors?.confirmPassword
              ? "register-confirm-error"
              : undefined
          }
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            state?.errors?.confirmPassword
              ? "border-red-500 bg-red-50"
              : "border-gray-300"
          }`}
        />
        {state?.errors?.confirmPassword && (
          <p
            id="register-confirm-error"
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {state.errors.confirmPassword[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        aria-label={pending ? "Memproses pendaftaran…" : "Daftar"}
        className="w-full rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "Memproses…" : "Daftar"}
      </button>
    </form>
  );
}
