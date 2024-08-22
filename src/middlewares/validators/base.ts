import Ajv, { JSONSchemaType } from 'ajv'
import addFormats from 'ajv-formats'
import { Request, Response, NextFunction, RequestHandler } from 'express'

export function validateBody<T>(schema: JSONSchemaType<T>): RequestHandler {
  console.info('Called validateBody Middleware')
  return (req: Request, res: Response, next: NextFunction): void => {
    const ajv = new Ajv({ allErrors: true })
    addFormats(ajv)
    const validate = ajv.compile(schema)
    const valid = validate(req.body)
    if (!valid) {
      const errors = validate?.errors ?? []
      console.error(`Validation Error: ${errors[0].message}`)
      res.status(400).json(validate.errors)
      return
    }
    next()
  }
}
