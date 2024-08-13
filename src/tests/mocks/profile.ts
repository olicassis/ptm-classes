import { ProfileEntity } from '../../db/entity/Profile'
import { ProfileSubjectEntity } from '../../db/entity/ProfileSubject'
import { ProfileRole, ProfileStatus } from '../../enums/profile'

const mockedStudentProfile = new ProfileEntity()
mockedStudentProfile.id = '3a5ada5e-940f-439a-b333-bb4d48159cd9'
mockedStudentProfile.firstName = 'Dummy'
mockedStudentProfile.lastName = 'Student'
mockedStudentProfile.avatar =
  'https://avatars.githubusercontent.com/u/bb4d48159cd9'
mockedStudentProfile.role = ProfileRole.STUDENT
mockedStudentProfile.status = ProfileStatus.UNVERIFIED
mockedStudentProfile.username = 'dummy_one'

const mockedProfileSubject = new ProfileSubjectEntity()

const mockedTeacherProfile = new ProfileEntity()
mockedTeacherProfile.id = 'ea123e3a-d922-4d37-833e-022375631298'
mockedTeacherProfile.firstName = 'Dummy'
mockedTeacherProfile.lastName = 'Teacher'
mockedTeacherProfile.avatar =
  'https://avatars.githubusercontent.com/u/022375631298'
mockedTeacherProfile.role = ProfileRole.TEACHER
mockedTeacherProfile.status = ProfileStatus.VERIFIED
mockedTeacherProfile.username = 'dummy_two'
mockedTeacherProfile.profileSubject = [mockedProfileSubject]

export const mockedProfiles: ProfileEntity[] = [
  mockedStudentProfile,
  mockedTeacherProfile,
]
