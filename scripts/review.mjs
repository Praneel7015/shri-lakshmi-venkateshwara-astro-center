/** Run after installing @playwright/test and Chromium; supports dev or exported preview. */
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const baseURL = process.env.REVIEW_URL || 'http://localhost:4000';
const phase = process.env.REVIEW_PHASE || 'after';
assert.match(phase, /^[a-z0-9-]+$/i);
const directory = `docs/review/${phase}`;
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const results = [];
const errors = [];
try {
  for (const locale of ['en', 'kn']) {
    const prefix = locale === 'en' ? '' : '/kn';
    for (const width of [390, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      const paths = width === 768 ? ['/'] : ['/', '/about/', '/services/', '/services/kundli-reading/', '/pujas/', '/blog/', '/contact/'];
      for (const path of paths) {
        const route = `${prefix}${path}`;
        const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
        assert(response?.ok(), `${route}: HTTP ${response?.status()}`);
        await page.evaluate(() => document.fonts.ready);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: horizontal overflow at ${width}`);
        assert.equal(await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).length), 0, `${route}: broken image`);
        if (phase !== 'before') {
          assert.equal(await page.locator('a[href^="tel:"],a[href*="wa.me"],a[href^="mailto:"]').count(), 0, `${route}: unavailable contact action`);
          assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
          assert.equal(await page.locator('script[type="application/ld+json"]').count(), 0);
        }
        await page.screenshot({ path: `${directory}/${locale}-${width}-${path === '/' ? 'home' : path.split('/').filter(Boolean).join('-')}.png`, fullPage: true });
        results.push({ route, width, status: 'passed' });
      }
      if (phase === 'before') { await context.close(); continue; }
      await page.goto(`${baseURL}${prefix}/`);
      const firstFaq = page.locator('details').first();
      if (await firstFaq.count()) {
        const wasOpen = await firstFaq.evaluate(element => element.open);
        await firstFaq.locator('summary').click();
        assert.notEqual(await firstFaq.evaluate(element => element.open), wasOpen);
      }
      await page.keyboard.press('Control+Home');
      const menu = page.locator('header button[aria-expanded]');
      if (await menu.isVisible()) {
        await menu.click();
        assert(await page.getByRole('dialog').isVisible());
        await page.keyboard.press('Escape');
        assert.equal(await page.getByRole('dialog').count(), 0);
        assert(await menu.evaluate(element => element === document.activeElement));
        await menu.click();
        await page.getByRole('dialog').locator(`a[href="${prefix}/services/"]`).click();
        await page.waitForURL(`**${prefix}/services/`);
        assert.equal(await page.getByRole('dialog').count(), 0);
      }
      const switcher = page.locator('header a[hreflang]');
      await switcher.click();
      await page.waitForURL(locale === 'en' ? '**/kn/**' : url => !url.pathname.startsWith('/kn/'));
      assert.equal(await page.locator('html').getAttribute('lang'), locale === 'en' ? 'kn-IN' : 'en-IN');
      await page.goto(`${baseURL}${prefix}/`);
      const duration = await page.locator('.animate-orbit').first().evaluate(element => parseFloat(getComputedStyle(element).animationDuration));
      assert(duration < 0.01, 'Reduced motion must suppress orbit animation');
      await page.keyboard.press('Tab');
      assert(await page.evaluate(() => document.activeElement?.getAttribute('href') === '#main'), 'Keyboard skip link must receive focus');
      await context.close();
    }
  }
  assert.deepEqual(errors, [], 'Browser console/page errors');
} finally {
  await browser.close();
  await writeFile(`${directory}/results.json`, JSON.stringify({ baseURL, results, errors }, null, 2));
}
console.log(`Reviewed ${results.length} pages. Screenshots: ${directory}`);
