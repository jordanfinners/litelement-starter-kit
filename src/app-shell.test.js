import { expect } from 'chai';
// This is how you import sinon is you need it
// import sinon from 'sinon/pkg/sinon-esm.js';
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
    expect(main).to.exist;
  });
});
