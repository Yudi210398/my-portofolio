import { expect, test } from "@playwright/test";

for (const width of [320, 360, 390, 768, 1024, 1280, 1440]) {
  test(`project carousel at ${width}px`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#work");
    await page.evaluate(() => document.fonts.ready);
    const carousel = page.getByRole("region", { name: "Selected projects" });
    const whatsapp = carousel.getByRole("heading", { name: "WhatsApp Notification Service" });
    const dina = carousel.getByRole("heading", { name: "Dina Cake" });
    await expect(whatsapp).toBeVisible();
    await expect(dina).toBeHidden();
    const before = await carousel.boundingBox();
    await carousel.getByRole("button", { name: "Next project" }).click();
    await expect(dina).toBeVisible();
    await expect(whatsapp).toBeHidden();
    await expect(carousel.getByRole("link", { name: "View Case Study" })).toBeVisible();
    await expect(carousel.getByRole("link", { name: "View Case Study" })).toHaveAttribute("href", "/projects/dina-cake");
    await expect(carousel).toContainText("Pre-release");
    await expect(carousel).toContainText("Implemented — Landing page");
    await expect(carousel).not.toContainText("Netlify");
    const after = await carousel.boundingBox();
    expect(Math.abs(after!.height - before!.height)).toBeLessThan(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    await carousel.getByRole("button", { name: "Previous project" }).focus();
    await page.keyboard.press("Enter");
    await expect(whatsapp).toBeVisible();
    await expect(carousel.getByRole("link", { name: "View Case Study" })).toHaveAttribute(
      "href", "/projects/whatsapp-notification-service",
    );
    await page.keyboard.press("ArrowRight");
    await expect(dina).toBeVisible();
    await expect(carousel.getByRole("button", { name: "Show project 2: Dina Cake" }))
      .toHaveAttribute("aria-current", "true");
    expect((await request.get("/projects/dina-cake")).status()).toBe(200);
  });
}

test("carousel respects reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/#work");
  const carousel = page.getByRole("region", { name: "Selected projects" });
  await carousel.getByRole("button", { name: "Next project" }).click();
  const slide = carousel.locator('[aria-roledescription="slide"][aria-hidden="false"]');
  expect(await slide.evaluate((element) => getComputedStyle(element).transitionDuration)).toBe("0s");
  await context.close();
});
