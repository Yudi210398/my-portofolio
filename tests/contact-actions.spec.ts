import { expect, test } from "@playwright/test";
import {
  CV_PATH,
  getCvHref,
  getWhatsAppHref,
  WHATSAPP_NUMBER,
} from "../src/config/public-contact";

const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=yudi.berland%40gmail.com";

test("public contact configuration accepts only local PDFs and international digits", () => {
  expect(CV_PATH).toBe("");
  expect(WHATSAPP_NUMBER).toBe("6281381871739");
  expect(getCvHref("/cv.pdf")).toBe("/cv.pdf");
  expect(getCvHref("/documents/approved-cv.pdf")).toBe(
    "/documents/approved-cv.pdf",
  );
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
    test(`approved contact links are keyboard accessible at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/#contact");
      const contact = page.locator("#contact");
      const cards = contact.getByRole("listitem");
      await expect(cards.getByRole("heading")).toHaveText([
        "Email",
        "LinkedIn",
        "GitHub",
        "WhatsApp",
      ]);
      await expect(cards.nth(3)).toContainText("Direct professional messages");
      await expect(
        contact.getByRole("heading", { name: "Download CV" }),
      ).toHaveCount(0);
      await expect(contact).not.toContainText(
        /pending public approval|not publicly shared yet/i,
      );
      await expect(contact.getByRole("link")).toHaveCount(4);
      await expect(contact.locator('a[href^="mailto:"]')).toHaveCount(0);
      await expect(
        cards.first().getByText("yudi.berland@gmail.com", { exact: true }),
      ).toBeHidden();

      const destinations = [
        ["Open in Gmail", gmailComposeUrl],
        [
          "Visit LinkedIn",
          "https://www.linkedin.com/in/yudi-runat-masneno-a03b141a7/",
        ],
        ["Visit GitHub", "https://github.com/Yudi210398"],
        ["Chat on WhatsApp", "https://wa.me/6281381871739"],
      ] as const;
      const links = destinations.map(([name]) =>
        contact.getByRole("link", { name, exact: true }),
      );
      for (const [index, [, href]] of destinations.entries()) {
        await expect(links[index]).toBeVisible();
        await expect(links[index]).toHaveAttribute("href", href);
        await expect(links[index]).toHaveAttribute("target", "_blank");
        await expect(links[index]).toHaveAttribute("rel", "noopener noreferrer");
      }

      await links[1].focus();
      await page.keyboard.press("Shift+Tab");
      for (const [index, link] of links.entries()) {
        if (index > 0) await page.keyboard.press("Tab");
        await expect(link).toBeFocused();
        await expect(link).toHaveCSS("outline-style", "solid");
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
      ).toBe(0);
    });
  }
});

test("Open in Gmail opens the verified compose URL in a new tab", async ({
  page,
  context,
}) => {
  await context.route("https://mail.google.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<title>Compose URL check</title>",
    }),
  );
  await page.goto("/#contact");
  const link = page.getByRole("link", { name: "Open in Gmail" });
  await expect(link).toHaveAttribute("href", gmailComposeUrl);
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");

  const [tab] = await Promise.all([context.waitForEvent("page"), link.click()]);
  await expect(tab).toHaveURL(gmailComposeUrl);
  expect(await tab.evaluate(() => window.opener === null)).toBe(true);
  await expect(page).toHaveURL(/#contact$/);
});

test("Copy Email writes the public address to the clipboard", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Copy Email" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Copied!" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "yudi.berland@gmail.com",
  );
  await expect(page.getByText("Copied!", { exact: true })).toHaveCount(0);
});

for (const clipboard of ["denied", "unavailable"] as const) {
  test(`Copy Email offers manual fallback when clipboard is ${clipboard}`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript((mode) => {
      Object.defineProperty(navigator, "clipboard", {
        value:
          mode === "unavailable"
            ? undefined
            : {
                writeText: () =>
                  Promise.reject(new DOMException("Denied", "NotAllowedError")),
              },
      });
    }, clipboard);
    await page.goto("/#contact");
    await page.getByRole("button", { name: "Copy Email" }).click();
    await expect(
      page.getByText("Could not copy the email address."),
    ).toBeVisible();
    const address = page.getByText("yudi.berland@gmail.com", { exact: true });
    await expect(address).toBeHidden();
    await page.getByText("Show email address", { exact: true }).click();
    await expect(address).toBeVisible();
    await expect(
      address,
    ).toHaveCSS("user-select", "text");
    await expect(page.getByText("Copied!", { exact: true })).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}
