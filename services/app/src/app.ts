import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import swaggerUi from 'swagger-ui-express'

import routes from './routes'
import swaggerOutput from './swagger_output.json'

dotenv.config({ path: '../../.env' })

const port = parseInt(process.env.APP_PORT ?? '3000')
const url = process.env.APP_URL
const app: Application = express()

app.use(bodyParser.json())

app.use('/api', routes)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

app.listen(port, () => {
  console.info(`[server]: Server is running at ${url}:${port}`)
})
