/**
 * Convert a dom element including canvas and svg to an html.
 * @params dom - Dom element.
 * @returns - Html result.
 */
export default async function domToHtml(dom: Element | null): Promise<string> {
  if (dom === null || !dom.innerHTML) {
    return '';
  }
  const canvases = dom.querySelectorAll('canvas');
  // clone the original dom, we also need to copy the canvas
  const domCopy = dom.cloneNode(true) as Element;
  const canvasesCopy = domCopy.querySelectorAll('canvas');
  for (let i = 0; i < canvases.length; i++) {
    const png = canvases[i].toDataURL('image/png');
    (
      canvasesCopy[i].parentElement as Element
    ).innerHTML = `<img src="${png}" />`;
  }

  let svgs = dom.querySelectorAll('svg');
  let svgsCopy = domCopy.querySelectorAll('svg');

  const promises = [];

  for (let i = 0; i < svgs.length; i++) {
    const svgDOM = svgs[i];
    const svgDOMCopy = svgsCopy[i];
    const width = svgDOM.clientWidth;
    const height = svgDOM.clientHeight;
    const svgString = svgDOM.outerHTML;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width.toString());
    canvas.setAttribute('height', height.toString());
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    const image = new Image();
    const svg = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svg);

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    const promise = new Promise<void>((resolve) => {
      image.onload = () => {
        if (ctx) {
          ctx.drawImage(image, 0, 0);
        }
        const png = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = png;
        svgDOMCopy.replaceWith(img);
        URL.revokeObjectURL(url);
        resolve();
      };
    });
    promises.push(promise);
    image.src = url;
  }

  await Promise.all(promises);
  return domCopy.innerHTML;
}
