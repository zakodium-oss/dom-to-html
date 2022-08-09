import { test, expect } from '@playwright/experimental-ct-react';

import { TestCopyClipboard } from './utils';

test.describe('test copyToClipboard', () => {
  test('basic', async ({ mount, page, browserName }) => {
    const component = await mount(
      <TestCopyClipboard>
        <div>
          <span>text</span>
        </div>
      </TestCopyClipboard>,
    );
    const copy = component.locator('#copy');
    await copy.click();
    const paste = component.locator('#paste');
    await paste.click();
    if (browserName === 'chromium') {
      page.on('dialog', (dialog) =>
        expect(dialog.message()).toBe('Copied to clipboard'),
      );
      const clipboard = component.locator('#clipboard');
      await clipboard.waitFor({ state: 'visible' });
      const clipboardText = await clipboard.inputValue();
      expect(clipboardText).toBe('<div><span>text</span></div>');
    } else {
      page.on('dialog', (dialog) =>
        expect(dialog.message()).toBe(
          'Copy to clipboard not supported in this browser',
        ),
      );
    }
  });
});
