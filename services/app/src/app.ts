import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
dotenv.config({ path: '../../.env' })

const app: Express = express()
const port = parseInt(process.env.APP_PORT ?? '3000')
const url = process.env.APP_URL

app.get('/', (_req: Request, res: Response) => {
  res.send('PTM CLASSES Express + TypeScript Server')
})

app.listen(port, () => {
  console.info(`[server]: Server is running at ${url}:${port}`)
})
