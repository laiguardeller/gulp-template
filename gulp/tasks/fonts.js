import { src, dest } from 'gulp';
import { root } from '../config';
import del from 'del';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

const woff = () => {
  return src(`${root}/fonts/**/*.ttf`)
    .pipe(ttf2woff())
    .pipe(dest(file => file.base));
};
const woff2 = () => {
  return src(`${root}/fonts/**/*.ttf`)
    .pipe(ttf2woff2())
    .pipe(dest(file => file.base));
};

const cleanttf = async cb => {
  await del(`${root}/**/*.ttf`);
  cb();
};

export { woff, woff2, cleanttf };
