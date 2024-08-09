import dotenv from 'dotenv'
import swaggerAutogen from 'swagger-autogen'

dotenv.config()

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'PTM Classes API',
    description: 'Implementation of PTM Classes API with TypeScript',
  },
  servers: [
    {
      url: `${process.env.APP_URL}:${process.env.APP_PORT}/api`,
      description: 'PTM Classes Server',
    },
  ],
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/healthcheck.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
