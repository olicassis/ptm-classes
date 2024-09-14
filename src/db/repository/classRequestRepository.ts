import { AppDataSource } from '../dataSource'
import { ClassRequestEntity } from '../entity/ClassRequest'

export async function saveClassRequests(
  classRequests: Partial<ClassRequestEntity>[],
): Promise<ClassRequestEntity[]> {
  const classRequestRepository = AppDataSource.getRepository(ClassRequestEntity)
  return await classRequestRepository.save(classRequests)
}
