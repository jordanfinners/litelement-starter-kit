/* eslint-disable no-console */

import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy-glob';


const replacePlugin = replace({
  'process.env.NODE_ENV': JSON.stringify('production'),
});
const minifyHTMLPlugin = minifyHTML({
  failOnError: true,
});
const terserPlugin = terser({
  warnings: true,
  mangle: {
    module: true,
  },
});
const copyPlugin = copy([
  { files: 'node_modules/@webcomponents/webcomponentsjs/**/*.js', dest: 'build/node_modules/@webcomponents/webcomponentsjs' },
  { files: 'node_modules/@babel/polyfill/dist/polyfill.min.js', dest: 'build/node_modules/@babel/polyfill/dist' },
  { files: 'node_modules/systemjs/dist/s.min.js', dest: 'build/legacy' },
  { files: 'manifest.json', dest: 'build' },
  { files: 'images/**/*', dest: 'build/images' },
]);

export default [
  // modern standard config
  {
    input: 'src/app-shell.js',
    output: {
      // output into given folder or default /build.
      dir: 'build/src',
      format: 'esm',
      sourcemap: true,
    },
    onwarn(warning) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        console.error(`(!) ${warning.message}`);
      }
    },
    treeshake: true,
    plugins: [
      replacePlugin,
      minifyHTMLPlugin,
      resolve(),
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                esmodules: true,
              },
            },
          ],
        ],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-syntax-import-meta',
          ['bundled-import-meta', { importStyle: 'baseURI' }],
        ],
      }),
      terserPlugin,
      copyPlugin,
    ],
  },
  // dam ie config
  {
    input: 'src/app-shell.js',
    output: {
      dir: 'build/legacy/src/',
      format: 'system',
      sourcemap: true,
    },
    onwarn(warning) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      replacePlugin,
      minifyHTMLPlugin,
      resolve(),
      babel({
        plugins: [
          '@babel/plugin-transform-template-literals',
          '@babel/plugin-transform-literals',
          '@babel/plugin-transform-function-name',
          '@babel/plugin-transform-arrow-functions',
          '@babel/plugin-transform-block-scoped-functions',
          '@babel/plugin-transform-classes',
          '@babel/plugin-transform-object-super',
          '@babel/plugin-transform-shorthand-properties',
          '@babel/plugin-transform-duplicate-keys',
          '@babel/plugin-transform-computed-properties',
          '@babel/plugin-transform-for-of',
          '@babel/plugin-transform-sticky-regex',
          '@babel/plugin-transform-unicode-regex',
          '@babel/plugin-transform-spread',
          '@babel/plugin-transform-parameters',
          '@babel/plugin-transform-destructuring',
          '@babel/plugin-transform-block-scoping',
          '@babel/plugin-transform-typeof-symbol',
          '@babel/plugin-transform-instanceof',
          [
            '@babel/plugin-transform-regenerator',
            { async: false, asyncGenerators: false },
          ],
          '@babel/plugin-transform-exponentiation-operator',
          '@babel/plugin-transform-async-to-generator',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-async-generator-functions',
          '@babel/plugin-syntax-object-rest-spread',
          '@babel/plugin-syntax-async-generators',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-syntax-import-meta',
          ['bundled-import-meta', { importStyle: 'baseURI' }],
        ],
      }),
      terserPlugin,
    ],
  },
];
