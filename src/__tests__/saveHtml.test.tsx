import { test } from '@playwright/experimental-ct-react';

import { TestSaveHtml } from './utils';

test.describe('test saveHtml', () => {
  test('basic', async ({ mount }) => {
    await mount(
      <TestSaveHtml filename="basic.html">
        <div>
          <span>text</span>
        </div>
      </TestSaveHtml>,
    );
  });
});
