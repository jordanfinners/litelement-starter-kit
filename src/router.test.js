import * as assert from 'uvu/assert';
import {parseQueryParams, validatePage} from './router';

describe('router tests', () => {
  describe('parse query params', () => {
    it('should parse query parameters', () => {
      const result = parseQueryParams({
        querystring: 'view=test&over=here',
      });
      assert.equal(result, {
        view: 'test',
        over: 'here',
      });
    });

    it('should handle no query parameters', () => {
      const result = parseQueryParams({
        querystring: '',
      });
      assert.equal(result, {});
    });

    it('should parse url encoded query parameters', () => {
      const result = parseQueryParams({
        querystring: 'view=s%40v&units=%25',
      });
      assert.equal(result, {
        view: 's@v',
        units: '%',
      });
    });
  });

  describe('validate page', () => {
    it('should fallback to the home page if non supplied', () => {
      const result = validatePage(null);
      assert.equal(result, 'home');
    });

    it('should send to error page if unknown page name', () => {
      const result = validatePage('blblblblbl');
      assert.equal(result, 'error');
    });

    it('should return the name of the page for valid pages', () => {
      const pages = ['home'];
      pages.forEach((page) => {
        const result = validatePage(page);
        assert.equal(result, page);
      });
    });
  });
});
