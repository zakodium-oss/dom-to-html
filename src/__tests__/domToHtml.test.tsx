import { test, expect } from '@playwright/experimental-ct-react';

import domToHtml from '..';

test.describe('test domToHtml', () => {
  test('basic test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    const title = page.locator('.navbar__inner .navbar__title');
    await expect(title).toHaveText('Playwright');
  });
  test.skip('default', async ({ mount }) => {
    const component = await mount(
      <div>
        <span>test</span>
      </div>,
    );
    const dom = await component.evaluate((dom) => dom);
    const result = await domToHtml(dom);
    expect(result).toBe('<div><span>test</span></div>');
  });
});
