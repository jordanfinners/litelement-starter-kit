import { LitElement, html, css } from 'lit-element/lit-element';
import router from 'page/page.mjs';
import { parseQueryParams, validatePage, importPage } from './router';
import { sharedStyles } from './shared-styles';

/**
 * `app-shell`
 *  Shell to run the whole app
 *
 * @customElement
 * @polymer
 */
export class AppShell extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
            :host {
                display: block;
            }
        `;

    return [sharedStyles, style];
  }

  /**
   * Defined the elements content
   * @return {TemplateResult} the resulting html template
   */
  render() {
    return html`
            <main>
              <home-page name="home" ?hidden=${this.page !== 'home'}></home-page>
              <error-page name="error" ?hidden=${this.page !== 'error'}></error-page>
            </main>
`;
  }

  /** Defines the elements properties */
  static get properties() {
    return {
      /** The page to display */
      page: { type: String, reflect: true },
      /** The data parsed from the route url */
      routeData: { type: Object },
      /** If the user is authed */
      queryParams: { type: Object },
    };
  }

  /** Initialises values of properties */
  constructor() {
    super();
    this.routeData = {
      params: {},
    };
    this.queryParams = {};
    this.routing();
  }

  /** Add any event listeners */
  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
  }

  /** Remove any attached event listeners */
  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
  }

  /** Client side routing */
  routing() {
    // Parses off any query strings from the url and sets a query string object
    // url ?hi=everyone
    // queryParams {hi: 'everyone'}
    router('*', (context, next) => {
      this.queryParams = parseQueryParams(context);
      next();
    });
    // Browsing to / takes you to home
    router('/', (context) => {
      const { ...routeData } = context;
      routeData.params.page = 'home';
      this.routeData = routeData;
    });
    // Browsing to /home tries to take you to that page
    router('/:page', (context) => {
      this.routeData = context;
    });

    // Browsing to /home tries to take you to that page
    router('/:page', (context) => {
      this.routeData = context;
    });
    router();
  }

  /**
   * Fired whenever any property changes and the template updates
   * @param {PropertyValues} changedProperties map of changed properties
   */
  updated(changedProperties) {
    if (super.updated) {
      super.updated();
    }
    if (changedProperties.has('routeData') && this.routeData && this.routeData.params) {
      this.page = validatePage(this.routeData.params.page);
    }
    if (changedProperties.has('page')) {
      importPage(this.page);
    }
  }
}

window.customElements.define('app-shell', AppShell);
