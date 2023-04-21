import imagemin from 'gulp-imagemin';

export default function images() {
  const {isBuild} = app;
  const {src, dest} = app.gulp;
  const {build, source} = app.path;
  const {newer, gulpIf, browserSync, webp} = app.plugins;

  return src(source.images)
    .pipe(app.errorHandler('IMAGES'))
    .pipe(newer(build.images))
    .pipe(gulpIf(isBuild, webp()))
    .pipe(gulpIf(isBuild, dest(build.images)))
    .pipe(gulpIf(isBuild, src(source.images)))
    .pipe(gulpIf(isBuild, newer(build.images)))
    .pipe(
      gulpIf(
        isBuild,
        imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          interlaced: true,
          optimizationLevel: 4 // 0 to 7
        })
      )
    )
    .pipe(dest(build.images))
    .pipe(src(source.svg))
    .pipe(dest(build.images))
    .pipe(browserSync.stream());
}
