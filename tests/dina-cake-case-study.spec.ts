import { expect, test } from "@playwright/test";

const route = "/projects/dina-cake";

test("Dina carousel CTA reaches a generated case study and returns to selected work", async ({ page }) => {
  await page.goto("/#work");
  const carousel = page.getByRole("region", { name: "Selected projects" });
  await expect(carousel.getByRole("heading", { name: "Batik App" })).toBeVisible();
  await carousel.getByRole("button", { name: "Next project" }).click();
  const cta = carousel.getByRole("link", { name: "View Case Study" });
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", route);
  await page.keyboard.press("Tab");
  await expect(cta).toBeFocused();
  expect(await cta.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
  await cta.click();
  await expect(page).toHaveURL(new RegExp(`${route}/?$`));
  await expect(page.getByRole("heading", { level: 1, name: "Dina Cake", exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Dina Cake");
  await page.getByRole("link", { name: "Back to selected work" }).first().click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.getByRole("heading", { name: "Selected work." })).toBeVisible();
});

test("direct export keeps contact completed and release pending", async ({ page, request }) => {
  expect((await request.get(route)).status()).toBe(200);
  await page.goto(route);
  await expect(page).toHaveTitle(/Dina Cake.*Case Study/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator("main")).toContainText("Pre-release");
  for (const title of ["Business Problem", "Role & Responsibilities", "System Architecture", "Engineering Decisions & Trade-offs", "Failure Handling & Testing", "Current Results & Remaining Work"]) {
    await expect(page.getByRole("heading", { level: 2, name: title, exact: true })).toHaveCount(1);
  }
  const results = page.getByRole("region", { name: "Current Results & Remaining Work" });
  const contact = results.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "WhatsApp Contact Integration", exact: true }) });
  await expect(contact).toContainText("Completed");
  const release = results.getByRole("listitem").filter({ has: page.getByRole("heading", { name: "Final QA & Production Release", exact: true }) });
  await expect(release).toContainText("Pending");
  await expect(results).toContainText("Pesanan Acara — Draft / Pending Approval");
  await expect(page.locator("main")).toContainText("manual");
  await expect(page.locator("main")).toContainText("Codex");
  await expect(page.locator("main")).not.toContainText("Netlify");
  expect((await request.get("/projects/whatsapp-notification-service")).status()).toBe(200);
  expect((await request.get("/projects/unknown-project")).status()).toBe(404);
});

for (const width of [320, 360, 390, 768, 1024, 1280, 1440]) {
  test(`Dina case study remains readable with loaded images at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(route);
    await expect(page.getByRole("heading", { name: "The Ordering Flow", exact: true })).toBeVisible();
    await expect(page.getByRole("list", { name: "Manual ordering steps" }).getByRole("listitem")).toHaveCount(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await expect(page.getByRole("list", { name: "Catalog to confirmation" })).toBeVisible();
    const logos = page.getByRole("region", { name: "Tech Stack", exact: true }).locator("img");
    await expect(logos).toHaveCount(4);
    for (const logo of await logos.all()) {
      await logo.scrollIntoViewIfNeeded();
      await expect.poll(() => logo.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    for (const element of await page.locator("main h1, main h2, main h3, main dd").all()) {
      const box = await element.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    }
  });
}

test("Dina exported content and ordering steps work without JavaScript and in reduced motion", async ({ browser }) => {
  for (const options of [{ javaScriptEnabled: false }, { reducedMotion: "reduce" as const }]) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Dina Cake");
    await expect(page.getByRole("list", { name: "Manual ordering steps" })).toBeVisible();
    await page.getByRole("heading", { name: "Current Results & Remaining Work", exact: true }).scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: "WhatsApp Contact Integration", exact: true })).toBeVisible();
    await page.getByRole("link", { name: "Back to selected work" }).last().click();
    await expect(page).toHaveURL(/\/#work$/);
    await context.close();
  }
});
