import { expect, test } from "@playwright/test";
import {
  CV_PATH,
  getCvHref,
  getWhatsAppHref,
  WHATSAPP_NUMBER,
} from "../src/config/public-contact";

test("public contact configuration accepts only local PDFs and international digits", () => {
  expect(CV_PATH).toBe("");
  expect(WHATSAPP_NUMBER).toBe("");
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

test("Contact shows WhatsApp as unavailable without a number and removes the CV card", async ({
  page,
}) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  const whatsapp = contact.getByRole("listitem").filter({ hasText: "WhatsApp" });
  await expect(whatsapp).toBeVisible();
  await expect(whatsapp).toContainText("Direct professional messages");
  await expect(whatsapp.locator('a[href^="https://wa.me/"]')).toHaveCount(0);
  await expect(contact.getByRole("heading", { name: "Download CV" })).toHaveCount(0);
});
