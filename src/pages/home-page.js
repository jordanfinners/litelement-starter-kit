import { LitElement, html } from 'lit-element/lit-element.js';
/**
 * `home-page`
 *  The home page for the app
 *
 * @customElement
 */
export class HomePage extends LitElement {
  /**
     * Defined the elements content
     * @return {TemplateResult} the resulting html template
     */
  render() {
    return html`<h2>Welcome home</h2>`;
  }
}
window.customElements.define('home-page', HomePage);
