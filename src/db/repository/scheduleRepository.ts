import { MoreThan } from 'typeorm'

import { AppDataSource } from '../dataSource'
import { ProfileScheduleEntity } from '../entity/ProfileSchedule'

export async function fetchProfileSchedulesByProfileIdWithRelations(
  profileId: string,
  relations?: string[],
): Promise<ProfileScheduleEntity[]> {
  const profileScheduleRepository = AppDataSource.getRepository(
    ProfileScheduleEntity,
  )
  return await profileScheduleRepository.find({
    where: { profileId },
    relations,
  })
}

export async function saveSchedules(
  profileSchedules: Partial<ProfileScheduleEntity>[],
): Promise<ProfileScheduleEntity[]> {
  const profileScheduleRepository = AppDataSource.getRepository(
    ProfileScheduleEntity,
  )
  return await profileScheduleRepository.save(profileSchedules)
}

export async function fetchNonExpiredProfileSchedules(
  profileId: string,
): Promise<ProfileScheduleEntity[]> {
  const profileScheduleRepository = AppDataSource.getRepository(
    ProfileScheduleEntity,
  )
  return await profileScheduleRepository.find({
    where: {
      profileId,
      date: MoreThan(new Date()),
    },
  })
}
