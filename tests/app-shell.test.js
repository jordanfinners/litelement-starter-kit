import { expect } from 'chai';
// This is how you import sinon is you need it
// import sinon from 'sinon/pkg/sinon-esm.js';
import '../src/app-shell';

describe('app-shell tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('app-shell');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should set the page by default to home', () => {
    node._routePageChanged();
    expect(node.page).to.equal('home');
  });

  it('should show error page if called', () => {
    node._showPage404();
    expect(node.page).to.equal('error');
  });

  it('should parse out query strings as required', () => {
    const queryParams = node.parseQueryParams({
      querystring: 'test=hi&foo=bar',
    });
    expect(queryParams).to.deep.equal({
      test: 'hi',
      foo: 'bar',
    });
  });
});
