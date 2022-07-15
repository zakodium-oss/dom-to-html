import { test, expect } from '@playwright/experimental-ct-react';

import domToHtml from '..';

test.describe('test domToHtml', () => {
  test('default', async ({ mount }) => {
    const component = await mount(
      <div>
        <span>test</span>
      </div>,
    );
    const dom = await component.evaluate((dom) => dom);
    const result = await domToHtml(dom);
    expect(result).toBeUndefined();
  });
  test('basic test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    const title = page.locator('.navbar__inner .navbar__title');
    const dom = await title.evaluate((dom) => dom);
    const result = await domToHtml(dom);
    expect(result).toBeUndefined();
  });
});
