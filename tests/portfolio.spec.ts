import { expect, test } from "@playwright/test";

const caseStudy = "/projects/whatsapp-notification-service";

test("visitor journey and published links", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await page.getByRole("link", { name: "View Selected Work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole("heading", { name: "Selected work." })).toBeVisible();
  await page.getByRole("link", { name: "View Case Study" }).click();
  await expect(page).toHaveURL(new RegExp(`${caseStudy}/?$`));
  await expect(page.getByRole("heading", { level: 1 })).toContainText("WhatsApp Notification Service");
  await page.getByRole("link", { name: "Back to selected work" }).first().click();
  await expect(page).toHaveURL(/\/#work$/);
  await page.getByRole("navigation", { name: "Footer navigation" })
    .getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole("heading", { level: 2, name: /build something great/i })).toBeVisible();
  await expect(page.locator('#contact a[href^="mailto:"], #contact a[href^="https:"]')).toHaveCount(0);
});

test("keyboard can reach Hero CTA with visible focus", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("link", { name: "Explore my focus" });
  for (let index = 0; index < 8; index += 1) {
    if (await cta.evaluate((element) => element === document.activeElement)) break;
    await page.keyboard.press("Tab");
  }
  await expect(cta).toBeFocused();
  const outline = await cta.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#focus$/);
});

test("reduced motion and JavaScript disabled keep content readable", async ({ browser }) => {
  const reduced = await browser.newContext({ reducedMotion: "reduce" });
  const page = await reduced.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.locator("#hero-title").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await reduced.close();

  const noScript = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noScript.newPage();
  await staticPage.goto("/");
  await expect(staticPage.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(staticPage.getByRole("link", { name: "View Case Study" })).toBeVisible();
  await staticPage.goto(caseStudy);
  await expect(staticPage.getByRole("heading", { level: 1 })).toContainText("WhatsApp Notification Service");
  await noScript.close();
});

test("export contains only approved project content and valid internal links", async ({ page, request }) => {
  for (const path of ["/", caseStudy]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).not.toMatch(/Batik Management App|MIFO/);
    await page.goto(path);
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")).filter((href): href is string => Boolean(href)),
    );
    for (const href of new Set(hrefs)) {
      const url = new URL(href, "http://127.0.0.1:4173");
      expect((await request.get(url.pathname)).status(), href).toBe(200);
      if (url.hash) {
        await page.goto(url.pathname);
        expect(await page.locator(`[id="${url.hash.slice(1)}"]`).count(), href).toBeGreaterThan(0);
      }
    }
  }
});

test("unknown and unpublished project routes return 404", async ({ page, request }) => {
  for (const path of ["/does-not-exist", "/projects/batik-management-app", "/projects/mifo"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
    await page.goto(path);
    await expect(page.getByRole("heading", { name: "This page could not be found." })).toBeVisible();
  }
});

test("mobile dropdown supports toggle, keyboard, outside click, and case-study anchors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Open navigation menu" });
  const panel = page.locator("#mobile-site-navigation");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toBeHidden();
  await button.focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Explore my focus" })).toBeFocused();

  await button.click();
  await expect(page.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(panel.getByRole("link", { name: "Home" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(button).toBeFocused();

  await button.click();
  await page.mouse.click(8, 700);
  await expect(panel).toBeHidden();
  await button.click();
  await page.getByRole("button", { name: "Close navigation menu" }).click();
  await expect(panel).toBeHidden();

  await page.goto(caseStudy);
  await button.click();
  await panel.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(panel).toBeHidden();
  await expect(page.getByRole("heading", { name: "Selected work." })).toBeVisible();
});

for (const width of [320, 360, 390, 768, 1024, 1280, 1440]) {
  test(`responsive export at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", caseStudy, "/does-not-exist"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow, `${path} at ${width}px`).toBeLessThanOrEqual(1);
      if (width < 1024) {
        await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeVisible();
        await expect(page.locator('header nav[aria-label="Primary navigation"]')).toBeHidden();
      } else {
        await expect(page.locator('header nav[aria-label="Primary navigation"]')).toBeVisible();
        await expect(page.locator('header button[aria-controls="mobile-site-navigation"]')).toBeHidden();
      }
      await expect(page.locator("footer nav")).toBeVisible();
    }
  });
}
