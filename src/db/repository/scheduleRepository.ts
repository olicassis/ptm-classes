import { AppDataSource } from '../dataSource'
import { ProfileScheduleEntity } from '../entity/ProfileSchedule'

export async function fetchProfileSchedulesByProfileIdWithRelations(
  profileId: string,
  relations: string[],
): Promise<ProfileScheduleEntity[]> {
  const profileScheduleRepository = AppDataSource.getRepository(
    ProfileScheduleEntity,
  )
  return await profileScheduleRepository.find({
    where: { profileId },
    relations,
  })
}
