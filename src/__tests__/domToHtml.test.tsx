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
    expect(resultHtml.split('base64')).toHaveLength(2);
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
    expect(resultHtml.split('base64')).toHaveLength(2);
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
    expect(resultHtml.split('base64')).toHaveLength(2);
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
    expect(resultHtml.split('base64')).toHaveLength(2);
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
    expect(resultHtml.split('base64')).toHaveLength(2);
  });
  test('full', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <FullTest />
      </TestComponent>,
    );
    const result = component.locator('#result');
    await expect(result).toHaveScreenshot('./src/__tests__/snapshots/full.png');

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
    expect(resultHtml.split('base64')).toHaveLength(6);
  });
});
