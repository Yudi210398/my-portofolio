import { expect, test } from "@playwright/test";

const sections = [
  ["home", "Home"],
  ["about", "About"],
  ["focus", "Approach"],
  ["tech-stack", "Tech Stack"],
  ["work", "Work"],
  ["contact", "Contact"],
] as const;

test("desktop active link follows the section in view in both scroll directions", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "location");

  for (const [id, label] of [...sections.slice(1), ...sections.slice(0, -1).reverse()]) {
    await page.locator(`#${id}`).evaluate((section) => {
      const header = document.querySelector("header");
      window.scrollTo({
        top: window.scrollY + section.getBoundingClientRect().top - (header?.getBoundingClientRect().height ?? 0) - 16,
        behavior: "instant",
      });
    });
    await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "location");
    await expect(nav.locator('[aria-current="location"]')).toHaveCount(1);
  }
});

test("clicking a distant section keeps its highlight through smooth scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "location");
  await page.evaluate(() => {
    const state = window as typeof window & { activeHistory?: string[] };
    state.activeHistory = [];
    const nav = document.querySelector('nav[aria-label="Primary navigation"]');
    new MutationObserver(() => {
      state.activeHistory?.push(nav?.querySelector('[aria-current="location"]')?.textContent ?? "none");
    }).observe(nav!, { subtree: true, attributes: true, attributeFilter: ["aria-current"] });
  });
  await nav.getByRole("link", { name: "Work" }).click();
  await expect.poll(() => page.locator("#work").evaluate((section) => section.getBoundingClientRect().top))
    .toBeLessThan(120);
  const activeHistory = await page.evaluate(() =>
    (window as typeof window & { activeHistory?: string[] }).activeHistory,
  );
  expect([...new Set(activeHistory)]).toEqual(["Work"]);
});

test("nav click, hash refresh, and history keep the active section in sync", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  await nav.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "location");
  await page.reload();
  await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "location");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await nav.getByRole("link", { name: "About" }).click();
  await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "location");
  await page.goBack();
  await expect(page).toHaveURL(/#work$/);
  await expect(nav.locator('[aria-current="location"]')).toHaveCount(1);
  await expect.poll(async () => {
    const active = await nav.locator('[aria-current="location"]').textContent();
    const sectionAtReadingLine = await page.evaluate(() => {
      const line = (document.querySelector("header")?.getBoundingClientRect().bottom ?? 0) + 160;
      const sections = [
        ["home", "Home"], ["about", "About"], ["focus", "Approach"],
        ["tech-stack", "Tech Stack"], ["work", "Work"], ["contact", "Contact"],
      ] as const;
      return sections.filter(([id]) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= line).at(-1)?.[1];
    });
    return active === sectionAtReadingLine;
  }).toBe(true);
  await page.goForward();
  await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "location");
});

test("mobile shares active section and case study has no stale active item", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#about");
  await expect.poll(() => page.locator("#about").evaluate((section) => section.getBoundingClientRect().top))
    .toBeLessThan(120);
  const menu = page.getByRole("button", { name: "Open navigation menu" });
  const nav = page.locator("#mobile-site-navigation");
  const menuBounds = await menu.boundingBox();
  expect(menuBounds).not.toBeNull();
  await page.mouse.click(menuBounds!.x + menuBounds!.width / 2, menuBounds!.y + menuBounds!.height / 2);
  await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "location");
  await nav.getByRole("link", { name: "Work" }).click();
  await expect(nav).toBeHidden();
  await expect(page).toHaveURL(/#work$/);
  await page.getByRole("link", { name: "View Case Study" }).click();
  await menu.click();
  await expect(nav.locator('[aria-current="location"]')).toHaveCount(0);
  await nav.getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(nav.locator('a[href="/#contact"]')).toHaveAttribute("aria-current", "location");
  const returnedMenuBounds = await menu.boundingBox();
  expect(returnedMenuBounds).not.toBeNull();
  await page.mouse.click(
    returnedMenuBounds!.x + returnedMenuBounds!.width / 2,
    returnedMenuBounds!.y + returnedMenuBounds!.height / 2,
  );
  await expect(nav.getByRole("link", { name: "Contact" })).toHaveAttribute("aria-current", "location");
});
