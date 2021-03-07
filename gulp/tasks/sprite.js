import { src, dest } from 'gulp';
import { root } from '../config';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import rename from 'gulp-rename';

const sprite = () => {
  return src(`${root}/img/svg/*.svg`)
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(rename({ basename: 'sprite' }))
    .pipe(dest(`${root}/img/sprite/`));
};

export { sprite };
