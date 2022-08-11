/* eslint-disable no-alert */
import { domToHtml } from '.';

interface CopyToClipboardOptions {
  /**
   * Error callback.
   * @default  (e)=>{alert(String(e))}
   */
  onError?: (e: unknown) => void;
}
/**
 * Convert a dom element including canvas and svg to an html.
 * @params dom - Dom element.
 * @params options - Options.
 * @returns - Html result.
 */
export async function copyToClipboard(
  dom: Element,
  options: CopyToClipboardOptions = {},
) {
  const {
    onError = (e) => {
      alert(String(e));
    },
  } = options;

  const html = await domToHtml(dom);
  const type = 'text/html';
  if (typeof ClipboardItem === 'undefined') {
    alert('Copy to clipboard not supported in this browser');
    return;
  }
  const blob = new Blob([html], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  navigator.clipboard.write(data).then(
    () => {
      alert('Copied to clipboard');
    },
    (e) => {
      onError(e);
    },
  );
}
