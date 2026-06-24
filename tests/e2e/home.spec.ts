import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage renders production-critical sections and CTAs", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Architecture with clarity");
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: /View Works/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Verify STRA/i }).first()).toBeVisible();
  await expect(page.locator(".project-card").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Consult via WhatsApp/i }).first()).toHaveAttribute("href", /https:\/\/wa\.me\//);
});

test("mobile navigation opens accessibly", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: /open navigation/i });
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(page.getByRole("button", { name: /close navigation/i })).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
});

test("homepage has no critical axe violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const criticalViolations = results.violations.filter((violation) => violation.impact === "critical");

  expect(criticalViolations).toEqual([]);
});
