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

    const clipboard = component.locator('#clipboard');
    if (browserName === 'chromium') {
      page.on('dialog', (dialog) => {
        expect(dialog.message()).toBe('Copied to clipboard');
        void dialog.accept();
      });
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
