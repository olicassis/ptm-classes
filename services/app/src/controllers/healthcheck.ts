import { AppDataSource } from '@ptm/db/src/dataSource'
import { Request, Response } from 'express'

export async function healthcheck(_req: Request, res: Response): Promise<void> {
  console.info('[Healthcheck] Called healthcheck')
  try {
    await AppDataSource.query('SELECT 1')
    res.status(200).json({
      message: 'App is fine!',
    })
  } catch (err) {
    console.error('[Healthcheck] Error:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
