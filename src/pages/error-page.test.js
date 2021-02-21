import * as assert from 'uvu/assert';
import './error-page';

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
    assert.equal(h2.textContent, 'Nobody panic!!!!');
  });
});
