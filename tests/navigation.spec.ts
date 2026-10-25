import { expect, test } from "@playwright/test";

const destinations = [
  "/#home",
  "/#about",
  "/#focus",
  "/#tech-stack",
  "/#work",
  "/#contact",
];

test("desktop navigation reaches every homepage section with native smooth scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  expect(await nav.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href"))))
    .toEqual(destinations);

  for (const href of destinations) {
    await expect(page.locator(href.slice(1))).toHaveCount(1);
  }

  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior))
    .toBe("smooth");
  await nav.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect.poll(
    () => page.locator("#work").evaluate((section) => section.getBoundingClientRect().top),
    { timeout: 5000 },
  ).toBeLessThan(120);
  expect(await page.locator("#work").evaluate((section) => section.getBoundingClientRect().top))
    .toBeGreaterThan(73);
  await nav.getByRole("link", { name: "Home" }).click();
  await expect.poll(() => page.evaluate(() => scrollY), { timeout: 5000 }).toBeLessThan(5);
});

test("mobile navigation uses the same links and closes after selection", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const nav = page.locator("#mobile-site-navigation");
  expect(await nav.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href"))))
    .toEqual(destinations);
  await nav.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(nav).toHaveAttribute("aria-hidden", "true");
});

test("case study navigation reaches the homepage and reduced motion scrolls immediately", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/projects/whatsapp-notification-service");
  await page.getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Tech Stack" }).click();
  await expect(page).toHaveURL(/\/#tech-stack$/);
  await expect(page.locator("#tech-stack")).toHaveCount(1);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior))
    .toBe("auto");
  await context.close();
});

test("opening a case study does not smooth-scroll the new page from the old position", async ({
  page,
}) => {
  await page.goto("/#work");
  await page.getByRole("link", { name: "View Case Study" }).click();
  await expect(page).toHaveURL(/\/projects\/whatsapp-notification-service$/);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior))
    .toBe("auto");
  expect(await page.evaluate(() => scrollY)).toBe(0);
});

test("mobile navigation fallback works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Mobile navigation" }).last();
  await expect(nav).toBeVisible();
  expect(await nav.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href"))))
    .toEqual(destinations);
  await nav.getByRole("link", { name: "Approach" }).click();
  await expect(page).toHaveURL(/#focus$/);
  await context.close();
});
