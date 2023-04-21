import ghPages from 'gulp-gh-pages';

export default function deploy() {
  return app.gulp.src('./build/**/*').pipe(ghPages());
}
