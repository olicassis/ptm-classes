import { Request, Response } from 'express'

export function healthcheck(_req: Request, res: Response): void {
  console.info('[Healthcheck] Called healthcheck')
  res.status(200)
  res.json({
    message: 'App is fine!',
  })
}
