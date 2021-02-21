import * as fs from 'fs';
import {minify} from 'html-minifier';

const html = fs.readFileSync('./index.html');

const result = minify(html.toString(), {
  collapseWhitespace: true,
  removeComments: true,
  minifyJS: true,
  minifyCSS: true,
});
fs.writeFileSync('./build/index.html', result);
