import del from 'del';

export default function reset() {
  return del(app.path.buildFolder);
}
