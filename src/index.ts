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
    svgsCopy[i].replaceWith(await svgToHtml(svgs[i]));
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
async function svgToHtml(svg: SVGSVGElement) {
  const width = svg.clientWidth;
  const height = svg.clientHeight;
  const base64 = btoa(new XMLSerializer().serializeToString(svg));
  const url = `data:image/svg+xml;base64,${base64}`;
  const image = new Image();
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  await new Promise((resolve) => {
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
      resolve(image);
    };
    image.src = url;
  });

  return canvasToHtml(canvas);
}
async function imgToHtml(image: HTMLImageElement) {
  const { width, height } = image;
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
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  await new Promise((resolve) => {
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
      resolve(image);
    };
    image.src = url;
  });

  return canvasToHtml(canvas);
}
