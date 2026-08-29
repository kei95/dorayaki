import { test, expect } from "@playwright/test";

const baseURL = "http://127.0.0.1:4173/";

test("desktop visual and interactions", async ({ page }) => {
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.setViewportSize({ width: 864, height: 1821 });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  await expect(page.getByRole("heading", { name: /今日のおやつを/ })).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(3);

  await page.screenshot({ path: "implementation-desktop.png", fullPage: true });

  await page.getByRole("link", { name: "お菓子について" }).click();
  await expect(page.locator("#about")).toBeInViewport();

  await page.getByRole("link", { name: "贈りもの", exact: true }).click();
  await expect(page.locator("#gift")).toBeInViewport();

  await page.getByRole("link", { name: /贈りものを見る/ }).click();
  await expect(page.locator("#pickup")).toBeInViewport();
  expect(consoleErrors).toEqual([]);
});

test("mobile menu and responsive visual", async ({ page }) => {
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const menu = page.locator(".menu-button");
  await menu.click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.screenshot({ path: "implementation-mobile-menu.png" });

  await page.getByRole("link", { name: "お取り置き", exact: true }).click();
  await expect(page.getByRole("navigation")).not.toBeVisible();
  await expect(page.locator("#pickup")).toBeInViewport();

  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "implementation-mobile-full.png", fullPage: true });
  expect(consoleErrors).toEqual([]);
});
