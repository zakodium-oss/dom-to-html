import React, { ReactNode, useEffect, useRef, useState } from 'react';

import domToHtml from '..';

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
      <div ref={ref} id="test">
        {children}
      </div>
      {html && (
        <div dangerouslySetInnerHTML={{ __html: html }} id="result"></div>
      )}
      {html && <textarea rows={20} value={html} id="html"></textarea>}
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
  return (
    <TestComponent>
      <canvas
        ref={ref}
        width="200"
        height="100"
        style={{ border: '1px solid #000000' }}
      />
    </TestComponent>
  );
}
