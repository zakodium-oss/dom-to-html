/**
 * Convert a dom element including canvas and svg to an html.
 * @params dom - Dom element.
 * @returns - Html result.
 */
export async function domToHtml(dom: Element | null) {
  if (dom === null || !dom.innerHTML) {
    return '';
  }
  const domCopy = dom.cloneNode(true) as Element;

  const canvases = dom.querySelectorAll('canvas');
  const canvasesCopy = domCopy.querySelectorAll('canvas');
  for (let i = 0; i < canvases.length; i++) {
    canvasesCopy[i].outerHTML = canvasToHtml(canvases[i]);
  }

  const svgs = dom.querySelectorAll('svg');
  const svgsCopy = domCopy.querySelectorAll('svg');
  for (let i = 0; i < svgs.length; i++) {
    svgsCopy[i].outerHTML = svgToHtml(svgs[i]);
  }

  const imgs = dom.querySelectorAll('img');
  const imgsCopy = domCopy.querySelectorAll('img');
  for (let i = 0; i < imgs.length; i++) {
    imgsCopy[i].outerHTML = await imgToHtml(imgs[i]);
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
async function imgToHtml(image: HTMLImageElement) {
  const url = image.src;
  const base64: string = await fetch(url)
    .then((r) => r.blob())
    .then(
      (b) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(b);
        }),
    );
  return `<img src="${base64}" />`;
}
