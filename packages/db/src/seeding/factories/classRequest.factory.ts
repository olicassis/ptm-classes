import { setSeederFactory } from 'typeorm-extension'

import { ClassRequestEntity } from '../../entity/ClassRequest'

export const ClassRequestFactory = setSeederFactory(ClassRequestEntity, () => {
  const classRequest = new ClassRequestEntity()
  return classRequest
})
