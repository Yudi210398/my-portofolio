import { expect, test } from "@playwright/test";

const route = "/projects/batik-app";
const details = [
  ["business-problem", "Business Problem", /diverge from physical stock/i],
  ["role-responsibilities", "Role & Responsibilities", /retained responsibility for requirements/i],
  ["system-architecture", "System Architecture", /Prisma manages data access.*Neon-hosted PostgreSQL/i],
  ["engineering-decisions", "Engineering Decisions & Trade-offs", /outgoing inventory must never exceed available stock/i],
  ["failure-testing", "Failure Handling & Testing", /atomic transactions protect related stock updates from partial writes/i],
  ["current-results", "Current Results", /uses the cloud-hosted application for operational work/i],
] as const;

test("Batik is first and its case study opens, refreshes, and returns to Work", async ({ page }) => {
  await page.goto("/");
  const batik = page.getByRole("group", { name: "1 of 3: Batik App" });
  await expect(batik).toBeVisible();
  await batik.getByRole("link", { name: "View Case Study" }).click();
  await expect(page).toHaveURL(new RegExp(`${route}$`));
  await expect(page.getByRole("heading", { level: 1, name: "Batik App" })).toBeVisible();
  expect((await page.reload())?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Batik App" })).toBeVisible();
  await page.getByRole("link", { name: "Back to selected work" }).first().click();
  await expect(page).toHaveURL(/\/#work$/);
});

test("Batik export contains the engineering details and both application links", async ({ page, request }) => {
  expect((await page.goto(route))?.status()).toBe(200);
  await expect(page).toHaveTitle(/Batik App.*Case Study/);
  await expect(page.locator("main header").getByText("Completed", { exact: true })).toHaveCount(2);
  for (const [id, title, fact] of details) {
    const section = page.getByRole("region", { name: title, exact: true }).and(page.locator(`section[aria-labelledby="${id}"]`));
    await expect(section.getByText(fact)).toBeVisible();
  }
  const links = page.getByRole("link", { name: "View Application", exact: true });
  await expect(links).toHaveCount(2);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("href", "https://batik-web-staging.vercel.app");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  for (const slug of ["dina-cake", "whatsapp-notification-service"]) {
    expect((await request.get(`/projects/${slug}`)).status()).toBe(200);
  }
  expect((await request.get("/projects/unknown-project")).status()).toBe(404);
});

for (const width of [390, 1440]) {
  test(`Batik section links land below the navbar and within the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(route);
    const navigation = page.getByRole("navigation", { name: "Case study sections" });
    const header = page.getByRole("banner");

    for (const [id, title] of details) {
      const link = navigation.getByRole("link", { name: new RegExp(title) });
      const heading = page.getByRole("heading", { name: title, level: 2, exact: true }).and(page.locator(`#${id}`));
      await expect(link).toHaveAttribute("href", `#${id}`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(heading).toBeInViewport({ ratio: 1 });
      await expect.poll(async () => {
        const [navBox, headingBox] = await Promise.all([header.boundingBox(), heading.boundingBox()]);
        return navBox !== null && headingBox !== null && headingBox.y >= navBox.y + navBox.height;
      }, { message: `#${id} should land below the navbar` }).toBe(true);
    }
  });
}

test("Batik diagrams preserve the engineering sequence and supplier traceability caption", async ({ page }) => {
  await page.goto(route);
  await expect(page.getByRole("list", { name: "FIFO inventory flow" }).getByRole("heading"))
    .toHaveText(["Supplier", "Incoming Stock", "FIFO Allocation", "Outgoing Stock"]);
  await expect(page.getByRole("list", { name: "Architecture layers" }).getByRole("heading"))
    .toHaveText(["User", "Frontend", "Backend", "Prisma ORM", "Database"]);
  const caption = page.locator("figure").filter({ has: page.getByRole("list", { name: "FIFO inventory flow" }) })
    .locator("figcaption");
  await expect(caption.getByText("Supplier Traceability", { exact: true })).toBeVisible();
  await expect(caption.getByText(/traced back to its originating supplier.*transaction records/i)).toBeVisible();
});

for (const width of [320, 360, 390, 768, 1024, 1280, 1440]) {
  test(`Batik diagrams fit and follow the reading direction at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(route);
    const main = page.getByRole("main");
    expect(await main.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    for (const [name, count] of [["FIFO inventory flow", 4], ["Architecture layers", 5]] as const) {
      const nodes = main.getByRole("list", { name }).getByRole("listitem");
      await expect(nodes).toHaveCount(count);
      const first = (await nodes.first().boundingBox())!;
      const last = (await nodes.last().boundingBox())!;
      if (width >= 1024) {
        expect(last.x).toBeGreaterThan(first.x);
        expect(last.y).toBe(first.y);
      } else {
        expect(last.y).toBeGreaterThan(first.y);
        expect(last.x).toBe(first.x);
      }
    }
    const logos = main.getByRole("list", { name: "Technology stack" }).locator("img");
    await expect(logos).toHaveCount(6);
    await expect.poll(() => logos.evaluateAll((items) =>
      items.every((item) => (item as HTMLImageElement).naturalWidth > 0),
    )).toBe(true);
  });
}

test.describe("Batik without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("essential content is readable and a section anchor works by keyboard", async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1, name: "Batik App" })).toBeVisible();
    await expect(page.getByRole("list", { name: "Architecture layers" })).toBeVisible();
    for (const [id, , fact] of details) {
      const content = page.locator(`section[aria-labelledby="${id}"]`).getByText(fact);
      await expect(content).toBeVisible();
      expect(await content.evaluate((node) => node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }))).toBe(true);
    }
    const link = page.getByRole("navigation", { name: "Case study sections" })
      .getByRole("link", { name: /Failure Handling & Testing/ });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#failure-testing$/);
    await expect(page.locator("#failure-testing")).toBeInViewport();
  });
});

test.describe("Batik with reduced motion", () => {
  test.use({ javaScriptEnabled: true, reducedMotion: "reduce" });

  test("detail content stays visible before and after navigating with reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    // The interactive menu proves client behavior is active before we inspect the reveal.
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const closeMenu = page.getByRole("button", { name: "Close navigation menu" });
    await expect(closeMenu).toHaveAttribute("aria-expanded", "true");
    await closeMenu.click();

    const section = page.getByRole("region", { name: "Failure Handling & Testing" });
    const fact = /atomic transactions protect related stock updates/i;
    const content = section.getByText(fact);
    const reveal = section.locator("[data-scroll-reveal]").filter({ hasText: fact });
    await expect(content).not.toBeInViewport();
    await expect(reveal).toHaveCSS("opacity", "1");
    await expect(reveal).toHaveCSS("transform", "none");
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
    await page.getByRole("navigation", { name: "Case study sections" })
      .getByRole("link", { name: /Failure Handling & Testing/ }).click();
    await expect(page).toHaveURL(/#failure-testing$/);
    await expect(content).toBeInViewport();
    await expect(reveal).toHaveCSS("opacity", "1");
    await expect(reveal).toHaveCSS("transform", "none");
  });
});
