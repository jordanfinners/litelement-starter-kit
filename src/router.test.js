import { expect } from 'chai';
import { parseQueryParams, validatePage } from './router';

describe('router tests', () => {
  describe('parse query params', () => {
    it('should parse query parameters', () => {
      const result = parseQueryParams({
        querystring: 'view=test&over=here',
      });
      expect(result).to.deep.equal({
        view: 'test',
        over: 'here',
      });
    });

    it('should handle no query parameters', () => {
      const result = parseQueryParams({
        querystring: '',
      });
      expect(result).to.deep.equal({});
    });

    it('should parse url encoded query parameters', () => {
      const result = parseQueryParams({
        querystring: 'view=s%40v&units=%25',
      });
      expect(result).to.deep.equal({
        view: 's@v',
        units: '%',
      });
    });
  });

  describe('validate page', () => {
    it('should fallback to the home page if non supplied', () => {
      const result = validatePage(null);
      expect(result).to.equal('home');
    });

    it('should send to error page if unknown page name', () => {
      const result = validatePage('blblblblbl');
      expect(result).to.equal('error');
    });

    it('should return the name of the page for valid pages', () => {
      const pages = ['home'];
      pages.forEach((page) => {
        const result = validatePage(page);
        expect(result).to.equal(page, `${page} isn't valid and being returned from the expected list of pages`);
      });
    });
  });
});
