import { css } from 'lit-element/lit-element';

/* shared styles for all views */
export const sharedStyles = css`
      html,
      :host>* {
        --white-color: #ffffff;
      }

      /**
      * Add the correct display in IE 10-.
      */
      [hidden] {
        display: none;
      }
`;
