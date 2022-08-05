import { test, expect } from '@playwright/experimental-ct-react';

import { TestCopyClipboard } from './utils';

test.describe('test copyToClipboard', () => {
  test('basic', async ({ mount, page }) => {
    const component = await mount(
      <TestCopyClipboard>
        <div>
          <span>text</span>
        </div>
      </TestCopyClipboard>,
    );
    await page.waitForNavigation();
    const clipboard = component.locator('#clipboard');
    // await clipboard.click();
    // await page.keyboard.press('Shift+V');
    const clipboardText = await clipboard.inputValue();
    expect(clipboardText).toBe('<div><span>text</span></div>');
  });
});
