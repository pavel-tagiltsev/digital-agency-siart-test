import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

export default function ttfToWoff() {
  const {src, dest} = app.gulp;
  const {build, source} = app.path;

  return src(`${source.fonts}*.ttf`)
    .pipe(app.errorHandler('TTF_TO_WOFF'))
    .pipe(ttf2woff())
    .pipe(dest(build.fonts))
    .pipe(src(`${source.fonts}*.ttf`))
    .pipe(ttf2woff2())
    .pipe(dest(build.fonts));
}
