import * as assert from 'uvu/assert';
import './app-shell';

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

  it('should have a main section', () => {
    const main = node.shadowRoot.querySelector('main');
    assert.ok(main);
  });
});
