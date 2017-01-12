# universal-parse-url

[![commitizen][commitizen-image]][commitizen-url]
[![license][license-image]][license-url]

A universal URL parser for Node.js and browser environments with a minimal footprint.

## How to install

Install with `npm`:

```sh
npm install --save universal-parse-url
```

**Note:** The package also includes a `d.ts` file, and thus works out of the box with TypeScript.

## Usage

```js
import { parseURL } from 'universal-parse-url'
const url = parseURL('http://www.example.com:1234/foo?bar=1#baz');
```

The resulting `url` object looks like this:

```
{
  hash: '#baz',
  host: 'www.example.com:1234',
  hostname: 'www.example.com',
  href: 'http://www.example.com:1234/foo?bar=1#baz',
  pathname: '/foo',
  port: '1234',
  protocol: 'http:',
  search: '?bar=1'
}
```

## How It Works

- In Node.js `parseURL` just delegates to [URL.parse][].
- In browser environments:
  - An [HTMLAnchorElement][] is created initially (with `document.createElement('a')`).
  - When `parseURL` is called, the `href` attribute of this element is set to the given url string.
  - The element is then used to extract the URL details.

## Requirements

If you plan on targeting browser environments as well, you need to use a bundler like [Webpack][], [Browserify][] or [Rollup][] (with [rollup-plugin-node-resolve][]) that makes use of the `browser` field in the `package.json`.

## Caveats

To keep `universal-parse-url` as small and simple as possible, only the URL details that are available in Node’s `URL` object as well as `HTMLAnchorElement` are supported (see the above example).

[license-image]: https://img.shields.io/github/license/kinghenne/universal-parse-url.svg
[license-url]: https://github.com/KingHenne/universal-parse-url/blob/master/LICENSE

[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

[URL.parse]: https://nodejs.org/dist/latest-v6.x/docs/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
[HTMLAnchorElement]: https://developer.mozilla.org/de/docs/Web/API/HTMLAnchorElement
[Webpack]: https://webpack.js.org
[Browserify]: http://browserify.org
[Rollup]: http://rollupjs.org
[rollup-plugin-node-resolve]: https://github.com/rollup/rollup-plugin-node-resolve
