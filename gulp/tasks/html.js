import { src, dest } from 'gulp';
import { root } from '../config';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import prettyHtml from 'gulp-pretty-html';
import notify from 'gulp-notify';

const html = () => {
  return src(`${root}/pages/*.pug`)
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(plumber.stop())
    .pipe(
      prettyHtml({
        indent_size: 2,
        indent_char: ' ',
        unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br'],
      })
    )
    .pipe(dest(`${root}/`));
};

export { html };
