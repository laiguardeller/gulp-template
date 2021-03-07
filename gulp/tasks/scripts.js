import { src, dest } from 'gulp';
import { root } from '../config';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

const scripts = () => {
  return src(`${root}/scripts/script.js`)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest(`${root}/js`));
};

export { scripts };
