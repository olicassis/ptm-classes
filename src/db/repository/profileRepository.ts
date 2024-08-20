import { AppDataSource } from '../dataSource'
import { ProfileEntity } from '../entity/Profile'

export async function fetchAllProfiles(): Promise<ProfileEntity[]> {
  const profileRepository = AppDataSource.getRepository(ProfileEntity)
  return await profileRepository.find()
}

export async function fetchProfileById(
  profileId: string,
): Promise<ProfileEntity | null> {
  const profileRepository = AppDataSource.getRepository(ProfileEntity)
  return await profileRepository.findOneBy({ id: profileId })
}

export async function saveProfiles(
  profiles: Partial<ProfileEntity>[],
): Promise<ProfileEntity[]> {
  const profileRepository = AppDataSource.getRepository(ProfileEntity)
  return await profileRepository.save(profiles)
}
