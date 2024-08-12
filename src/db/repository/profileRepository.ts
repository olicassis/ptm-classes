import { AppDataSource } from '../dataSource'
import { ProfileEntity } from '../entity/Profile'

export async function fetchAllProfiles(): Promise<ProfileEntity[]> {
  const profileRepository = AppDataSource.getRepository(ProfileEntity)
  return await profileRepository.find()
}
