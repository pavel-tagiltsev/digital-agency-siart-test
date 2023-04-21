export default function files() {
  return app.gulp
    .src(app.path.source.files)
    .pipe(app.gulp.dest(app.path.build.files));
}
