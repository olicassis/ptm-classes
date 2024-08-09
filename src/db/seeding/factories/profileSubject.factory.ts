import { Faker } from '@faker-js/faker'
import { setSeederFactory } from 'typeorm-extension'

import { ProfileSubjectEntity } from '../../entity/ProfileSubject'

export const ProfileSubjectFactory = setSeederFactory(
  ProfileSubjectEntity,
  (faker: Faker) => {
    const profileSubject = new ProfileSubjectEntity()
    profileSubject.label = faker.word.noun()
    return profileSubject
  },
)
