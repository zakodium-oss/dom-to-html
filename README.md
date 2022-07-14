# dom-to-html

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Convert a dom element including canvas and svg to an html.

## Installation

`$ npm i dom-to-html`

## Usage

```js
import { domToHTML } from 'dom-to-html';

const html = domToHTML(domElement);
```

This method will render SVG to canvas and copy all the resulting graphics as base64 url encoded img.

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/dom-to-html.svg
[npm-url]: https://www.npmjs.com/package/dom-to-html
[ci-image]: https://github.com/zakodium-oss/dom-to-html/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/zakodium-oss/dom-to-html/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/zakodium-oss/dom-to-html.svg
[codecov-url]: https://codecov.io/gh/zakodium-oss/dom-to-html
[download-image]: https://img.shields.io/npm/dm/dom-to-html.svg
[download-url]: https://www.npmjs.com/package/dom-to-html
