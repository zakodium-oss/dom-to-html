import { ReactNode, useEffect, useRef, useState } from 'react';

import domToHtml from '..';

interface TestComponentProps {
  children?: ReactNode;
}

export function TestComponent({ children }: TestComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState('');
  useEffect(() => {
    if (ref.current) setHtml(domToHtml(ref.current));
  }, []);
  return (
    <div>
      <div ref={ref} id="test">
        {children}
      </div>
      {html && <div dangerouslySetInnerHTML={{ __html: html }} id="result" />}
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
