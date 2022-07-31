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
    canvasesCopy[i].replaceWith(canvasToHtml(canvases[i]));
  }

  const svgs = dom.querySelectorAll('svg');
  const svgsCopy = domCopy.querySelectorAll('svg');
  for (let i = 0; i < svgs.length; i++) {
    svgsCopy[i].replaceWith(svgToHtml(svgs[i]));
  }

  const imgs = dom.querySelectorAll('img');
  const imgsCopy = domCopy.querySelectorAll('img');
  for (let i = 0; i < imgs.length; i++) {
    imgsCopy[i].replaceWith(await imgToHtml(imgs[i]));
  }

  return domCopy.innerHTML;
}

function canvasToHtml(canvas: HTMLCanvasElement) {
  const url = canvas.toDataURL('image/png');
  const img = new Image();
  img.src = url;
  return img;
}
function svgToHtml(svg: SVGElement) {
  const svgXml = new XMLSerializer().serializeToString(svg);
  const base64 = btoa(svgXml);
  const img = new Image();
  img.src = `data:image/svg+xml;base64,${base64}`;
  return img;
}
async function imgToHtml(image: HTMLImageElement) {
  const url: string = await fetch(image.src)
    .then((r) => r.blob())
    .then(
      (b) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(b);
        }),
    );
  const img = new Image();
  img.src = url;
  return img;
}
