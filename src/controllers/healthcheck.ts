import { Request, Response } from 'express'

import { AppDataSource } from '../db/dataSource'
import { initializeDatasource } from '../db/repository/base'

export async function healthcheck(_req: Request, res: Response): Promise<void> {
  console.info('[Healthcheck] Called healthcheck')
  try {
    await initializeDatasource()
    await AppDataSource.query('SELECT 1')
    res.status(200).json({
      message: 'App is fine!',
    })
  } catch (err) {
    console.error('[Healthcheck] Error:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
