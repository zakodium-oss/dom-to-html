import { JSDOM } from 'jsdom';

import domToHtml from '..';

describe('Plot', () => {
  it('default', async () => {
    const { document } = new JSDOM(`<div id="test"><span>test<span></div>`)
      .window;

    const html = await domToHtml(document.getElementById('test'));
    expect(html).toBe(`<span>test<span>`);
  });
});
