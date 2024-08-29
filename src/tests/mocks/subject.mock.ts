import { ProfileSubjectEntity } from '../../db/entity/ProfileSubject'
import { CreateSubjectRequest } from '../../middlewares/validators/subject'

import { mockedProfiles } from './profile.mock'

export const mockedCreateProfileSubjectInputValid: CreateSubjectRequest = {
  profileId: mockedProfiles[1].id,
  label: 'Biology',
}

export const mockedProfileSubject = new ProfileSubjectEntity()
mockedProfileSubject.id = '8a83d823-ec03-46f2-bee8-63afa7938f8c'
mockedProfileSubject.label = 'biology'
mockedProfileSubject.profileId = mockedProfiles[1].id

export const mockedCreateProfileSubjectInputInvalid = {
  label: 'Invalid Test',
} as CreateSubjectRequest
