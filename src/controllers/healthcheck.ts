import { Request, Response } from 'express'

import { AppDataSource } from '../db/dataSource'

export async function healthcheck(_req: Request, res: Response): Promise<void> {
  /*
    #swagger.tags = ['Healthcheck']
    #swagger.summary = 'Calls healthcheck'
    #swagger.description = 'This endpoint checks service health.'
  */
  console.info('[Healthcheck] Called healthcheck')
  try {
    await AppDataSource.query('SELECT 1')
    /*  #swagger.responses[200] = {
        description: "Successfully called healthcheck",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/healthcheckSuccessfulResponse"
            }
          }           
        }
      }   
    */
    res.status(200).json({
      message: 'App is fine!',
    })
  } catch (err) {
    console.error('[Healthcheck] Error:', err)
    /*  #swagger.responses[500] = {
        description: "Server is not fine",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/healthcheckInternalServerErrorResponse"
            }
          }           
        }
      }   
    */
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
