"use client";

/**
 * LoginForm — accessible sign-in form.
 *
 * Accessibility requirements met:
 * - Every input has an associated <label>.
 * - Errors linked via aria-describedby + aria-invalid.
 * - Generic error announced in live region (role=alert).
 * - Submit shows loading state, disabled while pending.
 */
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import type { AuthFormState } from "@/core/schemas/auth";

export default function LoginForm() {
  const [state, action, pending] = useActionState<AuthFormState, FormData>(
    login,
    undefined
  );

  return (
    <form action={action} noValidate aria-label="Formulir masuk">
      {/* Generic error live region */}
      {state?.message && (
        <div
          role="alert"
          aria-live="assertive"
          id="login-form-error"
          className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200"
        >
          {state.message}
        </div>
      )}

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="login-email" className="block text-sm font-medium mb-1">
          Alamat email
          <span aria-hidden="true" className="text-red-600 ml-1">*</span>
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={!!state?.errors?.email}
          aria-describedby={
            state?.errors?.email ? "login-email-error" : undefined
          }
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            state?.errors?.email
              ? "border-red-500 bg-red-50"
              : "border-gray-300"
          }`}
        />
        {state?.errors?.email && (
          <p
            id="login-email-error"
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="mb-6">
        <label htmlFor="login-password" className="block text-sm font-medium mb-1">
          Kata sandi
          <span aria-hidden="true" className="text-red-600 ml-1">*</span>
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-required="true"
          aria-invalid={!!state?.errors?.password}
          aria-describedby={
            state?.errors?.password ? "login-password-error" : undefined
          }
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            state?.errors?.password
              ? "border-red-500 bg-red-50"
              : "border-gray-300"
          }`}
        />
        {state?.errors?.password && (
          <p
            id="login-password-error"
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {state.errors.password[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        aria-label={pending ? "Sedang masuk…" : "Masuk"}
        className="w-full rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "Sedang masuk…" : "Masuk"}
      </button>
    </form>
  );
}
