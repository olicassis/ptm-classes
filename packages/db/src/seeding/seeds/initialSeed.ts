import { faker } from '@faker-js/faker'
import { ProfileRole, ProfileStatus } from '@ptm/enums/src/enums/profile'
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'

import { ClassRequestEntity } from '../../entity/ClassRequest'
import { ProfileEntity } from '../../entity/Profile'
import { ProfileScheduleEntity } from '../../entity/ProfileSchedule'
import { ProfileSubjectEntity } from '../../entity/ProfileSubject'

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const profileFactory = factoryManager.get(ProfileEntity)
    const profileSubjectFactory = factoryManager.get(ProfileSubjectEntity)
    const profileScheduleFactory = factoryManager.get(ProfileScheduleEntity)
    const classRequestFactory = factoryManager.get(ClassRequestEntity)

    const profileSubjectRepository =
      dataSource.getRepository(ProfileSubjectEntity)
    const profileScheduleRepository = dataSource.getRepository(
      ProfileScheduleEntity,
    )
    const classRequestRepository = dataSource.getRepository(ClassRequestEntity)

    const profiles = await profileFactory.saveMany(30)

    const teacherProfiles = profiles.filter(
      (profile) =>
        profile.role == ProfileRole.TEACHER &&
        profile.status == ProfileStatus.VERIFIED,
    )
    const studentProfiles = profiles.filter(
      (profile) =>
        profile.role == ProfileRole.STUDENT &&
        profile.status == ProfileStatus.VERIFIED,
    )

    const profileSubjects = await Promise.all(
      teacherProfiles.map(async (profile) => {
        return await profileSubjectFactory.make({ profile })
      }),
    )
    await profileSubjectRepository.save(profileSubjects)

    const profileSchedules = await Promise.all(
      teacherProfiles.map(async (profile) => {
        return await profileScheduleFactory.make({ profile })
      }),
    )
    await profileScheduleRepository.save(profileSchedules)

    const classRequests = await Promise.all(
      profileSchedules.map(async (schedule) => {
        return await classRequestFactory.make({
          studentProfileId: faker.helpers.arrayElement(
            studentProfiles.map((profile) => profile.id),
          ),
          schedule: schedule,
        })
      }),
    )
    await classRequestRepository.save(classRequests)
  }
}
