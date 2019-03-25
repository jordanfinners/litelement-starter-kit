import { expect } from 'chai';
import '../../src/pages/error-page.js';

describe('error-page tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('error-page');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should set the default text', () => {
    const h2 = node.shadowRoot.querySelector('h2');
    expect(h2.textContent).to.equal('Nobody panic!!!!');
  });
});
