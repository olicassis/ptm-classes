// import { ProfileScheduleEntity } from '../../db/entity/ProfileSchedule'
// import { ProfileScheduleStatus } from '../../enums/profile'
// import { CreateScheduleRequest } from '../../middlewares/validators/schedule'

import { ClassRequestEntity } from '../../db/entity/ClassRequest'
import { CreateClassRequestRequest } from '../../middlewares/validators/classRequest'

import { mockedProfiles, mockedProfileSchedule } from './profile.mock'

export const mockedCreateClassRequestInputValid: CreateClassRequestRequest = {
  profileScheduleId: mockedProfileSchedule.id,
  studentProfileId: mockedProfiles[0].id,
}

export const mockedCreateClassRequestInputInvalid = {
  studentProfileId: '8d8b6d9b-b159-43dd-84a5-9fbf31b4c828',
} as CreateClassRequestRequest

export const mockedClassRequest = new ClassRequestEntity()
mockedClassRequest.id = 'e8fc3677-195e-4fa4-9793-0dea3d48be7a'
mockedClassRequest.profileScheduleId = mockedProfileSchedule.id
mockedClassRequest.studentProfileId = mockedProfiles[0].id

// export const mockedCreateProfileScheduleInputValid: CreateScheduleRequest = {
//   profileId: mockedProfiles[1].id,
//   date: new Date(Date.now() + 60 * 1000).toISOString(),
// }

// export const mockedProfileSchedule = new ProfileScheduleEntity()
// mockedProfileSchedule.id = 'f74b3469-07cd-4500-8da0-73d6557c25c4'
// mockedProfileSchedule.date = new Date(
//   mockedCreateProfileScheduleInputValid.date,
// )
// mockedProfileSchedule.profileId = mockedProfiles[1].id
// mockedProfileSchedule.status = ProfileScheduleStatus.AVAILABLE
