import { expect, test } from "@playwright/test";

for (const width of [320, 360, 390, 768, 1024, 1280, 1440]) {
  test(`project carousel at ${width}px`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#work");
    await page.evaluate(() => document.fonts.ready);
    const carousel = page.getByRole("region", { name: "Selected projects" });
    await expect(carousel.locator('[aria-live="polite"]')).toContainText("1 / 3");
    const whatsapp = carousel.getByRole("heading", { name: "WhatsApp Notification Service" });
    const dina = carousel.getByRole("heading", { name: "Dina Cake" });
    await expect(carousel.getByRole("heading", { name: "Batik App" })).toBeVisible();
    await expect(whatsapp).toBeHidden();
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
    await expect(carousel.getByRole("heading", { name: "Batik App" })).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(dina).toBeVisible();
    await expect(carousel.getByRole("button", { name: "Show project 2: Dina Cake" }))
      .toHaveAttribute("aria-current", "true");
    expect((await request.get("/projects/dina-cake")).status()).toBe(200);

    await carousel.getByRole("button", { name: "Next project" }).click();
    await expect(whatsapp).toBeVisible();
    await expect(carousel.getByRole("link", { name: "View Case Study" })).toHaveAttribute(
      "href", "/projects/whatsapp-notification-service",
    );
    await expect(carousel.locator('[aria-live="polite"]')).toContainText("3 / 3");
    await carousel.getByRole("button", { name: "Next project" }).click();
    const batik = carousel.getByRole("group", { name: "1 of 3: Batik App" });
    await expect(batik.getByRole("heading", { name: "Batik App" })).toBeVisible();
    await expect(carousel.getByRole("article")).toHaveCount(1);
    await expect(carousel.locator('[aria-live="polite"]')).toContainText("1 / 3");
    expect(Math.abs((await carousel.boundingBox())!.height - before!.height)).toBeLessThan(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    const card = batik.getByRole("article");
    await expect(batik.getByText("Completed", { exact: true })).toBeVisible();
    const lastMilestone = batik.getByText("Cloud-hosted and used in daily business operations.", { exact: false });
    const [cardBox, milestoneBox] = await Promise.all([card.boundingBox(), lastMilestone.boundingBox()]);
    expect(milestoneBox!.y + milestoneBox!.height).toBeLessThanOrEqual(cardBox!.y + cardBox!.height);

    await carousel.getByRole("button", { name: "Previous project" }).click();
    await expect(whatsapp).toBeVisible();
    await carousel.getByRole("button", { name: "Show project 2: Dina Cake" }).click();
    await expect(dina).toBeVisible();
  });
}

test("Batik card shows approved milestones, local logos, and both CTAs", async ({ page, request }) => {
  await page.goto("/#work");
  const carousel = page.getByRole("region", { name: "Selected projects" });
  const indicator = carousel.getByRole("button", { name: "Show project 1: Batik App" });
  await indicator.click();
  await expect(indicator).toHaveAttribute("aria-current", "true");
  const batik = carousel.getByRole("group", { name: "1 of 3: Batik App" });
  const badges = batik.getByRole("list", { name: "Technology stack" });
  await expect(badges.getByRole("listitem")).toHaveText([
    "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Next.js", "React",
  ]);
  const logos = badges.locator("img");
  await expect(logos).toHaveCount(6);
  await expect.poll(() => logos.evaluateAll((images) =>
    images.every((image) => image.getAttribute("src")?.startsWith("/images/tech/") &&
      (image as HTMLImageElement).naturalWidth > 0),
  )).toBe(true);

  const milestones = batik.locator("ol > li");
  await expect(milestones).toHaveCount(3);
  for (const [index, title] of [
    "Core Inventory & Supplier Traceability",
    "Security & Data Integrity",
    "Deployment & Operational Use",
  ].entries()) {
    await expect(milestones.nth(index)).toContainText(title);
    await expect(milestones.nth(index)).toContainText(/Completed — /);
    await expect(milestones.nth(index).locator('svg path')).toHaveCount(1);
  }

  const application = batik.getByRole("link", { name: "View Application", exact: true });
  const caseStudy = batik.getByRole("link", { name: "View Case Study" });
  await expect(batik.getByRole("link")).toHaveCount(2);
  await expect(caseStudy).toHaveAttribute("href", "/projects/batik-app");
  await expect(application).toHaveAttribute("href", "https://batik-web-staging.vercel.app");
  await expect(application).toHaveAttribute("target", "_blank");
  await expect(application).toHaveAttribute("rel", "noopener noreferrer");
  await carousel.getByRole("button", { name: "Show project 3: WhatsApp Notification Service" }).focus();
  await page.keyboard.press("Tab");
  await expect(carousel.getByRole("button", { name: "Next project" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(caseStudy).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(application).toBeFocused();
  expect(await application.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
  expect((await request.get("/projects/batik-app")).status()).toBe(200);
});

test("carousel respects reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/#work");
  const carousel = page.getByRole("region", { name: "Selected projects" });
  await carousel.getByRole("button", { name: "Show project 2: Dina Cake" }).click();
  const slide = carousel.locator('[aria-roledescription="slide"][aria-hidden="false"]');
  expect(await slide.evaluate((element) => getComputedStyle(element).transitionDuration)).toBe("0s");
  await context.close();
});
