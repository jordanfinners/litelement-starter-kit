/* eslint-disable no-console */

import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
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
      terserPlugin,
      copyPlugin,
    ],
  },
];
