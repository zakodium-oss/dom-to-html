import { test, expect } from '@playwright/experimental-ct-react';

import { TestComponent, CanvasTest } from './utils';

test.describe('test domToHtml', () => {
  test('basic', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <div>
          <span>text</span>
        </div>
      </TestComponent>,
    );
    const test = component.locator('#test');
    const result = component.locator('#result');
    expect((await test.screenshot()).buffer).toStrictEqual(
      (await result.screenshot()).buffer,
    );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe('<div><span>text</span></div>');
  });
  test.skip('svg', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <svg>
          <circle cx="50" cy="50" r="40" />
        </svg>
      </TestComponent>,
    );

    const result = component.locator('#result');
    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
  });
  test('canvas', async ({ mount }) => {
    const component = await mount(<CanvasTest />);

    // const test = component.locator('#test');
    const result = component.locator('#result');

    // expect((await test.screenshot()).buffer).toStrictEqual(
    //   (await result.screenshot()).buffer,
    // );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
  });
});
