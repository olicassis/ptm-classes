import app from './app'

const port = parseInt(process.env.APP_PORT ?? '3000')
const url = process.env.APP_URL

app.listen(port, () => {
  console.info(`[server]: Server is running at ${url}:${port}`)
})
