import { test, expect, type Page } from "@playwright/test";

/**
 * Validates the header active-state design system across viewports:
 *  - desktop / md+ (≥768px): inline link gets red dot + red underline
 *  - tablet edge (md breakpoint, 768px): same desktop treatment
 *  - mobile (<768px): drawer link gets long red bar (24px) when active,
 *                     short border bar (12px) otherwise
 *
 * Asserts the underline/bar resolves to the kiri-red token, not just any color.
 */

const KIRI_RED_HEX = "#e62e2e"; // visual check; we compare via oklch resolved rgb below

const VIEWPORTS = {
  mobile: { width: 414, height: 896 },
  mdEdge: { width: 768, height: 900 },
  desktop: { width: 1280, height: 900 },
} as const;

/** Read the resolved rgb of --kiri-red from the live page. */
async function getKiriRedRgb(page: Page): Promise<string> {
  return page.evaluate(() => {
    const probe = document.createElement("div");
    probe.style.color = "var(--kiri-red)";
    document.body.appendChild(probe);
    const c = getComputedStyle(probe).color;
    probe.remove();
    return c;
  });
}

/** Get computed style of a pseudo element. */
async function pseudoStyle(
  page: Page,
  selector: string,
  pseudo: "::before" | "::after",
  prop: string,
) {
  return page.evaluate(
    ([sel, ps, p]) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      return getComputedStyle(el, ps).getPropertyValue(p).trim();
    },
    [selector, pseudo, prop] as const,
  );
}

test.describe("Header active state — desktop & tablet (md+)", () => {
  for (const [label, vp] of [
    ["desktop", VIEWPORTS.desktop],
    ["md edge 768px", VIEWPORTS.mdEdge],
  ] as const) {
    test(`Catalogo link is active on /catalogo @ ${label}`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto("/catalogo");

      const kiriRed = await getKiriRedRgb(page);

      // Desktop drawer hidden, inline nav visible
      const inlineNav = page.locator("header nav").first();
      await expect(inlineNav).toBeVisible();

      const link = inlineNav.getByRole("link", { name: /^catalogo$/i });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("aria-current", "page");

      // The red dot is rendered as an absolute span (only when active)
      const dot = link.locator("span[aria-hidden='true']").first();
      await expect(dot).toBeVisible();
      const dotBg = await dot.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(dotBg).toBe(kiriRed);

      // Underline = ::after pseudo, must be full width and kiri-red
      // Use a precise selector to ensure we hit the active link.
      const linkSelector = "header nav a[aria-current='page']";
      const afterBg = await pseudoStyle(page, linkSelector, "::after", "background-color");
      const afterWidth = await pseudoStyle(page, linkSelector, "::after", "width");
      expect(afterBg).toBe(kiriRed);
      // Width should be > 0 (full width). Parse "Npx".
      const px = parseFloat(afterWidth ?? "0");
      expect(px).toBeGreaterThan(20);
    });

    test(`Catalogo stays active on a product page @ ${label}`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto("/prodotto/burl-map");

      const link = page
        .locator("header nav")
        .first()
        .getByRole("link", { name: /^catalogo$/i });
      await expect(link).toHaveAttribute("aria-current", "page");
    });

    test(`Non-active links have no underline width @ ${label}`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto("/catalogo");
      // Storia is not active here
      const w = await pseudoStyle(
        page,
        "header nav a[href='/storia']",
        "::after",
        "width",
      );
      expect(parseFloat(w ?? "0")).toBe(0);
    });
  }
});

test.describe("Header active state — mobile drawer (<md)", () => {
  test("Active link shows long red bar; others show short neutral bar", async ({
    page,
  }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto("/catalogo");

    const kiriRed = await getKiriRedRgb(page);

    // The inline nav is hidden, hamburger is visible
    await expect(page.locator("header button[aria-label='Apri menu']")).toBeVisible();

    // Open the drawer
    await page.locator("header button[aria-label='Apri menu']").click();

    // Drawer nav is the second <nav> in the header
    const drawer = page.locator("header nav").nth(1);
    await expect(drawer).toBeVisible();

    // Active link: Catalogo
    const active = drawer.getByRole("link", { name: /^catalogo$/i });
    await expect(active).toHaveAttribute("aria-current", "page");
    const activeBar = active.locator("span[aria-hidden='true']").first();
    const activeBg = await activeBar.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    const activeWidth = await activeBar.evaluate(
      (el) => getComputedStyle(el).width,
    );
    expect(activeBg).toBe(kiriRed);
    expect(parseFloat(activeWidth)).toBeCloseTo(24, 0); // w-6 = 1.5rem = 24px

    // Inactive link: Storia
    const inactive = drawer.getByRole("link", { name: /^storia$/i });
    await expect(inactive).not.toHaveAttribute("aria-current", "page");
    const inactiveBar = inactive.locator("span[aria-hidden='true']").first();
    const inactiveBg = await inactiveBar.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    const inactiveWidth = await inactiveBar.evaluate(
      (el) => getComputedStyle(el).width,
    );
    expect(inactiveBg).not.toBe(kiriRed);
    expect(parseFloat(inactiveWidth)).toBeCloseTo(12, 0); // w-3 = 0.75rem = 12px
  });

  test("Catalogo also active in drawer on /prodotto/$slug", async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto("/prodotto/burl-map");
    await page.locator("header button[aria-label='Apri menu']").click();
    const active = page
      .locator("header nav")
      .nth(1)
      .getByRole("link", { name: /^catalogo$/i });
    await expect(active).toHaveAttribute("aria-current", "page");
  });
});

// Silence unused reference if we ever swap the manual hex check back in.
void KIRI_RED_HEX;
