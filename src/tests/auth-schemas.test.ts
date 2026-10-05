/**
 * Unit tests for auth Zod schemas.
 * These run in Node (no browser, no Supabase).
 */
import { describe, it, expect } from "vitest";
import { RegisterSchema, LoginSchema } from "@/core/schemas/auth";

// ---------------------------------------------------------------------------
// RegisterSchema
// ---------------------------------------------------------------------------
describe("RegisterSchema", () => {
  const valid = {
    email: "tunanetra@example.com",
    password: "Abc12345",
    confirmPassword: "Abc12345",
  };

  it("accepts valid registration data", () => {
    expect(RegisterSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects missing email", () => {
    const r = RegisterSchema.safeParse({ ...valid, email: "" });
    expect(r.success).toBe(false);
  });

  it("rejects malformed email", () => {
    const r = RegisterSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(r.success).toBe(false);
  });

  it("rejects password shorter than 8 chars", () => {
    const r = RegisterSchema.safeParse({
      ...valid,
      password: "Ab1",
      confirmPassword: "Ab1",
    });
    expect(r.success).toBe(false);
  });

  it("rejects password without letters", () => {
    const r = RegisterSchema.safeParse({
      ...valid,
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(r.success).toBe(false);
  });

  it("rejects password without numbers", () => {
    const r = RegisterSchema.safeParse({
      ...valid,
      password: "AbcdEfgh",
      confirmPassword: "AbcdEfgh",
    });
    expect(r.success).toBe(false);
  });

  it("rejects mismatched confirmPassword", () => {
    const r = RegisterSchema.safeParse({
      ...valid,
      confirmPassword: "DifferentPass1",
    });
    expect(r.success).toBe(false);
    if (!r.success) {
      const fieldErrors = r.error.flatten().fieldErrors;
      expect(fieldErrors.confirmPassword).toBeDefined();
    }
  });

  it("confirmPassword error is on confirmPassword field, not root", () => {
    const r = RegisterSchema.safeParse({
      ...valid,
      confirmPassword: "WrongPass1",
    });
    if (!r.success) {
      expect(r.error.flatten().fieldErrors.confirmPassword).toBeDefined();
    }
  });
});

// ---------------------------------------------------------------------------
// LoginSchema
// ---------------------------------------------------------------------------
describe("LoginSchema", () => {
  const valid = {
    email: "tunanetra@example.com",
    password: "anypassword",
  };

  it("accepts valid login data", () => {
    expect(LoginSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects empty email", () => {
    const r = LoginSchema.safeParse({ ...valid, email: "" });
    expect(r.success).toBe(false);
  });

  it("rejects malformed email", () => {
    const r = LoginSchema.safeParse({ ...valid, email: "bad-email" });
    expect(r.success).toBe(false);
  });

  it("rejects empty password", () => {
    const r = LoginSchema.safeParse({ ...valid, password: "" });
    expect(r.success).toBe(false);
  });

  it("does not enforce password complexity on login (only register does)", () => {
    // Login accepts any non-empty password — complexity check is at register
    const r = LoginSchema.safeParse({ ...valid, password: "simple" });
    expect(r.success).toBe(true);
  });
});
