import { test, expect } from '@playwright/experimental-ct-react';

import {
  TestDomToHtml,
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
      <TestDomToHtml>
        <div>
          <span>text</span>
        </div>
      </TestDomToHtml>,
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
      <TestDomToHtml>
        <SvgTest />
      </TestDomToHtml>,
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
      <TestDomToHtml>
        <CanvasTest />
      </TestDomToHtml>,
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
      <TestDomToHtml>
        <JpgImageTest />
      </TestDomToHtml>,
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
      <TestDomToHtml>
        <SvgImageTest />
      </TestDomToHtml>,
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
      <TestDomToHtml>
        <PngImageTest />
      </TestDomToHtml>,
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
      <TestDomToHtml>
        <FullTest />
      </TestDomToHtml>,
    );
    const result = component.locator('#result');
    await expect(result).toHaveScreenshot('./src/__tests__/snapshots/full.png');

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
    expect(resultHtml.split('base64')).toHaveLength(6);
  });
});
