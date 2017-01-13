import { Url as NodeURL } from 'url';

export interface URL {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
}

let a: HTMLAnchorElement;
let parse: (urlString: string) => NodeURL;
if (typeof document !== 'undefined') {
  a = document.createElement('a');
} else {
  parse = require('url').parse;
}

// Removes port 80/443 from `port` and `host` if it does not exist on `href`.
// Internet Explorer is the only browser that adds these ports.
function removeImplicitPort(url: URL): URL {
  const { host, href, pathname, port, protocol } = url;
  if (href.indexOf(`${protocol}//${host}${pathname}`) < 0) {
    url.port = '';
    url.host = host.slice(0, host.length - port.length - 1);
  }
  return url;
}

function prependSlash(path: string): string {
  return path.indexOf('/') === 0 ? path : `/${path}`;
}

export function parseURL(urlString: string): URL {
  let parsed: HTMLAnchorElement | NodeURL;

  if (typeof document !== 'undefined') {
    a.href = urlString;
    parsed = a;
  } else {
    parsed = parse(urlString) as NodeURL;
  }

  return removeImplicitPort({
    hash: parsed.hash || '',
    host: parsed.host || '',
    hostname: parsed.hostname || '',
    href: parsed.href || '',
    pathname: prependSlash(parsed.pathname || ''),
    port: parsed.port || '',
    protocol: parsed.protocol || '',
    search: parsed.search || ''
  });
}
