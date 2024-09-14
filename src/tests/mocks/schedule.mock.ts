import { addMinutes } from 'date-fns'

import { ProfileScheduleEntity } from '../../db/entity/ProfileSchedule'
import { ProfileScheduleStatus } from '../../enums/profile'
import { CreateScheduleRequest } from '../../middlewares/validators/schedule'

import { mockedProfiles } from './profile.mock'

export const mockedCreateProfileScheduleInputValid: CreateScheduleRequest = {
  profileId: mockedProfiles[1].id,
  date: new Date(Date.now() + 60 * 1000).toISOString(),
}

export const mockedCreateProfileScheduleInputPastDate: CreateScheduleRequest = {
  profileId: mockedProfiles[1].id,
  date: new Date(Date.now() - 60 * 1000).toISOString(),
}

export const mockedCreateProfileScheduleInputInvalid = {
  date: '2024-08-28T23:34:08+0000',
} as CreateScheduleRequest

export const mockedProfileSchedule = new ProfileScheduleEntity()
mockedProfileSchedule.id = 'f74b3469-07cd-4500-8da0-73d6557c25c4'
mockedProfileSchedule.date = new Date(
  mockedCreateProfileScheduleInputValid.date,
)
mockedProfileSchedule.profileId = mockedProfiles[1].id
mockedProfileSchedule.status = ProfileScheduleStatus.AVAILABLE

export const mockedOverlappingProfileSchedule = new ProfileScheduleEntity()
mockedOverlappingProfileSchedule.id = '4fa99fe1-e466-4a96-b857-b0a7938747a1'
mockedOverlappingProfileSchedule.date = addMinutes(
  mockedProfileSchedule.date,
  30,
)
mockedOverlappingProfileSchedule.profileId = mockedProfiles[1].id
mockedOverlappingProfileSchedule.status = ProfileScheduleStatus.AVAILABLE

export const mockedNonOverlappingProfileSchedule = new ProfileScheduleEntity()
mockedNonOverlappingProfileSchedule.id = '270071f1-8a58-4f92-8b02-98a96972ace7'
mockedNonOverlappingProfileSchedule.date = addMinutes(
  mockedProfileSchedule.date,
  60,
)
mockedNonOverlappingProfileSchedule.profileId = mockedProfiles[1].id
mockedNonOverlappingProfileSchedule.status = ProfileScheduleStatus.AVAILABLE
