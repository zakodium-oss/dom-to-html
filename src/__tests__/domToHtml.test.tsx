import { test, expect } from '@playwright/experimental-ct-react';

import { TestComponent } from './utils';

test.describe('test domToHtml', () => {
  test('simple test', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <div>
          <span>test</span>
        </div>
      </TestComponent>,
    );
    const html = component.locator('#html');
    const result = await html.inputValue();
    expect(result).toBe('<div><span>test</span></div>');
  });
});
