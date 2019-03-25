import { LitElement, html, css } from 'lit-element/lit-element.js';
import '@polymer/iron-pages/iron-pages.js';
import router from 'page/page.mjs';
import { sharedStyles } from './shared-styles.js';

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
            <iron-pages selected="${this.page}" attr-for-selected="name" fallback-selection="error" role="main">
              <home-page name="home"></home-page>
              <error-page name="error"></error-page>
            </iron-pages>
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

  /** Client side routing config */
  routing() {
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
    // Parses off any query strings from the url and sets a query string object
    // url ?hi=everyone
    // queryParams {hi: 'everyone'}
    router((context) => {
      if (context.querystring.length > 0) {
        const queryParams = {};
        context.querystring.split('&').forEach((query) => {
          const param = query.split('=');
          queryParams[param[0]] = param[1];
        });
        this.queryParams = queryParams;
      }
    });
    router();
  }


  /**
   * Fired whenever any property changes and the template updates
   * @param {PropertyValues} changedProperties map of changed properties
   */
  updated(changedProperties) {
    if (changedProperties.has('routeData') && this.routeData) {
      if (this.routeData && this.routeData.params) {
        this._routePageChanged(this.routeData.params.page);
      }
    }
    if (changedProperties.has('page')) {
      this._importPage(this.page);
    }
  }

  /**
     * Triggered when the route changed, if page is an empty string, it will
     * default to the home page, close any burger menus etc here
     *
     * @param {String} page the page the user is on
     */
  _routePageChanged(page) {
    if (!page) {
      this.page = 'home';
    } else if (['home', 'error'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'error';
    }
  }

  /**
     * Lazy load the page in
     *
     * @param {String} page the page the user is on
     */
  _importPage(page) {
    /*
         * Import the page component on demand.
         *
         * Note: `build` doesn't like string concatenation in the import
         * statement, so break it up.
         */
    switch (page) {
      case 'error': {
        import('./pages/error-page.js');
        break;
      }
      case 'home': {
        import('./pages/home-page.js');
        break;
      }
      default: {
        import('./pages/error-page.js');
        break;
      }
    }
  }

  /**
     * Sets the page to be the error one
     *
     */
  _showPage404() {
    this.page = 'error';
  }
}

window.customElements.define('app-shell', AppShell);
