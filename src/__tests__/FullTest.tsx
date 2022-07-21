import jpg from './test.jpg';
import svg from './test.svg';

export function FullTest() {
  return (
    <div id="toCopy">
      <h1>Test copy DOM element as HTML</h1>
      <h2>this is a jpg image</h2>
      <img src={jpg} />
      <h2>this is a svg image</h2>
      <img src={svg} />
    </div>
  );
}
