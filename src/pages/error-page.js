import { LitElement, html } from 'lit-element/lit-element.js';
/**
 * `error-page`
 *  Error handling page e.g. browsing to a non existant page
 *
 * @customElement
 */
export class ErrorPage extends LitElement {
  /**
     * Defined the elements content
     * @return {TemplateResult} the resulting html template
     */
  render() {
    return html`<h2>Nobody ${this.errorMessage}!!!!</h2>`;
  }

  /** Defines the elements properties */
  static get properties() {
    return {
      /** The error messaging */
      errorMessage: { type: String },
    };
  }

  /** Initialises values of properties */
  constructor() {
    super();
    this.errorMessage = 'panic';
  }
}
window.customElements.define('error-page', ErrorPage);
