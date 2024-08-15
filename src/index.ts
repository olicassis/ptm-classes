import app from './app'
import { AppDataSource } from './db/dataSource'

const port = parseInt(process.env.APP_PORT ?? '3000')
const url = process.env.APP_URL

AppDataSource.initialize()
  .then(() => {
    console.info('[Database]: DataSource has been initialized!')

    app.listen(port, () => {
      console.info(`[Server]: Server is running at ${url}:${port}`)
    })
  })
  .catch((err) => {
    console.error('[Database]: Error during DataSource initialization', err)
  })
