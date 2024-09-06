import { JSONSchemaType } from 'ajv'

import { validateBody } from './base'

export interface CreateClassRequestRequest {
  studentProfileId: string
  profileScheduleId: string
}

const createClassRequestSchema: JSONSchemaType<CreateClassRequestRequest> = {
  type: 'object',
  properties: {
    studentProfileId: { type: 'string', format: 'uuid' },
    profileScheduleId: { type: 'string', format: 'uuid' },
  },
  required: ['studentProfileId', 'profileScheduleId'],
  additionalProperties: false,
}

export const getCreateClassRequestValidator = validateBody(
  createClassRequestSchema,
)
