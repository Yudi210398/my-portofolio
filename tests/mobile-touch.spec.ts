import { devices, expect, test } from "@playwright/test";

test.use(devices["Pixel 7"]);

for (const width of [320, 360, 390, 412]) {
  test.describe(`Android touch at ${width}px`, () => {
    test.use({ viewport: { width, height: 850 } });

    test("menu, work carousel and case study respond to taps with healthy client assets", async ({ page, request, baseURL }) => {
      const origin = new URL(baseURL!).origin;
      const problems: string[] = [];
      let scripts = 0;
      page.on("pageerror", (error) => problems.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error" && /hydrat|Minified React error|ChunkLoadError/i.test(message.text())) {
          problems.push(message.text());
        }
      });
      const isLocalAsset = (url: string) =>
        new URL(url).origin === origin && new URL(url).pathname.startsWith("/_next/");
      page.on("requestfailed", (asset) => {
        if (isLocalAsset(asset.url()) && !/ERR_ABORTED/.test(asset.failure()?.errorText ?? "")) {
          problems.push(`${asset.url()} ${asset.failure()?.errorText}`);
        }
      });
      page.on("response", (response) => {
        if (!isLocalAsset(response.url())) return;
        const type = response.request().resourceType();
        if (type === "script") scripts++;
        const contentType = response.headers()["content-type"] ?? "";
        if (!response.ok() && response.status() !== 304 ||
          (response.ok() && type === "script" && !/javascript|ecmascript/i.test(contentType)) ||
          (response.ok() && type === "stylesheet" && !/^text\/css/i.test(contentType))) {
          problems.push(`${response.status()} ${contentType} ${response.url()}`);
        }
      });

      await page.goto("/");
      const menu = page.getByRole("button", { name: "Open navigation menu" });
      const close = page.getByRole("button", { name: "Close navigation menu" });
      const panel = page.getByRole("navigation", { name: "Mobile navigation", exact: true });
      await menu.tap();
      await expect(close).toHaveAttribute("aria-expanded", "true");
      await expect(panel).toBeVisible();
      await panel.getByRole("link", { name: "Work", exact: true }).tap();
      await expect(page).toHaveURL(/#work$/);
      await expect(panel).toBeHidden();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await expect.poll(() => page.locator("#work").evaluate((section) => {
        const top = section.getBoundingClientRect().top;
        const header = document.querySelector("body > header")!.getBoundingClientRect();
        return top >= header.bottom && top <= header.bottom + 40;
      })).toBe(true);
      await menu.tap();
      await expect(panel).toBeVisible();
      await close.tap();
      await expect(panel).toBeHidden();

      const carousel = page.getByRole("region", { name: "Selected projects" });
      const next = carousel.getByRole("button", { name: "Next project" });
      const previous = carousel.getByRole("button", { name: "Previous project" });
      const counter = carousel.locator('[aria-live="polite"]');
      const select = (index: number, title: string) =>
        carousel.getByRole("button", { name: `Show project ${index}: ${title}` });
      async function expectSlide(index: number, title: string) {
        const active = carousel.getByRole("group", { name: `${index} of 3: ${title}` });
        await expect(active.getByRole("heading", { name: title, exact: true })).toBeVisible();
        await expect(counter).toContainText(`${index} / 3`);
        await expect(select(index, title)).toHaveAttribute("aria-current", "true");
      }

      await expectSlide(1, "Batik App");
      await next.tap();
      await expectSlide(2, "Dina Cake");
      await next.tap();
      await expectSlide(3, "WhatsApp Notification Service");
      await previous.tap();
      await expectSlide(2, "Dina Cake");
      await select(3, "WhatsApp Notification Service").tap();
      await expectSlide(3, "WhatsApp Notification Service");
      await select(2, "Dina Cake").tap();
      await expectSlide(2, "Dina Cake");
      await select(1, "Batik App").tap();
      await expectSlide(1, "Batik App");
      const application = carousel.getByRole("link", { name: "View Application", exact: true });
      await expect(application).toBeVisible();
      await expect(application).toHaveAttribute("href", "https://batik-web-staging.vercel.app");
      await expect(application).toHaveAttribute("target", "_blank");
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
      await carousel.getByRole("link", { name: "View Case Study" }).tap();
      await expect(page).toHaveURL(/\/projects\/batik-app$/);
      await expect(page.getByRole("heading", { name: "Batik App", level: 1 })).toBeVisible();

      expect((await request.get("/_next/static/chunks/nonexistent-mobile-audit.js")).status()).toBe(404);
      expect(scripts).toBeGreaterThan(0);
      expect(problems).toEqual([]);
    });
  });
}
