import { JSONSchemaType } from 'ajv'

import { validateBody } from './base'

export interface CreateScheduleRequest {
  profileId: string
  date: string
}

const createScheduleSchema: JSONSchemaType<CreateScheduleRequest> = {
  type: 'object',
  properties: {
    profileId: { type: 'string', format: 'uuid' },
    date: { type: 'string', format: 'date-time' },
  },
  required: ['profileId', 'date'],
  additionalProperties: false,
}

export const getCreateScheduleValidator = validateBody(createScheduleSchema)
