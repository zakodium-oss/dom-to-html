import { ClipboardEvent, ReactNode, useEffect, useRef, useState } from 'react';

import { domToHtml, copyToClipboard, saveHtml } from '..';

import jpg from './test.jpg';
import png from './test.png';
import svg from './test.svg';

interface TestComponentProps {
  children?: ReactNode;
}
export function TestCopyClipboard({ children }: TestComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [clipboard, setClipboard] = useState<string>('');
  async function copy() {
    if (ref.current) {
      await copyToClipboard(ref.current);
    }
  }
  function paste(e: ClipboardEvent) {
    e.stopPropagation();
    e.preventDefault();
    const clipboardData = e.clipboardData;
    const text = clipboardData.getData('text/html');
    setClipboard(text);
  }
  return (
    <div>
      <div ref={ref} id="test">
        {children}
      </div>
      {clipboard && (
        <textarea
          onPaste={(e) => paste(e)}
          rows={20}
          value={clipboard}
          id="clipboard"
        />
      )}
      <button type="button" onPointerDown={() => void copy()} id="copy">
        Copy
      </button>
      <div contentEditable onPaste={(e) => paste(e)} id="paste">
        Paste
      </div>
    </div>
  );
}
interface TestSaveHtmlProps extends TestComponentProps {
  filename: string;
}
export function TestSaveHtml({ children, filename }: TestSaveHtmlProps) {
  const ref = useRef<HTMLDivElement>(null);
  async function download() {
    if (ref.current) {
      await saveHtml(ref.current, { filename });
    }
  }
  return (
    <div>
      <div ref={ref} id="test">
        {children}
      </div>
      <button onClick={() => void download()} type="button" id="download">
        download
      </button>
    </div>
  );
}

export function TestDomToHtml({ children }: TestComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState('');
  async function initializeHtml() {
    if (ref.current) {
      const html = await domToHtml(ref.current);
      setHtml(html);
    }
  }
  useEffect(() => {
    void initializeHtml();
  }, []);
  return (
    <div>
      <div>
        <div ref={ref} id="test">
          {children}
        </div>
        {html && <div dangerouslySetInnerHTML={{ __html: html }} id="result" />}
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
export function JpgImageTest() {
  return <img src={jpg} />;
}
export function PngImageTest() {
  return <img src={png} />;
}
export function SvgImageTest() {
  return <img src={svg} />;
}
export function SvgTest() {
  return (
    <svg height="400" width="450">
      <path
        id="lineAB"
        d="M 100 350 l 150 -300"
        stroke="red"
        stroke-width="3"
        fill="none"
      />
      <path
        id="lineBC"
        d="M 250 50 l 150 300"
        stroke="red"
        stroke-width="3"
        fill="none"
      />
      <path d="M 175 200 l 150 0" stroke="green" stroke-width="3" fill="none" />
      <path
        d="M 100 350 q 150 -300 300 0"
        stroke="blue"
        stroke-width="5"
        fill="none"
      />
      <g stroke="black" stroke-width="3" fill="black">
        <circle id="pointA" cx="100" cy="350" r="3" />
        <circle id="pointB" cx="250" cy="50" r="3" />
        <circle id="pointC" cx="400" cy="350" r="3" />
      </g>
      <g
        font-size="30"
        font-family="sans-serif"
        fill="black"
        stroke="none"
        text-anchor="middle"
      >
        <text x="100" y="350" dx="-30">
          A
        </text>
        <text x="250" y="50" dy="-10">
          B
        </text>
        <text x="400" y="350" dx="30">
          C
        </text>
      </g>
    </svg>
  );
}
export function FullTest() {
  const ref = useRef<HTMLCanvasElement>(null);
  function initializeCanvas() {
    const ctx = ref?.current?.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(10, 10, 50, 50);
    }
  }
  useEffect(() => {
    initializeCanvas();
  }, []);
  return (
    <>
      <h1>Test DOM element as HTML</h1>
      <h2>this is a jpg image</h2>
      <JpgImageTest />
      <h2>this is a svg image</h2>
      <SvgImageTest />
      <h2>this is a png image</h2>
      <PngImageTest />
      <h2>this is an svg</h2>
      <svg height="80" width="300">
        <g fill="none" stroke="black" stroke-width="4">
          <path stroke-dasharray="5,5" d="M5 20 l215 0" />
          <path stroke-dasharray="10,10" d="M5 40 l215 0" />
          <path stroke-dasharray="20,10,5,5,5,10" d="M5 60 l215 0" />
        </g>
      </svg>
      <h2>this is a canvas</h2>
      <canvas ref={ref} width="200" height="100" />
    </>
  );
}
