import { ClassRequestEntity } from '../../db/entity/ClassRequest'
import { ProfileEntity } from '../../db/entity/Profile'
import { ProfileScheduleEntity } from '../../db/entity/ProfileSchedule'
import { ProfileSubjectEntity } from '../../db/entity/ProfileSubject'
import {
  ProfileRole,
  ProfileScheduleStatus,
  ProfileStatus,
} from '../../enums/profile'

const mockedStudentProfile = new ProfileEntity()
mockedStudentProfile.id = '3a5ada5e-940f-439a-b333-bb4d48159cd9'
mockedStudentProfile.firstName = 'Dummy'
mockedStudentProfile.lastName = 'Student'
mockedStudentProfile.avatar =
  'https://avatars.githubusercontent.com/u/bb4d48159cd9'
mockedStudentProfile.role = ProfileRole.STUDENT
mockedStudentProfile.status = ProfileStatus.UNVERIFIED
mockedStudentProfile.username = 'dummy_one'

export const mockedProfileSubject = new ProfileSubjectEntity()
mockedProfileSubject.id = '9e677663-cc12-4117-a527-559144eb1a58'
mockedProfileSubject.label = 'history'

const mockedClassRequest = new ClassRequestEntity()
mockedClassRequest.id = 'acd21628-e018-4ca0-b05d-c0442da6bc42'
mockedClassRequest.profileScheduleId = 'ea123e3a-d922-4d37-833e-022375631298'
mockedClassRequest.studentProfileId = '3a5ada5e-940f-439a-b333-bb4d48159cd9'

export const mockedProfileSchedule = new ProfileScheduleEntity()
mockedProfileSchedule.id = 'a146792a-0db5-4f96-8a59-6c6d75ea6d84'
mockedProfileSchedule.date = new Date('2024-08-15T22:31:37Z')
mockedProfileSchedule.status = ProfileScheduleStatus.AVAILABLE
mockedProfileSchedule.classRequest = mockedClassRequest

const mockedTeacherProfile = new ProfileEntity()
mockedTeacherProfile.id = 'ea123e3a-d922-4d37-833e-022375631298'
mockedTeacherProfile.firstName = 'Dummy'
mockedTeacherProfile.lastName = 'Teacher'
mockedTeacherProfile.avatar =
  'https://avatars.githubusercontent.com/u/022375631298'
mockedTeacherProfile.role = ProfileRole.TEACHER
mockedTeacherProfile.status = ProfileStatus.VERIFIED
mockedTeacherProfile.username = 'dummy_two'

export const mockedProfiles: ProfileEntity[] = [
  mockedStudentProfile,
  mockedTeacherProfile,
]
