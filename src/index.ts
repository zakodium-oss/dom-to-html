/**
 * Convert a dom element including canvas and svg to an html.
 * @params dom - Dom element.
 * @returns - Html result.
 */
export async function domToHtml(dom: Element): Promise<string> {
  if (!dom.innerHTML) {
    return '';
  }
  const domCopy = dom.cloneNode(true) as Element;

  const canvases = dom.querySelectorAll('canvas');
  const canvasesCopy = domCopy.querySelectorAll('canvas');
  for (let i = 0; i < canvases.length; i++) {
    canvasesCopy[i].replaceWith(canvasToHtml(canvases[i]));
  }
  const promises: Promise<void>[] = [];
  const svgs = dom.querySelectorAll('svg');
  const svgsCopy = domCopy.querySelectorAll('svg');
  for (let i = 0; i < svgs.length; i++) {
    promises.push(
      svgToHtml(svgs[i], (result) => {
        svgsCopy[i].replaceWith(result);
      }),
    );
  }

  const imgs = dom.querySelectorAll('img');
  const imgsCopy = domCopy.querySelectorAll('img');
  for (let i = 0; i < imgs.length; i++) {
    promises.push(
      imgToHtml(imgs[i], (result) => {
        imgsCopy[i].replaceWith(result);
      }),
    );
  }

  await Promise.all(promises);
  return domCopy.innerHTML;
}

function canvasToHtml(canvas: HTMLCanvasElement) {
  const url = canvas.toDataURL('image/png');
  const img = new Image();
  img.src = url;
  return img;
}
async function svgToHtml(
  svg: SVGSVGElement,
  callback: (result: HTMLImageElement) => void,
) {
  const width = svg.clientWidth;
  const height = svg.clientHeight;
  const base64 = btoa(new XMLSerializer().serializeToString(svg));
  const url = `data:image/svg+xml;base64,${base64}`;
  const image = new Image();
  return new Promise<void>((resolve) => {
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.drawImage(image, 0, 0, width, height);
      callback(canvasToHtml(canvas));
      resolve();
    };
    image.src = url;
  });
}
async function imgToHtml(
  img: HTMLImageElement,
  callback: (result: HTMLImageElement) => void,
) {
  const image = new Image();
  return new Promise<void>((resolve) => {
    image.onload = () => {
      const width = img.width;
      const height = img.height;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvasToHtml(canvas));
      resolve();
    };
    image.src = img.src;
  });
}
