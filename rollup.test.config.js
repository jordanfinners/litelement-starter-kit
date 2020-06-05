/* eslint-disable no-console */

import resolve from '@rollup/plugin-node-resolve';
import common from '@rollup/plugin-commonjs';
import multiEntry from '@rollup/plugin-multi-entry';


export default {
  input: 'src/**/*.test.js',
  output: {
    file: 'tests/bundle.js',
    format: 'esm',
    sourcemap: 'inline',
  },
  inlineDynamicImports: true,
  cache: true,
  onwarn(warning) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    multiEntry(),
    resolve(),
    common({
      namedExports: {
        chai: ['expect'],
      },
    }),
  ],
};
