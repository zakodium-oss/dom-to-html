/**
 * Convert a dom element including canvas and svg to an html.
 * @params dom - Dom element.
 * @returns - Html result.
 */
export function domToHtml(dom: Element | null): string {
  if (dom === null || !dom.innerHTML) {
    return '';
  }
  const canvases = dom.querySelectorAll('canvas');

  const domCopy = dom.cloneNode(true) as Element;
  const canvasesCopy = domCopy.querySelectorAll('canvas');
  for (let i = 0; i < canvases.length; i++) {
    canvasesCopy[i].outerHTML = canvasToHtml(canvases[i]);
  }

  const svgs = dom.querySelectorAll('svg');
  const svgsCopy = domCopy.querySelectorAll('svg');

  for (let i = 0; i < svgs.length; i++) {
    svgsCopy[i].outerHTML = svgToHtml(svgs[i]);
  }

  return domCopy.innerHTML;
}

function canvasToHtml(canvas: HTMLCanvasElement) {
  const png = canvas.toDataURL('image/png');
  return `<img src="${png}" />`;
}
function svgToHtml(svg: SVGElement) {
  const svgXml = new XMLSerializer().serializeToString(svg);
  const base64 = btoa(svgXml);
  return `<img src="data:image/svg+xml;base64,${base64}" />`;
}
