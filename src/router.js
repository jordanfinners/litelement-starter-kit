/**
 * `router`
 *  Handle form methods e.g converting it to json
 *
 */

/**
 * Parses out the query string to an object
 * @param {Object} context the page js context object
 * @return {Object} the parsed query params
 */
export const parseQueryParams = (context) => {
  if (context.querystring.length === 0) {
    return {};
  }
  const queryParams = {};
  const params = new URLSearchParams(context.querystring);
  Array.from(params.keys()).forEach((key) => {
    queryParams[key] = params.get(key);
  });
  return queryParams;
};

/**
 * Validates that the page thats trying to be routed to is valid otherwise error
 * @param {String} page the name of the page
 * @return {String} validate page
 */
export const validatePage = (page) => {
  if (!page) {
    return 'home';
  } if (['home'].indexOf(page) !== -1) {
    return page;
  }
  return 'error';
};

/* eslint-disable no-unused-expressions */
/**
 * Dynamically import the page
 * @param {String} page the current page
 */
export const importPage = (page) => {
  // Note: `build` doesn't like string concatenation in the import
  // statement, so break it up.
  switch (page) {
    case 'home':
      import('./pages/home-page');
      break;
    case 'error':
      import('./pages/error-page');
      break;
    default:
      import('./pages/error-page');
  }
};
/* eslint-enable no-unused-expressions */
