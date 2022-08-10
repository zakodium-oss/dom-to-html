import { test } from '@playwright/experimental-ct-react';

import { FullTest, TestSaveHtml } from './utils';

test.describe('test saveHtml', () => {
  test('basic', async ({ mount, page, browserName }) => {
    const component = await mount(
      <TestSaveHtml filename={`basic-${browserName}.html`}>
        <div>
          <span>text</span>
        </div>
      </TestSaveHtml>,
    );
    const btn = component.locator('#download');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      btn.click(),
    ]);
    await download.saveAs(`./src/__tests__/html/basic-${browserName}.html`);
  });
  test('full', async ({ mount, page, browserName }) => {
    const component = await mount(
      <TestSaveHtml filename={`full-${browserName}.html`}>
        <FullTest />
      </TestSaveHtml>,
    );
    const btn = component.locator('#download');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      btn.click(),
    ]);
    await download.saveAs(`./src/__tests__/html/full-${browserName}.html`);
  });
});
