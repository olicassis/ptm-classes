import { Faker } from '@faker-js/faker'
import { ProfileRole, ProfileStatus } from '@ptm/enums/src/enums/profile'
import { setSeederFactory } from 'typeorm-extension'

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
