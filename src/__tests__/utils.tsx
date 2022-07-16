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
      <div id="html">{html}</div>
    </div>
  );
}
