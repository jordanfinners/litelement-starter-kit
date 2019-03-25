/* eslint-disable no-console */

import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';
import multiEntry from 'rollup-plugin-multi-entry';


export default {
  input: 'tests/**/**/*.test.js',
  output: {
    dir: 'tests/bundle',
    format: 'esm',
    sourcemap: 'inline',
  },
  cache: true,
  onwarn(warning) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    resolve(),
    common({
      namedExports: {
        chai: ['expect'],
      },
    }),
    multiEntry(),
  ],
};
