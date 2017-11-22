import { assert } from 'chai';
import { parseURL, prependSlashToPathname } from './';

describe('parseURL', () => {
  it('returns an URL object for http://www.example.com:1234/foo?bar=1#baz', () => {
    const urlString = 'http://www.example.com:1234/foo?bar=1#baz';
    const expectedResult = {
      hash: '#baz',
      host: 'www.example.com:1234',
      hostname: 'www.example.com',
      href: 'http://www.example.com:1234/foo?bar=1#baz',
      pathname: '/foo',
      port: '1234',
      protocol: 'http:',
      search: '?bar=1'
    };
    assert.deepEqual(parseURL(urlString), expectedResult);
  });

  it('returns an URL object for https://www.example.com', () => {
    const urlString = 'https://www.example.com';
    const expectedResult = {
      hash: '',
      host: 'www.example.com',
      hostname: 'www.example.com',
      href: 'https://www.example.com/',
      pathname: '/',
      port: '',
      protocol: 'https:',
      search: ''
    };
    assert.deepEqual(parseURL(urlString), expectedResult);
  });

  it('returns an URL object for http://www.example.com', () => {
    const urlString = 'http://www.example.com';
    const expectedResult = {
      hash: '',
      host: 'www.example.com',
      hostname: 'www.example.com',
      href: 'http://www.example.com/',
      pathname: '/',
      port: '',
      protocol: 'http:',
      search: ''
    };
    assert.deepEqual(parseURL(urlString), expectedResult);
  });

  it('returns an URL object for http://www.example.com:1234?bar=1&baz=2', () => {
    const urlString = 'http://www.example.com:1234?bar=1&baz=2';
    const expectedResult = {
      hash: '',
      host: 'www.example.com:1234',
      hostname: 'www.example.com',
      href: 'http://www.example.com:1234/?bar=1&baz=2',
      pathname: '/',
      port: '1234',
      protocol: 'http:',
      search: '?bar=1&baz=2'
    };
    assert.deepEqual(parseURL(urlString), expectedResult);
  });
});

describe('prependSlashToPathname', () => {
  it('prepends url.pathname with an slash if it does not start with a slash', () => {
    const url = {
      hash: '',
      host: 'www.example.com:1234',
      hostname: 'www.example.com',
      href: 'http://www.example.com:1234/foo?bar=1&baz=2',
      pathname: 'foo',
      port: '1234',
      protocol: 'http:',
      search: '?bar=1&baz=2'
    };

    const { pathname } = prependSlashToPathname(url);

    assert.equal(pathname, '/foo');
  });

  it('prepends url.pathname with an slash if even if it is empty', () => {
    const url = {
      hash: '',
      host: 'www.example.com:1234',
      hostname: 'www.example.com',
      href: 'http://www.example.com:1234/?bar=1&baz=2',
      pathname: '',
      port: '1234',
      protocol: 'http:',
      search: '?bar=1&baz=2'
    };

    const { pathname } = prependSlashToPathname(url);

    assert.equal(pathname, '/');
  });

  it('prepends url.pathname with an slash even if there is a slash but not at the first location', () => {
    const url = {
      hash: '',
      host: 'www.example.com:1234',
      hostname: 'www.example.com',
      href: 'http://www.example.com:1234/foo/bar?bar=1&baz=2',
      pathname: 'foo/bar',
      port: '1234',
      protocol: 'http:',
      search: '?bar=1&baz=2'
    };

    const { pathname } = prependSlashToPathname(url);

    assert.equal(pathname, '/foo/bar');
  });
});
