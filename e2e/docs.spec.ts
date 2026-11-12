import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

/** Lets the reveal-on-scroll sections appear, so axe and clicks see the final state. */
async function settle(page: Page) {
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-pr-motion', 'calm');
    document.querySelectorAll('.pr-reveal').forEach((el) => el.classList.add('is-in'));
  });
}

async function axe(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    // Contrast is checked exactly, against the solid colours behind the glass, by the token tests (src/lib/tokens.test.ts);
    // axe can't measure text over translucent, blurred layers.
    .disableRules(['color-contrast'])
    .analyze();
  return results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`);
}

// Headless browsers on CI have no GPU, and frosted-glass blur plus the drifting light make every frame
// so slow that Playwright never sees a button "stop moving". These tests check behaviour and structure,
// not looks, so the heavy effects are switched off before the page paints.
const FLAT = `
  .pr-mesh { display: none !important; }
  *, *::before, *::after {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    filter: none !important;
    animation: none !important;
    transition: none !important;
  }`;

test.beforeEach(async ({ page }) => {
  await page.addInitScript((css) => {
    const add = () => {
      const s = document.createElement('style');
      s.textContent = css;
      document.head.append(s);
    };
    if (document.head) add();
    else document.addEventListener('DOMContentLoaded', add);
  }, FLAT);
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await settle(page);
});

test('loads the docs with the hero and every component section', async ({ page }) => {
  await expect(page).toHaveTitle(/Prism UI/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Interfaces made of');
  for (const id of ['colour', 'buttons', 'lens', 'forms', 'tabs', 'overlays', 'studio', 'a11y', 'start']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.locator('.demo pre.code')).toHaveCount(13);
});

test('has no accessibility violations in Day', async ({ page }) => {
  expect(await axe(page)).toEqual([]);
});

test('has no accessibility violations in Midnight', async ({ page }) => {
  await page.evaluate(() => document.documentElement.setAttribute('data-pr-theme', 'dark'));
  expect(await axe(page)).toEqual([]);
});

test('the theme button switches between Day and Midnight', async ({ page, isMobile }) => {
  test.skip(isMobile, 'the nav collapses to the logo and theme button on phones, covered on desktop');
  const toggle = page.locator('#theme-toggle');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-pr-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-pr-theme', 'light');
});

test('tabs move with the arrow keys', async ({ page }) => {
  const tabs = page.locator('#tabs [role="tab"]');
  await tabs.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(page.locator('#tabs [role="tabpanel"]').nth(1)).toBeVisible();
});

test('the modal opens, traps focus and closes with Escape', async ({ page }) => {
  await page.locator('[data-pr-open="demo-modal"]').click();
  const dialog = page.locator('#demo-modal');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('aria-labelledby', 'demo-modal-title');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('a toast appears and is announced politely', async ({ page }) => {
  await page.locator('#toast-demo').click();
  await expect(page.locator('.pr-toasts')).toHaveAttribute('aria-live', 'polite');
  await expect(page.locator('.pr-toast')).toContainText('Theme copied');
});

test('the light lab restyles the page and keeps button text readable', async ({ page }) => {
  await page.locator('#presets button', { hasText: 'Sunset' }).click();
  const pink = await page.evaluate(() => document.documentElement.style.getPropertyValue('--pr-pink'));
  expect(pink).toBe('#ff7a59');
  const note = await page.locator('#lab-grade').textContent();
  const ratio = Number(note?.match(/at least ([\d.]+):1/)?.[1]);
  expect(ratio).toBeGreaterThanOrEqual(4.5);
  await page.locator('#reset-theme').click();
  expect(await page.evaluate(() => document.documentElement.style.getPropertyValue('--pr-pink'))).toBe('');
});

test('show code reveals the exact markup with a copy button', async ({ page }) => {
  const demo = page.locator('#buttons .demo').first();
  await demo.getByRole('button', { name: /Show code/ }).click();
  const code = demo.locator('pre.code');
  await expect(code).toBeVisible();
  await expect(code).toContainText('class="pr-btn pr-btn--spectrum"');
});

test('nothing scrolls sideways', async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
