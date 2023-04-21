import gulpLoadPlugins from 'gulp-load-plugins'

export default gulpLoadPlugins({
  config: process.env.npm_package_json,
  pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*', 'browser-*'],
  rename: {
    'gulp-if': 'gulpIf'
  }
})
