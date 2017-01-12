import { assert } from 'chai';
import { parseURL } from './';

describe('parseURL', () => {
  it('returns an URL object for the given URL', () => {
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
});
