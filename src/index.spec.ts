import { assert } from 'chai';
import { parseURL } from './';

describe('parseURL', () => {
  it('returns an URL object for http://www.example.com:1234/foo/bar?baz=1#qux', () => {
    const urlString = 'http://www.example.com:1234/foo/bar?baz=1#qux';
    const expectedResult = {
      hash: '#qux',
      host: 'www.example.com:1234',
      hostname: 'www.example.com',
      href: 'http://www.example.com:1234/foo/bar?baz=1#qux',
      pathname: '/foo/bar',
      port: '1234',
      protocol: 'http:',
      search: '?baz=1'
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
