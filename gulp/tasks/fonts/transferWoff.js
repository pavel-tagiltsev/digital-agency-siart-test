export default function transferWoff() {
  const {src, dest} = app.gulp;
  const {build, source} = app.path;

  return src(`${source.fonts}*.{woff,woff2}`).pipe(dest(build.fonts));
}
