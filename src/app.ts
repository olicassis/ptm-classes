import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import swaggerUi from 'swagger-ui-express'

import routes from './routes'
import swaggerOutput from './swagger_output.json'

dotenv.config()

const app: Application = express()

app.use(bodyParser.json())

app.use('/api', routes)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

export default app
