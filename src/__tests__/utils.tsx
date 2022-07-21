import { ReactNode, useEffect, useRef, useState } from 'react';

import { domToHtml } from '..';

import jpg from './test.jpg';
import svg from './test.svg';

interface TestComponentProps {
  children?: ReactNode;
}

export function TestComponent({ children }: TestComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState('');
  async function initializeHtml() {
    const html = await domToHtml(ref.current);
    setHtml(html);
  }
  useEffect(() => {
    void initializeHtml();
  }, []);
  return (
    <div>
      <div>
        <span ref={ref} id="test">
          {children}
        </span>
        {html && (
          <span dangerouslySetInnerHTML={{ __html: html }} id="result"></span>
        )}
      </div>
      {html && <textarea rows={20} value={html} id="html" />}
    </div>
  );
}

export function CanvasTest() {
  const ref = useRef<HTMLCanvasElement>(null);
  function initializeCanvas() {
    const ctx = ref?.current?.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(10, 10, 50, 50);
      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
    }
  }
  useEffect(() => {
    initializeCanvas();
  }, []);
  return <canvas ref={ref} width="200" height="100" />;
}

export function SvgTest() {
  return <img src={svg} />;
}
export function FullTest() {
  return (
    <>
      <h1>Test copy DOM element as HTML</h1>
      <h2>this is a jpg image</h2>
      <img src={jpg} />
      <h2>this is a svg image</h2>
      <img src={svg} />
    </>
  );
}
