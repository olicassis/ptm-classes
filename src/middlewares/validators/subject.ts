import { JSONSchemaType } from 'ajv'

import { validateBody } from './base'

export interface CreateSubjectRequest {
  profileId: string
  label: string
}

const createSubjectSchema: JSONSchemaType<CreateSubjectRequest> = {
  type: 'object',
  properties: {
    profileId: { type: 'string', format: 'uuid' },
    label: { type: 'string', minLength: 3 },
  },
  required: ['profileId', 'label'],
  additionalProperties: false,
}

export const getCreateSubjectValidator = validateBody(createSubjectSchema)
