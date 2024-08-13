import { ProfileEntity } from '../../db/entity/Profile'
import { ProfileRole, ProfileStatus } from '../../enums/profile'

export const mockedProfiles: Partial<ProfileEntity>[] = [
  {
    id: '3a5ada5e-940f-439a-b333-bb4d48159cd9',
    firstName: 'Dummy',
    lastName: 'Student',
    avatar: 'https://avatars.githubusercontent.com/u/bb4d48159cd9',
    role: ProfileRole.STUDENT,
    status: ProfileStatus.UNVERIFIED,
    username: 'dummy_one',
  },
  {
    id: 'ea123e3a-d922-4d37-833e-022375631298',
    firstName: 'Dummy',
    lastName: 'Teacher',
    avatar: 'https://avatars.githubusercontent.com/u/022375631298',
    role: ProfileRole.TEACHER,
    status: ProfileStatus.VERIFIED,
    username: 'dummy_two',
  },
]
