# LitElement Starter Kit

I was inspired to create this by the [Polymer Starter Kit](https://github.com/Polymer/polymer-starter-kit) as its always been a create place to get started and this was missing from LitElement, so I created this to help get started without working through the config for all the tools.

## Third-party Packages

This is a starter kit using [LitElement](https://lit-element.polymer-project.org/).

Uses [PageJS](https://visionmedia.github.io/page.js/) for routing, a tiny express inspired router.
This is configured in the app-shell, so can be swapped out if you have a preference.

Uses [Workbox](https://developers.google.com/web/tools/workbox/) to generate a service worker at build time.

### Serve

Serve with: ``npm run serve``
Serve build with: ``npm run serve:build``

We use [Web Dev Server](https://modern-web.dev/docs/dev-server/overview/) to serve a hot reloading app. 

Once you've run the build, you can also serve the build up using the same tool.

### Test
Test with: ``npm run test``

Tests are written using [Mocha](https://mochajs.org/), [uvu](https://github.com/lukeed/uvu).

These are run using [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) using headless chrome provided by Web Test Runners Puppeteer integration, but you can use [other browser launchers](https://modern-web.dev/docs/test-runner/browser-launchers/overview/) if you prefer.

### Lint
Lint with: ``npm run lint``

Linting is done with [ESLint](https://eslint.org/) extending some standard rules:
- [eslint:recommended](https://eslint.org/docs/rules/)
- [google](https://github.com/google/eslint-config-google)
- [plugin:wc/best-practice](https://github.com/43081j/eslint-plugin-wc)
- [plugin:lit/recommended](https://github.com/43081j/eslint-plugin-lit)

If you're feeling lazy, which I often am, you can run ``npm run lint:fix`` which will try auto fix your eslint issues.


### Build
Build with: ``npm run build``

The app is built with [esbuild](https://esbuild.github.io/).

It will also copy over images, manifest.json and the minified index.html to the build folder.

It will also generate a service worker for use as well using Workbox.
