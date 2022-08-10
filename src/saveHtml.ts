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
    const url = URL.createObjectURL(blob);
    a.download = filename;
    a.href = url;
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 0);
  } catch (e) {
    error(e);
  }
}
