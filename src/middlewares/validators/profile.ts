import { JSONSchemaType } from 'ajv'

import { ProfileRole } from '../../enums/profile'

import { validateBody } from './base'

export interface CreateProfileRequest {
  firstName: string
  lastName: string
  avatar?: string
  username: string
  role?: ProfileRole
}

const createProfileSchema: JSONSchemaType<CreateProfileRequest> = {
  type: 'object',
  properties: {
    firstName: { type: 'string', minLength: 2 },
    lastName: { type: 'string', minLength: 2 },
    avatar: { type: 'string', format: 'uri', nullable: true },
    username: { type: 'string', minLength: 2 },
    role: {
      type: 'string',
      enum: Object.values(ProfileRole),
      nullable: true,
    },
  },
  required: ['firstName', 'lastName', 'username'],
  additionalProperties: false,
}

export const getCreateProfileValidator = validateBody(createProfileSchema)
