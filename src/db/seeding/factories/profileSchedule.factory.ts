import { Faker } from '@faker-js/faker'
import { setSeederFactory } from 'typeorm-extension'

import { ProfileScheduleEntity } from '../../entity/ProfileSchedule'

export const ProfileScheduleFactory = setSeederFactory(
  ProfileScheduleEntity,
  (faker: Faker) => {
    const profileSchedule = new ProfileScheduleEntity()
    profileSchedule.date = faker.date.future()
    return profileSchedule
  },
)
