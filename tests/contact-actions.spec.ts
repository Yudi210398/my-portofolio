import { expect, test } from "@playwright/test";
import {
  CV_PATH,
  getCvHref,
  getWhatsAppHref,
  WHATSAPP_NUMBER,
} from "../src/config/public-contact";

test("public contact configuration accepts only local PDFs and international digits", () => {
  expect(CV_PATH).toBe("");
  expect(WHATSAPP_NUMBER).toBe("6281381871739");
  expect(getCvHref("/cv.pdf")).toBe("/cv.pdf");
  expect(getCvHref("/documents/approved-cv.pdf")).toBe("/documents/approved-cv.pdf");
  expect(getCvHref("https://example.com/cv.pdf")).toBeNull();
  expect(getCvHref("/missing.txt")).toBeNull();
  expect(getWhatsAppHref("12345678901")).toBe("https://wa.me/12345678901");
  expect(getWhatsAppHref("+12345678901")).toBeNull();
  expect(getWhatsAppHref("01234567890")).toBeNull();
  expect(getWhatsAppHref("")).toBeNull();
});

test("unavailable CV is labeled but has no download destination on desktop and mobile", async ({
  page,
}) => {
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const action = page.getByRole("button", { name: "Download CV" });
    await expect(action).toBeVisible();
    await expect(action).toBeDisabled();
    await expect(page.locator("header a[download]")).toHaveCount(0);
  }
});

test.describe("Public contact without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  for (const width of [320, 1440]) {
    test(`approved contact links are keyboard accessible at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/#contact");
      const contact = page.locator("#contact");
      const cards = contact.getByRole("listitem");
      await expect(cards.getByRole("heading")).toHaveText(["Email", "LinkedIn", "GitHub", "WhatsApp"]);
      await expect(cards.nth(3)).toContainText("Direct professional messages");
      await expect(contact.getByRole("heading", { name: "Download CV" })).toHaveCount(0);
      await expect(contact).not.toContainText(/pending public approval|not publicly shared yet/i);
      await expect(contact.getByRole("link")).toHaveCount(4);

      const destinations = [
        ["Send Email", "mailto:yudi.berland@gmail.com"],
        ["Visit LinkedIn", "https://www.linkedin.com/in/yudi-runat-masneno-a03b141a7/"],
        ["Visit GitHub", "https://github.com/Yudi210398"],
        ["Chat on WhatsApp", "https://wa.me/6281381871739"],
      ] as const;
      const links = destinations.map(([name]) => contact.getByRole("link", { name, exact: true }));
      for (const [index, [, href]] of destinations.entries()) {
        await expect(links[index]).toBeVisible();
        await expect(links[index]).toHaveAttribute("href", href);
        if (index > 0) {
          await expect(links[index]).toHaveAttribute("target", "_blank");
          await expect(links[index]).toHaveAttribute("rel", "noopener noreferrer");
        }
      }
      await expect(links[0]).not.toHaveAttribute("target", "_blank");

      await links[1].focus();
      await page.keyboard.press("Shift+Tab");
      for (const [index, link] of links.entries()) {
        if (index > 0) await page.keyboard.press("Tab");
        await expect(link).toBeFocused();
        await expect(link).toHaveCSS("outline-style", "solid");
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    });
  }
});
