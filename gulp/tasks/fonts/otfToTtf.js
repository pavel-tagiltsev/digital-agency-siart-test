import fonter from 'gulp-fonter';

export default function otfToTtf() {
  const {src, dest} = app.gulp;
  const {source} = app.path;

  return src(`${source.fonts}*.otf`)
    .pipe(app.errorHandler('OTF_TO_TTF'))
    .pipe(
      fonter({
        formats: ['ttf']
      })
    )
    .pipe(dest(source.fonts));
}
