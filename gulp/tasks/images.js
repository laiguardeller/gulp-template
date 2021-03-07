import { src, dest } from 'gulp';
import { root, dist } from '../config';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';

const images = () => {
  return src(`${root}/img/**/*.{png,jpeg,jpg,webp}`)
    .pipe(
      imagemin([pngquant({ quality: [0.75, 0.75] }), mozjpeg({ quality: 60 })])
    )
    .pipe(dest(`${dist}/img/`));
};

export { images };
