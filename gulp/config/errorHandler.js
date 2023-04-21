export default function errorHandler(title) {
  const {plumber, notify} = app.plugins

  return plumber(
    notify.onError({
      title,
      message: 'Error: <%= error.message %>'
    })
  )
}
