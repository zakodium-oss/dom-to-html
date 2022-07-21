import { test, expect } from '@playwright/experimental-ct-react';

import { FullTest } from './FullTest';
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

    const test = component.locator('#test >> div');
    const result = component.locator('#result >> div');
    expect((await test.screenshot()).compare(await result.screenshot())).toBe(
      0,
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

    const test = component.locator('#test');
    const result = component.locator('#result');
    expect((await test.screenshot()).compare(await result.screenshot())).toBe(
      0,
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

    const test = component.locator('#test');
    const result = component.locator('#result');
    expect((await test.screenshot()).compare(await result.screenshot())).toBe(
      0,
    );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toBe(await result.evaluate((node) => node.innerHTML));
  });
  test('full', async ({ mount }) => {
    const component = await mount(
      <TestComponent>
        <FullTest />
      </TestComponent>,
    );

    const html = component.locator('#html');
    const resultHtml = await html.inputValue();
    expect(resultHtml).toMatchSnapshot();
  });
});
