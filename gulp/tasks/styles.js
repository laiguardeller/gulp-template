import { src, dest } from 'gulp';
import { root } from '../config';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cleancss from 'gulp-clean-css';

const styles = () => {
  return src(`${root}/sass/styles.scss`)
    .pipe(
      plumber({
        errorHandler(err) {
          console.log(err);
          this.emit('end');
        },
      })
    )
    .pipe(
      sass({
        noCache: true,
        outputStyle: 'expanded',
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: false,
      })
    )
    .pipe(gcmq())
    .pipe(
      cleancss({ level: { 1: { specialComments: 0 } }, format: 'beautify' })
    )
    .pipe(concat('styles.min.css'))
    .pipe(dest(`${root}/css/`));
};

export { styles };
