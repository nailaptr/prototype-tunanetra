import { describe, it, expect } from "vitest";
import { sanitizeResponse } from "../core/ai/sanitize";
import { StubProvider } from "../core/ai/stub-provider";
import { getSystemPrompt } from "../core/ai/prompt";

describe("AI Core", () => {
  it("sanitizes response correctly", () => {
    const raw = "Halo! 😊 Berikut adalah **bold**, _italic_, dan [link](http://test.com).";
    const clean = sanitizeResponse(raw);
    expect(clean).toBe("Halo! Berikut adalah bold, italic, dan link.");
  });

  it("fixes numbering format in sanitize", () => {
    const raw = "Langkah:\n1. Buka\n2. Tutup";
    const clean = sanitizeResponse(raw);
    expect(clean).toContain("1. Buka");
    expect(clean).toContain("2. Tutup");
  });

  it("generates correct system prompt", () => {
    const prompt = getSystemPrompt("Windows", "NVDA");
    expect(prompt).toContain("Windows");
    expect(prompt).toContain("NVDA");
    expect(prompt).toContain("tunanetra");
  });

  it("stub provider returns text", async () => {
    const stub = new StubProvider();
    const result = await stub.assist({
      message: "Halo",
      context: { platform: "Mac", screenReader: "VoiceOver" }
    });
    expect(result.text).toBe("Ini adalah respons simulasi dari asisten AI.");
    expect(result.error).toBeUndefined();
  });

  it("stub provider simulates error", async () => {
    const stub = new StubProvider();
    const result = await stub.assist({
      message: "Simulate error please",
      context: { platform: "Mac", screenReader: "VoiceOver" }
    });
    expect(result.error).toBe("Simulated error");
  });

  it("stub provider simulates image response", async () => {
    const stub = new StubProvider();
    const result = await stub.assist({
      message: "Jelaskan gambar ini",
      image: { base64: "base64", mimeType: "image/jpeg" },
      context: { platform: "Mac", screenReader: "VoiceOver" }
    });
    expect(result.text).toBe("Gambar diterima. Ini adalah respons simulasi.");
  });
});
