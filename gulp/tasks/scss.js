import dartSass from 'sass';
import gulpSass from 'gulp-sass';

import csso from 'postcss-csso';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export default function scss() {
  const {isDev, isBuild} = app;
  const {src, dest} = app.gulp;
  const {build, source} = app.path;
  const {rename, replace, gulpIf, browserSync} = app.plugins;

  return src(source.scss)
    .pipe(app.errorHandler('SCSS'))
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(replace(/@img\//g, '../images'))
    .pipe(
      sass({
        includePaths: [
          './node_modules/normalize.css/',
          './node_modules/include-media/dist/',
          './node_modules/swiper/'
        ],
        outputStyle: 'expanded'
      })
    )
    .pipe(
      rename((path) => {
        path.dirname = '';
      })
    )
    .pipe(gulpIf(isBuild, groupCssMediaQueries()))
    .pipe(gulpIf(isBuild, postcss([autoprefixer()])))
    .pipe(gulpIf(isBuild, dest(build.css)))
    .pipe(postcss([csso()]))
    .pipe(gulpIf(isDev, sourcemaps.write('.')))
    .pipe(dest(build.css))
    .pipe(browserSync.stream());
}
