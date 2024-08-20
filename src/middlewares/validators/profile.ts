import { JSONSchemaType } from 'ajv'

import { ProfileStatus } from '../../enums/profile'

import { validateBody } from './base'

interface CreateProfile {
  firstName: string
  lastName: string
  avatar?: string
  username: string
  role?: ProfileStatus
}

const createProfileSchema: JSONSchemaType<CreateProfile> = {
  type: 'object',
  properties: {
    firstName: { type: 'string', minLength: 2 },
    lastName: { type: 'string', minLength: 2 },
    avatar: { type: 'string', format: 'uri', nullable: true },
    username: { type: 'string', minLength: 2 },
    role: {
      type: 'string',
      enum: Object.values(ProfileStatus),
      nullable: true,
    },
  },
  required: ['firstName', 'lastName', 'username'],
  additionalProperties: false,
}

export const getCreateProfileValidator = validateBody(createProfileSchema)
