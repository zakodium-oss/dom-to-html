import { test, expect } from '@playwright/experimental-ct-react';

import {
  TestComponent,
  CanvasTest,
  FullTest,
  SvgTest,
  JpgImageTest,
  SvgImageTest,
  PngImageTest,
} from './utils';

test.describe('test domToHtml', () => {
  test('basic', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <div>
          <span>text</span>
        </div>
      </TestComponent>,
    );
    const result = component.locator('#result');
    await expect(result).toHaveScreenshot(
      './src/__tests__/snapshots/basic.png',
    );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe('<div><span>text</span></div>');
  });
  test('svg', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <SvgTest />
      </TestComponent>,
    );
    const result = component.locator('#result');
    await expect(result).toHaveScreenshot('./src/__tests__/snapshots/svg.png');

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
    expect(resultHtml.startsWith('<img')).toBe(true);
  });
  test('canvas', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <CanvasTest />
      </TestComponent>,
    );
    const result = component.locator('#result');
    await expect(result).toHaveScreenshot(
      './src/__tests__/snapshots/canvas.png',
    );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
    expect(resultHtml.startsWith('<img')).toBe(true);
  });
  test('jpg image', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <JpgImageTest />
      </TestComponent>,
    );
    const result = component.locator('#result');
    await expect(result).toHaveScreenshot(
      './src/__tests__/snapshots/JpgImage.png',
    );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
    expect(resultHtml.startsWith('<img')).toBe(true);
  });
  test('svg image', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <SvgImageTest />
      </TestComponent>,
    );
    const result = component.locator('#result');
    await expect(result).toHaveScreenshot(
      './src/__tests__/snapshots/svgImage.png',
    );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
    expect(resultHtml.startsWith('<img')).toBe(true);
  });
  test('png image', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <PngImageTest />
      </TestComponent>,
    );
    const result = component.locator('#result');
    await expect(result).toHaveScreenshot(
      './src/__tests__/snapshots/pngImage.png',
    );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
    expect(resultHtml.startsWith('<img')).toBe(true);
  });
  test('full', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <FullTest />
      </TestComponent>,
    );
    const test = component.locator('#test');
    await test.screenshot({
      path: './src/__tests__/snapshots/full.png',
    });
    const result = component.locator('#result');
    await expect(result).toHaveScreenshot('./src/__tests__/snapshots/full.png');

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
  });
});
