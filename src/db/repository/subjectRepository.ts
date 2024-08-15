import { AppDataSource } from '../dataSource'
import { ProfileSubjectEntity } from '../entity/ProfileSubject'

export async function fetchProfileSubjectsByProfileId(
  profileId: string,
): Promise<ProfileSubjectEntity[]> {
  const profileSubjectRepository =
    AppDataSource.getRepository(ProfileSubjectEntity)
  return await profileSubjectRepository.findBy({ profileId: profileId })
}
