import { Url as NodeURL } from 'url';

export interface URL {
  hash: string | undefined;
  host: string | undefined;
  hostname: string | undefined;
  href: string | undefined;
  pathname: string | undefined;
  port: string | undefined;
  protocol: string | undefined;
  search: string | undefined;
}

const doc = typeof document === 'undefined' ? null : document;

let a: HTMLAnchorElement;
let parse: (urlString: string) => NodeURL;
if (doc) {
  a = doc.createElement('a');
} else {
  parse = require('url').parse;
}

export function parseURL(urlString: string): URL {
  let parsed: HTMLAnchorElement | NodeURL;

  if (doc) {
    a.href = urlString;
    parsed = a;
  } else {
    parsed = parse(urlString) as NodeURL;
  }

  return {
    hash: parsed.hash,
    host: parsed.host,
    hostname: parsed.hostname,
    href: parsed.href,
    pathname: parsed.pathname,
    port: parsed.port,
    protocol: parsed.protocol,
    search: parsed.search
  };
}
