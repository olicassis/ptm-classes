import dotenv from 'dotenv'
import express, { Application } from 'express'

import routes from './routes'
dotenv.config({ path: '../../.env' })

const port = parseInt(process.env.APP_PORT ?? '3000')
const url = process.env.APP_URL
const app: Application = express()

app.use('/api', routes)

app.listen(port, () => {
  console.info(`[server]: Server is running at ${url}:${port}`)
})
