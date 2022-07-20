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

    // const test = component.locator('#test');
    // await test.screenshot({
    //   path: './src/__tests__/__snapshots__/basic.png',
    // });

    const result = component.locator('#result');
    await expect(result).toHaveScreenshot(
      './src/__tests__/__snapshots__/basic.png',
    );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe('<div><span>text</span></div>');
  });
  test('svg', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <svg>
          <circle cx="50" cy="50" r="40" />
        </svg>
      </TestComponent>,
    );

    // const test = component.locator('#test');
    // await test.screenshot({
    //   path: './src/__tests__/__snapshots__/svg.png',
    // });

    const result = component.locator('#result');
    await expect(result).toHaveScreenshot(
      './src/__tests__/__snapshots__/svg.png',
    );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
  });
  test('canvas', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <CanvasTest />
      </TestComponent>,
    );

    // const test = component.locator('#test');
    // await test.screenshot({
    //   path: './src/__tests__/__snapshots__/canvas.png',
    // });

    const result = component.locator('#result');

    await expect(result).toHaveScreenshot(
      './src/__tests__/__snapshots__/canvas.png',
    );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
  });
});
