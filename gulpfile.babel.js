// Import global Gulp methods
import { dest, parallel, series, src, watch } from 'gulp';

// Import settings
import { root, dist } from './gulp/config';

// Import gulp tasks
import { clean } from './gulp/tasks/clean';
import { html } from './gulp/tasks/html';
import { scripts } from './gulp/tasks/scripts';
import { sprite } from './gulp/tasks/sprite';
import { styles } from './gulp/tasks/styles';
import { images } from './gulp/tasks/images';
import { cleanttf, woff, woff2 } from './gulp/tasks/fonts';

// Development server
import browserSync from 'browser-sync';
const server = browserSync.create();

// Starting our server on root dir
const serve = () => {
  server.init({
    server: { baseDir: `${root}` },
    notify: false,
    online: true,
  });

  // Watching our files and start tasks
  watch(`${root}/pages/**/*.pug`, html).on('change', server.reload);
  watch(`${root}/sass/**/*`, styles).on('change', server.reload);
  watch(`${root}/img/svg/*.svg`, sprite).on('change', server.reload);
  watch(`${root}/scripts/script.js`, series(scripts)).on(
    'change',
    server.reload
  );
};

// Define tasks
const dev = parallel(html, styles, scripts);

const start = series(dev, serve);
const build = series(clean, cb => {
  src(`${root}/*.html`).pipe(dest(`${dist}/`));
  src([`${root}/img/**/*`, `!${root}/img/{svg,svg/**}`]).pipe(
    dest(`${dist}/img/`)
  );
  src(`${root}/css/*.css`).pipe(dest(`${dist}/css`));
  src(`${root}/js/*.js`).pipe(dest(`${dist}/js`));
  src(`${root}/libs/*`).pipe(dest(`${dist}/libs/`));
  src(`${root}/fonts/**/*`).pipe(dest(`${dist}/fonts/`));
  src(`${root}/favicon/*`).pipe(dest(`${dist}/favicon/`));
  cb();
});

// Optional tasks
const img = images;
const font = series(woff, woff2, cleanttf);

export { start, build, img, font };
