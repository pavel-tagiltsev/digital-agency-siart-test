import del from 'del';

export default function zip() {
  const {src, dest} = app.gulp;
  const {buildFolder, rootFolderName} = app.path;
  const {zip} = app.plugins;

  del(`./${rootFolderName}.zip`);

  return src(`${buildFolder}/**/*.*`)
    .pipe(app.errorHandler('ZIP'))
    .pipe(zip(`${rootFolderName}.zip`))
    .pipe(dest('./'));
}
