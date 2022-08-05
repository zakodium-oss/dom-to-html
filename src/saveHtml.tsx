import { domToHtml } from '.';

interface SaveHtmlOptions {
  error?: (error: unknown) => void;
  filename: string;
}

export async function saveHtml(dom: Element, options: SaveHtmlOptions) {
  // eslint-disable-next-line no-alert
  const { filename, error = (e) => alert(String(e)) } = options;
  const type = 'text/html';
  const html = await domToHtml(dom);
  const blob = new Blob([html], {
    type,
  });
  try {
    const a = document.createElement('a');
    a.download = filename;
    a.href = URL.createObjectURL(blob);
    a.click();
  } catch (e) {
    error(e);
  }
}
