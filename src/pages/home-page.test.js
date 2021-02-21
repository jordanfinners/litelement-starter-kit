import * as assert from 'uvu/assert';
import './home-page';

describe('home-page tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('home-page');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should set the default text', () => {
    const h2 = node.shadowRoot.querySelector('h2');
    assert.equal(h2.textContent, 'Welcome home');
  });
});
