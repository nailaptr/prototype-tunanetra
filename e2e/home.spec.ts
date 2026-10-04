/**
 * E2E smoke test — accessibility audit on the home page.
 *
 * Uses axe-playwright to assert no critical violations on the landing page.
 * This is the skeleton; full tests are added in P3 (accessibility foundation).
 */
import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test.describe("Home page — accessibility smoke test", () => {
  test("has no critical axe violations", async ({ page }) => {
    await page.goto("/");
    await injectAxe(page);
    await checkA11y(page, undefined, {
      axeOptions: { runOnly: ["wcag2a", "wcag2aa"] },
    });
  });

  test("skip link is the first focusable element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveText(/Lewati ke konten utama/i);
  });

  test("page has h1", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
  });
});
