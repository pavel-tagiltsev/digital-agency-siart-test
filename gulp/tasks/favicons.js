export default function favicons() {
  return app.gulp
    .src(app.path.source.favicons)
    .pipe(app.gulp.dest(app.path.build.favicons));
}
