import { Faker } from '@faker-js/faker'
import { setSeederFactory } from 'typeorm-extension'

import { ProfileRole, ProfileStatus } from '../../../enums/profile'
import { ProfileEntity } from '../../entity/Profile'

export const ProfileFactory = setSeederFactory(
  ProfileEntity,
  (faker: Faker) => {
    const profile = new ProfileEntity()
    profile.firstName = faker.person.firstName()
    profile.lastName = faker.person.lastName()
    profile.avatar = faker.image.avatar()
    profile.username = faker.internet.userName()
    profile.role = faker.helpers.arrayElement([
      ProfileRole.STUDENT,
      ProfileRole.TEACHER,
    ])
    profile.status = faker.helpers.arrayElement([
      ProfileStatus.UNVERIFIED,
      ProfileStatus.VERIFIED,
    ])
    return profile
  },
)
