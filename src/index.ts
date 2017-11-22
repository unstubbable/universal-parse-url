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

// A pathname should always start with a slash.
// Internet Explorer does not add a leading slash, so we have to prepend it.
function prependSlashToPathname(url: URL): URL {
  if (url.pathname.charAt(0) !== '/') {
    url.pathname = `/${url.pathname}`;
  }
  return url;
}

function fixBrowserInconsistencies(url: URL): URL {
  return removeImplicitPort(prependSlashToPathname(url));
}

export function parseURL(urlString: string): URL {
  let parsed: HTMLAnchorElement | NodeURL;

  if (typeof document !== 'undefined') {
    a.href = urlString;
    parsed = a;
  } else {
    parsed = parse(urlString) as NodeURL;
  }

  const url = {
    hash: parsed.hash || '',
    host: parsed.host || '',
    hostname: parsed.hostname || '',
    href: parsed.href || '',
    pathname: parsed.pathname || '',
    port: parsed.port || '',
    protocol: parsed.protocol || '',
    search: parsed.search || ''
  };

  if (typeof document !== 'undefined') {
    return fixBrowserInconsistencies(url);
  } else {
    return url;
  }
}
